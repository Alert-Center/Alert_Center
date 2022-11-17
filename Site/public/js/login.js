// Função para validar pseudo-login e criar alert para falar que a conta ainda não foi cadastrada
// function entrar() {
//   var email = in_email.value;
//   var senha = in_senha.value;

  // Código para o login falso---------
  // var user = 0;
  // var validacao = false;

  // USANDO O LAÇO DE REPETIÇÃO FOR PARA ANALISAR TODOS OS DADOS DO BANCO DE DADOS FAKE
  // for (let contadora = 0; contadora < localStorage.length; contadora++) {
  //   user = JSON.parse(localStorage.getItem(contadora));

  //   // ANALISANDO SE O USUÁRIO EXISTE NO BANCO DE DADOS FALSO
  //   if (email == user[1] && senha == user[2]) {
  //     // ARMAZENANDO NOME DO USUÁRIO PARA SER INFORMADO NO DASHBOARD
  //     sessionStorage.setItem(0, user[0]);
  //     // SE EXISTIR
  //     validacao = true;
  //   }
  // }
  // ----------------------------------

  // SE O USUÁRIO EXISTIR, REDIRECIONAR PARA A PAGINA DO DASHBOARD
  // if (validacao) {
  //   window.location.href = "dashboard-geral.html";
  // } else {
  //   alert(`Conta ainda não cadastrada!`);
  // }
// }

function entrar() {
  aguardar();

  var emailVar = in_email.value;
  var senhaVar = in_senha.value;

  if (emailVar == "" || senhaVar == "") {
      cardErro.style.display = "block"
      mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
      finalizarAguardar();
      return false;
  }
  else {
      setInterval(sumirMensagem, 5000)
  }

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          emailServer: emailVar,
          senhaServer: senhaVar
      })
  }).then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!")

      if (resposta.ok) {
          console.log(resposta);

          resposta.json().then(json => {
              console.log(json);
              console.log(JSON.stringify(json));

              sessionStorage.EMAIL_USUARIO = json.email;
              sessionStorage.NOME_USUARIO = json.nome;
              sessionStorage.ID_USUARIO = json.idEmpresa;

              alerta_erro.style.display = 'flex'

              setTimeout(function () {
                  window.location = "dashboard-geral.html";
              }, 2000); // apenas para exibir o loading

          });

      } else {

          console.log("Houve um erro ao tentar realizar o login!");

          resposta.text().then(texto => {
              console.error(texto);
              finalizarAguardar(texto);
          });
      }

  }).catch(function (erro) {
      console.log(erro);
  })

  return false;
}

function sumirMensagem() {
  cardErro.style.display = "none"
}


