/* ============================================================
   POLÍGRAFO — SISTEMA DE INVESTIGAÇÃO
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const investigateBtn = document.getElementById("investigateBtn");
    const intro = document.getElementById("intro");
    const mainContent = document.getElementById("mainContent");
    const answerButtons = document.querySelectorAll(".answer-btn");
    const calculateBtn = document.getElementById("calculateBtn");
    const resultArea = document.getElementById("resultArea");
    const percentage = document.getElementById("percentage");
    const correctCount = document.getElementById("correctCount");
    const wrongCount = document.getElementById("wrongCount");
    const resultMessage = document.getElementById("resultMessage");
    const retryBtn = document.getElementById("retryBtn");

    /* ============================================================
       RESPOSTAS CORRETAS
    ============================================================ */
    const correctAnswers = {
        1: "true",
        2: "true",
        3: "true",
        4: "true",
        5: "true",
        6: "true"
    };

    let userAnswers = {};

    /* ============================================================
       BOTÃO INVESTIGUE (TRANSIÇÃO DA TELA)
    ============================================================ */
    if (investigateBtn) {
        investigateBtn.addEventListener("click", () => {
            intro.style.opacity = "0";
            intro.style.transform = "scale(0.97)";
            intro.style.transition = "opacity .7s ease, transform .7s ease";

            document.body.classList.add("investigating");

            setTimeout(() => {
                intro.classList.add("hidden");
                mainContent.classList.remove("hidden");
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }, 700);
        });
    }

    /* ============================================================
       ESCOLHA DAS RESPOSTAS
    ============================================================ */
    answerButtons.forEach(button => {
        button.addEventListener("click", () => {
            const question = button.dataset.question;
            const answer = button.dataset.answer;

            userAnswers[question] = answer;

            const sameQuestionButtons = document.querySelectorAll(
                `.answer-btn[data-question="${question}"]`
            );

            sameQuestionButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
        });
    });

    /* ============================================================
       CALCULAR RESULTADO
    ============================================================ */
    if (calculateBtn) {
        calculateBtn.addEventListener("click", () => {
            let correct = 0;

            for (let i = 1; i <= 6; i++) {
                if (userAnswers[i] === correctAnswers[i]) {
                    correct++;
                }
            }

            const wrong = 6 - correct;
            const finalPercentage = Math.round((correct / 6) * 100);

            calculateBtn.classList.add("hidden");
            resultArea.classList.remove("hidden");

            resultArea.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            animateNumber(percentage, 0, finalPercentage, 1400, value => `${value}%`);
            animateNumber(correctCount, 0, correct, 900, value => value);
            animateNumber(wrongCount, 0, wrong, 900, value => value);

            if (correct === 6) {
                resultMessage.textContent = "Investigação concluída. Todas as declarações foram identificadas corretamente.";
            } else if (correct >= 4) {
                resultMessage.textContent = "Boa investigação. A maior parte das declarações foi identificada corretamente.";
            } else if (correct >= 2) {
                resultMessage.textContent = "A investigação revelou alguns acertos, mas ainda existem declarações que precisam de uma nova análise.";
            } else {
                resultMessage.textContent = "As evidências indicam que uma nova análise das declarações pode ajudar.";
            }
        });
    }

    /* ============================================================
       ANIMAÇÃO DOS NÚMEROS
    ============================================================ */
    function animateNumber(element, start, end, duration, formatter) {
        if (!element) return;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * eased);

            element.textContent = formatter(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    /* ============================================================
       TENTE DE NOVO
    ============================================================ */
    if (retryBtn) {
        retryBtn.addEventListener("click", () => {
            userAnswers = {};

            answerButtons.forEach(button => button.classList.remove("selected"));

            if (percentage) percentage.textContent = "0%";
            if (correctCount) correctCount.textContent = "0";
            if (wrongCount) wrongCount.textContent = "0";
            if (resultMessage) resultMessage.textContent = "";

            resultArea.classList.add("hidden");
            calculateBtn.classList.remove("hidden");

            const questionsEl = document.getElementById("questions");
            if (questionsEl) {
                questionsEl.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }

    /* ============================================================
       ANIMAÇÃO DAS CARTAS AO ROLAR
    ============================================================ */
    const cards = document.querySelectorAll(".case-card");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.15 }
    );

    cards.forEach(card => observer.observe(card));
});