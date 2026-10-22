import { describe, expect, it } from 'vitest';
import { normalizeSettings, safeImage } from '../../public/site/settings-core.js';

describe('paramètres modifiables du site', () => {
  it('conserve le nom choisi par le gérant', () => expect(normalizeSettings({name:'Restaurant Nouveau'}).name).toBe('Restaurant Nouveau'));
  it('conserve les images de fond et le logo HTTPS', () => {
    const s = normalizeSettings({logo:'https://example.com/logo.png', background:'https://example.com/fond.jpg'});
    expect(s.logo).toBe('https://example.com/logo.png'); expect(s.background).toBe('https://example.com/fond.jpg');
  });
  it('conserve la bannière masquée', () => expect(normalizeSettings({bannerVisible:false}).bannerVisible).toBe(false));
  it('conserve la police choisie', () => expect(normalizeSettings({headingFont:'Lora'}).headingFont).toBe('Lora'));
  it('ne traite pas un texte comme du code HTML', () => expect(normalizeSettings({texts:{text_001:'<script>alert(1)</script>'}}).texts['text_001']).toBe('<script>alert(1)</script>'));
  it('refuse les images exécutables', () => expect(safeImage('javascript:alert(1)')).toBe(''));
});