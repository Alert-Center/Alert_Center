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


