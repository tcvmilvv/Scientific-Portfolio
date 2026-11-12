// Edit this file to update the portfolio.
// To add a cover: save the image in capas/ and fill in "capa" (and "capa_dim" with [width, height]).
window.PERFIL = {
  "nome": "Camila Assis Tavares",
  "nomeCitacao": "C. A. Tavares",
  "saudacao": "Hello!",
  "introducao": "I'm",
  "bio": "I am a computational chemist and postdoctoral researcher at UNICAMP, Brazil, specializing in molecular dynamics, computational biophysics, and biomolecular modeling. My research focuses on molecular interactions in complex biological systems, combining computational methods, scientific programming, and data visualization.",
  "resumo": "PhD Researcher in Computational Chemistry",
  "situacao": "Open to Postdoctoral Research Positions",
  "links": [
    {
      "rotulo": "Lattes",
      "url": "http://lattes.cnpq.br/1933195871728569",
      "icone": "img/icon-lattes.svg"
    },
    {
       "rotulo": "ORCID",
       "url": "https://orcid.org/0000-0002-0710-3956",
       "icone": "img/icon-orcid.svg"
    },
    {
      "rotulo": "Scholar",
      "url": "https://scholar.google.com.br/citations?hl=pt-BR&authuser=1&user=BL8n3LMAAAAJ",
      "icone": "img/icon-scholar.svg"
    }
  ],
  "contato": [
    {
      "rotulo": "Email",
      "valor": "cvmi@unicamp.br",
      "url": "mailto:cvmi@unicamp.br",
      "icone": "img/icon-email.svg"
    },
    {
      "rotulo": "LinkedIn",
      "valor": "linkedin.com/in/cvmi",
      "url": "https://www.linkedin.com/in/cvmi/",
      "icone": "img/icon-linkedin.svg"
    }
  ],
  "atualizado": "November 2026"
};

// Scientific Illustration: covers and graphical abstracts.
// Add a new { ... } block to add another piece; "imagem" is the path to the
// image file (save it in ilustracoes/), "largura"/"altura" are its pixel
// dimensions (helps the page avoid layout shift while it loads).
window.ILUSTRACOES = [
  {
    "titulo": "Zika virion membrane architecture",
    "descricao": "Cutaway of the coarse-grained Zika virion envelope, from the full particle down to the lipid bilayer and the radial density profile of head, glycerol and tail beads.",
    "imagem": "ilustracoes/virus-membrane-zoom.png",
    "largura": 1838,
    "altura": 706
  },
  {
    "titulo": "Labeled virion cross-section",
    "descricao": "Graphical abstract identifying the ionic solvation shells, E–M protein complex and lipid bilayer in a coarse-grained enveloped-virus model.",
    "imagem": "ilustracoes/virus-cutaway-labeled.png",
    "largura": 1437,
    "altura": 1094
  },
  {
    "titulo": "Zika virus — blueprint poster",
    "descricao": "Blueprint-style summary of the SIRAH-force-field Zika virus model: particle size, lipid composition and envelope-protein domains.",
    "imagem": "ilustracoes/zika-blueprint-poster.jpg",
    "largura": 1400,
    "altura": 1863
  }
];

// Software: tools and packages you develop.
// "status": "Released" | "In development" | "Coming soon" (any text works).
// "imagem" (optional): a figure/screenshot saved in ferramentas/ — shown on top of the card.
// "links": any number of { "rotulo", "url" } buttons (GitHub, docs, paper, demo...).
window.FERRAMENTAS = [
  {
    "nome": "PDBTools.jl — visualization tools",
    "status": "In development",
    "descricao": "Visualization tools for molecular structures, being implemented in PDBTools.jl.",
    "tags": ["Julia", "PDBTools.jl", "Visualization"],
    "links": [
      { "rotulo": "PDBTools.jl on GitHub", "url": "https://github.com/m3g/PDBTools.jl" }
    ]
  },
  {
    "nome": "New tool",
    "status": "Coming soon",
    "descricao": "A new tool is being planned. Stay tuned.",
    "tags": [],
    "links": []
  }
];

// ---- Teaching: courses, workshops, informal classes (shown in the "Teaching" section) ----
// Each item: "tipo" (Course / Workshop / Tutorial...), "titulo", "funcao" (your role), "instituicao",
// "periodo", "nivel", "carga" (workload), "formato", "descricao", "tags", "links" [{rotulo,url}].
// Every field except "titulo" is optional: empty ones are simply not shown.
window.ENSINO = [
  {
    "tipo": "Workshop",
    "titulo": "Inkscape 101 \u2014 Scientific Image Production",
    "funcao": "Instructor",
    "instituicao": "Research group workshop (informal)",
    "nivel": "Lab colleagues",
    "descricao": "Hands-on workshop on producing scientific illustrations and graphical abstracts with Inkscape: interface, drawing and node editing, bitmap tracing, radial copies, text and figure composition, export, and design tips (type hierarchy, colour palettes, spacing).",
    "tags": ["Inkscape", "Scientific illustration", "Graphical abstracts", "Vector graphics"],
    "links": [
      { "rotulo": "Handout (PDF, Portuguese)", "url": "ensino/Inkscape-101-apostila.pdf" }
    ]
  },
  {
    "tipo": "Course",
    "titulo": "General Chemistry Laboratory I (QG102)",
    "funcao": "Instructor (Class D)",
    "instituicao": "UNICAMP \u2014 Institute of Chemistry",
    "periodo": "1st semester 2025",
    "nivel": "Undergraduate",
    "carga": "4 credits \u00b7 15 weeks",
    "formato": "In person",
    "descricao": "Weekly laboratory classes illustrating the scientific method, the mole and chemical bonding, redox, chemical equilibrium, pH, solubility product, and the preparation and purification of substances.",
    "tags": ["Laboratory safety", "Chemical equilibrium", "pH", "Redox", "Titration", "Calorimetry"],
    "links": []
  }
];

window.ARTIGOS = [
  {
    "id": "10-1016-j-cam-2026-117560",
    "ano": 2026,
    "titulo": "An overview of the fractional-order gradient descent method and its applications",
    "revista": "Journal of Computational and Applied Mathematics",
    "autores": [
      "H. V. M. Ferreira",
      "C. A. Tavares",
      "N. H. T. Lemes",
      "J. P. C. dos Santos"
    ],
    "doi": "10.1016/j.cam.2026.117560",
    "meta": "art. 117560",
    "tema": "Inverse problems",
    "capa": "capas/jcam-2026-v494.jpg",
    "capa_destaque": false,
    "capa_dim": [900, 1228]
  },
  {
    "id": "10-1021-acsphyschemau-5c00113",
    "ano": 2026,
    "titulo": "Lipid Architecture in the Zika Virus",
    "revista": "ACS Physical Chemistry Au",
    "autores": [
      "C. A. Tavares",
      "M. Soñora",
      "S. Pantano",
      "L. Martínez"
    ],
    "doi": "10.1021/acsphyschemau.5c00113",
    "meta": "vol. 6, no. 4",
    "tema": "Viruses & membranes",
    "capa": "capas/acs-phys-chem-au-2026-v6n4.jpg",
    "capa_destaque": "Featured cover · July/August 2026",
    "capa_dim": [900, 1197]
  },
  {
    "id": "10-3390-biophysica5010004",
    "ano": 2025,
    "titulo": "Investigation of Interactions Between the Protein MPro and the Vanadium Complex VO(metf)2-H2O: A Computational Approach for COVID-19 Treatment",
    "revista": "Biophysica",
    "autores": [
      "C. A. Tavares",
      "E. F. Benedito",
      "T. M. R. Santos",
      "R. M. Santos",
      "T. C. Ramalho"
    ],
    "doi": "10.3390/biophysica5010004",
    "meta": "vol. 5, no. 1, art. 4",
    "tema": "Molecular dynamics",
    "capa": "capas/generic_issue_cover_big_34664.png",
    "capa_destaque": false,
    "capa_dim": null
  },
  {
    "id": "10-3390-molecules29153684",
    "ano": 2024,
    "titulo": "Atomistic Origins of Resurrection of Aged Acetylcholinesterase by Quinone Methide Precursors",
    "revista": "Molecules",
    "autores": [
      "L. V. F. Ferreira",
      "T. M. R. Santos",
      "C. A. Tavares",
      "H. Rasouli",
      "T. C. Ramalho"
    ],
    "doi": "10.3390/molecules29153684",
    "meta": "vol. 29, no. 15, art. 3684",
    "tema": "Molecular dynamics",
    "capa": "capas/molecules-2024-v29n15.jpg",
    "capa_destaque": false,
    "capa_dim": [900, 1292]
  },
  {
    "id": "10-2174-0113895575250433231103063707",
    "ano": 2024,
    "titulo": "Enhanced Sampling in Molecular Dynamics Simulations: How Many MD Snapshots can be Needed to Reproduce the Biological Behavior?",
    "revista": "Mini-Reviews in Medicinal Chemistry",
    "autores": [
      "C. A. Tavares",
      "T. M. R. Santos",
      "M. A. Gonçalves",
      "E. F. F. da Cunha",
      "T. C. Ramalho"
    ],
    "doi": "10.2174/0113895575250433231103063707",
    "meta": "vol. 24",
    "tema": "Molecular dynamics",
    "capa": "capas/mini-reviews-med-chem.jpg",
    "capa_destaque": false,
    "capa_dim": [900, 1164]
  },
  {
    "id": "10-1007-s00894-023-05530-7",
    "ano": 2023,
    "titulo": "Evaluation of autophagy inhibition to combat cancer: (vanadium complex)-protein interactions, parameterization, and validation of a new force field",
    "revista": "Journal of Molecular Modeling",
    "autores": [
      "T. M. R. Santos",
      "C. A. Tavares",
      "A. F. Pereira",
      "E. F. F. da Cunha",
      "T. C. Ramalho"
    ],
    "doi": "10.1007/s00894-023-05530-7",
    "meta": "vol. 29, no. 4, art. 123",
    "tema": "Force fields",
    "capa": "capas/894.jpeg",
    "capa_destaque": false,
    "capa_dim": null
  },
  {
    "id": "10-3390-magnetochemistry9040089",
    "ano": 2023,
    "titulo": "Improving the Path to Obtain Spectroscopic Parameters for the PI3K-(Platinum Complex) System: Theoretical Evidences for Using 195Pt NMR as a Probe",
    "revista": "Magnetochemistry",
    "autores": [
      "T. M. R. Santos",
      "G. A. Andolpho",
      "C. A. Tavares",
      "M. A. Gonçalves",
      "T. C. Ramalho"
    ],
    "doi": "10.3390/magnetochemistry9040089",
    "meta": "vol. 9, no. 4, art. 89",
    "tema": "NMR & spectroscopy",
    "capa": "capas/magnetochemistry-2023-v9n4.jpg",
    "capa_destaque": "Featured cover · April 2023",
    "capa_dim": [900, 1277]
  },
  {
    "id": "10-3390-ph16121653",
    "ano": 2023,
    "titulo": "MD Simulations to Calculate NMR Relaxation Parameters of Vanadium(IV) Complexes: A Promising Diagnostic Tool for Cancer and Alzheimer’s Disease",
    "revista": "Pharmaceuticals",
    "autores": [
      "R. M. Santos",
      "C. A. Tavares",
      "T. M. R. Santos",
      "H. Rasouli",
      "T. C. Ramalho"
    ],
    "doi": "10.3390/ph16121653",
    "meta": "vol. 16, no. 12, art. 1653",
    "tema": "NMR & spectroscopy",
    "capa": "capas/pharmaceuticals-2023-v16n12.jpg",
    "capa_destaque": false,
    "capa_dim": [900, 1277]
  },
  {
    "id": "10-1021-acs-jpcb-2c07147",
    "ano": 2023,
    "titulo": "Molecular Dynamics-Assisted Interaction of Vanadium Complex-AMPK: From Force Field Development to Biological Application for Alzheimer’s Treatment",
    "revista": "The Journal of Physical Chemistry B",
    "autores": [
      "C. A. Tavares",
      "T. M. R. Santos",
      "E. F. F. da Cunha",
      "T. C. Ramalho"
    ],
    "doi": "10.1021/acs.jpcb.2c07147",
    "meta": "vol. 127, no. 2, pp. 495–504",
    "tema": "Force fields",
    "capa": "capas/jpcb-2023-v127n2.jpg",
    "capa_destaque": false,
    "capa_dim": [900, 1195]
  },
  {
    "id": "10-1016-j-jmgm-2023-108511",
    "ano": 2023,
    "titulo": "Parameterization and validation of a new AMBER force field for an oxovanadium (IV) complex with therapeutic potential implications in Alzheimer’s disease",
    "revista": "Journal of Molecular Graphics & Modelling",
    "autores": [
      "C. A. Tavares",
      "T. M. R. Santos",
      "E. F. F. Cunha",
      "T. C. Ramalho"
    ],
    "doi": "10.1016/j.jmgm.2023.108511",
    "meta": "vol. 122, art. 108511",
    "tema": "Force fields",
    "capa": "capas/1-s2.0-S1093326323X00047-cov200h.jpeg",
    "capa_destaque": false,
    "capa_dim": null
  },
  {
    "id": "10-1002-cem-3507",
    "ano": 2023,
    "titulo": "Smoothing and differentiation of data by Tikhonov and fractional derivative tools, applied to surface-enhanced Raman scattering (SERS) spectra of crystal violet dye",
    "revista": "Journal of Chemometrics",
    "autores": [
      "N. H. T. Lemes",
      "T. M. R. Santos",
      "C. A. Tavares",
      "L. S. Virtuoso",
      "K. A. S. Souza",
      "T. C. Ramalho"
    ],
    "doi": "10.1002/cem.3507",
    "meta": "art. e3507",
    "tema": "Inverse problems",
    "capa": "capas/cem.v37.10.cover.jpeg",
    "capa_destaque": false,
    "capa_dim": null
  },
  {
    "id": "10-1080-07391102-2023-2250453",
    "ano": 2023,
    "titulo": "Vanadium complex as a potential modulator of the autophagic mechanism through proteins PI3K and ULK1: development, validation and biological implications of a specific force field for [VO(bpy) Cl]",
    "revista": "Journal of Biomolecular Structure & Dynamics",
    "autores": [
      "T. M. R. Santos",
      "C. A. Tavares",
      "E. F. F. da Cunha",
      "T. C. Ramalho"
    ],
    "doi": "10.1080/07391102.2023.2250453",
    "meta": "published online",
    "tema": "Force fields",
    "capa": "capas/jbsd-2024-v42n17.jpg",
    "capa_destaque": false,
    "capa_dim": [900, 1172]
  },
  {
    "id": "10-2174-1389557521666210521113155",
    "ano": 2022,
    "titulo": "Value of Contrast-enhanced Magnetic Resonance Imaging (MRI) in the Diagnosis of Breast Cancer",
    "revista": "Mini-Reviews in Medicinal Chemistry",
    "autores": [
      "M. A. Gonçalves",
      "B. T. L. Pereira",
      "C. A. Tavares",
      "T. M. R. Santos",
      "E. F. F. da Cunha",
      "T. C. Ramalho"
    ],
    "doi": "10.2174/1389557521666210521113155",
    "meta": "vol. 22, no. 6, pp. 865–872",
    "tema": "Medicinal chemistry",
    "capa": "capas/mini-reviews-med-chem.jpg",
    "capa_destaque": false,
    "capa_dim": [900, 1164]
  },
  {
    "id": "10-1080-17415977-2020-1732957",
    "ano": 2020,
    "titulo": "Improving a Tikhonov regularization method with a fractional-order differential operator for the inverse black body radiation problem",
    "revista": "Inverse Problems in Science and Engineering",
    "autores": [
      "T. M. R. Santos",
      "C. A. Tavares",
      "N. H. T. Lemes",
      "J. P. C. dos Santos",
      "J. P. Braga"
    ],
    "doi": "10.1080/17415977.2020.1732957",
    "meta": "vol. 28, no. 11, pp. 1513–1527",
    "tema": "Inverse problems",
    "capa": "capas/ipse-2020-v28n11.jpg",
    "capa_destaque": false,
    "capa_dim": [900, 1283]
  },
  {
    "id": "10-1016-j-cam-2020-112984",
    "ano": 2020,
    "titulo": "Solving ill-posed problems faster using fractional-order Hopfield neural network",
    "revista": "Journal of Computational and Applied Mathematics",
    "autores": [
      "C. A. Tavares",
      "T. M. R. Santos",
      "N. H. T. Lemes",
      "J. P. C. dos Santos",
      "J. C. Ferreira",
      "J. P. Braga"
    ],
    "doi": "10.1016/j.cam.2020.112984",
    "meta": "vol. 381, art. 112984",
    "tema": "Inverse problems",
    "capa": "capas/jcam-2026-v494.jpg",
    "capa_destaque": false,
    "capa_dim": null
  }
];
