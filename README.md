# Portfólio de artigos — como publicar e editar

## Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (ex.: `portfolio-artigos`).
2. Suba todos os arquivos desta pasta (`index.html`, `style.css`, `app.js`, `data/`, `capas/`) para a raiz do repositório.
3. No repositório, vá em **Settings → Pages**, em "Source" escolha a branch `main` e a pasta `/ (root)`, salve.
4. Em alguns minutos o site estará em `https://seuusuario.github.io/portfolio-artigos/`.

## Editar os artigos

Todos os dados ficam em **`data/artigos.js`** — não é preciso mexer no HTML, CSS ou JS para atualizar a lista.

- **Adicionar um artigo novo**: copie um bloco `{ ... }` dentro de `window.ARTIGOS`, troque os valores e adicione uma vírgula entre os blocos.
- **Adicionar uma capa**: salve a imagem em `capas/` (recomendo até 900px de largura, formato `.jpg`), preencha `"capa": "capas/nome-do-arquivo.jpg"` e `"capa_dim": [largura, altura]` do artigo correspondente. Se o artigo foi a capa da edição, preencha também `"capa_destaque"` com o texto do selo (ex.: `"Capa da edição · maio de 2027"`); se não, deixe `false`.
- **Tema/área**: o campo `"tema"` alimenta os filtros no topo da lista. Pode reutilizar um tema existente ou criar um novo.
- **Autores**: a lista em `"autores"` aceita qualquer nome; o seu nome (definido em `PERFIL.nomeCitacao`, no topo do arquivo) aparece em negrito automaticamente.

Depois de editar, é só subir o arquivo atualizado para o GitHub — o site publicado atualiza sozinho.

## Estrutura

```
index.html   → estrutura da página
style.css    → todo o visual (cores, tipografia, layout)
app.js       → monta a página a partir de data/artigos.js
data/
  artigos.js → seus dados: perfil + lista de artigos (o único arquivo que você deve editar no dia a dia)
capas/       → imagens das capas de revista
```
