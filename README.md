# Articles portfolio — how to publish and edit

## Publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `portfolio-articles`).
2. Push all the files in this folder (`index.html`, `style.css`, `app.js`, `data/`, `capas/`) to the root of the repository.
3. In the repository, go to **Settings → Pages**, under "Source" pick the `main` branch and the `/ (root)` folder, then save.
4. Within a few minutes the site will be live at `https://yourusername.github.io/portfolio-articles/`.

## Editing the content

All the data lives in **`data/artigos.js`** — you don't need to touch the HTML, CSS or JS to update the site.

**Profile (`window.PERFIL`)**
- `"nome"`: your full name, shown bold in the header greeting.
- `"saudacao"`: the text before your name in the header (e.g. `"Hello! I'm"`).
- `"bio"`: the paragraph shown in the **About me** section.
- `"resumo"`: the row of tags under the header, separated by `·`. A tag whose text is exactly `"Open to Postdoctoral Research"` automatically gets the pink outline box; rename or remove it by changing that exact phrase.
- `"links"`: header links (Lattes, ORCID, …), each with `"rotulo"`, `"url"` and an optional `"icone"` (path to an SVG in `img/`).
- `"contato"`: the rows in the **Contact me** section, each with `"rotulo"` (small label), `"valor"` (what's shown), `"url"` and an optional `"icone"`.

**Scientific Illustration (`window.ILUSTRACOES`)**
- Covers and graphical abstracts shown in the **Scientific Illustration** section, as a gallery — click any piece to view it full-size.
- **Add a piece**: copy one of the `{ ... }` blocks in `data/artigos.js`, save the image in `ilustracoes/`, and fill in `"titulo"`, `"descricao"`, `"imagem"` (the path) and, if you know them, `"largura"`/`"altura"` (its pixel size — optional, just avoids a small layout jump while it loads).

**Articles (`window.ARTIGOS`)**
- **Add a new article**: copy one of the `{ ... }` blocks, change the values, and keep a comma between blocks.
- **Add a cover**: save the image in `capas/` (up to ~900px wide, `.jpg` is fine), fill in `"capa": "capas/your-file-name.jpg"` and `"capa_dim": [width, height]` for that article. If the article was the issue's actual featured cover, also fill `"capa_destaque"` with the badge text (e.g. `"Featured cover · May 2027"`); otherwise leave it `false`.
- **Topic**: the `"tema"` field drives the filter chips and feeds the year-jump strip in the Publications section. Reuse an existing topic or create a new one.
- **Authors**: the `"autores"` list accepts any name; your own name (set in `PERFIL.nomeCitacao`) is bolded automatically.

After editing, just push the updated file to GitHub — the published site updates on its own.

## Structure

```
index.html   → page structure (header, sidebar nav, About me / Publications / Contact me sections)
style.css    → all the visual design (colors, type, layout)
app.js       → builds the page from data/artigos.js
data/
  artigos.js → your data: profile, bio, links, contact, illustrations and article list (the only file you should edit day to day)
capas/       → journal cover images
ilustracoes/ → covers and graphical abstracts shown in Scientific Illustration
logo/        → your logo (logo-black.svg for light mode, logo-white.svg for dark mode)
img/         → small icons used next to links (Lattes, ORCID, email, LinkedIn)
```

## Notes on the icons

`img/icon-lattes.svg` and `img/icon-email.svg` are simple placeholder badges. If you'd rather use the official Lattes mark, drop your own SVG/PNG into `img/` and point `"icone"` at it in `data/artigos.js` — no other change needed.

## Logo animation

The logo in the header is an inline SVG animated on hover:

- mouse **enters** → morph 01 › 02 › 03 › 02 › 01
- mouse **leaves** → morph 01 › 04 › 05 › 04 › 01
- on touch screens a tap plays both sequences; `prefers-reduced-motion` disables it.

`data/logo-frames.js` holds the pre-computed morph frames (generated from the five keyframe SVGs) and `logo.js` plays them. To change the animation, re-export the keyframes and regenerate the frames file.
The logo follows the text colour, so it works in light and dark mode.
