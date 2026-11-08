# Articles portfolio — how to publish and edit

## Publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `portfolio-articles`).
2. Push all the files in this folder (`index.html`, `style.css`, `app.js`, `data/`, `capas/`) to the root of the repository.
3. In the repository, go to **Settings → Pages**, under "Source" pick the `main` branch and the `/ (root)` folder, then save.
4. Within a few minutes the site will be live at `https://yourusername.github.io/portfolio-articles/`.

## Editing the articles

All the data lives in **`data/artigos.js`** — you don't need to touch the HTML, CSS or JS to update the list.

- **Add a new article**: copy one of the `{ ... }` blocks inside `window.ARTIGOS`, change the values, and keep a comma between blocks.
- **Add a cover**: save the image in `capas/` (up to ~900px wide, `.jpg` is fine), fill in `"capa": "capas/your-file-name.jpg"` and `"capa_dim": [width, height]` for that article. If the article was the issue's actual featured cover, also fill `"capa_destaque"` with the badge text (e.g. `"Featured cover · May 2027"`); otherwise leave it `false`.
- **Topic**: the `"tema"` field drives the filter chips above the list. Reuse an existing topic or create a new one.
- **Authors**: the `"autores"` list accepts any name; your own name (set in `PERFIL.nomeCitacao`, at the top of the file) is bolded automatically.

After editing, just push the updated file to GitHub — the published site updates on its own.

## Known gaps

A few covers could not be matched with confidence from the files you sent and were left out on purpose:

- **Journal of Molecular Modeling** (the 2023 force-field paper): the cover you sent is from Volume 19 (2013) — that's a different issue than the one your article appeared in (vol. 29, no. 4). It wasn't used, to avoid showing the wrong date.
- **Journal of Molecular Graphics & Modelling**, **Journal of Chemometrics**, **Biophysica**, and the 2020 **Journal of Computational and Applied Mathematics** paper: no cover was supplied for these.
- The two **Mini-Reviews in Medicinal Chemistry** articles (2022 and 2024) share the same cover image, because Bentham uses one generic, non-issue-specific template for the whole journal rather than per-issue artwork.

## Structure

```
index.html   → page structure
style.css    → all the visual design (colors, type, layout)
app.js       → builds the page from data/artigos.js
data/
  artigos.js → your data: profile + article list (the only file you should edit day to day)
capas/       → journal cover images
```
