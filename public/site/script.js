/* WhatsApp de Rawda Niamey */
const WHATSAPP_NUMBER = "22788668020";

let dishes = [
  {"id": "d0", "category": "Burgers", "name": "King Burger", "description": "Double steak, cheddar, oignons, sauce maison, frites.", "price": 4500, "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=850&q=80", "alt": "King Burger"},
  {"id": "d1", "category": "Burgers", "name": "Cheese Burger", "description": "Steak haché, cheddar fondant, salade, tomate, frites.", "price": 3500, "image": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=850&q=80", "alt": "Cheese Burger"},
  {"id": "d2", "category": "Burgers", "name": "Chicken Burger", "description": "Filet de poulet croustillant, sauce blanche, frites.", "price": 3500, "image": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=850&q=80", "alt": "Chicken Burger"},
  {"id": "d3", "category": "Burgers", "name": "Burger Rawda", "description": "Triple steak, œuf, bacon de bœuf, fromage, frites.", "price": 5500, "image": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=850&q=80", "alt": "Burger Rawda"},
  {"id": "d4", "category": "Pizzas", "name": "Pizza Margherita", "description": "Sauce tomate, mozzarella, basilic.", "price": 4000, "image": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=850&q=80", "alt": "Pizza Margherita"},
  {"id": "d5", "category": "Pizzas", "name": "Pizza Viande hachée", "description": "Bœuf haché, poivrons, oignons, mozzarella.", "price": 5000, "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=850&q=80", "alt": "Pizza Viande hachée"},
  {"id": "d6", "category": "Pizzas", "name": "Pizza Poulet", "description": "Poulet mariné, champignons, mozzarella.", "price": 5000, "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=850&q=80", "alt": "Pizza Poulet"},
  {"id": "d7", "category": "Pizzas", "name": "Pizza Fruits de mer", "description": "Crevettes, calamars, ail, mozzarella.", "price": 6500, "image": "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=850&q=80", "alt": "Pizza Fruits de mer"},
  {"id": "d8", "category": "Sandwichs", "name": "Shawarma poulet", "description": "Pain libanais, poulet grillé, crudités, sauce ail.", "price": 2500, "image": "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=850&q=80", "alt": "Shawarma poulet"},
  {"id": "d9", "category": "Sandwichs", "name": "Shawarma viande", "description": "Bœuf mariné, oignons, tomates, sauce tahiné.", "price": 3000, "image": "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=850&q=80", "alt": "Shawarma viande"},
  {"id": "d10", "category": "Sandwichs", "name": "Sandwich viande", "description": "Baguette Rawda, viande, légumes, frites.", "price": 2000, "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=850&q=80", "alt": "Sandwich viande"},
  {"id": "d11", "category": "Sandwichs", "name": "Club sandwich", "description": "Pain de mie, poulet, œuf, fromage, frites.", "price": 3500, "image": "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=850&q=80", "alt": "Club sandwich"},
  {"id": "d12", "category": "Poulet", "name": "Poulet braisé & frites", "description": "Demi-poulet braisé, frites et salade.", "price": 4500, "image": "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=850&q=80", "alt": "Poulet braisé & frites"},
  {"id": "d13", "category": "Poulet", "name": "Ailes de poulet (8 pcs)", "description": "Ailes croustillantes, sauce piquante ou barbecue.", "price": 3500, "image": "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=850&q=80", "alt": "Ailes de poulet (8 pcs)"},
  {"id": "d14", "category": "Poulet", "name": "Nuggets & frites", "description": "Nuggets de poulet maison, frites, sauce.", "price": 3000, "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=850&q=80", "alt": "Nuggets & frites"},
  {"id": "d15", "category": "Boulangerie", "name": "Baguette tradition", "description": "Croûte dorée, mie alvéolée, cuite du jour.", "price": 250, "image": "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=850&q=80", "alt": "Baguette tradition"},
  {"id": "d16", "category": "Boulangerie", "name": "Croissant pur beurre", "description": "Feuilleté et fondant, idéal avec un café.", "price": 500, "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=850&q=80", "alt": "Croissant pur beurre"},
  {"id": "d17", "category": "Boulangerie", "name": "Pain au chocolat", "description": "Pâte feuilletée et deux barres de chocolat.", "price": 600, "image": "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=850&q=80", "alt": "Pain au chocolat"},
  {"id": "d18", "category": "Pâtisserie", "name": "Éclair au chocolat", "description": "Pâte à choux, crème pâtissière chocolat.", "price": 1000, "image": "https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=850&q=80", "alt": "Éclair au chocolat"},
  {"id": "d19", "category": "Pâtisserie", "name": "Forêt noire (part)", "description": "Génoise chocolat, chantilly, cerises.", "price": 1500, "image": "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=850&q=80", "alt": "Forêt noire (part)"},
  {"id": "d20", "category": "Pâtisserie", "name": "Gâteau d’anniversaire", "description": "Sur commande, décor et message au choix (à partir de).", "price": 15000, "image": "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=850&q=80", "alt": "Gâteau d’anniversaire"},
  {"id": "d21", "category": "Glaces", "name": "Coupe 3 boules", "description": "Vanille, chocolat, fraise… au choix, chantilly.", "price": 2000, "image": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=850&q=80", "alt": "Coupe 3 boules"},
  {"id": "d22", "category": "Glaces", "name": "Milkshake", "description": "Vanille, chocolat ou fraise, bien glacé.", "price": 2000, "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=850&q=80", "alt": "Milkshake"},
  {"id": "d23", "category": "Glaces", "name": "Banana split", "description": "Banane, trois boules, chocolat chaud, amandes.", "price": 3000, "image": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=850&q=80", "alt": "Banana split"},
  {"id": "d24", "category": "Boissons", "name": "Café / Cappuccino", "description": "Expresso serré ou cappuccino mousseux.", "price": 1000, "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=850&q=80", "alt": "Café / Cappuccino"},
  {"id": "d25", "category": "Boissons", "name": "Jus de fruits frais", "description": "Orange, mangue, ananas ou cocktail du jour.", "price": 1500, "image": "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=850&q=80", "alt": "Jus de fruits frais"},
  {"id": "d26", "category": "Boissons", "name": "Bissap / Gingembre", "description": "Boissons locales maison, servies fraîches.", "price": 500, "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=850&q=80", "alt": "Bissap / Gingembre"},
  {"id": "d27", "category": "Boissons", "name": "Soda", "description": "Coca-Cola, Fanta, Sprite… 33 cl.", "price": 700, "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=850&q=80", "alt": "Soda"}
];

const API_URL = "https://c--8a22b42a-977c-482d-8578-7524ff9325fd-prod.lovable.cloud";
const API_KEY = "sb_publishable_R_raUA2ZO9_nw4tkBKmk4Q_jS7Mo0lL";
async function api(path, options = {}) {
  const res = await fetch(`${API_URL}/rest/v1/${path}`, {...options, headers: {apikey: API_KEY, "Content-Type": "application/json", ...(options.headers||{})}});
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error((data && (data.message || data.hint)) || `Erreur ${res.status}`);
  return data;
}
const rpc = (name, body) => api(`rpc/${name}`, {method: "POST", body: JSON.stringify(body)});
let currentCategory = "Tous";
async function loadDishes() {
  try {
    const rows = await api("dishes?select=id,category,name,description,price,image_url,available&order=sort_order.asc,created_at.asc");
    dishes = rows.map(r => ({...r, image: r.image_url || "", alt: r.name}));
    const all = document.querySelector('[data-category="Tous"] span'); if (all) all.textContent = dishes.length;
    renderMenu(currentCategory);
  } catch (e) { console.error("Carte hors ligne", e); }
}

const cart = new Map();
const menuGrid = document.querySelector("#menu-grid");
const cartPanel = document.querySelector("#cart-panel");
const backdrop = document.querySelector("#cart-backdrop");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartCheckout = document.querySelector("#cart-checkout");
const addressWrap = document.querySelector("#address-wrap");
const deliveryAddress = document.querySelector("#delivery-address");
const cartTotal = document.querySelector("#cart-total");
const toast = document.querySelector("#toast");
let previousFocus = null;
let toastTimer;

const money = amount => `${amount.toLocaleString("fr-FR")} FCFA`;
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

function renderMenu(category = "Tous") {
  currentCategory = category;
  const visible = category === "Tous" ? dishes : dishes.filter(dish => dish.category === category);
  menuGrid.innerHTML = visible.map((dish, index) => `
    <article class="dish-card" style="animation-delay:${Math.min(index * 55, 275)}ms">
      <div class="dish-image"><img src="${dish.image}" alt="${escapeHTML(dish.alt)}" loading="lazy"><span class="dish-tag">${dish.category}</span></div>
      <div class="dish-info"><div class="dish-title-row"><h3>${escapeHTML(dish.name)}</h3><span class="dish-price">${money(dish.price)}</span></div>
      <p class="dish-description">${escapeHTML(dish.description)}</p>
      ${dish.available === false ? '<button class="add-button is-soldout" type="button" disabled>Épuisé pour le moment</button>' : `<button class="add-button" type="button" data-add="${dish.id}" aria-label="Ajouter ${escapeHTML(dish.name)} à ma commande"><span aria-hidden="true">＋</span>Ajouter à ma commande</button>`}</div>
    </article>`).join("");
  menuGrid.querySelectorAll("img").forEach(img => img.addEventListener("error", () => {
    img.hidden = true;
    img.parentElement.classList.add("image-unavailable");
    img.parentElement.setAttribute("aria-label", "Photo indisponible");
  }, {once:true}));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2100);
}

function addToCart(id) {
  const dish = dishes.find(item => item.id === id);
  if (!dish || dish.available === false) return;
  const existing = cart.get(id);
  cart.set(id, {dish, quantity: existing ? existing.quantity + 1 : 1});
  renderCart();
  showToast(`${dish.name} ajouté au panier`);
}

function renderCart() {
  const lines = [...cart.values()];
  const quantity = lines.reduce((sum, line) => sum + line.quantity, 0);
  document.querySelectorAll(".cart-count").forEach(node => node.textContent = quantity);
  cartEmpty.hidden = lines.length > 0;
  cartCheckout.hidden = lines.length === 0;
  cartItems.innerHTML = lines.map(({dish, quantity: count}) => `
    <article class="cart-line">
      <div><h3>${dish.name}</h3><div class="cart-controls">
        <button type="button" data-qty="${dish.id}" data-delta="-1" aria-label="Diminuer ${dish.name}">−</button>
        <span aria-label="Quantité">${count}</span>
        <button type="button" data-qty="${dish.id}" data-delta="1" aria-label="Augmenter ${dish.name}">＋</button>
        <button class="remove-item" type="button" data-remove="${dish.id}" aria-label="Retirer ${dish.name}">Retirer</button>
      </div></div><span class="cart-line-price">${money(dish.price * count)}</span>
    </article>`).join("");
  const total = lines.reduce((sum, line) => sum + line.dish.price * line.quantity, 0);
  cartTotal.textContent = money(total);
}

function openCart() {
  previousFocus = document.activeElement;
  cartPanel.inert = false;
  cartPanel.classList.add("is-open");
  backdrop.hidden = false;
  requestAnimationFrame(() => backdrop.classList.add("is-open"));
  cartPanel.setAttribute("aria-hidden", "false");
  document.body.classList.add("cart-open");
  document.querySelector("[data-close-cart]").focus();
}

function closeCart() {
  cartPanel.classList.remove("is-open");
  cartPanel.inert = true;
  backdrop.classList.remove("is-open");
  cartPanel.setAttribute("aria-hidden", "true");
  document.body.classList.remove("cart-open");
  setTimeout(() => { if (!cartPanel.classList.contains("is-open")) backdrop.hidden = true; }, 260);
  if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
}

document.querySelectorAll(".category-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".category-tab").forEach(item => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    renderMenu(tab.dataset.category);
  });
});

document.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const quantityButton = event.target.closest("[data-qty]");
  const removeButton = event.target.closest("[data-remove]");
  if (addButton) addToCart(addButton.dataset.add);
  if (quantityButton) {
    const line = cart.get(quantityButton.dataset.qty);
    if (line) {
      line.quantity += Number(quantityButton.dataset.delta);
      if (line.quantity <= 0) cart.delete(quantityButton.dataset.qty);
      renderCart();
    }
  }
  if (removeButton) { cart.delete(removeButton.dataset.remove); renderCart(); }
  if (event.target.closest("[data-open-cart]")) openCart();
  if (event.target.closest("[data-close-cart]")) closeCart();
});

backdrop.addEventListener("click", closeCart);
document.querySelector("#clear-cart").addEventListener("click", () => {
  cart.clear();
  renderCart();
  showToast("Votre panier a été vidé");
});

document.querySelectorAll('input[name="fulfillment"]').forEach(input => {
  input.addEventListener("change", () => {
    const needsAddress = input.checked && input.value === "Livraison";
    addressWrap.hidden = !needsAddress;
    deliveryAddress.required = needsAddress;
    if (needsAddress) deliveryAddress.focus();
  });
});

document.querySelector("#checkout-button").addEventListener("click", async () => {
  if (!cart.size) return;
  const fulfillment = document.querySelector('input[name="fulfillment"]:checked').value;
  const address = deliveryAddress.value.trim();
  const name = document.querySelector("#order-name").value.trim();
  const phone = document.querySelector("#order-phone").value.trim();
  if (name.length < 2) { document.querySelector("#order-name").focus(); return showToast("Indiquez votre nom"); }
  if (phone.length < 8) { document.querySelector("#order-phone").focus(); return showToast("Indiquez votre téléphone"); }
  if (fulfillment === "Livraison" && !address) { deliveryAddress.focus(); deliveryAddress.reportValidity(); return; }
  const btn = document.querySelector("#checkout-button");
  btn.disabled = true;
  const lines = [...cart.values()];
  try {
    const [result] = await rpc("place_order", {_name: name, _phone: phone, _fulfillment: fulfillment, _address: address, _items: lines.map(l => ({id: l.dish.id, quantity: l.quantity}))});
    const recap = lines.map(({dish, quantity}) => `• ${dish.name} x${quantity} — ${money(dish.price * quantity)}`).join("\n");
    const destination = fulfillment === "Livraison" ? `Livraison à : ${address}` : "Retrait sur place";
    const message = `Bonjour Rawda ! Commande n° ${result.code}\n\n${recap}\n\n${destination}\nNom : ${name} · Tél : ${phone}\nTotal : ${money(result.total)}`;
    localStorage.setItem("rawda-last-order", result.code);
    cart.clear(); renderCart(); closeCart();
    document.querySelector("#track-code").value = result.code;
    showOrderConfirm(result.code, message);
    trackOrder(result.code);
  } catch (e) { showToast(e.message || "La commande n’a pas pu être envoyée"); }
  finally { btn.disabled = false; }
});

function showOrderConfirm(code, message) {
  const box = document.querySelector("#order-confirm");
  box.innerHTML = `<p class="eyebrow">COMMANDE ENREGISTRÉE</p><h3>Merci ! Votre numéro : <b>${code}</b></h3><p>Gardez ce numéro pour suivre votre commande ci-dessous.</p><a class="button button-dark" target="_blank" rel="noopener" href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}">Confirmer aussi sur WhatsApp <span>↗</span></a>`;
  box.hidden = false;
  document.querySelector("#suivi").scrollIntoView({behavior: "smooth"});
}

const STEPS = [["recue","Reçue"],["preparation","En préparation"],["prete","Prête"],["livree","Livrée / récupérée"]];
async function trackOrder(code) {
  const out = document.querySelector("#track-result");
  out.innerHTML = "<p>Recherche…</p>";
  try {
    const rows = await rpc("track_order", {_code: code});
    if (!rows.length) { out.innerHTML = "<p class=\"form-feedback is-error\">Aucune commande avec ce numéro.</p>"; return; }
    const o = rows[0];
    if (o.status === "annulee") { out.innerHTML = `<p class="form-feedback is-error">La commande ${o.code} a été annulée. Appelez-nous au +227 88 66 80 20.</p>`; return; }
    const idx = STEPS.findIndex(s => s[0] === o.status);
    out.innerHTML = `<p class="track-meta">Commande <b>${o.code}</b> · ${escapeHTML(o.fulfillment)} · ${money(o.total)}</p><ol class="track-steps">${STEPS.map((s,i)=>`<li class="${i<=idx?"is-done":""} ${i===idx?"is-current":""}"><span>${i+1}</span>${s[1]}</li>`).join("")}</ol><p class="track-meta">Mis à jour à ${new Date(o.updated_at).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</p>`;
  } catch (e) { out.innerHTML = `<p class="form-feedback is-error">${escapeHTML(e.message)}</p>`; }
}
document.querySelector("#track-form").addEventListener("submit", e => { e.preventDefault(); const c = document.querySelector("#track-code").value.trim(); if (c) trackOrder(c); });
{ const last = localStorage.getItem("rawda-last-order"); if (last) { document.querySelector("#track-code").value = last; trackOrder(last); } }

menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Ouvrir le menu" : "Fermer le menu");
  mainNav.classList.toggle("is-open", !expanded);
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Ouvrir le menu");
}));

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (cartPanel.classList.contains("is-open")) closeCart();
    if (mainNav.classList.contains("is-open")) {
      mainNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
    }
  }
  if (event.key === "Tab" && cartPanel.classList.contains("is-open")) {
    const focusable = [...cartPanel.querySelectorAll('button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')].filter(el => !el.closest("[hidden]"));
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

document.querySelector("#contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  const feedback = document.querySelector("#form-feedback");
  if (!form.reportValidity()) {
    feedback.textContent = "Vérifiez les champs indiqués pour continuer.";
    feedback.classList.add("is-error");
    return;
  }
  feedback.textContent = "Merci ! Votre message est prêt, mais ce formulaire de démonstration ne l’envoie pas.";
  feedback.classList.remove("is-error");
  form.reset();
});

renderMenu();
loadDishes();
renderCart();

const resaForm=document.querySelector("#reservation-form");
if(resaForm){resaForm.addEventListener("submit",e=>{e.preventDefault();const fb=document.querySelector("#reservation-feedback");
if(!resaForm.checkValidity()){fb.textContent="Merci de remplir tous les champs requis.";fb.classList.add("is-error");return;}
const f=new FormData(resaForm);fb.classList.remove("is-error");
rpc("create_reservation",{_kind:f.get("type"),_name:f.get("name"),_phone:f.get("phone"),_date:f.get("date"),_time:f.get("time"),_guests:Number(f.get("guests")),_notes:f.get("notes")||""}).then(()=>{fb.textContent="Demande enregistrée ! Nous vous rappelons pour confirmer.";resaForm.reset();}).catch(err=>{fb.textContent=err.message;fb.classList.add("is-error");});
const msg=`Bonjour Rawda ! ${f.get("type")}\nNom : ${f.get("name")}\nTél : ${f.get("phone")}\nDate : ${f.get("date")} à ${f.get("time")}\nPersonnes : ${f.get("guests")}\nPrécisions : ${f.get("notes")||"-"}`;
window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener");
});}
