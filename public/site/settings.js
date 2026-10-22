import { normalizeSettings } from './settings-core.js';

export function applySettings(input) {
  const s = normalizeSettings(input);
  const root = document.documentElement;
  for (const [key, token] of Object.entries({paper:'--paper', ink:'--ink', primary:'--olive', accent:'--terracotta'})) root.style.setProperty(token, s[key]);
  root.style.setProperty('--sans', `"${s.bodyFont}", sans-serif`);
  root.style.setProperty('--serif', `"${s.headingFont}", serif`);
  root.style.setProperty('--site-font-scale', String(s.fontSize / 14));
  const fonts = [s.bodyFont, s.headingFont].filter(f => !['Georgia','Arial'].includes(f));
  let link = document.querySelector('#site-fonts');
  if (!link) { link = document.createElement('link'); link.id = 'site-fonts'; link.rel = 'stylesheet'; document.head.append(link); }
  if (fonts.length) link.href = `https://fonts.googleapis.com/css2?${[...new Set(fonts)].map(f => `family=${encodeURIComponent(f).replace(/%20/g,'+')}:wght@400;500;600;700`).join('&')}&display=swap`;
  document.querySelectorAll('.brand strong').forEach(n => n.textContent = s.name);
  document.querySelectorAll('.brand small').forEach(n => n.textContent = s.tagline);
  document.querySelectorAll('.brand').forEach(n => n.setAttribute('aria-label', `${s.name}, accueil`));
  if (s.logo) document.querySelectorAll('.brand-mark').forEach(n => { const img = document.createElement('img'); img.src = s.logo; img.alt = s.name; n.replaceChildren(img); });
  if (s.hero) document.querySelector('.hero-photo img').src = s.hero;
  document.querySelector('.hero-photo img').alt = s.heroAlt;
  if (s.bakery) document.querySelector('.feature-photo img').src = s.bakery;
  document.querySelector('.feature-photo img').alt = s.bakeryAlt;
  if (s.background) { const hero = document.querySelector('.hero'); hero.style.backgroundImage = `url("${s.background}")`; hero.classList.add('custom-background'); }
  document.querySelector('.announcement').hidden = !s.bannerVisible;
  for (const [key, visible] of Object.entries(s.sections)) {
    const section = key === 'feature' ? document.querySelector('.feature-section') : document.getElementById(key);
    if (section) section.hidden = !visible;
    document.querySelectorAll(`a[href="#${key}"]`).forEach(n => n.hidden = !visible);
  }
  // Contact values are synchronized unless that particular text is explicitly customized.
  const setText = (node, value) => { const leaf = node.querySelector('[data-site-text]'); (leaf || node).textContent = value; };
  const phoneLink = document.querySelector('a[href^="tel:"]');
  phoneLink.href = `tel:${s.phone.replace(/[^+\d]/g,'')}`; setText(phoneLink, s.phone);
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(n => n.href = `https://wa.me/${s.whatsapp}`);
  const details = document.querySelectorAll('.detail-block');
  setText(details[0].querySelector('strong'), s.address);
  setText(details[1].querySelector('strong'), s.hours);
  details[0].querySelector('p').hidden = !Object.keys(s.texts).some(key => details[0].querySelector(`p [data-site-text="${key}"]`));
  details[1].querySelector('p').hidden = !Object.keys(s.texts).some(key => details[1].querySelector(`p [data-site-text="${key}"]`));
  document.querySelector('.map-frame').src = `https://www.google.com/maps?q=${encodeURIComponent(s.address)}&output=embed`;
  document.querySelector('.map-frame').title = `Carte ${s.name}`;
  setText(document.querySelector('.announcement > span:last-child'), `${s.hours} · ☎ ${s.phone}`);
  for (const [key, text] of Object.entries(s.texts)) document.querySelectorAll(`[data-site-text="${key}"]`).forEach(n => n.textContent = text);
  document.title = s.name;
  for (const [selector, value] of [['meta[name="description"]',s.description],['meta[property="og:title"]',s.name],['meta[property="og:description"]',s.description],['meta[property="og:type"]','website'],['meta[name="twitter:card"]','summary_large_image']]) {
    let node = document.querySelector(selector);
    if (!node) { node = document.createElement('meta'); const match = selector.match(/\[(name|property)="([^"]+)"\]/); node.setAttribute(match[1],match[2]); document.head.append(node); }
    node.content = value;
  }
  const cover = document.querySelector('.hero-photo img').src;
  if (cover.startsWith('https://')) for (const attr of ['og:image','twitter:image']) { const type = attr.startsWith('og:') ? 'property':'name'; let meta = document.querySelector(`meta[${type}="${attr}"]`); if (!meta) { meta = document.createElement('meta'); meta.setAttribute(type, attr); document.head.append(meta); } meta.content = cover; }
  return s;
}