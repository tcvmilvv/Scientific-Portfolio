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
    if (PERFIL.situacao) {
      resumoEl.appendChild(el("li", { class: "resumo-destaque", texto: PERFIL.situacao }));
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
  montaContato();
  montaMenu();
  montaRegua();
  montaChips();
  montaBusca();
  renderLista();
  montaRodape();
})();
