// ============================================================
// CÓDIGO OCULTO — SCRIPT PRINCIPAL
// ============================================================
// IMPORTANTE:
// Os registros abaixo são DEMONSTRATIVOS.
// Eles existem para permitir a visualização dos métodos
// estatísticos e de agrupamento no ambiente educacional.
// ============================================================


// ============================================================
// CONFIGURAÇÃO DOS DADOS
// ============================================================

const countries = [
    "Estados Unidos",
    "Canadá",
    "Reino Unido",
    "França",
    "Alemanha",
    "Austrália"
];

const decades = [
    1970,
    1980,
    1990,
    2000,
    2010,
    2020
];

const types = [
    "desaparecimento",
    "homicidio",
    "outro"
];


// ============================================================
// POSIÇÕES BASE DOS PAÍSES NO MAPA DE AGRUPAMENTOS
// ============================================================

const countryPositions = {
    "Estados Unidos": { x: 18, y: 28 },
    "Canadá":         { x: 28, y: 42 },
    "Reino Unido":    { x: 48, y: 28 },
    "França":         { x: 55, y: 48 },
    "Alemanha":       { x: 68, y: 34 },
    "Austrália":      { x: 78, y: 70 }
};


// ============================================================
// DESLOCAMENTOS DOS TIPOS
// ============================================================

const typeOffsets = {
    "desaparecimento": { x: -5, y: -5 },
    "homicidio":       { x: 0,  y: 5 },
    "outro":           { x: 5,  y: -2 }
};


// ============================================================
// NOMES DEMONSTRATIVOS
// ============================================================

const namePrefixes = {
    "Estados Unidos": ["Arquivo Atlântico", "Registro Nevada", "Dossiê Continental"],
    "Canadá": ["Arquivo Boreal", "Registro Norte", "Dossiê Yukon"],
    "Reino Unido": ["Arquivo Londres", "Registro Britânico", "Dossiê Albion"],
    "França": ["Arquivo Paris", "Registro Alpino", "Dossiê Loire"],
    "Alemanha": ["Arquivo Berlim", "Registro Renano", "Dossiê Hamburgo"],
    "Austrália": ["Arquivo Austral", "Registro Oceânico", "Dossiê Sydney"]
};

const descriptions = {
    "desaparecimento":
        "Registro demonstrativo relacionado a um desaparecimento dentro do conjunto analisado.",

    "homicidio":
        "Registro demonstrativo classificado como homicídio para fins de análise estatística.",

    "outro":
        "Registro demonstrativo pertencente a uma categoria complementar do conjunto."
};


// ============================================================
// GERADOR DA BASE DE DADOS
// ============================================================

function generateCases() {

    const generated = [];
    let counter = 101;

    countries.forEach((country, countryIndex) => {

        decades.forEach((decade, decadeIndex) => {

            types.forEach((type, typeIndex) => {

                const yearOffsets = [1, 5, 8];

                const year =
                    decade +
                    yearOffsets[typeIndex];

                const base =
                    countryPositions[country];

                const offset =
                    typeOffsets[type];

                const decadeX =
                    Math.sin(decadeIndex * 1.7 + countryIndex) * 7;

                const decadeY =
                    Math.cos(decadeIndex * 1.4 + countryIndex) * 7;

                let x =
                    base.x +
                    offset.x +
                    decadeX;

                let y =
                    base.y +
                    offset.y +
                    decadeY;

                x = Math.max(7, Math.min(93, x));
                y = Math.max(8, Math.min(92, y));

                const prefix =
                    namePrefixes[country][typeIndex];

                const number =
                    String(counter).padStart(3, "0");

                generated.push({

                    id: `CASO-${number}`,

                    name:
                        `${prefix} ${decade}`,

                    type: type,

                    country: country,

                    year: year,

                    cluster:
                        ((countryIndex + typeIndex) % 4) + 1,

                    x: x,

                    y: y,

                    desc:
                        `${descriptions[type]} País: ${country}. Década: ${decade}.`

                });

                counter++;
            });
        });
    });

    return generated;
}


// ============================================================
// BASE COMPLETA
// ============================================================

const casesData = generateCases();


// ============================================================
// ESTADO DO SITE
// ============================================================

let activeFilter = "all";
let selectedCountry = "all";
let selectedDecade = "all";

let activeCase = null;

let currentStream = null;

let clusterCanvas = null;
let clusterCtx = null;

let timeCanvas = null;
let timeCtx = null;


// ============================================================
// INICIALIZAÇÃO DO CURSOR DE LUPA 3D
// ============================================================

function initCustomCursor() {
    const customCursor = document.getElementById("customCursor");
    if (!customCursor) return;

    document.addEventListener("mousemove", (event) => {
        customCursor.style.left = event.clientX + "px";
        customCursor.style.top = event.clientY + "px";
    });

    document.addEventListener("click", () => {
        customCursor.classList.remove("spin");
        void customCursor.offsetWidth; // Força reflow no navegador
        customCursor.classList.add("spin");
    });

    customCursor.addEventListener("animationend", () => {
        customCursor.classList.remove("spin");
    });
}


// ============================================================
// LÓGICA DO MENU DE ARQUIVOS (PASTA OVERLAY)
// ============================================================

function initFileFolderMenu() {
    const openMenu = document.getElementById("openMenu");
    const closeMenu = document.getElementById("closeMenu");
    const fileOverlay = document.getElementById("fileOverlay");
    const pages = document.querySelectorAll(".file-folder .page");
    const evidenceMarks = document.querySelectorAll(".file-folder .evidence-mark");
    const prevBtn = document.getElementById("previousPage");
    const nextBtn = document.getElementById("nextPage");
    const investigateBtn = document.getElementById("investigate");

    let currentPage = 2; // Começa selecionado no Arquivo 03 (Caso Oculto)
    const caseUrls = [
        "dossier.html?case=unabomber",
        "evidencias.html",
        "caso.html",
        "poligrafo.html"
    ];

    function updatePages() {
        pages.forEach((page, index) => {
            page.classList.toggle("selected", index === currentPage);
        });
        evidenceMarks.forEach((mark, index) => {
            mark.classList.toggle("active", index === currentPage);
        });

        if (prevBtn) prevBtn.classList.toggle("hidden", currentPage === 0);
        if (nextBtn) nextBtn.classList.toggle("hidden", currentPage === pages.length - 1);
    }

    if (openMenu && fileOverlay) {
        openMenu.addEventListener("click", () => {
            fileOverlay.classList.add("active");
            updatePages();
        });
    }

    if (closeMenu && fileOverlay) {
        closeMenu.addEventListener("click", () => {
            fileOverlay.classList.remove("active");
        });
    }

    if (fileOverlay) {
        fileOverlay.addEventListener("click", (e) => {
            if (e.target === fileOverlay) fileOverlay.classList.remove("active");
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentPage > 0) {
                currentPage--;
                updatePages();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentPage < pages.length - 1) {
                currentPage++;
                updatePages();
            }
        });
    }

    pages.forEach((page, index) => {
        page.addEventListener("click", () => {
            currentPage = index;
            updatePages();
        });
    });

    evidenceMarks.forEach((mark, index) => {
        mark.addEventListener("click", () => {
            currentPage = index;
            updatePages();
        });
    });

    if (investigateBtn) {
        investigateBtn.addEventListener("click", () => {
            if (caseUrls[currentPage]) {
                window.location.href = caseUrls[currentPage];
            }
        });
    }
}


// ============================================================
// INICIALIZAÇÃO GERAL
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

    initCustomCursor();

    initFileFolderMenu();

    initParticles();

    initControls();

    initCharts();

    renderCases();

    updateStats();

    initMethods();

    initScanner();

});


// ============================================================
// BOTÕES DE NAVEGAÇÃO
// ============================================================

document.querySelectorAll("[data-scroll]").forEach(button => {

    button.addEventListener("click", () => {

        const targetId =
            button.getAttribute("data-scroll");

        const target =
            document.getElementById(targetId);

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ============================================================
// TOAST
// ============================================================

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


// ============================================================
// PARTÍCULAS DO FUNDO
// ============================================================

function initParticles() {

    const canvas =
        document.getElementById("particles");

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    let width =
        canvas.width =
        window.innerWidth;

    let height =
        canvas.height =
        window.innerHeight;


    window.addEventListener("resize", () => {

        width =
            canvas.width =
            window.innerWidth;

        height =
            canvas.height =
            window.innerHeight;

    });


    const dots =
        Array.from({ length: 45 }, () => ({

            x: Math.random() * width,

            y: Math.random() * height,

            r: Math.random() * 1.5 + 0.5,

            vx: (Math.random() - 0.5) * 0.3,

            vy: (Math.random() - 0.5) * 0.3

        }));


    function loop() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        ctx.fillStyle =
            "#C1914F";


        dots.forEach(dot => {

            dot.x += dot.vx;

            dot.y += dot.vy;


            if (dot.x < 0)
                dot.x = width;

            if (dot.x > width)
                dot.x = 0;

            if (dot.y < 0)
                dot.y = height;

            if (dot.y > height)
                dot.y = 0;


            ctx.beginPath();

            ctx.arc(
                dot.x,
                dot.y,
                dot.r,
                0,
                Math.PI * 2
            );

            ctx.fill();

        });


        requestAnimationFrame(loop);

    }

    loop();

}


// ============================================================
// CONTROLES
// ============================================================

function initControls() {

    document
        .querySelectorAll(".filter")
        .forEach(button => {

            button.addEventListener("click", event => {

                document
                    .querySelectorAll(".filter")
                    .forEach(btn => {

                        btn.classList.remove("active");

                    });


                event.currentTarget
                    .classList.add("active");


                activeFilter =
                    event.currentTarget
                        .getAttribute("data-filter");


                applyFilters();

            });

        });


    const countrySelect =
        document.getElementById("country");


    if (countrySelect) {

        countrySelect.addEventListener(
            "change",
            event => {

                selectedCountry =
                    event.target.value;

                applyFilters();

            }
        );

    }


    const decadeSelect =
        document.getElementById("decade");


    if (decadeSelect) {

        decadeSelect.addEventListener(
            "change",
            event => {

                selectedDecade =
                    event.target.value;

                applyFilters();

            }
        );

    }


    const randomize =
        document.getElementById("randomize");


    if (randomize) {

        randomize.addEventListener(
            "click",
            () => {

                casesData.forEach(c => {

                    c.x =
                        Math.max(
                            7,
                            Math.min(
                                93,
                                c.x +
                                (Math.random() * 12 - 6)
                            )
                        );


                    c.y =
                        Math.max(
                            7,
                            Math.min(
                                93,
                                c.y +
                                (Math.random() * 12 - 6)
                            )
                        );

                });


                drawClusterMap();

                showToast(
                    "Matriz de agrupamentos recalculada."
                );

            }
        );

    }

}


// ============================================================
// FILTRAGEM
// ============================================================

function filterData() {

    return casesData.filter(c => {

        const matchType =
            activeFilter === "all" ||
            c.type === activeFilter;


        const matchCountry =
            selectedCountry === "all" ||
            c.country === selectedCountry;


        let matchDecade = true;


        if (selectedDecade !== "all") {

            const decade =
                parseInt(selectedDecade);

            matchDecade =
                c.year >= decade &&
                c.year < decade + 10;

        }


        return (
            matchType &&
            matchCountry &&
            matchDecade
        );

    });

}


// ============================================================
// APLICAR FILTROS
// ============================================================

function applyFilters() {

    renderCases();

    updateStats();

    drawClusterMap();

    drawTimeline();

}


// ============================================================
// CARDS DOS CASOS
// ============================================================

function renderCases() {

    const grid =
        document.getElementById("caseGrid");

    if (!grid) return;


    grid.innerHTML = "";


    const list =
        filterData();


    if (list.length === 0) {

        grid.innerHTML = `
            <div
                style="
                    grid-column:1/-1;
                    text-align:center;
                    padding:30px;
                    color:#87766B;
                    font-size:11px;
                "
            >
                Nenhum registro encontrado com estes filtros.
            </div>
        `;

        return;

    }


    list.forEach(c => {

        const card =
            document.createElement("div");


        card.className =
            `case ${
                activeCase &&
                activeCase.id === c.id
                    ? "selected"
                    : ""
            }`;


        card.innerHTML = `

            <span class="tag">
                ${c.type.toUpperCase()}
            </span>

            <b>
                ${c.name}
            </b>

            <small>
                ${c.country} • ${c.year}
            </small>

        `;


        card.addEventListener(
            "click",
            () => selectCase(c)
        );


        grid.appendChild(card);

    });

}


// ============================================================
// SELECIONAR CASO
// ============================================================

function selectCase(c) {

    activeCase = c;

    renderCases();

    drawClusterMap();

    drawTimeline();


    const info =
        document.getElementById("clusterInfo");


    if (info) {

        info.innerHTML = `

            <strong>
                ${c.id}: ${c.name}
            </strong>

            <br>

            ${c.country},
            ${c.year}.
            ${c.desc}

        `;

    }

}


// ============================================================
// ESTATÍSTICAS
// ============================================================

function updateStats() {

    const list =
        filterData();


    const caseCount =
        document.getElementById("caseCount");


    const clusterCount =
        document.getElementById("clusterCount");


    const period =
        document.getElementById("period");


    if (caseCount) {

        caseCount.innerText =
            list.length;

    }


    if (clusterCount) {

        const clusters =
            new Set(
                list.map(c => c.cluster)
            );


        clusterCount.innerText =
            clusters.size;

    }


    if (period) {

        if (list.length === 0) {

            period.innerText =
                "—";

        } else {

            const years =
                list.map(c => c.year);


            period.innerText =
                `${Math.min(...years)} - ${Math.max(...years)}`;

        }

    }

}


// ============================================================
// INICIALIZAR CANVAS
// ============================================================

function initCharts() {

    clusterCanvas =
        document.getElementById("clusterCanvas");

    timeCanvas =
        document.getElementById("timeCanvas");


    // ========================================================
    // MAPA DE AGRUPAMENTOS
    // ========================================================

    if (clusterCanvas) {

        clusterCtx =
            clusterCanvas.getContext("2d");

        clusterCanvas.width = 600;
        clusterCanvas.height = 300;


        clusterCanvas.addEventListener(
            "click",
            event => {

                const rect =
                    clusterCanvas.getBoundingClientRect();


                const clickX =
                    (
                        (event.clientX - rect.left) /
                        rect.width
                    ) * 100;


                const clickY =
                    (
                        (event.clientY - rect.top) /
                        rect.height
                    ) * 100;


                let closest = null;
                let minDistance = Infinity;


                filterData().forEach(c => {

                    const distance =
                        Math.hypot(
                            c.x - clickX,
                            c.y - clickY
                        );


                    if (
                        distance < minDistance &&
                        distance < 5
                    ) {

                        minDistance = distance;
                        closest = c;

                    }

                });


                if (closest) {

                    selectCase(closest);

                }

            }
        );

    }


    // ========================================================
    // SÉRIE TEMPORAL
    // ========================================================

    if (timeCanvas) {

        timeCtx =
            timeCanvas.getContext("2d");

        timeCanvas.width = 400;
        timeCanvas.height = 300;


        timeCanvas.addEventListener(
            "click",
            event => {

                const list =
                    filterData();


                if (list.length === 0) return;


                const rect =
                    timeCanvas.getBoundingClientRect();


                const mouseX =
                    (
                        (event.clientX - rect.left) /
                        rect.width
                    ) * timeCanvas.width;


                const mouseY =
                    (
                        (event.clientY - rect.top) /
                        rect.height
                    ) * timeCanvas.height;


                const years =
                    [...new Set(
                        list.map(c => c.year)
                    )].sort(
                        (a, b) => a - b
                    );


                if (years.length === 0) return;


                const left = 35;
                const right = 15;
                const top = 25;
                const bottom = 45;


                const graphWidth =
                    timeCanvas.width -
                    left -
                    right;


                const graphHeight =
                    timeCanvas.height -
                    top -
                    bottom;


                const minYear =
                    Math.min(...years);


                const maxYear =
                    Math.max(...years);


                const yearlyCounts = {};


                list.forEach(c => {

                    if (!yearlyCounts[c.year]) {

                        yearlyCounts[c.year] = 0;

                    }

                    yearlyCounts[c.year]++;

                });


                const maxCount =
                    Math.max(
                        ...years.map(
                            year =>
                                yearlyCounts[year]
                        )
                    );


                function getX(year) {

                    if (maxYear === minYear) {

                        return left +
                            graphWidth / 2;

                    }


                    return (
                        left +
                        (
                            (year - minYear) /
                            (maxYear - minYear)
                        ) *
                        graphWidth
                    );

                }


                function getY(count) {

                    if (maxCount === 0) {

                        return timeCanvas.height -
                            bottom;

                    }


                    return (
                        top +
                        graphHeight -
                        (
                            count / maxCount
                        ) *
                        graphHeight
                    );

                }


                let closestYear = null;
                let closestDistance = Infinity;


                years.forEach(year => {

                    const x =
                        getX(year);


                    const y =
                        getY(
                            yearlyCounts[year]
                        );


                    const distance =
                        Math.hypot(
                            mouseX - x,
                            mouseY - y
                        );


                    if (
                        distance <
                            closestDistance &&
                        distance < 18
                    ) {

                        closestDistance =
                            distance;

                        closestYear =
                            year;

                    }

                });


                if (closestYear !== null) {

                    const casesOfYear =
                        list.filter(
                            c =>
                                c.year ===
                                closestYear
                        );


                    if (casesOfYear.length > 0) {

                        activeCase =
                            casesOfYear[0];


                        renderCases();


                        drawClusterMap();


                        drawTimeline();


                        const info =
                            document.getElementById(
                                "clusterInfo"
                            );


                        if (info) {

                            info.innerHTML = `

                                <strong>
                                    ${closestYear}
                                </strong>

                                <br>

                                ${casesOfYear.length}
                                registro(s) neste ano.

                                <br><br>

                                ${casesOfYear
                                    .map(
                                        c =>
                                            `• ${c.name} — ${c.country}`
                                    )
                                    .join("<br>")}

                            `;

                        }

                    }

                }

            }
        );


        timeCanvas.addEventListener(
            "mousemove",
            event => {

                const list =
                    filterData();


                if (list.length === 0) {
                    return;
                }


                const rect =
                    timeCanvas.getBoundingClientRect();


                const mouseX =
                    (
                        (event.clientX - rect.left) /
                        rect.width
                    ) * timeCanvas.width;


                const mouseY =
                    (
                        (event.clientY - rect.top) /
                        rect.height
                    ) * timeCanvas.height;


                const years =
                    [...new Set(
                        list.map(c => c.year)
                    )].sort(
                        (a, b) => a - b
                    );


                const left = 35;
                const right = 15;
                const top = 25;
                const bottom = 45;


                const graphWidth =
                    timeCanvas.width -
                    left -
                    right;


                const graphHeight =
                    timeCanvas.height -
                    top -
                    bottom;


                const minYear =
                    Math.min(...years);


                const maxYear =
                    Math.max(...years);


                const yearlyCounts = {};


                list.forEach(c => {

                    if (!yearlyCounts[c.year]) {

                        yearlyCounts[c.year] = 0;

                    }

                    yearlyCounts[c.year]++;

                });


                const maxCount =
                    Math.max(
                        ...years.map(
                            year =>
                                yearlyCounts[year]
                        )
                    );


                function getX(year) {

                    if (maxYear === minYear) {

                        return left +
                            graphWidth / 2;

                    }


                    return (
                        left +
                        (
                            (year - minYear) /
                            (maxYear - minYear)
                        ) *
                        graphWidth
                    );

                }


                function getY(count) {

                    if (maxCount === 0) {

                        return timeCanvas.height -
                            bottom;

                    }


                    return (
                        top +
                        graphHeight -
                        (
                            count / maxCount
                        ) *
                        graphHeight
                    );

                }


                let hovering = false;


                years.forEach(year => {

                    const x =
                        getX(year);


                    const y =
                        getY(
                            yearlyCounts[year]
                        );


                    const distance =
                        Math.hypot(
                            mouseX - x,
                            mouseY - y
                        );


                    if (distance < 15) {

                        hovering = true;

                    }

                });


                drawTimeline(
                    hovering
                        ? {
                            mouseX,
                            mouseY
                        }
                        : null
                );

            }
        );


        timeCanvas.addEventListener(
            "mouseleave",
            () => {

                drawTimeline();

            }
        );

    }


    drawClusterMap();

    drawTimeline();

}

function drawClusterMap() {

    if (!clusterCtx) return;


    const w =
        clusterCanvas.width;

    const h =
        clusterCanvas.height;


    clusterCtx.clearRect(
        0,
        0,
        w,
        h
    );


    clusterCtx.strokeStyle =
        "rgba(193,145,79,0.08)";

    clusterCtx.lineWidth = 1;


    for (
        let x = 0;
        x <= w;
        x += 40
    ) {

        clusterCtx.beginPath();

        clusterCtx.moveTo(
            x,
            0
        );

        clusterCtx.lineTo(
            x,
            h
        );

        clusterCtx.stroke();

    }


    for (
        let y = 0;
        y <= h;
        y += 40
    ) {

        clusterCtx.beginPath();

        clusterCtx.moveTo(
            0,
            y
        );

        clusterCtx.lineTo(
            w,
            y
        );

        clusterCtx.stroke();

    }


    const list =
        filterData();


    if (list.length === 0) {

        clusterCtx.fillStyle =
            "#9E8D7C";

        clusterCtx.font =
            "12px Arial";

        clusterCtx.textAlign =
            "center";

        clusterCtx.fillText(
            "Nenhum registro para este filtro",
            w / 2,
            h / 2
        );

        return;

    }


    const clusters = {};


    list.forEach(c => {

        if (!clusters[c.cluster]) {

            clusters[c.cluster] = [];

        }

        clusters[c.cluster].push(c);

    });


    Object.keys(clusters).forEach(clusterId => {

        const points =
            clusters[clusterId];


        const avgX =
            points.reduce(
                (sum, c) => sum + c.x,
                0
            ) / points.length;


        const avgY =
            points.reduce(
                (sum, c) => sum + c.y,
                0
            ) / points.length;


        const cx =
            (avgX / 100) * w;


        const cy =
            (avgY / 100) * h;


        const radius =
            Math.min(
                85,
                35 +
                points.length * 1.5
            );


        clusterCtx.beginPath();

        clusterCtx.arc(
            cx,
            cy,
            radius,
            0,
            Math.PI * 2
        );


        clusterCtx.strokeStyle =
            "rgba(193,145,79,0.15)";

        clusterCtx.lineWidth = 1;

        clusterCtx.stroke();


        clusterCtx.fillStyle =
            "rgba(193,145,79,0.55)";

        clusterCtx.font =
            "9px Arial";

        clusterCtx.textAlign =
            "center";


        clusterCtx.fillText(
            `GRUPO ${clusterId}`,
            cx,
            cy - radius - 5
        );

    });


    list.forEach(c => {

        const px =
            (c.x / 100) * w;


        const py =
            (c.y / 100) * h;


        const selected =
            activeCase &&
            activeCase.id === c.id;


        const clusterPoints =
            clusters[c.cluster];


        const avgX =
            clusterPoints.reduce(
                (sum, item) =>
                    sum + item.x,
                0
            ) / clusterPoints.length;


        const avgY =
            clusterPoints.reduce(
                (sum, item) =>
                    sum + item.y,
                0
            ) / clusterPoints.length;


        clusterCtx.beginPath();

        clusterCtx.moveTo(
            px,
            py
        );

        clusterCtx.lineTo(
            (avgX / 100) * w,
            (avgY / 100) * h
        );


        clusterCtx.strokeStyle =
            "rgba(193,145,79,0.08)";

        clusterCtx.lineWidth = 1;

        clusterCtx.stroke();


        clusterCtx.beginPath();

        clusterCtx.arc(
            px,
            py,
            selected ? 7 : 4,
            0,
            Math.PI * 2
        );


        if (c.type === "desaparecimento") {

            clusterCtx.fillStyle =
                "#C1914F";

        } else if (
            c.type === "homicidio"
        ) {

            clusterCtx.fillStyle =
                "#9C4B55";

        } else {

            clusterCtx.fillStyle =
                "#EAD8BD";

        }


        clusterCtx.fill();


        if (selected) {

            clusterCtx.beginPath();

            clusterCtx.arc(
                px,
                py,
                11,
                0,
                Math.PI * 2
            );


            clusterCtx.strokeStyle =
                "#EAD8BD";

            clusterCtx.lineWidth = 2;

            clusterCtx.stroke();

        }

    });


    clusterCtx.textAlign =
        "left";


    clusterCtx.font =
        "8px Arial";


    clusterCtx.fillStyle =
        "rgba(234,216,189,0.65)";


    clusterCtx.fillText(
        "● DESAPARECIMENTO",
        12,
        h - 28
    );


    clusterCtx.fillStyle =
        "rgba(156,75,85,0.9)";


    clusterCtx.fillText(
        "● HOMICÍDIO",
        145,
        h - 28
    );


    clusterCtx.fillStyle =
        "rgba(234,216,189,0.8)";


    clusterCtx.fillText(
        "● OUTRO",
        230,
        h - 28
    );

}


// ============================================================
// SÉRIE TEMPORAL
// ============================================================

function drawTimeline() {

    if (!timeCtx) return;


    const w =
        timeCanvas.width;

    const h =
        timeCanvas.height;


    timeCtx.clearRect(
        0,
        0,
        w,
        h
    );


    const list =
        filterData();


    if (list.length === 0) {

        timeCtx.fillStyle =
            "#9E8D7C";

        timeCtx.font =
            "11px Arial";

        timeCtx.textAlign =
            "center";

        timeCtx.fillText(
            "Nenhum registro para este filtro",
            w / 2,
            h / 2
        );

        return;

    }


    const yearlyCounts = {};


    list.forEach(c => {

        if (!yearlyCounts[c.year]) {

            yearlyCounts[c.year] = 0;

        }

        yearlyCounts[c.year]++;

    });


    const years =
        Object.keys(yearlyCounts)
            .map(Number)
            .sort((a, b) => a - b);


    if (years.length === 0) return;


    const minYear =
        Math.min(...years);


    const maxYear =
        Math.max(...years);


    const maxCount =
        Math.max(
            ...years.map(
                year =>
                    yearlyCounts[year]
            )
        );


    const left =
        35;

    const right =
        15;

    const top =
        25;

    const bottom =
        45;


    const graphWidth =
        w - left - right;


    const graphHeight =
        h - top - bottom;


    timeCtx.lineWidth = 1;

    timeCtx.strokeStyle =
        "rgba(193,145,79,0.10)";


    const gridLines =
        Math.max(
            1,
            Math.min(
                5,
                maxCount
            )
        );


    for (
        let i = 0;
        i <= gridLines;
        i++
    ) {

        const y =
            top +
            graphHeight -
            (
                i / gridLines
            ) *
            graphHeight;


        timeCtx.beginPath();

        timeCtx.moveTo(
            left,
            y
        );

        timeCtx.lineTo(
            w - right,
            y
        );

        timeCtx.stroke();


        timeCtx.fillStyle =
            "rgba(234,216,189,0.5)";

        timeCtx.font =
            "8px Arial";

        timeCtx.textAlign =
            "right";


        const value =
            Math.round(
                (i / gridLines) *
                maxCount
            );


        timeCtx.fillText(
            value,
            left - 7,
            y + 3
        );

    }


    timeCtx.beginPath();

    timeCtx.strokeStyle =
        "rgba(193,145,79,0.35)";

    timeCtx.moveTo(
        left,
        top
    );

    timeCtx.lineTo(
        left,
        h - bottom
    );

    timeCtx.lineTo(
        w - right,
        h - bottom
    );

    timeCtx.stroke();


    function getX(year) {

        if (maxYear === minYear) {

            return left +
                graphWidth / 2;

        }


        return (
            left +
            (
                (year - minYear) /
                (maxYear - minYear)
            ) *
            graphWidth
        );

    }


    function getY(count) {

        if (maxCount === 0) {

            return h - bottom;

        }


        return (
            top +
            graphHeight -
            (
                count / maxCount
            ) *
            graphHeight
        );

    }


    timeCtx.beginPath();


    years.forEach(
        (year, index) => {

            const x =
                getX(year);

            const y =
                getY(
                    yearlyCounts[year]
                );


            if (index === 0) {

                timeCtx.moveTo(
                    x,
                    y
                );

            } else {

                timeCtx.lineTo(
                    x,
                    y
                );

            }

        }
    );


    timeCtx.strokeStyle =
        "#C1914F";

    timeCtx.lineWidth = 2;

    timeCtx.stroke();


    years.forEach(year => {

        const x =
            getX(year);


        const y =
            getY(
                yearlyCounts[year]
            );


        timeCtx.beginPath();

        timeCtx.arc(
            x,
            y,
            4,
            0,
            Math.PI * 2
        );


        timeCtx.fillStyle =
            "#EAD8BD";

        timeCtx.fill();


        timeCtx.fillStyle =
            "rgba(234,216,189,0.75)";

        timeCtx.font =
            "8px Arial";

        timeCtx.textAlign =
            "center";


        timeCtx.fillText(
            yearlyCounts[year],
            x,
            y - 9
        );

    });


    const labelStep =
        Math.max(
            1,
            Math.ceil(
                years.length / 6
            )
        );


    years.forEach(
        (year, index) => {

            if (
                index % labelStep !== 0 &&
                index !== years.length - 1
            ) {
                return;
            }


            const x =
                getX(year);


            timeCtx.fillStyle =
                "rgba(234,216,189,0.65)";


            timeCtx.font =
                "8px Arial";

            timeCtx.textAlign =
                "center";


            timeCtx.fillText(
                year,
                x,
                h - 25
            );

        }
    );


    timeCtx.fillStyle =
        "rgba(193,145,79,0.7)";

    timeCtx.font =
        "8px Arial";

    timeCtx.textAlign =
        "left";


    timeCtx.fillText(
        "OCORRÊNCIAS",
        5,
        15
    );


    timeCtx.textAlign =
        "right";


    timeCtx.fillText(
        "ANO",
        w - 5,
        h - 8
    );

}


// ============================================================
// MÉTODOS
// ============================================================

function initMethods() {

    document
        .querySelectorAll(".method-card")
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const method =
                        card.getAttribute(
                            "data-method"
                        );


                    const output =
                        document.getElementById(
                            "methodOutput"
                        );


                    if (!output) return;


                    if (method === "cluster") {

                        output.innerHTML = `

                            <strong>
                                Demonstração:
                                ML Não Supervisionado
                            </strong>

                            <br>

                            O agrupamento organiza os registros
                            segundo características semelhantes,
                            permitindo visualizar conjuntos
                            de casos que apresentam padrões
                            próximos entre si.

                        `;

                    }


                    else if (
                        method === "factor"
                    ) {

                        output.innerHTML = `

                            <strong>
                                Demonstração:
                                Análise Fatorial
                            </strong>

                            <br>

                            A demonstração reduz a complexidade
                            dos atributos observados para facilitar
                            a identificação de relações e padrões
                            entre localização, frequência e tipologia.

                        `;

                    }


                    else if (
                        method === "time"
                    ) {

                        output.innerHTML = `

                            <strong>
                                Demonstração:
                                Séries Temporais
                            </strong>

                            <br>

                            A série organiza os registros
                            cronologicamente para observar como
                            a quantidade de ocorrências varia
                            ao longo dos anos e décadas analisadas.

                        `;

                    }

                }
            );

        });

}


// ============================================================
// SCANNER
// ============================================================

function initScanner() {

    const scannerButton =
        document.getElementById(
            "scannerButton"
        );


    const scannerModal =
        document.getElementById(
            "scannerModal"
        );


    const closeScanner =
        document.getElementById(
            "closeScanner"
        );


    const cameraStart =
        document.getElementById(
            "cameraStart"
        );


    if (scannerButton) {

        scannerButton.addEventListener(
            "click",
            () => {

                if (scannerModal) {

                    scannerModal.classList.add(
                        "open"
                    );

                }

            }
        );

    }


    if (closeScanner) {

        closeScanner.addEventListener(
            "click",
            () => {

                stopCamera();

                if (scannerModal) {

                    scannerModal.classList.remove(
                        "open"
                    );

                }

            }
        );

    }


    if (cameraStart) {

        cameraStart.addEventListener(
            "click",
            startCamera
        );

    }

}


// ============================================================
// CÂMERA
// ============================================================

async function startCamera() {

    const video =
        document.getElementById(
            "video"
        );


    const scanStatus =
        document.getElementById(
            "scanStatus"
        );


    const cameraMessage =
        document.getElementById(
            "cameraMessage"
        );


    const cameraStart =
        document.getElementById(
            "cameraStart"
        );


    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        if (cameraMessage) {

            cameraMessage.innerText =
                "Navegador não suporta acesso à câmera.";

        }

        return;

    }


    try {

        if (scanStatus) {

            scanStatus.innerText =
                "SOLICITANDO PERMISSÃO...";

        }


        const stream =
            await navigator.mediaDevices.getUserMedia({

                video: {

                    width: {
                        ideal: 1280
                    },

                    height: {
                        ideal: 720
                    },

                    facingMode: "user"

                },

                audio: false

            });


        currentStream =
            stream;


        if (video) {

            video.srcObject =
                stream;

        }


        if (scanStatus) {

            scanStatus.innerText =
                "SCANNER ATIVO (1920s)";

        }


        if (cameraMessage) {

            cameraMessage.innerText =
                "Filtro visual dos Anos 1920 ativado.";

        }


        if (cameraStart) {

            cameraStart.style.display =
                "none";

        }


        showToast(
            "Câmera ativada com o filtro dos anos 1920!"
        );

    }

    catch (error) {

        console.error(
            "Erro ao ativar câmera:",
            error
        );


        if (scanStatus) {

            scanStatus.innerText =
                "ERRO DE ACESSO";

        }


        if (cameraMessage) {

            cameraMessage.innerText =
                "Permissão negada ou dispositivo indisponível.";

        }


        showToast(
            "Não foi possível conectar à câmera."
        );

    }

}


// ============================================================
// PARAR CÂMERA
// ============================================================

function stopCamera() {

    const video =
        document.getElementById(
            "video"
        );


    const scanStatus =
        document.getElementById(
            "scanStatus"
        );


    const cameraStart =
        document.getElementById(
            "cameraStart"
        );


    if (currentStream) {

        currentStream
            .getTracks()
            .forEach(track => {

                track.stop();

            });


        currentStream = null;

    }


    if (video) {

        video.srcObject = null;

    }


    if (scanStatus) {

        scanStatus.innerText =
            "AGUARDANDO CÂMERA";

    }


    if (cameraStart) {

        cameraStart.style.display =
            "inline-block";

    }

}