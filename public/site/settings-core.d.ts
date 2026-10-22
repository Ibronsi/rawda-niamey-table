export interface SiteSettings {
 name: string; tagline: string; description: string; phone: string; whatsapp: string; address: string; hours: string;
 logo: string; background: string; hero: string; bakery: string; heroAlt: string; bakeryAlt: string;
 bodyFont: string; headingFont: string; fontSize: number; paper: string; ink: string; primary: string; accent: string;
 bannerVisible: boolean; texts: Record<string, string>; sections: Record<string, boolean>;
}
export const FONT_OPTIONS: string[];
export const DEFAULT_SETTINGS: SiteSettings;
export function safeImage(value: unknown): string;
export function normalizeSettings(input?: unknown): SiteSettings;