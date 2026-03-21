# naijausedcar.com — Deployment Plan

## GitHub → Cloudflare → name.com (same setup as directokunbo.com)

---

## Phase 1: GitHub Repository Setup

### 1.1 — Create the repo

- Create a new GitHub repo: `naijausedcar` (or `naijausedcar.com`)
- Set visibility to **Public** (required for GitHub Pages on free plan)
- Initialize with the codebase from the build spec

### 1.2 — CNAME file

- Create `public/CNAME` with content:
  ```
  www.naijausedcar.com
  ```
- This gets copied to `dist/` during Vite build so GitHub Pages knows the custom domain

### 1.3 — GitHub Actions workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install and Build
        run: |
          npm install
          npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 1.4 — Enable GitHub Pages

1. Go to repo **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / root
4. Custom domain: `www.naijausedcar.com`
5. **Do NOT** check "Enforce HTTPS" yet — Cloudflare handles SSL

### 1.5 — Push and verify

- Push code to `main`
- GitHub Actions builds and deploys to `gh-pages` branch
- Verify the site is accessible at `https://<username>.github.io/naijausedcar/` first
- Once confirmed, the custom domain takes over after DNS is configured

---

## Phase 2: Cloudflare Setup

### 2.1 — Add the site to Cloudflare

1. Log into Cloudflare dashboard
2. **Add a site** → enter `naijausedcar.com`
3. Select the **Free plan**
4. Cloudflare will scan existing DNS records — let it finish

### 2.2 — Configure DNS records

Add these DNS records in Cloudflare:

| Type | Name | Content | Proxy | TTL |
|------|------|---------|-------|-----|
| `CNAME` | `www` | `<your-github-username>.github.io` | **Proxied** (orange cloud) | Auto |
| `CNAME` | `@` | `<your-github-username>.github.io` | **Proxied** (orange cloud) | Auto |

> **Note:** Replace `<your-github-username>` with the actual GitHub username or org that owns the repo. This should be the same one used for DirecTokunbo.

> **Alternative for apex domain:** If CNAME flattening doesn't work for `@`, use GitHub's A records instead:
>
> | Type | Name | Content | Proxy | TTL |
> |------|------|---------|-------|-----|
> | `A` | `@` | `185.199.108.153` | Proxied | Auto |
> | `A` | `@` | `185.199.109.153` | Proxied | Auto |
> | `A` | `@` | `185.199.110.153` | Proxied | Auto |
> | `A` | `@` | `185.199.111.153` | Proxied | Auto |
> | `CNAME` | `www` | `<your-github-username>.github.io` | Proxied | Auto |

### 2.3 — SSL/TLS settings

1. Go to **SSL/TLS → Overview**
2. Set encryption mode to **Full** (not Full Strict, not Flexible)
3. This is critical — "Flexible" causes redirect loops, "Full (Strict)" can fail if GitHub Pages cert isn't ready yet

### 2.4 — Page Rules (redirect naked to www)

Create a page rule to redirect the apex domain to www:

1. Go to **Rules → Page Rules**
2. Add rule:
   - URL: `naijausedcar.com/*`
   - Setting: **Forwarding URL** → 301 Permanent Redirect
   - Destination: `https://www.naijausedcar.com/$1`

> This ensures `naijausedcar.com` → `www.naijausedcar.com` cleanly.

### 2.5 — Additional Cloudflare settings

- **Speed → Optimization → Auto Minify**: Enable HTML, CSS, JS
- **Caching → Configuration**: Caching Level = Standard
- **Security → Settings**: Security Level = Medium
- **Edge Certificates → Always Use HTTPS**: **ON**
- **Edge Certificates → Automatic HTTPS Rewrites**: **ON**

### 2.6 — Note Cloudflare nameservers

Cloudflare will give you two nameservers. They look like:
```
something.ns.cloudflare.com
something-else.ns.cloudflare.com
```

Copy these — you'll need them for the next phase.

---

## Phase 3: name.com Domain Configuration

### 3.1 — Update nameservers

1. Log into **name.com**
2. Go to **My Domains → naijausedcar.com → Manage**
3. Find **Nameservers** section
4. Switch from name.com's default nameservers to **Cloudflare's nameservers**
5. Enter the two Cloudflare nameservers from Phase 2.6
6. Save

> **Important:** This means ALL DNS for naijausedcar.com is now managed through Cloudflare, not name.com. Any future DNS changes happen in Cloudflare's dashboard.

### 3.2 — Remove any existing DNS records on name.com

- Once nameservers point to Cloudflare, name.com's DNS records are ignored
- But clean them up anyway to avoid confusion if you ever switch back

### 3.3 — Wait for propagation

- Nameserver changes take **up to 24-48 hours** to propagate globally
- Typically happens within **1-2 hours**
- Cloudflare will email you when the site is active
- You can check status in Cloudflare dashboard — it'll show "Active" when ready

---

## Phase 4: Verification & Testing

### 4.1 — DNS propagation check

Run these checks once Cloudflare shows "Active":

```bash
# Check www resolves
dig www.naijausedcar.com

# Check apex resolves
dig naijausedcar.com

# Check it points to GitHub Pages (behind Cloudflare)
curl -I https://www.naijausedcar.com
```

### 4.2 — GitHub Pages custom domain verification

1. Go back to repo **Settings → Pages**
2. Custom domain should show `www.naijausedcar.com` with a green checkmark
3. If it shows a DNS error, wait for propagation and retry

### 4.3 — Test the full flow

- [ ] `https://www.naijausedcar.com` loads the coming soon page
- [ ] `https://naijausedcar.com` redirects to `https://www.naijausedcar.com`
- [ ] `http://naijausedcar.com` redirects to `https://www.naijausedcar.com`
- [ ] `http://www.naijausedcar.com` redirects to `https://www.naijausedcar.com`
- [ ] SSL certificate is valid (padlock in browser)
- [ ] Page loads fast (Cloudflare CDN caching)
- [ ] Social links work
- [ ] Mobile responsive
- [ ] No mixed content warnings

### 4.4 — Test on mobile

- Open on phone browser
- Check if the page renders correctly
- Test social link taps

---

## Quick Reference: Order of Operations

```
1. Build the site locally → verify it works with `npm run dev`
2. Create GitHub repo → push code to main
3. GitHub Actions builds → deploys to gh-pages
4. Verify it works at github.io URL
5. Add site to Cloudflare → configure DNS records
6. Update nameservers on name.com → point to Cloudflare
7. Wait for propagation
8. Set custom domain in GitHub Pages settings
9. Test all 4 URL variations (http/https × www/naked)
10. Done — site is live
```

---

## Troubleshooting

### "DNS check failed" in GitHub Pages
- Nameservers haven't propagated yet. Wait and retry.
- Make sure CNAME file in `public/` has `www.naijausedcar.com` (not just `naijausedcar.com`).

### Redirect loop (ERR_TOO_MANY_REDIRECTS)
- Cloudflare SSL is set to "Flexible" — change it to **"Full"**.

### Site shows GitHub 404
- The `gh-pages` branch hasn't been created yet. Check if GitHub Actions ran successfully.
- Make sure Pages source is set to `gh-pages` branch, not `main`.

### Site shows old content after push
- Cloudflare is caching. Go to **Caching → Configuration → Purge Everything**.
- Or wait — cache TTL is usually short for new sites.

### "Certificate not yet issued" warning
- GitHub Pages needs time to provision the SSL cert for the custom domain.
- Can take up to 1 hour after DNS is configured.
- Don't enable "Enforce HTTPS" in GitHub Pages until the cert is ready.
