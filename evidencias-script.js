/* ============================================================
   EVIDÊNCIAS — SCRIPT PRINCIPAL E INTERATIVIDADE DOS MÓDULOS
============================================================ */

let grafico = null;
let periodoSelecionado = "todos";
let tendenciaAtiva = true;

/* ================================
   ABRIR MÓDULO
================================ */

function abrirModulo(tipo) {

    const workspace = document.getElementById("workspace");
    const titulo = document.getElementById("workspaceTitle");
    const arquivo = document.getElementById("workspaceFile");
    const conteudo = document.getElementById("workspaceContent");

    if (!workspace || !conteudo) return;

    if (grafico) {
        grafico.destroy();
        grafico = null;
    }

    workspace.style.display = "block";

    if (tipo === "linear") {

        arquivo.textContent = "FILE 01 // ANALYTICS";
        titulo.textContent = "REGRESSÃO LINEAR";

        conteudo.innerHTML = `
            <div class="tool-content">

                <p class="tool-description">
                    Observe a evolução das ocorrências ao longo dos anos.
                    O gráfico permite visualizar os dados e a tendência calculada
                    pelo modelo de regressão linear.
                </p>

                <div class="controls">
                    <button class="control-btn active"
                        onclick="mudarPeriodo('todos', this)">
                        TODOS
                    </button>

                    <button class="control-btn"
                        onclick="mudarPeriodo('2015-2017', this)">
                        2015–2017
                    </button>

                    <button class="control-btn"
                        onclick="mudarPeriodo('2018-2020', this)">
                        2018–2020
                    </button>

                    <button class="control-btn"
                        onclick="mudarPeriodo('2021-2022', this)">
                        2021–2022
                    </button>

                    <button class="control-btn"
                        onclick="alternarTendencia()">
                        MOSTRAR / OCULTAR TENDÊNCIA
                    </button>
                </div>

                <div class="chart-layout">

                    <div class="chart-box">
                        <canvas id="graficoLinear"></canvas>
                    </div>

                    <div class="result-box">
                        <div class="result-label">
                            ANÁLISE AUTOMÁTICA
                        </div>

                        <h3 id="resultadoTendencia">
                            ANALISANDO...
                        </h3>

                        <p id="textoTendencia">
                            Selecione um período para analisar os dados.
                        </p>
                    </div>

                </div>

                <div class="case-section">

                    <div class="section-label">
                        CASOS DE REFERÊNCIA
                    </div>

                    <div class="case-grid">

                        <div class="case-card"
                            onclick="mostrarCaso('zodiac')">
                            <h4>ZODIAC KILLER</h4>
                            <span>CALIFÓRNIA // FINAL DOS ANOS 1960</span>
                        </div>

                        <div class="case-card"
                            onclick="mostrarCaso('unabomber')">
                            <h4>UNABOMBER</h4>
                            <span>ESTADOS UNIDOS // INVESTIGAÇÃO FEDERAL</span>
                        </div>

                    </div>

                </div>

            </div>
        `;

        criarGraficoLinear();
    }

    if (tipo === "logistica") {

        arquivo.textContent = "FILE 02 // CLASSIFICATION";
        titulo.textContent = "REGRESSÃO LOGÍSTICA";

        conteudo.innerHTML = `
            <div class="tool-content">

                <p class="tool-description">
                    Escolha algumas características de um caso e observe como
                    elas alteram uma classificação demonstrativa.
                </p>

                <div class="select-grid">

                    <div class="select-group">
                        <label>NÍVEL DE EVIDÊNCIAS</label>

                        <select id="evidencias">
                            <option value="15">
                                Poucas evidências
                            </option>

                            <option value="50">
                                Evidências moderadas
                            </option>

                            <option value="85">
                                Muitas evidências
                            </option>
                        </select>
                    </div>

                    <div class="select-group">
                        <label>SITUAÇÃO DO SUSPEITO</label>

                        <select id="suspeito">
                            <option value="10">
                                Não identificado
                            </option>

                            <option value="50">
                                Investigação em andamento
                            </option>

                            <option value="90">
                                Fortemente relacionado
                            </option>
                        </select>
                    </div>

                    <div class="select-group">
                        <label>TESTEMUNHAS</label>

                        <select id="testemunhas">
                            <option value="10">
                                Nenhuma
                            </option>

                            <option value="45">
                                Uma ou duas
                            </option>

                            <option value="85">
                                Várias
                            </option>
                        </select>
                    </div>

                </div>

                <button class="action-btn"
                    onclick="calcularLogistica()">
                    ANALISAR CLASSIFICAÇÃO
                </button>

                <div class="chart-layout">

                    <div class="chart-box">
                        <canvas id="graficoLogistica"></canvas>
                    </div>

                    <div class="result-box">

                        <div class="result-label">
                            RESULTADO DO MODELO
                        </div>

                        <div class="big-number"
                            id="porcentagem">
                            0%
                        </div>

                        <h3 id="classificacao">
                            AGUARDANDO
                        </h3>

                        <div class="meter">
                            <div
                                class="meter-fill"
                                id="barraLogistica">
                            </div>
                        </div>

                        <p id="textoLogistica">
                            Configure as características e clique
                            em analisar.
                        </p>

                    </div>

                </div>

                <div class="simulation-note">
                    ⚠ SIMULAÇÃO DIDÁTICA: este resultado serve apenas
                    para demonstrar o funcionamento de uma classificação
                    logística. Não representa uma previsão real de crimes
                    ou de pessoas.
                </div>

            </div>
        `;

        criarGraficoLogistica();
    }

    if (tipo === "ml") {

        arquivo.textContent = "FILE 03 // MACHINE LEARNING";
        titulo.textContent = "ML SUPERVISIONADO";

        conteudo.innerHTML = `
            <div class="tool-content">

                <p class="tool-description">
                    Monte uma ocorrência utilizando características
                    categorizadas e observe como um modelo supervisionado
                    pode organizar esses dados.
                </p>

                <div class="select-grid">

                    <div class="select-group">
                        <label>LOCALIZAÇÃO</label>

                        <select id="localML">
                            <option value="30">Área urbana</option>
                            <option value="60">Área suburbana</option>
                            <option value="90">Área rural</option>
                        </select>
                    </div>

                    <div class="select-group">
                        <label>PERÍODO</label>

                        <select id="periodoML">
                            <option value="25">Manhã</option>
                            <option value="50">Tarde</option>
                            <option value="80">Noite</option>
                        </select>
                    </div>

                    <div class="select-group">
                        <label>TIPO DE OCORRÊNCIA</label>

                        <select id="tipoML">
                            <option value="30">Patrimônio</option>
                            <option value="60">Violência</option>
                            <option value="90">Série de ocorrências</option>
                        </select>
                    </div>

                </div>

                <button class="action-btn"
                    onclick="classificarML()">
                    CLASSIFICAR OCORRÊNCIA
                </button>

                <div class="chart-layout">

                    <div class="chart-box">
                        <canvas id="graficoML"></canvas>
                    </div>

                    <div class="result-box">

                        <div class="result-label">
                            CLASSIFICAÇÃO
                        </div>

                        <h3 id="resultadoML">
                            AGUARDANDO
                        </h3>

                        <p id="textoML">
                            Selecione as características e
                            execute a classificação.
                        </p>

                        <div id="featureBars"
                            class="feature-bars">
                        </div>

                    </div>

                </div>

                <div class="simulation-note">
                    ⚠ SIMULAÇÃO DIDÁTICA: o objetivo é demonstrar
                    como características categorizadas podem ser usadas
                    por um modelo supervisionado. Não representa um
                    sistema real de previsão criminal.
                </div>

            </div>
        `;

        criarGraficoML();
    }

    workspace.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* ================================
   REGRESSÃO LINEAR
================================ */

const anos = [
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022"
];

const ocorrencias = [
    15265,
    17339,
    17327,
    16214,
    16425,
    21570,
    22415,
    21320
];

function regressaoLinear(valores) {

    const n = valores.length;
    const x = valores.map((_, i) => i);

    const mediaX =
        x.reduce((a, b) => a + b, 0) / n;

    const mediaY =
        valores.reduce((a, b) => a + b, 0) / n;

    let numerador = 0;
    let denominador = 0;

    for (let i = 0; i < n; i++) {

        numerador +=
            (x[i] - mediaX) *
            (valores[i] - mediaY);

        denominador +=
            Math.pow(x[i] - mediaX, 2);
    }

    const m = numerador / denominador;
    const b = mediaY - m * mediaX;

    return valores.map((_, i) =>
        Math.round(m * i + b)
    );
}

function criarGraficoLinear() {

    const ctx = document.getElementById("graficoLinear");
    if (!ctx) return;

    const tendencia = regressaoLinear(ocorrencias);

    grafico = new Chart(ctx, {

        type: "line",

        data: {

            labels: anos,

            datasets: [

                {
                    label: "Ocorrências",
                    data: ocorrencias,
                    borderWidth: 3,
                    tension: .35,
                    pointRadius: 5
                },

                {
                    label: "Tendência",
                    data: tendencia,
                    borderWidth: 2,
                    borderDash: [8, 6],
                    pointRadius: 0,
                    tension: 0
                }

            ]
        },

        options: {

            responsive: true,

            interaction: {
                intersect: false,
                mode: "index"
            },

            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: "Space Mono"
                        }
                    }
                }
            },

            scales: {

                x: {
                    ticks: {
                        font: {
                            family: "Space Mono"
                        }
                    }
                },

                y: {
                    ticks: {
                        font: {
                            family: "Space Mono"
                        }
                    }
                }
            }
        }
    });

    analisarTendencia(ocorrencias);
}

function mudarPeriodo(periodo, botao) {

    periodoSelecionado = periodo;

    document
        .querySelectorAll(".control-btn")
        .forEach(btn => {
            btn.classList.remove("active");
        });

    botao.classList.add("active");

    let inicio = 0;
    let fim = anos.length;

    if (periodo === "2015-2017") {
        inicio = 0;
        fim = 3;
    }

    if (periodo === "2018-2020") {
        inicio = 3;
        fim = 6;
    }

    if (periodo === "2021-2022") {
        inicio = 6;
        fim = 8;
    }

    const novosAnos = anos.slice(inicio, fim);
    const novosValores = ocorrencias.slice(inicio, fim);
    const novaTendencia = regressaoLinear(novosValores);

    grafico.data.labels = novosAnos;
    grafico.data.datasets[0].data = novosValores;
    grafico.data.datasets[1].data = novaTendencia;

    grafico.update();

    analisarTendencia(novosValores);
}

function analisarTendencia(data) {

    const primeiro = data[0];
    const ultimo = data[data.length - 1];

    const diferenca =
        ((ultimo - primeiro) / primeiro) * 100;

    const resultado =
        document.getElementById("resultadoTendencia");

    const texto =
        document.getElementById("textoTendencia");

    if (!resultado || !texto) return;

    if (diferenca > 5) {

        resultado.textContent =
            "TENDÊNCIA DE CRESCIMENTO";

        texto.textContent =
            `Entre o início e o final do período selecionado,
            os dados apresentam uma variação aproximada de
            ${diferenca.toFixed(1)}%.`;

    } else if (diferenca < -5) {

        resultado.textContent =
            "TENDÊNCIA DE QUEDA";

        texto.textContent =
            `Entre o início e o final do período selecionado,
            os dados apresentam uma redução aproximada de
            ${Math.abs(diferenca).toFixed(1)}%.`;

    } else {

        resultado.textContent =
            "TENDÊNCIA ESTÁVEL";

        texto.textContent =
            'A diferença entre o início e o final do período permanece relativamente pequena.';
    }
}

function alternarTendencia() {

    if (!grafico) return;

    tendenciaAtiva = !tendenciaAtiva;

    grafico.data.datasets[1].hidden =
        !tendenciaAtiva;

    grafico.update();
}


/* ================================
   REGRESSÃO LOGÍSTICA
================================ */

function criarGraficoLogistica() {

    const ctx = document.getElementById("graficoLogistica");
    if (!ctx) return;

    grafico = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [
                "Classificação",
                "Restante"
            ],

            datasets: [{
                data: [0, 100],
                borderWidth: 2
            }]
        },

        options: {

            responsive: true,

            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}

function calcularLogistica() {

    const evidencia = Number(document.getElementById("evidencias")?.value || 0);
    const suspeito = Number(document.getElementById("suspeito")?.value || 0);
    const testemunhas = Number(document.getElementById("testemunhas")?.value || 0);

    let resultado = Math.round((evidencia + suspeito + testemunhas) / 3);
    resultado = Math.max(0, Math.min(100, resultado));

    let classificacao;

    if (resultado >= 70) {
        classificacao = "ALTA CLASSIFICAÇÃO";
    } else if (resultado >= 40) {
        classificacao = "CLASSIFICAÇÃO MODERADA";
    } else {
        classificacao = "BAIXA CLASSIFICAÇÃO";
    }

    document.getElementById("porcentagem").textContent = resultado + "%";
    document.getElementById("classificacao").textContent = classificacao;
    document.getElementById("barraLogistica").style.width = resultado + "%";
    document.getElementById("textoLogistica").textContent =
        "O valor representa uma classificação didática baseada nas características selecionadas.";

    if (grafico) {
        grafico.data.datasets[0].data = [resultado, 100 - resultado];
        grafico.update();
    }
}


/* ================================
   ML SUPERVISIONADO
================================ */

function criarGraficoML() {

    const ctx = document.getElementById("graficoML");
    if (!ctx) return;

    grafico = new Chart(ctx, {

        type: "radar",

        data: {

            labels: [
                "Localização",
                "Período",
                "Tipo"
            ],

            datasets: [{

                label: "Características",
                data: [0, 0, 0],
                borderWidth: 3,
                pointRadius: 5
            }]
        },

        options: {

            responsive: true,

            scales: {

                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

function classificarML() {

    const local = Number(document.getElementById("localML")?.value || 0);
    const periodo = Number(document.getElementById("periodoML")?.value || 0);
    const tipo = Number(document.getElementById("tipoML")?.value || 0);

    const media = Math.round((local + periodo + tipo) / 3);

    let classificacao;

    if (media >= 70) {
        classificacao = "PADRÃO ALTO";
    } else if (media >= 40) {
        classificacao = "PADRÃO MODERADO";
    } else {
        classificacao = "PADRÃO BAIXO";
    }

    document.getElementById("resultadoML").textContent = classificacao;
    document.getElementById("textoML").textContent =
        `O modelo agrupou a ocorrência com base
        nas três características selecionadas.
        Índice demonstrativo: ${media}%.`;

    if (grafico) {
        grafico.data.datasets[0].data = [local, periodo, tipo];
        grafico.update();
    }

    criarBarras(local, periodo, tipo);
}

function criarBarras(local, periodo, tipo) {

    const container = document.getElementById("featureBars");
    if (!container) return;

    container.innerHTML = `

        <div class="feature">

            <div class="feature-top">
                <span>LOCALIZAÇÃO</span>
                <span>${local}%</span>
            </div>

            <div class="feature-track">
                <div
                    class="feature-fill"
                    style="width:${local}%">
                </div>
            </div>

        </div>

        <div class="feature">

            <div class="feature-top">
                <span>PERÍODO</span>
                <span>${periodo}%</span>
            </div>

            <div class="feature-track">
                <div
                    class="feature-fill"
                    style="width:${periodo}%">
                </div>
            </div>

        </div>

        <div class="feature">

            <div class="feature-top">
                <span>TIPO DE OCORRÊNCIA</span>
                <span>${tipo}%</span>
            </div>

            <div class="feature-track">
                <div
                    class="feature-fill"
                    style="width:${tipo}%">
                </div>
            </div>

        </div>
    `;
}


/* ================================
   CASOS
================================ */

function mostrarCaso(caso) {

    let titulo = "";
    let texto = "";

    if (caso === "zodiac") {

        titulo = "ZODIAC KILLER";

        texto = `
            O caso conhecido como Zodiac Killer envolve uma série
            de ataques ocorridos na Califórnia no final da década
            de 1960.

            <br><br>

            A investigação ficou conhecida pela existência de cartas,
            mensagens codificadas e outros elementos utilizados
            durante a investigação.

            <br><br>

            O responsável pelos crimes nunca foi oficialmente
            identificado.
        `;
    }

    if (caso === "unabomber") {

        titulo = "UNABOMBER";

        texto = `
            A investigação do Unabomber foi um longo caso federal
            nos Estados Unidos envolvendo ataques com dispositivos
            explosivos.

            <br><br>

            Durante a investigação foram analisados documentos,
            padrões de comportamento, linguagem e outras evidências.

            <br><br>

            Theodore Kaczynski foi identificado e posteriormente
            preso em 1996.
        `;
    }

    const modal = document.createElement("div");
    modal.className = "case-modal open";

    modal.innerHTML = `

        <div class="modal-box">

            <div class="modal-top">

                <div>
                    <div class="section-label">
                        INVESTIGATION FILE
                    </div>

                    <h2>${titulo}</h2>
                </div>

                <button
                    onclick="this.closest('.case-modal').remove()">
                    ×
                </button>

            </div>

            <p>${texto}</p>

        </div>
    `;

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
}


/* ================================
   FECHAR WORKSPACE
================================ */

function fecharWorkspace() {

    const workspace = document.getElementById("workspace");
    if (workspace) workspace.style.display = "none";

    if (grafico) {
        grafico.destroy();
        grafico = null;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}