// =========================================================
// CADASTRO.JS
// Validação, máscaras e interação do formulário
// =========================================================

const form = document.getElementById("formCadastro");

if (form) {

    const area = document.getElementById("area");
    const badgeArea = document.getElementById("badgeArea");
    const alerta = document.getElementById("alerta");

    const modal = document.getElementById("modalConfirmacao");
    const btnCancelar = document.getElementById("btnCancelar");
    const btnConfirmar = document.getElementById("btnConfirmar");

    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");

    let toastTimer;


    // =====================================================
    // TOAST
    // =====================================================

    function mostrarToast(mensagem) {

        const toast = document.getElementById("toast");

        if (!toast) {
            return;
        }

        clearTimeout(toastTimer);

        toast.textContent = mensagem;
        toast.classList.add("mostrar");

        toastTimer = setTimeout(function () {

            toast.classList.remove("mostrar");

        }, 3500);
    }


    // =====================================================
    // ALERTA
    // =====================================================

    function mostrarAlerta(mensagem, erro = false) {

        alerta.textContent = mensagem;

        alerta.classList.toggle("erro", erro);

        alerta.style.display = "block";

        alerta.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }


    // =====================================================
    // MÁSCARA DE CPF
    // =====================================================

    cpf.addEventListener("input", function () {

        let valor = cpf.value.replace(/\D/g, "");

        valor = valor.substring(0, 11);

        if (valor.length > 9) {

            valor = valor.replace(
                /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
                "$1.$2.$3-$4"
            );

        } else if (valor.length > 6) {

            valor = valor.replace(
                /(\d{3})(\d{3})(\d{1,3})/,
                "$1.$2.$3"
            );

        } else if (valor.length > 3) {

            valor = valor.replace(
                /(\d{3})(\d{1,3})/,
                "$1.$2"
            );

        }

        cpf.value = valor;

    });


    // =====================================================
    // MÁSCARA DE TELEFONE
    // =====================================================

    telefone.addEventListener("input", function () {

        let valor = telefone.value.replace(/\D/g, "");

        valor = valor.substring(0, 11);

        if (valor.length > 10) {

            valor = valor.replace(
                /(\d{2})(\d{5})(\d{1,4})/,
                "($1) $2-$3"
            );

        } else if (valor.length > 6) {

            valor = valor.replace(
                /(\d{2})(\d{4})(\d{1,4})/,
                "($1) $2-$3"
            );

        } else if (valor.length > 2) {

            valor = valor.replace(
                /(\d{2})(\d{1,5})/,
                "($1) $2"
            );

        } else if (valor.length > 0) {

            valor = valor.replace(
                /(\d{1,2})/,
                "($1"
            );

        }

        telefone.value = valor;

    });


    // =====================================================
    // MÁSCARA DE CEP
    // =====================================================

    cep.addEventListener("input", function () {

        let valor = cep.value.replace(/\D/g, "");

        valor = valor.substring(0, 8);

        if (valor.length > 5) {

            valor = valor.replace(
                /(\d{5})(\d{1,3})/,
                "$1-$2"
            );

        }

        cep.value = valor;

    });


    // =====================================================
    // BADGE DA ÁREA DE VOLUNTARIADO
    // =====================================================

    area.addEventListener("change", function () {

        const nomes = {

            social: "Ação social",

            educacao: "Educação",

            eventos: "Eventos",

            arrecadacao: "Arrecadação de doações"

        };

        if (area.value) {

            badgeArea.textContent =
                "Área escolhida: " + nomes[area.value];

            mostrarToast(
                "Área de voluntariado selecionada."
            );

        } else {

            badgeArea.textContent =
                "Escolha uma área";

        }

    });


    // =====================================================
    // MENSAGEM DE ERRO INDIVIDUAL
    // =====================================================

    function mostrarErro(campo, mensagem) {

        const campoContainer = campo.closest(".campo");

        if (!campoContainer) {
            return;
        }

        campoContainer.classList.add("erro");

        let mensagemErro =
            campoContainer.querySelector(".mensagem-erro");

        if (!mensagemErro) {

            mensagemErro =
                document.createElement("span");

            mensagemErro.className =
                "mensagem-erro";

            campoContainer.appendChild(
                mensagemErro
            );
        }

        mensagemErro.textContent = mensagem;

    }


    // =====================================================
    // REMOVER ERRO
    // =====================================================

    function removerErro(campo) {

        const campoContainer =
            campo.closest(".campo");

        if (!campoContainer) {
            return;
        }

        campoContainer.classList.remove("erro");

        const mensagemErro =
            campoContainer.querySelector(
                ".mensagem-erro"
            );

        if (mensagemErro) {
            mensagemErro.remove();
        }

    }


    // =====================================================
    // VALIDAÇÃO INDIVIDUAL
    // =====================================================

    function validarCampo(campo) {

        removerErro(campo);

        if (!campo.checkValidity()) {

            if (campo.validity.valueMissing) {

                mostrarErro(
                    campo,
                    "Este campo é obrigatório."
                );

            } else if (campo.validity.typeMismatch) {

                mostrarErro(
                    campo,
                    "Digite um e-mail válido."
                );

            } else if (campo.validity.patternMismatch) {

                mostrarErro(
                    campo,
                    "Digite o formato correto."
                );

            } else if (campo.validity.tooShort) {

                mostrarErro(
                    campo,
                    "Digite pelo menos 3 caracteres."
                );

            } else {

                mostrarErro(
                    campo,
                    "Verifique este campo."
                );

            }

            return false;
        }

        return true;
    }


    // =====================================================
    // VALIDAÇÃO EM TEMPO REAL
    // =====================================================

    const campos =
        form.querySelectorAll(
            "input, select, textarea"
        );

    campos.forEach(function (campo) {

        campo.addEventListener(
            "input",
            function () {

                if (campo.value) {
                    validarCampo(campo);
                }

            }
        );

        campo.addEventListener(
            "change",
            function () {

                validarCampo(campo);

            }
        );

    });


    // =====================================================
    // ENVIO DO FORMULÁRIO
    // =====================================================

    form.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();

            alerta.style.display = "none";

            let formularioValido = true;

            campos.forEach(function (campo) {

                if (!validarCampo(campo)) {

                    formularioValido = false;

                }

            });


            if (!formularioValido) {

                mostrarAlerta(
                    "Verifique os campos destacados antes de continuar.",
                    true
                );

                mostrarToast(
                    "Há campos que precisam ser corrigidos."
                );

                return;
            }


            modal.classList.add("mostrar");

        }
    );


    // =====================================================
    // CANCELAR CONFIRMAÇÃO
    // =====================================================

    btnCancelar.addEventListener(
        "click",
        function () {

            modal.classList.remove("mostrar");

            mostrarToast(
                "Cadastro mantido para revisão."
            );

        }
    );


    // =====================================================
    // CONFIRMAR CADASTRO
    // =====================================================

    btnConfirmar.addEventListener(
        "click",
        function () {

            modal.classList.remove("mostrar");

            mostrarAlerta(
                "Cadastro realizado com sucesso! A ONG poderá entrar em contato com você.",
                false
            );

            mostrarToast(
                "Cadastro enviado com sucesso!"
            );

            form.reset();

            badgeArea.textContent =
                "Escolha uma área";

            campos.forEach(function (campo) {
                removerErro(campo);
            });

        }
    );


    // =====================================================
    // FECHAR MODAL CLICANDO FORA
    // =====================================================

    modal.addEventListener(
        "click",
        function (evento) {

            if (evento.target === modal) {

                modal.classList.remove(
                    "mostrar"
                );

            }

        }
    );


    // =====================================================
    // FECHAR MODAL COM ESC
    // =====================================================

    document.addEventListener(
        "keydown",
        function (evento) {

            if (evento.key === "Escape") {

                modal.classList.remove(
                    "mostrar"
                );

            }

        }
    );

}
