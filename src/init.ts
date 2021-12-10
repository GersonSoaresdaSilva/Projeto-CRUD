interface Usuario {
    username: string;
    email: string;
    password: string;
}

const form = document.querySelector('.form') as HTMLFormElement;
const username = document.querySelector('.username') as HTMLInputElement;
const email = document.querySelector('.email') as HTMLInputElement;
const password = document.querySelector('.password') as HTMLInputElement;
const password2 = document.querySelector('.password2') as HTMLInputElement;
const botaoForm = document.querySelector("#form > div:nth-child(6) > button") as HTMLButtonElement;

botaoForm.disabled = true;

//função para habilitar botão
function habilitarBotaoSubmit (form: HTMLFormElement): void{
    let erros: NodeListOf<Element> = form.querySelectorAll('.show-error-message');
    if (erros.length > 0) {
        botaoForm.disabled = true;
    }else {
        botaoForm.disabled = false;
    }
}

//definir eventos do forms
form.addEventListener('submit', function (event: Event) {
    //cancelar evento de submeter à outra página
    event.preventDefault();
    excluirMSGErro(form)
    verificarCamposVazios(username, email, password, password2)
    verificarPassword(password, password2)

    let usuario: Usuario = {
        username: username.value,
        email: email.value,
        password: password.value,
    }

    console.log (usuario);

    /*if (verificarEnvioFormulario(form)) {
        form.submit()
        console.log('Formulário Enviado!')
    }*/
})

//função para verificar campos vazios
function verificarCamposVazios(...inputs: HTMLInputElement[]): void {
    inputs.forEach((campo) => {
        if (!campo.value) {
            //console.log(`${campo.className} está vazio`)
            apresentarMSGErro(campo, 'O campo está vazio!');
        }
    })
}

//função para apagar mensagens de erro
function excluirMSGErro(form: HTMLFormElement): void {
    form.querySelectorAll('.show-error-message').forEach(function (item) {
        item.classList.remove('show-error-message');
    })
}

//função para apagar mensagem de erro após preencher o campo
form.querySelectorAll('input').forEach(elemento => {
    elemento.addEventListener('blur', (event) => {
        event.preventDefault();
        if (!elemento.value) {
            apresentarMSGErro(elemento, 'O campo está vazio!')
        } else {
            let formField = elemento.parentElement as HTMLDivElement;
            formField.classList.remove('show-error-message');
        }
        verificarPassword(password, password2);
        habilitarBotaoSubmit(form);
    })
});

//função para incluir mensagem de erro no html
function apresentarMSGErro(input: HTMLInputElement, msg: string) {
    let formField = input.parentElement as HTMLDivElement;
    let errorMessage = formField.querySelector('.error-message') as HTMLSpanElement;
    errorMessage.innerText = msg;
    formField.classList.add('show-error-message');
}

//função para validar password
function verificarPassword(password: HTMLInputElement, password2: HTMLInputElement) {
    password.addEventListener('blur', (event) => {
        event.preventDefault();
        if (password.value.length < 8) {
            apresentarMSGErro(password, 'Senha muito curta!')
        }
    })
    if (password.value != password2.value) {
        apresentarMSGErro(password2, 'Senhas são diferentes')
    }
}

//função para verificar envio do formulário
function verificarEnvioFormulario(form: HTMLElement): boolean {
    let send = true
    form.querySelectorAll('.show-error-message').forEach(() => (send = false))
    return send
}
