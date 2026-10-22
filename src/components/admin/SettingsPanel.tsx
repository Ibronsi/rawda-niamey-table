import { useEffect, useRef, useState } from 'react';
import { Save, ExternalLink, Upload, RotateCcw, Settings, Image, Type, Eye, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { DEFAULT_SETTINGS, FONT_OPTIONS, normalizeSettings, type SiteSettings } from '../../../public/site/settings-core.js';

type TextField = { key: string; group: string; label: string; value: string };
type View = 'identity' | 'appearance' | 'texts' | 'sections' | 'account';
const field = 'mt-1 w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring';
const views = [{ id: 'identity', label: 'Identité & contact', icon: Settings }, { id: 'appearance', label: 'Images & style', icon: Image }, { id: 'texts', label: 'Textes du site', icon: Type }, { id: 'sections', label: 'Sections', icon: Eye }, { id: 'account', label: 'Mot de passe', icon: Lock }] as const;

export function SettingsPanel() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [stamp, setStamp] = useState<string | null>(null);
  const [catalog, setCatalog] = useState<TextField[]>([]);
  const [view, setView] = useState<View>('identity');
  const [group, setGroup] = useState('accueil');
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const dirty = JSON.stringify(settings) !== JSON.stringify(saved);

  useEffect(() => {
    let active = true;
    Promise.all([supabase.from('site_settings').select('*').eq('id', 1).maybeSingle(), fetch('/site/settings-catalog.json').then(r => { if (!r.ok) throw new Error('Textes indisponibles'); return r.json(); })])
      .then(([result, texts]) => {
        if (!active) return;
        if (result.error) throw result.error;
        const value = normalizeSettings(result.data?.settings);
        setSettings(value); setSaved(value); setStamp(result.data?.updated_at ?? null); setCatalog(texts);
      }).catch(e => { if (active) { toast.error(e.message); setFailed(true); } }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  const update = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => setSettings(s => ({ ...s, [key]: value }));
  function showPreview() { frame.current?.contentWindow?.postMessage({ type: 'rawda-settings-preview', settings }, window.location.origin); }
  useEffect(() => { if (preview) showPreview(); }, [settings, preview]);

  async function save() {
    const clean = normalizeSettings(settings);
    if (!clean.name.trim() || !clean.phone.trim() || !clean.whatsapp) return void toast.error('Indiquez le nom, le téléphone et le numéro WhatsApp.');
    setBusy(true);
    const row = { settings: JSON.parse(JSON.stringify(clean)) };
    const result = stamp
      ? await supabase.from('site_settings').update(row).eq('id', 1).eq('updated_at', stamp).select('updated_at').maybeSingle()
      : await supabase.from('site_settings').insert({ id: 1, ...row }).select('updated_at').single();
    setBusy(false);
    if (result.error) return void toast.error(result.error.message);
    if (!result.data) return void toast.error('Les paramètres ont changé ailleurs. Rechargez la page avant de réessayer.');
    setSettings(clean); setSaved(clean); setStamp(result.data.updated_at); toast.success('Paramètres enregistrés sur le site.');
  }
  async function upload(key: 'logo' | 'hero' | 'background' | 'bakery', file: File) {
    if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) return void toast.error('Choisissez une image JPG, PNG, WebP ou GIF.');
    if (file.size > 5 * 1024 * 1024) return void toast.error('Image trop lourde : 5 Mo maximum.');
    setUploading(true);
    try {
      const path = `site/${crypto.randomUUID()}.${file.type.split('/')[1]}`;
      const { error } = await supabase.storage.from('dish-images').upload(path, file, { contentType: file.type });
      if (error) throw error;
      const result = await supabase.storage.from('dish-images').createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      if (result.error) throw result.error;
      update(key, result.data.signedUrl);
      toast.success('Image ajoutée. Enregistrez vos changements.');
    } catch (e) { toast.error(e instanceof Error ? e.message : 'Envoi impossible'); } finally { setUploading(false); }
  }
  const textInput = (key: 'name'|'tagline'|'description'|'phone'|'whatsapp'|'address'|'hours'|'heroAlt'|'bakeryAlt', label: string, multiline = false) => <label className="block text-sm">{label}{multiline ? <textarea className={field} rows={3} value={settings[key]} onChange={e => update(key,e.target.value)} /> : <input className={field} value={settings[key]} onChange={e => update(key,e.target.value)} />}</label>;
  if (loading) return <p role="status" className="text-muted-foreground">Chargement des paramètres…</p>;
  if (failed) return <p role="alert" className="text-destructive">Impossible de charger les paramètres. Rechargez la page.</p>;
  return <div>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
      <div><h1 className="font-serif text-3xl">Paramètres du site</h1><p className="mt-2 text-xs text-muted-foreground">{dirty ? 'Modifications non enregistrées' : stamp ? `Dernière mise à jour : ${new Date(stamp).toLocaleString('fr-FR')}` : 'Apparence actuelle'}</p></div>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => setPreview(p => !p)}><Eye />Aperçu</Button>
        <Button variant="outline" asChild><a href="/site/index.html" target="_blank" rel="noopener noreferrer"><ExternalLink />Voir le site</a></Button>
        <Button onClick={save} disabled={!dirty || busy || uploading}><Save />{busy ? 'Enregistrement…' : 'Enregistrer'}</Button>
      </div>
    </div>
    <div className="mb-6 flex flex-wrap gap-2">{views.map(v => <Button key={v.id} variant={view === v.id ? 'default' : 'ghost'} onClick={() => setView(v.id)}><v.icon />{v.label}</Button>)}</div>
    {preview && <iframe ref={frame} onLoad={showPreview} title="Aperçu des paramètres" src="/site/index.html?settings-preview=1" className="mb-8 h-[640px] w-full border border-border bg-background" />}
    <div className="max-w-3xl">
    {view === 'identity' && <div className="grid gap-5 sm:grid-cols-2">{textInput('name','Nom du site')}{textInput('tagline','Sous-titre du logo')}{textInput('phone','Téléphone')}{textInput('whatsapp','WhatsApp (indicatif pays inclus)')}{textInput('address','Adresse',true)}{textInput('hours','Horaires')}{textInput('description','Description du site',true)}</div>}
    {view === 'appearance' && <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">{([['logo','Logo'],['hero','Photo principale'],['background','Image de fond de l’accueil'],['bakery','Photo du fournil']] as const).map(([key,label]) => <div key={key} className="border-b border-border pb-5"><h2 className="mb-3 text-sm font-medium">{label}</h2><div className="mb-3 flex h-36 items-center justify-center overflow-hidden rounded bg-muted">{settings[key] ? <img src={settings[key]} alt={label} className="h-full w-full object-contain" /> : <Image className="h-8 w-8 text-muted-foreground" />}</div><div className="flex gap-2"><Button variant="outline" asChild><label className={uploading ? 'pointer-events-none opacity-50' : ''}><Upload />Choisir<input aria-label={label} type="file" className="sr-only" accept="image/png,image/jpeg,image/webp,image/gif" disabled={uploading} onChange={e => { const file = e.target.files?.[0]; if (file) upload(key,file); e.target.value = ''; }} /></label></Button><Button variant="ghost" size="icon" title={`Retirer ${label}`} aria-label={`Retirer ${label}`} onClick={() => update(key,'')}><RotateCcw /></Button></div></div>)}</div>
      <div className="grid gap-5 sm:grid-cols-2">{textInput('heroAlt','Description de la photo principale')}{textInput('bakeryAlt','Description de la photo du fournil')}{(['bodyFont','headingFont'] as const).map(key => <label key={key} className="text-sm">{key === 'bodyFont' ? 'Police des textes' : 'Police des titres'}<select className={field} value={settings[key]} onChange={e => update(key,e.target.value)}>{FONT_OPTIONS.map(f => <option key={f}>{f}</option>)}</select></label>)}<label className="text-sm">Taille des textes : {settings.fontSize}<input aria-label="Taille des textes" type="range" min={12} max={18} step={1} value={settings.fontSize} onChange={e => update('fontSize',Number(e.target.value))} className="mt-3 w-full accent-primary" /></label></div>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">{([['paper','Fond'],['ink','Texte'],['primary','Couleur principale'],['accent','Accent']] as const).map(([key,label]) => <label key={key} className="text-sm">{label}<input aria-label={label} type="color" value={settings[key]} onChange={e => update(key,e.target.value)} className="mt-2 block h-10 w-full cursor-pointer rounded border border-input" /></label>)}</div>
    </div>}
    {view === 'texts' && <div><label className="text-sm">Partie du site<select className={field} value={group} onChange={e => setGroup(e.target.value)}>{[...new Set(catalog.map(c => c.group))].map(g => <option key={g}>{g}</option>)}</select></label><div className="mt-5 space-y-5">{catalog.filter(c => c.group === group).map(c => <label key={c.key} className="block text-sm">{c.label}<textarea className={field} rows={c.value.length > 100 ? 3 : 2} value={settings.texts[c.key] ?? c.value} onChange={e => update('texts',{ ...settings.texts,[c.key]:e.target.value })} /><Button variant="link" size="sm" onClick={() => { const texts = {...settings.texts}; delete texts[c.key]; update('texts',texts); }}>Rétablir ce texte</Button></label>)}</div></div>}
    {view === 'sections' && <div className="space-y-5"><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={settings.bannerVisible} onChange={e => update('bannerVisible',e.target.checked)} />Afficher la bannière du haut</label>{[['maison','La maison'],['services','Services'],['feature','Le fournil'],['visite','Adresse & carte'],['contact','Contact']].map(([key,label]) => <label key={key} className="flex items-center gap-3 text-sm"><input type="checkbox" checked={settings.sections[key] !== false} onChange={e => update('sections',{...settings.sections,[key]:e.target.checked})} />Afficher {label}</label>)}</div>}
    {view === 'account' && <PasswordForm />}
    </div>
    {dirty && <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-5"><Button onClick={save} disabled={busy || uploading}><Save />Enregistrer les changements</Button><Button variant="ghost" onClick={() => { if (confirm('Annuler les modifications non enregistrées ?')) setSettings(saved); }}><RotateCcw />Annuler les changements</Button></div>}
  </div>;
}

function PasswordForm() {
  const [busy,setBusy] = useState(false);
  return <form className="max-w-md space-y-4" onSubmit={async e => {
    e.preventDefault(); const form = e.currentTarget; const data = new FormData(form);
    if (data.get('password') !== data.get('confirm')) return void toast.error('Les mots de passe ne correspondent pas.');
    setBusy(true); const result = await supabase.auth.updateUser({ password: String(data.get('password')) }); setBusy(false);
    if (result.error) toast.error(result.error.message); else { toast.success('Mot de passe modifié.'); form.reset(); }
  }}><label className="block text-sm">Nouveau mot de passe<input className={field} name="password" type="password" minLength={8} required autoComplete="new-password" /></label><label className="block text-sm">Confirmer le mot de passe<input className={field} name="confirm" type="password" minLength={8} required autoComplete="new-password" /></label><Button disabled={busy}><Lock />Changer le mot de passe</Button></form>;
}