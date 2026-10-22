export const FONT_OPTIONS = ['DM Sans', 'Playfair Display', 'Lora', 'Nunito Sans', 'Work Sans', 'Georgia', 'Arial'];
export const DEFAULT_SETTINGS = {
  name: 'Rawda Niamey', tagline: 'BOULANGERIE · RESTAURANT · GLACIER',
  description: 'Boulangerie, pâtisserie, restaurant, café et glacier à Niamey.',
  phone: '+227 88 66 80 20', whatsapp: '22788668020',
  address: 'Bd du Zarmaganda, à côté du Stade Seyni Kountché, Niamey, Niger',
  hours: 'Tous les jours · 7 h — 23 h',
  logo: '', background: '', hero: '', bakery: '', heroAlt: 'Burger généreux servi avec des frites', bakeryAlt: 'Pains et viennoiseries',
  bodyFont: 'DM Sans', headingFont: 'Playfair Display', fontSize: 14,
  paper: '#f4efe4', ink: '#252b1d', primary: '#36422e', accent: '#b65338',
  bannerVisible: true, texts: {}, sections: {},
};
export function safeImage(value) {
  if (typeof value !== 'string' || !value) return '';
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; } catch { return ''; }
}
export function normalizeSettings(input = {}) {
  const source = input && typeof input === 'object' && !Array.isArray(input) ? input : {};
  const result = { ...DEFAULT_SETTINGS };
  for (const key of ['name','tagline','description','phone','address','hours','heroAlt','bakeryAlt']) {
    if (typeof source[key] === 'string') result[key] = source[key].slice(0, 2000);
  }
  result.whatsapp = typeof source.whatsapp === 'string' ? source.whatsapp.replace(/\D/g, '').slice(0, 15) : result.whatsapp;
  for (const key of ['logo','background','hero','bakery']) result[key] = safeImage(source[key]);
  for (const key of ['bodyFont','headingFont']) if (FONT_OPTIONS.includes(source[key])) result[key] = source[key];
  for (const key of ['paper','ink','primary','accent']) if (/^#[0-9a-f]{6}$/i.test(source[key] || '')) result[key] = source[key];
  result.fontSize = Number.isFinite(Number(source.fontSize)) ? Math.max(12, Math.min(18, Number(source.fontSize))) : 14;
  result.bannerVisible = source.bannerVisible !== false;
  result.texts = Object.fromEntries(Object.entries(source.texts || {}).filter(([key, value]) => /^text_\d{3}$/.test(key) && typeof value === 'string').map(([key, value]) => [key, value.slice(0, 5000)]));
  result.sections = Object.fromEntries(Object.entries(source.sections || {}).filter(([key, value]) => ['maison','services','feature','contact','visite'].includes(key) && typeof value === 'boolean'));
  return result;
}