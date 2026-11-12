(function () {
  "use strict";

  var PERFIL = window.PERFIL || {};
  var ARTIGOS = (window.ARTIGOS || []).slice().sort(function (a, b) {
    if (b.ano !== a.ano) return b.ano - a.ano;
    return a.titulo.localeCompare(b.titulo, "pt-BR");
  });

  var NOME_AUTORA = PERFIL.nomeCitacao || "";
  var estado = { tema: "All", busca: "" };

  function el(tag, attrs, filhos) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === "html") n.innerHTML = attrs[k];
      else if (k === "texto") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (filhos || []).forEach(function (f) { if (f) n.appendChild(f); });
    return n;
  }

  function marcaAutores(lista) {
    return lista
      .map(function (nome) {
        var ehAutora = NOME_AUTORA && nome.trim() === NOME_AUTORA.trim();
        return ehAutora
          ? '<span class="você">' + nome + "</span>"
          : nome;
      })
      .join(", ");
  }

  // ---------------- Cabeçalho ----------------

  function montaCabecalho() {
    var nomeEl = document.getElementById("nome");
    nomeEl.innerHTML = "";
    if (PERFIL.saudacao) {
      nomeEl.appendChild(document.createTextNode(PERFIL.saudacao));
      nomeEl.appendChild(el("br", {}));
    }
    if (PERFIL.introducao) {
      nomeEl.appendChild(document.createTextNode(PERFIL.introducao + " "));
    }
    nomeEl.appendChild(el("span", { class: "nome-destaque", texto: PERFIL.nome || "" }));

    var resumoEl = document.getElementById("resumo");
    (PERFIL.resumo || "")
      .split(/[|·]/)
      .map(function (t) { return t.trim(); })
      .filter(Boolean)
      .forEach(function (trecho) {
        resumoEl.appendChild(el("li", { texto: trecho }));
      });

    var situacaoEl = document.getElementById("situacao");
    if (PERFIL.situacao) {
      situacaoEl.textContent = PERFIL.situacao;
      situacaoEl.hidden = false;
    } else {
      situacaoEl.hidden = true;
    }

    var anos = ARTIGOS.map(function (a) { return a.ano; });
    var min = Math.min.apply(null, anos), max = Math.max.apply(null, anos);
    var revistas = new Set(ARTIGOS.map(function (a) { return a.revista; })).size;
    document.getElementById("numeros").textContent =
      ARTIGOS.length + " published articles · " + revistas + " journals · " + min + "–" + max;

    var linksEl = document.getElementById("links");
    (PERFIL.links || []).forEach(function (l, i) {
      if (i > 0) linksEl.appendChild(document.createTextNode("  ·  "));
      var a = el("a", { href: l.url, target: "_blank", rel: "noopener", class: "link-com-icone" });
      if (l.icone) a.appendChild(el("img", { src: l.icone, alt: "", class: "link-icone" }));
      a.appendChild(document.createTextNode(l.rotulo));
      linksEl.appendChild(a);
    });
  }

  // ---------------- About me ----------------

  function montaSobre() {
    document.getElementById("bio").textContent = PERFIL.bio || "";
    // Optional photo (PERFIL.foto = "img/foto.jpg"): adds a third column.
    var fig = document.getElementById("sobre-foto");
    if (PERFIL.foto && fig) {
      var img = document.getElementById("sobre-foto-img");
      img.src = PERFIL.foto;
      img.alt = PERFIL.fotoAlt || ("Photo of " + (PERFIL.nome || ""));
      fig.hidden = false;
      fig.parentNode.classList.add("com-foto");
    }
  }

  // ---------------- Scientific Illustration ----------------

  var ILUSTRACOES = window.ILUSTRACOES || [];

  function montaIlustracoes() {
    if (!ILUSTRACOES.length) return;

    var numerosEl = document.getElementById("ilustracoes-numeros");
    if (numerosEl) {
      numerosEl.textContent =
        ILUSTRACOES.length + (ILUSTRACOES.length === 1 ? " piece" : " pieces");
    }

    var raiz = document.getElementById("ilustracoes-grade");
    ILUSTRACOES.forEach(function (ilu, i) {
      var figura = el("figure", { class: "ilustracao" }, [
        el("button", { type: "button", class: "ilustracao-botao", "data-indice": i }, [
          el("img", {
            src: ilu.imagem,
            alt: ilu.titulo || "",
            loading: "lazy",
            width: ilu.largura || "",
            height: ilu.altura || "",
          }),
        ]),
        el("figcaption", {}, [
          el("p", { class: "ilustracao-titulo", texto: ilu.titulo || "" }),
          ilu.descricao ? el("p", { class: "ilustracao-descricao", texto: ilu.descricao }) : null,
        ]),
      ]);
      raiz.appendChild(figura);
    });

    raiz.addEventListener("click", function (e) {
      var btn = e.target.closest(".ilustracao-botao");
      if (!btn) return;
      abreLightbox(Number(btn.getAttribute("data-indice")));
    });
  }

  function abreLightbox(indice) {
    var ilu = ILUSTRACOES[indice];
    if (!ilu) return;
    var overlay = document.getElementById("lightbox");
    document.getElementById("lightbox-img").src = ilu.imagem;
    document.getElementById("lightbox-img").alt = ilu.titulo || "";
    document.getElementById("lightbox-legenda").textContent = ilu.titulo || "";
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function fechaLightbox() {
    var overlay = document.getElementById("lightbox");
    overlay.hidden = true;
    document.getElementById("lightbox-img").src = "";
    document.body.style.overflow = "";
  }

  function montaLightbox() {
    var overlay = document.getElementById("lightbox");
    if (!overlay) return;
    overlay.addEventListener("click", function (e) {
      if (e.target.closest(".lightbox-imagem")) return;
      fechaLightbox();
    });
    document.getElementById("lightbox-fechar").addEventListener("click", fechaLightbox);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !overlay.hidden) fechaLightbox();
    });
  }

  // ---------------- Software ----------------

  function montaFerramentas() {
    var raiz = document.getElementById("ferramentas-grade");
    var lista = window.FERRAMENTAS || [];
    if (!raiz) return;
    if (!lista.length) {
      document.getElementById("ferramentas").hidden = true;
      var li = document.querySelector('.menu-topo li[data-secao="ferramentas"]');
      if (li) li.hidden = true;
      return;
    }
    lista.forEach(function (f) {
      var links = (f.links || []).map(function (l) {
        return el("a", { class: "ferramenta-link", href: l.url, target: "_blank", rel: "noopener", texto: l.rotulo });
      });
      var tags = (f.tags || []).map(function (t) { return el("li", { texto: t }); });
      raiz.appendChild(el("article", { class: "ferramenta" }, [
        f.imagem ? el("div", { class: "ferramenta-img" }, [
          el("img", { src: f.imagem, alt: f.nome || "", loading: "lazy" })
        ]) : null,
        f.status ? el("p", { class: "ferramenta-status", texto: f.status }) : null,
        el("h3", { class: "ferramenta-nome", texto: f.nome || "" }),
        f.descricao ? el("p", { class: "ferramenta-descricao", texto: f.descricao }) : null,
        tags.length ? el("ul", { class: "ferramenta-tags" }, tags) : null,
        links.length ? el("p", { class: "ferramenta-links" }, links) : null,
      ]));
    });
  }

  // ---------------- Teaching ----------------

  function montaEnsino() {
    var raiz = document.getElementById("ensino-grade");
    var lista = window.ENSINO || [];
    if (!raiz) return;
    if (!lista.length) {
      document.getElementById("ensino").hidden = true;
      var li = document.querySelector('.menu-topo li[data-secao="ensino"]');
      if (li) li.hidden = true;
      return;
    }
    lista.forEach(function (e) {
      var links = (e.links || []).map(function (l) {
        return el("a", { class: "ferramenta-link", href: l.url, target: "_blank", rel: "noopener", texto: l.rotulo });
      });
      var tags = (e.tags || []).map(function (t) { return el("li", { texto: t }); });
      var meta = [e.funcao, e.instituicao, e.periodo].filter(Boolean).join(" \u00b7 ");
      var detalhes = [e.nivel, e.carga, e.formato].filter(Boolean).join(" \u00b7 ");
      raiz.appendChild(el("article", { class: "ferramenta" }, [
        e.tipo ? el("p", { class: "ferramenta-status", texto: e.tipo }) : null,
        el("h3", { class: "ferramenta-nome", texto: e.titulo || "" }),
        meta ? el("p", { class: "ensino-meta", texto: meta }) : null,
        detalhes ? el("p", { class: "ensino-detalhes", texto: detalhes }) : null,
        e.descricao ? el("p", { class: "ferramenta-descricao", texto: e.descricao }) : null,
        tags.length ? el("ul", { class: "ferramenta-tags" }, tags) : null,
        links.length ? el("p", { class: "ferramenta-links" }, links) : null,
      ]));
    });
  }

  // ---------------- Contact me ----------------

  function montaContato() {
    var raiz = document.getElementById("contato-lista");
    (PERFIL.contato || []).forEach(function (c) {
      var a = el("a", { href: c.url, target: "_blank", rel: "noopener", class: "contato-link" }, [
        c.icone ? el("img", { src: c.icone, alt: "", class: "contato-icone" }) : null,
        el("span", { class: "contato-texto" }, [
          el("span", { class: "contato-rotulo", texto: c.rotulo }),
          el("span", { class: "contato-valor", texto: c.valor }),
        ]),
      ]);
      raiz.appendChild(el("li", {}, [a]));
    });
  }

  // ---------------- Régua (linha do tempo) ----------------

  var anosUnicos = Array.from(new Set(ARTIGOS.map(function (a) { return a.ano; }))).sort(function (a, b) { return b - a; });

  function montaRegua() {
    var ol = document.getElementById("regua");
    anosUnicos.forEach(function (ano) {
      var li = el("li", { "data-ano": ano }, [
        el("button", { type: "button", texto: String(ano), "data-ir": ano }),
      ]);
      ol.appendChild(li);
    });
    ol.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-ir]");
      if (!btn) return;
      var destino = document.getElementById("ano-" + btn.getAttribute("data-ir"));
      if (destino) destino.scrollIntoView({ block: "start" });
    });
  }

  function observaRegua() {
    var secoes = Array.from(document.querySelectorAll(".grupo-ano"));
    if (!secoes.length || !("IntersectionObserver" in window)) return;
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var li = document.querySelector('.regua li[data-ano="' + entry.target.dataset.ano + '"]');
          if (!li) return;
          li.classList.toggle("ativo", entry.isIntersecting);
        });
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    secoes.forEach(function (s) { obs.observe(s); });
  }

  // ---------------- Menu lateral (seções) ----------------

  function montaMenu() {
    var secoes = Array.from(document.querySelectorAll(".secao"));
    if (!secoes.length || !("IntersectionObserver" in window)) return;
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var li = document.querySelector('.menu-topo li[data-secao="' + entry.target.id + '"]');
          if (!li) return;
          li.classList.toggle("ativo", entry.isIntersecting);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    secoes.forEach(function (s) { obs.observe(s); });
  }

  // ---------------- Filtros ----------------

  function temas() {
    var vistos = [];
    ARTIGOS.forEach(function (a) { if (vistos.indexOf(a.tema) === -1) vistos.push(a.tema); });
    return vistos;
  }

  function montaChips() {
    var cont = document.getElementById("chips");
    var todos = el("button", { class: "chip", type: "button", "aria-pressed": "true", "data-tema": "All", texto: "All" });
    cont.appendChild(todos);
    temas().forEach(function (t) {
      cont.appendChild(el("button", { class: "chip", type: "button", "aria-pressed": "false", "data-tema": t, texto: t }));
    });
    cont.addEventListener("click", function (e) {
      var btn = e.target.closest(".chip");
      if (!btn) return;
      estado.tema = btn.getAttribute("data-tema");
      Array.from(cont.querySelectorAll(".chip")).forEach(function (c) {
        c.setAttribute("aria-pressed", c === btn ? "true" : "false");
      });
      renderLista();
    });
  }

  function montaBusca() {
    var input = document.getElementById("busca");
    var tempo = null;
    input.addEventListener("input", function () {
      clearTimeout(tempo);
      tempo = setTimeout(function () {
        estado.busca = input.value.trim().toLowerCase();
        renderLista();
      }, 120);
    });
  }

  function filtrados() {
    return ARTIGOS.filter(function (a) {
      if (estado.tema !== "All" && a.tema !== estado.tema) return false;
      if (!estado.busca) return true;
      var alvo = (a.titulo + " " + a.revista + " " + a.autores.join(" ")).toLowerCase();
      return alvo.indexOf(estado.busca) !== -1;
    });
  }

  // ---------------- Lista de artigos ----------------

  function cartaoArtigo(a) {
    var capaFilho = a.capa
      ? el("img", {
          src: a.capa,
          alt: "Cover of " + a.revista + (a.capa_destaque ? " (" + a.capa_destaque + ")" : ""),
          loading: "lazy",
          width: a.capa_dim ? a.capa_dim[0] : "",
          height: a.capa_dim ? a.capa_dim[1] : "",
        })
      : el("div", { class: "sem-capa", "aria-hidden": "true", texto: a.revista.slice(0, 1) });

    var rodape = el("p", { class: "artigo-rodape" }, [
      a.doi ? el("a", { class: "artigo-doi", href: "https://doi.org/" + a.doi, target: "_blank", rel: "noopener", texto: "doi.org/" + a.doi }) : null,
      el("span", { class: "artigo-tema", texto: a.tema }),
      a.capa_destaque ? el("span", { class: "artigo-destaque", texto: "★ " + a.capa_destaque }) : null,
    ]);

    return el("article", { class: "artigo", id: "artigo-" + a.id }, [
      el("div", { class: "artigo-capa" }, [capaFilho]),
      el("div", { class: "artigo-corpo" }, [
        el("p", { class: "artigo-revista", texto: a.revista }),
        el("h3", { class: "artigo-titulo", texto: a.titulo }),
        el("p", { class: "artigo-meta", html: marcaAutores(a.autores) + (a.meta ? " — " + a.meta : "") }),
        rodape,
      ]),
    ]);
  }

  function renderLista() {
    var raiz = document.getElementById("lista");
    raiz.innerHTML = "";
    var lista = filtrados();

    document.getElementById("contagem").textContent =
      lista.length === ARTIGOS.length
        ? ARTIGOS.length + " articles"
        : lista.length + " of " + ARTIGOS.length + " articles";

    if (!lista.length) {
      raiz.appendChild(el("p", { class: "vazio", texto: "No articles match this search." }));
      return;
    }

    var porAno = {};
    lista.forEach(function (a) {
      (porAno[a.ano] = porAno[a.ano] || []).push(a);
    });

    Object.keys(porAno)
      .sort(function (x, y) { return y - x; })
      .forEach(function (ano) {
        var grupo = el("section", { class: "grupo-ano", id: "ano-" + ano, "data-ano": ano }, [
          el("h2", { class: "ano-titulo" }, [
            document.createTextNode(ano),
            el("small", { texto: porAno[ano].length + (porAno[ano].length === 1 ? " article" : " articles") }),
          ]),
        ]);
        porAno[ano].forEach(function (a) { grupo.appendChild(cartaoArtigo(a)); });
        raiz.appendChild(grupo);
      });

    observaRegua();
  }

  // ---------------- Rodapé ----------------

  function montaRodape() {
    document.getElementById("rodape").textContent =
      "Updated " + (PERFIL.atualizado || "—");
  }

  // ---------------- Início ----------------

  montaCabecalho();
  montaSobre();
  montaIlustracoes();
  montaLightbox();
  montaFerramentas();
  montaEnsino();
  montaContato();
  montaMenu();
  montaRegua();
  montaChips();
  montaBusca();
  renderLista();
  montaRodape();
})();
