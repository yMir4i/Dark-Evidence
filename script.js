/* =========================
   ELEMENTOS
========================= */

const openMenu =
    document.getElementById("openMenu");

const closeMenu =
    document.getElementById("closeMenu");

const fileOverlay =
    document.getElementById("fileOverlay");

const pages =
    document.querySelectorAll(".page");

const previousPage =
    document.getElementById("previousPage");

const nextPage =
    document.getElementById("nextPage");

const investigate =
    document.getElementById("investigate");

const evidenceMarks =
    document.querySelectorAll(".evidence-mark");

const customCursor =
    document.getElementById("customCursor");


/* =========================
   LINKS DAS PÁGINAS
========================= */

const investigations = [

    {
        label: "ARQUIVO 01",
        title: "Introdução",
        url: "dossier.html?case=unabomber"
    },

    {
        label: "ARQUIVO 02",
        title: "Evidências",
        url: "evidencias.html"
    },

    {
        label: "ARQUIVO 03",
        title: "Investigação",
        url: "caso.html"
    },

    {
        label: "ARQUIVO 04",
        title: "Conclusão",
        url: "poligrafo.html"
    }

];


/* =========================
   DEFINIÇÃO DA PÁGINA ATUAL
========================= */

// Detecta o índice do arquivo ativo pela URL atual
const currentPath = window.location.pathname;
const detectedIndex = investigations.findIndex(item => item.url && currentPath.endsWith(item.url.split('?')[0]));

// Se estiver na Home (index.html) ou rota não mapeada, define 0 (ARQUIVO 01)
let currentPage = detectedIndex !== -1 ? detectedIndex : 0;


/* =========================
   ATUALIZAR PÁGINA
========================= */

function updatePage(){

    pages.forEach(
        (page,index)=>{

            page.classList.toggle(
                "selected",
                index === currentPage
            );

        }
    );


    evidenceMarks.forEach(
        (mark,index)=>{

            mark.classList.toggle(
                "active",
                index === currentPage
            );

        }
    );


    /* PRIMEIRO ARQUIVO */

    if(currentPage === 0){

        if(previousPage) previousPage.classList.add("hidden");

    }else{

        if(previousPage) previousPage.classList.remove("hidden");

    }


    /* ÚLTIMO ARQUIVO */

    if(
        currentPage ===
        pages.length - 1
    ){

        if(nextPage) nextPage.classList.add("hidden");

    }else{

        if(nextPage) nextPage.classList.remove("hidden");

    }

}


/* =========================
   ABRIR MENU
========================= */

if(openMenu && fileOverlay){

    openMenu.addEventListener(
        "click",
        ()=>{

            fileOverlay.classList.add(
                "active"
            );

            // Mantém a página atual selecionada ao abrir o menu
            updatePage();

        }
    );

}


/* =========================
   FECHAR MENU
========================= */

if(closeMenu && fileOverlay){

    closeMenu.addEventListener(
        "click",
        ()=>{

            fileOverlay.classList.remove(
                "active"
            );

        }
    );

}


/* =========================
   CLICAR FORA DO ARQUIVO
========================= */

if(fileOverlay){

    fileOverlay.addEventListener(
        "click",
        (event)=>{

            if(
                event.target ===
                fileOverlay
            ){

                fileOverlay.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =========================
   ARQUIVO ANTERIOR
========================= */

if(previousPage){

    previousPage.addEventListener(
        "click",
        ()=>{

            if(currentPage > 0){

                currentPage--;

                updatePage();

            }

        }
    );

}


/* =========================
   PRÓXIMO ARQUIVO
========================= */

if(nextPage){

    nextPage.addEventListener(
        "click",
        ()=>{

            if(
                currentPage <
                pages.length - 1
            ){

                currentPage++;

                updatePage();

            }

        }
    );

}


/* =========================
   CLICAR NA FOLHA
========================= */

pages.forEach(
    (page,index)=>{

        page.addEventListener(
            "click",
            ()=>{

                currentPage = index;

                updatePage();

            }
        );

    }
);


/* =========================
   CLICAR NO INDICADOR
========================= */

evidenceMarks.forEach(
    (mark,index)=>{

        mark.addEventListener(
            "click",
            ()=>{

                currentPage = index;

                updatePage();

            }
        );

    }
);


/* =========================
   BOTÃO INVESTIGAR
========================= */

if(investigate){

    investigate.addEventListener(
        "click",
        ()=>{

            const investigation =
                investigations[currentPage];


            if(
                investigation &&
                investigation.url
            ){

                window.location.href =
                    investigation.url;

            }

        }
    );

}


/* =========================
   TECLA ESC
========================= */

document.addEventListener(
    "keydown",
    (event)=>{

        if(event.key === "Escape" && fileOverlay){

            fileOverlay.classList.remove(
                "active"
            );

        }

    }
);


/* =====================================================
   CURSOR — MOVIMENTO
===================================================== */

if (customCursor) {

    document.addEventListener(
        "mousemove",
        (event)=>{

            customCursor.style.left =
                event.clientX + "px";

            customCursor.style.top =
                event.clientY + "px";

        }
    );


    /* =====================================================
       CURSOR — SALTO + 360° 3D
    ===================================================== */

    document.addEventListener(
        "click",
        ()=>{

            customCursor.classList.remove(
                "spin"
            );

            void customCursor.offsetWidth;

            customCursor.classList.add(
                "spin"
            );

        }
    );


    /* =========================
       FINAL DA ANIMAÇÃO
    ========================= */

    customCursor.addEventListener(
        "animationend",
        ()=>{

            customCursor.classList.remove(
                "spin"
            );

        }
    );

}


/* =========================
   INICIALIZAÇÃO
========================= */

updatePage();