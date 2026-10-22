<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Rawda project rules
- The public restaurant site is plain HTML/CSS/JS in `public/site/` (user requirement); `/` redirects there. It talks to the backend through the REST API with the publishable key only.
- Customer writes go through security-definer RPCs (`place_order`, `create_reservation`, `track_order`); prices are recomputed server-side from `dishes`, never trusted from the browser.
- The manager area is the React route `/admin` (client-only); access is enforced by RLS with `has_role(auth.uid(),'admin')`. The first account created gets the admin role via an `auth.users` trigger.
- Dish photos live in the private `dish-images` bucket (public buckets are blocked); long-lived signed URLs are stored in `dishes.image_url`.
- Site customization is a singleton `site_settings` JSON record with public read and admin-only RLS writes; this keeps presentation editable without exposing credentials or modifying ordering rules.
- Shared settings validation lives in `public/site/settings-core.js` with a TypeScript declaration, and static text identifiers live in `settings-catalog.json`; keep identifiers stable to preserve saved content.
- Manager-uploaded site images reuse the private `dish-images` bucket with signed URLs; preview messages accept only the same-origin parent and never persist draft settings.
