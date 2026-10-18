/* WhatsApp de Rawda Niamey */
const WHATSAPP_NUMBER = "22788668020";

const dishes = [
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
  const visible = category === "Tous" ? dishes : dishes.filter(dish => dish.category === category);
  menuGrid.innerHTML = visible.map((dish, index) => `
    <article class="dish-card" style="animation-delay:${Math.min(index * 55, 275)}ms">
      <div class="dish-image"><img src="${dish.image}" alt="${escapeHTML(dish.alt)}" loading="lazy"><span class="dish-tag">${dish.category}</span></div>
      <div class="dish-info"><div class="dish-title-row"><h3>${dish.name}</h3><span class="dish-price">${money(dish.price)}</span></div>
      <p class="dish-description">${dish.description}</p>
      <button class="add-button" type="button" data-add="${dish.id}" aria-label="Ajouter ${dish.name} à ma commande"><span aria-hidden="true">＋</span>Ajouter à ma commande</button></div>
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
  if (!dish) return;
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

document.querySelector("#checkout-button").addEventListener("click", () => {
  if (!cart.size) return;
  const fulfillment = document.querySelector('input[name="fulfillment"]:checked').value;
  const address = deliveryAddress.value.trim();
  if (fulfillment === "Livraison" && !address) {
    deliveryAddress.focus();
    deliveryAddress.reportValidity();
    return;
  }
  const lines = [...cart.values()];
  const total = lines.reduce((sum, line) => sum + line.dish.price * line.quantity, 0);
  const recap = lines.map(({dish, quantity}) => `• ${dish.name} x${quantity} — ${money(dish.price * quantity)}`).join("\n");
  const destination = fulfillment === "Livraison" ? `Livraison à : ${address}` : "Retrait sur place";
  const message = `Bonjour Rawdat ! Je souhaite commander :\n\n${recap}\n\n${destination}\nTotal estimé : ${money(total)}\n\nMerci de me confirmer la commande et les éventuels frais de livraison.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

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
renderCart();

const resaForm=document.querySelector("#reservation-form");
if(resaForm){resaForm.addEventListener("submit",e=>{e.preventDefault();const fb=document.querySelector("#reservation-feedback");
if(!resaForm.checkValidity()){fb.textContent="Merci de remplir tous les champs requis.";fb.classList.add("is-error");return;}
const f=new FormData(resaForm);fb.classList.remove("is-error");
const msg=`Bonjour Rawda ! ${f.get("type")}\nNom : ${f.get("name")}\nTél : ${f.get("phone")}\nDate : ${f.get("date")} à ${f.get("time")}\nPersonnes : ${f.get("guests")}\nPrécisions : ${f.get("notes")||"-"}`;
window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener");
fb.textContent="Votre demande s’ouvre dans WhatsApp.";resaForm.reset();});}
