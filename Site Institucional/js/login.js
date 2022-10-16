// Função para fazer a validação do e-mail
function analisar_email() {
  var email = in_email.value;

  var emailCorreto = email.indexOf("@" && ".") >= 0;

  if (!emailCorreto) {
    msg_email.innerHTML = `Insira seu email neste formato: <strong style="color:red;">nome@exemplo.com!</strong>`;
  } else {
    msg_email.innerHTML = ``;
  }
}

// Função para fazer a validação do senha
function analisar_senha() {
  var senha = in_senha.value
  // A expressão utilizada abaixo, serve para validar a string, a qual deve conter no mínimo 1 número, 1 letra minúscula, 1 letra maiúscula, 1 caracter especial, além de conter no mínimo 9 caracteres e no máximo 20
  // A função ".match()" serve para pesquisar na string a expressão supracitada
  var senhaCaracteres =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{9,20}$/;
  var senhaCorreta = senha.match(senhaCaracteres);

  if (!senhaCorreta) {
    msg_senha.innerHTML = `A senha deve conter mais de 8 caracteres, contendo <strong>números</strong>, <strong>caracteres especiais</strong>, <strong>letras maiúsculas</strong> e <strong>minúsculas</strong>.`;
  } else {
    msg_senha.innerHTML = ``;
  }
}


// Função para validar pseudo-login e criar alert para falar que a conta ainda não foi cadastrada
// Função para validar pseudo-login e criar alert para falar que a conta ainda não foi cadastrada
function entrar() {
  var email = in_email.value;
  var senha = in_senha.value;

  // Código para o login falso---------
  var user = 0;
  var validacao = false;

  // USANDO O LAÇO DE REPETIÇÃO FOR PARA ANALISAR TODOS OS DADOS DO BANCO DE DADOS FAKE
  for (let contadora = 0; contadora < localStorage.length; contadora++) {
    user = JSON.parse(localStorage.getItem(contadora));

    // ANALISANDO SE O USUÁRIO EXISTE NO BANCO DE DADOS FALSO
    if (email == user[1] && senha == user[2]) {
      // ARMAZENANDO NOME DO USUÁRIO PARA SER INFORMADO NO DASHBOARD
      sessionStorage.setItem(0, user[0]);
      // SE EXISTIR
      validacao = true;
    }
  }
  // ----------------------------------

  // SE O USUÁRIO EXISTIR, REDIRECIONAR PARA A PAGINA DO DASHBOARD
  if (validacao) {
    window.location.href = "dashboard-geral.html";
  } else {
    alert(`Conta ainda não cadastrada!`);
  }
}


