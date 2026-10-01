/* ==========================================================================
   BANCO DE DADOS COORDENADO DOS CASOS FORENSES
   ========================================================================== */
const casesData = {
  unabomber: {
    id: "FBI FILE: UNABOM",
    title: "UNABOMBER (EUA, 1978–1996)",
    cards: [
      { 
        id: "EVIDÊNCIA 01", 
        title: "Perfil Linguístico e Ortográfico", 
        desc: "Análise lexicográfica de termos e idioletos no documento de 35 mil palavras.", 
        detail: "Especialistas do FBI cruzaram o vocabulário do manifesto com publicações acadêmicas antigas, identificando padrões de ortografia arcaica (como o uso de 'cooly' em vez de 'coolly') que apontaram diretamente para o histórico de escrita do suspeito." 
      },
      { 
        id: "EVIDÊNCIA 02", 
        title: "Rastreamento do Selo de Postagem", 
        desc: "Análise de origem dos selos e carimbos postais das encomendas.", 
        detail: "A equipe tática mapeou as agências postais de onde os pacotes partiram, delimitando o raio de deslocamento do remetente entre o norte da Califórnia e áreas de trânsito em Utah." 
      },
      { 
        id: "EVIDÊNCIA 03", 
        title: "Perícia de Vestígios Materiais", 
        desc: "Exame de componentes mecânicos e serragem de madeira artesanal.", 
        detail: "Peritos do laboratório do FBI identificaram que os dispositivos usavam peças de madeira cortadas à mão e mecânicos sem marcas de fabricantes comerciais, indicando o uso de ferramentas manuais em um ambiente isolado." 
      },
      { 
        id: "EVIDÊNCIA 04", 
        title: "Aviso de Tipografia e Cruzamento", 
        desc: "Divulgação pública e identificação por padrões familiares.", 
        detail: "Após a autorização para publicação do manifesto nos jornais The New York Times e The Washington Post em 1995, parentes do suspeito compararam a estrutura das frases com cartas pessoais e notificaram o FBI." 
      }
    ],
    timeline: [
      { year: "MAY 1978", info: "Primeiro pacote interceptado na Universidade Northwestern, Illinois, dando início ao rastreamento." },
      { year: "NOV 1979", info: "Ocorrência a bordo de um voo comercial força a entrada oficial do FBI e a criação da força-tarefa UNABOM." },
      { year: "FEB 1987", info: "Testemunha em Salt Lake City fornece a primeira descrição visual, gerando o famoso retrato falado com óculos escuros e capuz." },
      { year: "SEP 1995", info: "O manifesto 'Industrial Society and Its Future' é publicado publicamente após avaliação do Departamento de Justiça." },
      { year: "APR 1996", info: "Agentes especiais do FBI cumprem mandado de busca em uma cabana em Lincoln, Montana, efetuando a prisão e apreensão das evidências." }
    ],
    stats: [
      { label: "1978-80", val: 35 },
      { label: "1981-85", val: 60 },
      { label: "1986-90", val: 25 },
      { label: "1991-95", val: 90 }
    ],
    scatter: [
      { x: 15, y: 25 }, { x: 30, y: 50 }, { x: 45, y: 35 }, { x: 70, y: 80 }, { x: 85, y: 90 }
    ],
    correlation: { r: "+0.78", cov: "+18.4" },
    sources: [
      "FBI Vault — Arquivos Desclassificados do Caso UNABOM",
      "Relatórios Forenses do Laboratório Quantico do FBI",
      "Registros do Tribunal Federal do Distrito da Califórnia (1998)"
    ]
  },
  dbcooper: {
    id: "FBI FILE: NORJAK",
    title: "D.B. COOPER (EUA, 1971)",
    cards: [
      { 
        id: "EVIDÊNCIA 01", 
        title: "Procedimentos do Voo NW 305", 
        desc: "Acomodação de passageiros e exigências de resgate sob altitude estipulada.", 
        detail: "O indivíduo demonstrou conhecimento técnico sobre a operação da escada traseira do Boeing 727-100 e exigiu quatro paraquedas específicos (dois principais e dois de reserva)." 
      },
      { 
        id: "EVIDÊNCIA 02", 
        title: "Recuperação de Números de Série", 
        desc: "Varredura do número de série das cédulas de US$ 20 fornecidas.", 
        detail: "O FBI distribuiu uma lista de 10.000 números de série gravados para bancos e casas de câmbio em todo o país para rastrear tentativas de circulação do dinheiro." 
      },
      { 
        id: "EVIDÊNCIA 03", 
        title: "Microscopia Eletrônica de Varredura", 
        desc: "Análise de resíduos e ligas metálicas encontradas na gravata descartada.", 
        detail: "Testes laboratoriais identificaram partículas de titânio puro, bismuto e alumínio na gravata preta de clipe, sugerindo conexão com instalações de desenvolvimento aeronáutico da época." 
      },
      { 
        id: "EVIDÊNCIA 04", 
        title: "Achado de Tina Bar (1980)", 
        desc: "Recuperação parcial de pacotes de cédulas na margem do Rio Columbia.", 
        detail: "Em 1980, a discovery de US$ 5.800 em cédulas deterioradas permitiu recalcular a hidrodinâmica dos rios da região para determinar a zona original de impacto." 
      }
    ],
    timeline: [
      { year: "24 NOV 1971", info: "O sequestro do Boeing 727 é iniciado e o salto ocorre entre Seattle e Reno sob forte tempestade." },
      { year: "NOV 1971", info: "A operação NORJAK (Northwest Hijacking) do FBI mobiliza centenas de agentes para buscas terrestres em Washington." },
      { year: "FEB 1980", info: "Família encontra notas registradas do resgate enterradas na areia de Tina Bar, confirmando a área de dispersão." },
      { year: "JUL 2016", info: "O FBI suspende oficialmente a alocação de recursos ativos de campo, mantendo o arquivo aberto para novas evidências físicas." }
    ],
    stats: [
      { label: "1971", val: 100 },
      { label: "1972-75", val: 40 },
      { label: "1980", val: 75 },
      { label: "2000+", val: 15 }
    ],
    scatter: [
      { x: 20, y: 80 }, { x: 35, y: 60 }, { x: 50, y: 40 }, { x: 70, y: 25 }, { x: 90, y: 10 }
    ],
    correlation: { r: "-0.85", cov: "-22.1" },
    sources: [
      "FBI Freedom of Information Act (FOIA) — Arquivo NORJAK",
      "Relatórios de Engenharia de Voo da Boeing e NTSB",
      "Análise de Micropartículas do Grupo Citizen Sleuths"
    ]
  },
  somerton: {
    id: "SA POLICE / FBI AID",
    title: "SOMERTON MAN (AUSTRÁLIA, 1948)",
    cards: [
      { 
        id: "EVIDÊNCIA 01", 
        title: "Dossiê de Objetos Pessoais", 
        desc: "Ausência total de etiquetas de vestuário e registros de identificação.", 
        detail: "Todas as etiquetas das roupas haviam sido removidas com precisão. Uma mala localizada na estação de trem continha linha de costura Lincord alaranjada, idêntica à usada nos reparos da calça do indivíduo." 
      },
      { 
        id: "EVIDÊNCIA 02", 
        title: "O Fragmento 'Tamám Shud'", 
        desc: "Recorte em papel localizado no bolso interno secreto.", 
        detail: "Exames periciais confirmaram que o pedaço de papel foi arrancado da última página de uma edição rara do livro 'Rubaiyat' de Omar Khayyam." 
      },
      { 
        id: "EVIDÊNCIA 03", 
        title: "Criptanálise do Código Notado", 
        desc: "Anotações em letras maiúsculas no verso do exemplar recuperado.", 
        detail: "A sequência de letras (como 'WRGOABABD') foi analisada por órgãos de inteligência militar e criptógrafos sem a identificação de uma chave de cifragem correspondente." 
      },
      { 
        id: "EVIDÊNCIA 04", 
        title: "Mapeamento Genealógico por DNA", 
        desc: "Extração de material genético de raízes capilares e ossos.", 
        detail: "Em 2022, o uso de genealogia genética forense comparou marcadores com bancos de dados públicos e vinculou o perfil a Carl Webb." 
      }
    ],
    timeline: [
      { year: "01 DEC 1948", info: "Corpo não identificado é encontrado na praia de Somerton, Adelaide." },
      { year: "JAN 1949", info: "Localização da mala na Estação Central de Adelaide contendo pertences com marcas de identificação removidas." },
      { year: "JUN 1949", info: "Descoberta do fragmento de papel 'Tamám Shud' e posterior localização do livro com o código escrito a lápis." },
      { year: "MAY 2021", info: "Autoridades aprovam exumação do corpo para coleta de amostras de DNA de alta precisão." },
      { year: "JUL 2022", info: "A análise de genealogia forense identifica a correspondência familiar com Carl Webb." }
    ],
    stats: [
      { label: "1948-50", val: 95 },
      { label: "1951-80", val: 30 },
      { label: "1981-10", val: 40 },
      { label: "2011-22", val: 100 }
    ],
    scatter: [
      { x: 25, y: 25 }, { x: 45, y: 55 }, { x: 55, y: 50 }, { x: 65, y: 65 }, { x: 85, y: 90 }
    ],
    correlation: { r: "+0.91", cov: "+31.2" },
    sources: [
      "State Records of South Australia — Police Historical Files",
      "Relatórios da Universidade de Adelaide — Grupo de Genealogia Forense",
      "Arquivos Digitais de Periódicos Nacionais da Austrália (Trove)"
    ]
  }
};

/* VARIABLES GLOBAIS DE PAGINAÇÃO DA PASTA */
let currentPage = 0;
const caseUrls = [
  "dossier.html?case=unabomber",
  "evidencias.html",           // <--- ESSA É A LINHA QUE DEVE SER MUDADA!
  "dossier.html?case=somerton",
  "index.html"
];


/* ==========================================================================
   INICIALIZAÇÃO GLOBAL E CONFIGURAÇÃO DA PÁGINA
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initCustomCursor();

  // Inicializa o Mural de Casos Técnicos se o elemento existir
  if (document.getElementById('mural')) {
    const urlParams = new URLSearchParams(window.location.search);
    const currentCase = urlParams.get('case') || 'unabomber';
    renderCase(currentCase);
    
    // Destaca o botão correspondente no menu superior
    const activeBtn = document.getElementById(`nav-${currentCase}`);
    if (activeBtn) {
      activeBtn.classList.add('active-case');
    }

    // Recalcula os fios vermelhos de conexão ao redimensionar a tela
    window.addEventListener('resize', drawThreads);
  }

  // ELEMENTOS DO MENU SUSPENSO
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const fileOverlay = document.getElementById("fileOverlay");
  const previousPage = document.getElementById("previousPage");
  const nextPage = document.getElementById("nextPage");
  const investigate = document.getElementById("investigate");

  /* =========================
     ABRIR E FECHAR MENU
  ========================= */
  if (openMenu && fileOverlay) {
    openMenu.addEventListener("click", () => {
      fileOverlay.classList.add("active");
      currentPage = 0;
      updateFolderPage();
    });
  }

  if (closeMenu && fileOverlay) {
    closeMenu.addEventListener("click", () => {
      fileOverlay.classList.remove("active");
    });
  }

  if (fileOverlay) {
    fileOverlay.addEventListener("click", (e) => {
      if (e.target === fileOverlay) {
        fileOverlay.classList.remove("active");
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && fileOverlay) {
      fileOverlay.classList.remove("active");
    }
  });

  /* =========================
     LOGICA DAS SETAS DA PASTA (← e →)
  ========================= */
  if (previousPage) {
    previousPage.addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
        updateFolderPage();
      }
    });
  }

  if (nextPage) {
    nextPage.addEventListener("click", () => {
      const folderPages = document.querySelectorAll(".file-folder .page");
      if (currentPage < folderPages.length - 1) {
        currentPage++;
        updateFolderPage();
      }
    });
  }

  /* CLIQUE DIRETO NAS FOLHAS OU MARCADORES */
  const folderPages = document.querySelectorAll(".file-folder .page");
  folderPages.forEach((page, index) => {
    page.addEventListener("click", () => {
      currentPage = index;
      updateFolderPage();
    });
  });

  const evidenceMarks = document.querySelectorAll(".file-folder .evidence-mark");
  evidenceMarks.forEach((mark, index) => {
    mark.addEventListener("click", () => {
      currentPage = index;
      updateFolderPage();
    });
  });

  /* BOTÃO INVESTIGAR DA PASTA */
  if (investigate) {
    investigate.addEventListener("click", () => {
      if (caseUrls[currentPage]) {
        window.location.href = caseUrls[currentPage];
      }
    });
  }

  // Inicializa o estado das setas ao carregar
  updateFolderPage();
});

/* ==========================================================================
   FUNÇÃO DE ATUALIZAÇÃO REPLICADA DA HOME
   ========================================================================== */
function updateFolderPage() {
  const folderPages = document.querySelectorAll(".file-folder .page");
  const evidenceMarks = document.querySelectorAll(".file-folder .evidence-mark");
  const previousPage = document.getElementById("previousPage");
  const nextPage = document.getElementById("nextPage");

  if (!folderPages.length) return;

  folderPages.forEach((page, index) => {
    page.classList.toggle("selected", index === currentPage);
  });

  evidenceMarks.forEach((mark, index) => {
    mark.classList.toggle("active", index === currentPage);
  });

  /* SETA ANTERIOR (PRIMEIRO ARQUIVO) */
  if (previousPage) {
    if (currentPage === 0) {
      previousPage.classList.add("hidden");
    } else {
      previousPage.classList.remove("hidden");
    }
  }

  /* SETA PRÓXIMO (ÚLTIMO ARQUIVO) */
  if (nextPage) {
    if (currentPage === folderPages.length - 1) {
      nextPage.classList.add("hidden");
    } else {
      nextPage.classList.remove("hidden");
    }
  }
}

/* ==========================================================================
   MECANISMO DO CURSOR DE LUPA E ANIMAÇÃO 3D
   ========================================================================== */
function initCustomCursor() {
  const customCursor = document.getElementById("customCursor");
  if (!customCursor) return;

  document.addEventListener("mousemove", (event) => {
    customCursor.style.left = event.clientX + "px";
    customCursor.style.top = event.clientY + "px";
  });

  document.addEventListener("click", () => {
    customCursor.classList.remove("spin");
    void customCursor.offsetWidth; // Força reflow CSS
    customCursor.classList.add("spin");
  });

  customCursor.addEventListener("animationend", () => {
    customCursor.classList.remove("spin");
  });
}

/* ==========================================================================
   FUNÇÃO CENTRAL DE RENDERIZAÇÃO DE DOSSIÊS
   ========================================================================== */
function renderCase(key) {
  const caseObj = casesData[key] || casesData['unabomber'];

  if (document.getElementById('case-title')) {
    document.getElementById('case-title').innerText = caseObj.title;
    document.getElementById('case-id').innerText = caseObj.id;
  }

  const muralGrid = document.getElementById('mural');
  if (muralGrid) {
    muralGrid.innerHTML = '';
    caseObj.cards.forEach((card, idx) => {
      const cardEl = document.createElement('article');
      cardEl.className = 'evidence-card';
      cardEl.id = `card-${idx}`;
      cardEl.innerHTML = `
        <span class="file-id">${caseObj.id} // ${card.id}</span>
        <h3>${card.title}</h3>
        <p>${card.desc}</p>
      `;
      cardEl.onclick = () => openModal(card.id, card.title, card.detail);
      addTiltEffect(cardEl);
      muralGrid.appendChild(cardEl);
    });
  }

  setTimeout(drawThreads, 60);

  const tlNodes = document.getElementById('timeline-nodes');
  const tlDetails = document.getElementById('timeline-details');
  if (tlNodes) {
    tlNodes.innerHTML = '';
    caseObj.timeline.forEach((item, idx) => {
      const node = document.createElement('div');
      node.className = 'timeline-node';
      node.innerHTML = `<span class="node-year">${item.year}</span>`;
      node.onclick = () => {
        document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        if (tlDetails) {
          tlDetails.innerHTML = `<strong>[DOSSIÊ DE ${item.year}]:</strong> ${item.info}`;
        }
      };
      if (idx === 0) node.click();
      tlNodes.appendChild(node);
    });
  }

  const chartBars = document.getElementById('chart-bars');
  if (chartBars) {
    chartBars.innerHTML = '';
    caseObj.stats.forEach(st => {
      const col = document.createElement('div');
      col.className = 'bar-col';
      col.innerHTML = `
        <div class="bar" style="height:${st.val}%;" title="Intensidade: ${st.val}%"></div>
        <span class="bar-label">${st.label}</span>
      `;
      chartBars.appendChild(col);
    });
  }

  const scatterPlot = document.getElementById('scatter-plot');
  if (scatterPlot) {
    scatterPlot.innerHTML = '';
    caseObj.scatter.forEach(pt => {
      const pEl = document.createElement('div');
      pEl.className = 'scatter-point';
      pEl.style.left = pt.x + '%';
      pEl.style.bottom = pt.y + '%';
      pEl.title = `Eixo X: ${pt.x}, Eixo Y: ${pt.y}`;
      scatterPlot.appendChild(pEl);
    });
  }

  if (document.getElementById('val-r')) {
    document.getElementById('val-r').innerText = `r = ${caseObj.correlation.r}`;
    document.getElementById('val-cov').innerText = `COV = ${caseObj.correlation.cov}`;
  }

  const sourcesList = document.getElementById('sources-list');
  if (sourcesList) {
    sourcesList.innerHTML = '';
    caseObj.sources.forEach(src => {
      const item = document.createElement('div');
      item.innerText = `• ${src}`;
      sourcesList.appendChild(item);
    });
  }
}

/* ==========================================================================
   CÁLCULO MATEMÁTICO TRIDIMENSIONAL E FIOS DO MURAL (SVG THREADS)
   ========================================================================== */
function drawThreads() {
  const svg = document.getElementById('threads-layer');
  if (!svg) return;
  svg.innerHTML = '';
  
  const cards = document.querySelectorAll('.evidence-card');
  if (cards.length < 2) return;

  const containerRect = document.querySelector('.board-container').getBoundingClientRect();

  for (let i = 0; i < cards.length - 1; i++) {
    const r1 = cards[i].getBoundingClientRect();
    const r2 = cards[i + 1].getBoundingClientRect();

    const x1 = (r1.left + r1.width / 2) - containerRect.left;
    const y1 = (r1.top + 10) - containerRect.top;
    const x2 = (r2.left + r2.width / 2) - containerRect.left;
    const y2 = (r2.top + 10) - containerRect.top;

    const path = document.createElementNS('http://w3.org', 'path');
    const d = `M ${x1} ${y1} C ${x1} ${y1 + 50}, ${x2} ${y2 + 50}, ${x2} ${y2}`;
    path.setAttribute('d', d);
    path.setAttribute('stroke', '#6b1e23'); 
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-dasharray', '4,2');
    path.setAttribute('opacity', '0.8');

    svg.appendChild(path);
  }
}

/* ==========================================================================
   EFEITO PERSPECTIVA TILT (INCLINAÇÃO MOUSE-HOVER)
   ========================================================================== */
function addTiltEffect(card) {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg) translateZ(10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  });
}

/* ==========================================================================
   CONTROLE DE GERENCIAMENTO DO MODAL PERICIAL
   ========================================================================== */
function openModal(id, title, text) {
  const modalFileId = document.getElementById('modal-file-id');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalOverlay = document.getElementById('modal-overlay');

  if (modalFileId) modalFileId.innerText = `RELATÓRIO DE CAMPO // ${id}`;
  if (modalTitle) modalTitle.innerText = title;
  if (modalBody) modalBody.innerText = text;
  if (modalOverlay) modalOverlay.classList.add('active');
}

function closeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) modalOverlay.classList.remove('active');
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
