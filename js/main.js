// =========================================================
// MAIN.JS
// Responsável pelos comportamentos gerais da interface
// =========================================================


// =========================================================
// MENU RESPONSIVO
// =========================================================

const menuToggle = document.getElementById("menuToggle");
const menuLista = document.getElementById("menuLista");

if (menuToggle && menuLista) {

    menuToggle.addEventListener("click", function () {

        const menuAberto = menuLista.classList.toggle("ativo");

        menuToggle.setAttribute(
            "aria-expanded",
            menuAberto
        );

        menuToggle.setAttribute(
            "aria-label",
            menuAberto
                ? "Fechar menu"
                : "Abrir menu"
        );

    });


    // Fecha o menu ao clicar em um link

    menuLista.addEventListener("click", function (evento) {

        const link = evento.target.closest("a");

        if (!link) {
            return;
        }

        menuLista.classList.remove("ativo");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menu"
        );

    });

}


// =========================================================
// TOAST
// =========================================================

function mostrarToast(mensagem) {

    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = mensagem;

    toast.classList.add("ativo");

    setTimeout(function () {

        toast.classList.remove("ativo");

    }, 3000);

}


// =========================================================
// EXPOSIÇÃO DA FUNÇÃO
// Permite que outros arquivos JavaScript utilizem o toast.
// =========================================================

window.mostrarToast = mostrarToast;


// =========================================================
// LOG DE TESTE
// =========================================================

console.log("main.js carregado com sucesso.");