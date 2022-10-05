// Função para fazer a validação do e-mail
function analisar_email() {
    var email = in_email.value

    var emailCorreto = email.indexOf('@' && '.') >= 0

    if (!emailCorreto) {
        msg_email.innerHTML = `Insira seu email neste formato: <strong style="color:red;">nome@exemplo.com!</strong>`
    } else {
        msg_email.innerHTML = ``
    }      
}

// Função para fazer a validação do senha
function analisar_senha() {
    var senha = in_senha.value

    // A expressão utilizada abaixo, serve para validar a string, a qual deve conter no mínimo 1 número, 1 letra minúscula, 1 letra maiúscula, 1 caracter especial, além de conter no mínimo 9 caracteres e no máximo 20
    // A função ".match()" serve para pesquisar na string a expressão supracitada
    var senhaCaracteres =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{9,20}$/
    var senhaCorreta = senha.match(senhaCaracteres)

    if (!senhaCorreta) {
        msg_senha.innerHTML = `A senha deve conter mais de 8 caracteres, contendo <strong>números</strong>, <strong>caracteres especiais</strong>, <strong>letras maiúsculas</strong> e <strong>minúsculas</strong>.`
    } else {
        msg_senha.innerHTML = ``
    }
}

// Função provisória para limpar os campos do input
function entrar() {
    in_email.value = ``
    in_senha.value = ``
}