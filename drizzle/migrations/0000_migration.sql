create type public.app_role as enum ('admin');
create table public.user_roles (id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade, role public.app_role not null, unique(user_id, role));
grant select on public.user_roles to authenticated; grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create or replace function public.has_role(_user_id uuid, _role public.app_role) returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.user_roles where user_id=_user_id and role=_role) $$;
create policy "own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

-- first account created becomes the manager
create or replace function public.handle_first_admin() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role='admin') then
    insert into public.user_roles(user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users for each row execute function public.handle_first_admin();

create table public.dishes (id uuid primary key default gen_random_uuid(), category text not null, name text not null, description text not null default '', price integer not null default 0, image_url text, available boolean not null default true, sort_order integer not null default 0, created_at timestamptz not null default now());
grant select on public.dishes to anon, authenticated; grant insert, update, delete on public.dishes to authenticated; grant all on public.dishes to service_role;
alter table public.dishes enable row level security;
create policy "public read dishes" on public.dishes for select to anon, authenticated using (true);
create policy "admin write dishes" on public.dishes for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create type public.order_status as enum ('recue','preparation','prete','livree','annulee');
create table public.orders (id uuid primary key default gen_random_uuid(), code text not null unique, customer_name text not null, phone text not null, fulfillment text not null, address text, items jsonb not null, total integer not null, status public.order_status not null default 'recue', created_at timestamptz not null default now(), updated_at timestamptz not null default now());
grant select, update, delete on public.orders to authenticated; grant all on public.orders to service_role;
alter table public.orders enable row level security;
create policy "admin orders" on public.orders for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create table public.reservations (id uuid primary key default gen_random_uuid(), kind text not null, customer_name text not null, phone text not null, date date not null, time text not null, guests integer not null default 1, notes text, status text not null default 'nouvelle', created_at timestamptz not null default now());
grant select, update, delete on public.reservations to authenticated; grant all on public.reservations to service_role;
alter table public.reservations enable row level security;
create policy "admin reservations" on public.reservations for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- public order creation: prices computed from the menu, never trusted from the browser
create or replace function public.place_order(_name text, _phone text, _fulfillment text, _address text, _items jsonb)
returns table(code text, total integer) language plpgsql security definer set search_path = public as $$
declare v_items jsonb := '[]'::jsonb; v_total integer := 0; it jsonb; d record; q integer; v_code text;
begin
  if length(coalesce(trim(_name),'')) < 2 or length(coalesce(trim(_phone),'')) < 8 then raise exception 'Nom ou téléphone invalide'; end if;
  if _fulfillment not in ('Retrait sur place','Livraison') then raise exception 'Mode invalide'; end if;
  if _fulfillment = 'Livraison' and length(coalesce(trim(_address),'')) < 3 then raise exception 'Adresse requise'; end if;
  for it in select * from jsonb_array_elements(_items) loop
    q := greatest(1, least(50, (it->>'quantity')::int));
    select * into d from public.dishes where id = (it->>'id')::uuid and available;
    if not found then raise exception 'Produit indisponible'; end if;
    v_items := v_items || jsonb_build_object('name', d.name, 'price', d.price, 'quantity', q);
    v_total := v_total + d.price * q;
  end loop;
  if jsonb_array_length(v_items) = 0 then raise exception 'Panier vide'; end if;
  loop
    v_code := 'RW-' || upper(substr(md5(random()::text),1,5));
    exit when not exists (select 1 from public.orders o where o.code = v_code);
  end loop;
  insert into public.orders(code, customer_name, phone, fulfillment, address, items, total)
  values (v_code, trim(_name), trim(_phone), _fulfillment, nullif(trim(_address),''), v_items, v_total);
  return query select v_code, v_total;
end $$;

create or replace function public.track_order(_code text)
returns table(code text, status public.order_status, total integer, fulfillment text, created_at timestamptz, updated_at timestamptz)
language sql stable security definer set search_path = public as $$
  select o.code, o.status, o.total, o.fulfillment, o.created_at, o.updated_at from public.orders o where o.code = upper(trim(_code)) $$;

create or replace function public.create_reservation(_kind text, _name text, _phone text, _date date, _time text, _guests integer, _notes text)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_id uuid;
begin
  if length(coalesce(trim(_name),'')) < 2 or length(coalesce(trim(_phone),'')) < 8 then raise exception 'Nom ou téléphone invalide'; end if;
  if _guests < 1 or _guests > 200 then raise exception 'Nombre invalide'; end if;
  insert into public.reservations(kind, customer_name, phone, date, time, guests, notes)
  values (left(_kind,80), trim(_name), trim(_phone), _date, left(_time,10), _guests, left(_notes,500)) returning id into v_id;
  return v_id;
end $$;
grant execute on function public.place_order(text,text,text,text,jsonb), public.track_order(text), public.create_reservation(text,text,text,date,text,integer,text) to anon, authenticated;

create or replace function public.touch_order() returns trigger language plpgsql set search_path = public as $$ begin new.updated_at = now(); return new; end $$;
create trigger orders_touch before update on public.orders for each row execute function public.touch_order();

alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.reservations;

insert into public.dishes(category,name,description,price,image_url,sort_order) values
('Burgers','King Burger','Double steak, cheddar, oignons, sauce maison, frites.',4500,'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=850&q=80',1),
('Burgers','Cheese Burger','Steak haché, cheddar fondant, salade, tomate, frites.',3500,'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=850&q=80',2),
('Burgers','Chicken Burger','Filet de poulet croustillant, sauce blanche, frites.',3500,'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=850&q=80',3),
('Burgers','Burger Rawda','Triple steak, œuf, bacon de bœuf, fromage, frites.',5500,'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=850&q=80',4),
('Pizzas','Pizza Margherita','Sauce tomate, mozzarella, basilic.',4000,'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=850&q=80',5),
('Pizzas','Pizza Viande hachée','Bœuf haché, poivrons, oignons, mozzarella.',5000,'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=850&q=80',6),
('Pizzas','Pizza Poulet','Poulet mariné, champignons, mozzarella.',5000,'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=850&q=80',7),
('Pizzas','Pizza Fruits de mer','Crevettes, calamars, ail, mozzarella.',6500,'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=850&q=80',8),
('Sandwichs','Shawarma poulet','Pain libanais, poulet grillé, crudités, sauce ail.',2500,'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=850&q=80',9),
('Sandwichs','Shawarma viande','Bœuf mariné, oignons, tomates, sauce tahiné.',3000,'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=850&q=80',10),
('Sandwichs','Sandwich viande','Baguette Rawda, viande, légumes, frites.',2000,'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=850&q=80',11),
('Sandwichs','Club sandwich','Pain de mie, poulet, œuf, fromage, frites.',3500,'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=850&q=80',12),
('Poulet','Poulet braisé & frites','Demi-poulet braisé, frites et salade.',4500,'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=850&q=80',13),
('Poulet','Ailes de poulet (8 pcs)','Ailes croustillantes, sauce piquante ou barbecue.',3500,'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=850&q=80',14),
('Poulet','Nuggets & frites','Nuggets de poulet maison, frites, sauce.',3000,'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=850&q=80',15),
('Boulangerie','Baguette tradition','Croûte dorée, mie alvéolée, cuite du jour.',250,'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=850&q=80',16),
('Boulangerie','Croissant pur beurre','Feuilleté et fondant, idéal avec un café.',500,'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=850&q=80',17),
('Boulangerie','Pain au chocolat','Pâte feuilletée et deux barres de chocolat.',600,'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=850&q=80',18),
('Pâtisserie','Éclair au chocolat','Pâte à choux, crème pâtissière chocolat.',1000,'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=850&q=80',19),
('Pâtisserie','Forêt noire (part)','Génoise chocolat, chantilly, cerises.',1500,'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=850&q=80',20),
('Pâtisserie','Gâteau d’anniversaire','Sur commande, décor et message au choix (à partir de).',15000,'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=850&q=80',21),
('Glaces','Coupe 3 boules','Vanille, chocolat, fraise… au choix, chantilly.',2000,'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=850&q=80',22),
('Glaces','Milkshake','Vanille, chocolat ou fraise, bien glacé.',2000,'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=850&q=80',23),
('Glaces','Banana split','Banane, trois boules, chocolat chaud, amandes.',3000,'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=850&q=80',24),
('Boissons','Café / Cappuccino','Expresso serré ou cappuccino mousseux.',1000,'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=850&q=80',25),
('Boissons','Jus de fruits frais','Orange, mangue, ananas ou cocktail du jour.',1500,'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=850&q=80',26),
('Boissons','Bissap / Gingembre','Boissons locales maison, servies fraîches.',500,'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=850&q=80',27),
('Boissons','Soda','Coca-Cola, Fanta, Sprite… 33 cl.',700,'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=850&q=80',28);
