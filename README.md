# tette.fi CV Site

Minimal static one-page CV website for `tette.fi`.

## 1) Run locally

No build step required.

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## 2) Deploy

### Cloudflare Pages

1. Push this repo to GitHub.
2. In Cloudflare Pages, create a new project from that repo.
3. Framework preset: `None`.
4. Build command: leave empty.
5. Build output directory: `/` (root).
6. Deploy.

### Netlify

1. Import this repo in Netlify.
2. Build command: leave empty.
3. Publish directory: `.`
4. Deploy.

### GitHub Pages

1. Push to GitHub.
2. In repo settings, open **Pages**.
3. Source: `Deploy from a branch`.
4. Branch: `main` (or your default), folder: `/ (root)`.
5. Save.

## 3) Where to edit content

Edit `content.js`.

- `headline`, `about`, `highlights`, `experience`, `projects`, `tools`, `education`, `contact`
- `cvPdfUrl` for the Download CV button

Layout/styles are in `styles.css`.
