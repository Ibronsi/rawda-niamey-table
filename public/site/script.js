/* Démonstration : remplacez ce numéro par le WhatsApp professionnel réel avant lancement. */
const WHATSAPP_NUMBER = "22700000000";

const dishes = [
  {id:"salade-niamey",category:"Entrées",name:"Salade du marché",description:"Crudités croquantes, herbes fraîches, vinaigrette citronnée.",price:2500,image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=850&q=80",alt:"Salade fraîche de légumes du marché, herbes et vinaigrette"},
  {id:"beignets-mil",category:"Entrées",name:"Beignets de mil",description:"Petits beignets dorés, servis avec une sauce tomate relevée.",price:2000,image:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=850&q=80",alt:"Beignets dorés servis avec une sauce maison"},
  {id:"brochettes",category:"Entrées",name:"Brochettes du feu",description:"Bouchées marinées aux épices douces, oignons et citron.",price:3500,image:"https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=850&q=80",alt:"Brochettes grillées et légèrement dorées"},
  {id:"riz-sauce",category:"Plats",name:"Riz sauce arachide",description:"Riz parfumé, sauce onctueuse aux arachides, légumes de saison.",price:4500,image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=850&q=80",alt:"Bol de riz parfumé accompagné d'une sauce riche et colorée"},
  {id:"poulet-yassa",category:"Plats",name:"Poulet yassa",description:"Poulet mariné au citron, oignons fondants et riz blanc.",price:5500,image:"https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=850&q=80",alt:"Poulet doré accompagné de riz et d'oignons fondants"},
  {id:"tchep",category:"Plats",name:"Tchep maison",description:"Riz rouge mijoté, légumes généreux et poisson du jour.",price:5000,image:"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=850&q=80",alt:"Plat de riz aux légumes, servi dans un bol coloré"},
  {id:"grillade",category:"Plats",name:"Grillade du jour",description:"La pièce du jour, cuite au feu, avec aloko et salade fraîche.",price:6500,image:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=850&q=80",alt:"Grillade de viande avec accompagnement frais"},
  {id:"fonio",category:"Plats",name:"Fonio aux légumes",description:"Fonio léger, légumes rôtis et petite sauce aux herbes.",price:4000,image:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=850&q=80",alt:"Assiette végétarienne de légumes rôtis et céréales"},
  {id:"degue",category:"Desserts",name:"Dèguè douceur",description:"Millet tendre, lait frais et juste ce qu’il faut de vanille.",price:1500,image:"https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=850&q=80",alt:"Dessert frais au lait, présenté dans un petit bol"},
  {id:"fruits",category:"Desserts",name:"Fruits de saison",description:"La belle récolte du jour, découpée à la minute.",price:1800,image:"https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=850&q=80",alt:"Assortiment de fruits frais de saison"},
  {id:"gingembre",category:"Boissons",name:"Jus de gingembre",description:"Gingembre frais, citron pressé, servi bien frais.",price:1000,image:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=850&q=80",alt:"Boisson fraîche maison au gingembre et au citron"},
  {id:"bissap",category:"Boissons",name:"Bissap maison",description:"Fleurs d’hibiscus infusées, touche de menthe, glaçons.",price:1000,image:"https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=850&q=80",alt:"Boisson rouge fraîche servie avec des glaçons"}
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
