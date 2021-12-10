"use strict";
const form = document.querySelector('.form');
const username = document.querySelector('.username');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const password2 = document.querySelector('.password2');
const botaoForm = document.querySelector("#form > div:nth-child(6) > button");
botaoForm.disabled = true;
//função para habilitar botão
function habilitarBotaoSubmit(form) {
    let erros = form.querySelectorAll('.show-error-message');
    if (erros.length > 0) {
        botaoForm.disabled = true;
    }
    else {
        botaoForm.disabled = false;
    }
}
//definir eventos do forms
form.addEventListener('submit', function (event) {
    //cancelar evento de submeter à outra página
    event.preventDefault();
    excluirMSGErro(form);
    verificarCamposVazios(username, email, password, password2);
    verificarPassword(password, password2);
    let usuario = {
        username: username.value,
        email: email.value,
        password: password.value,
    };
    console.log(usuario);
    /*if (verificarEnvioFormulario(form)) {
        form.submit()
        console.log('Formulário Enviado!')
    }*/
});
//função para verificar campos vazios
function verificarCamposVazios(...inputs) {
    inputs.forEach((campo) => {
        if (!campo.value) {
            //console.log(`${campo.className} está vazio`)
            apresentarMSGErro(campo, 'O campo está vazio!');
        }
    });
}
//função para apagar mensagens de erro
function excluirMSGErro(form) {
    form.querySelectorAll('.show-error-message').forEach(function (item) {
        item.classList.remove('show-error-message');
    });
}
//função para apagar mensagem de erro após preencher o campo
form.querySelectorAll('input').forEach(elemento => {
    elemento.addEventListener('blur', (event) => {
        event.preventDefault();
        if (!elemento.value) {
            apresentarMSGErro(elemento, 'O campo está vazio!');
        }
        else {
            let formField = elemento.parentElement;
            formField.classList.remove('show-error-message');
        }
        verificarPassword(password, password2);
        habilitarBotaoSubmit(form);
    });
});
//função para incluir mensagem de erro no html
function apresentarMSGErro(input, msg) {
    let formField = input.parentElement;
    let errorMessage = formField.querySelector('.error-message');
    errorMessage.innerText = msg;
    formField.classList.add('show-error-message');
}
//função para validar password
function verificarPassword(password, password2) {
    password.addEventListener('blur', (event) => {
        event.preventDefault();
        if (password.value.length < 8) {
            apresentarMSGErro(password, 'Senha muito curta!');
        }
    });
    if (password.value != password2.value) {
        apresentarMSGErro(password2, 'Senhas são diferentes');
    }
}
//função para verificar envio do formulário
function verificarEnvioFormulario(form) {
    let send = true;
    form.querySelectorAll('.show-error-message').forEach(() => (send = false));
    return send;
}
