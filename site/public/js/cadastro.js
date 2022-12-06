// OBSERVAÇÕES
//parentElement: elemento pai (elemento que a tag está dentro)
//LastElementChild: ultimo elemento filho (última tag que está dentro dele)

// Para todos os elementos filhos do div_campos, adicionar o evento "completado()". Isso apenas para não repetir 
// o evento onkeyup() em todos os campos do HTML.
for (key of div_campos.children) {
  key.addEventListener('keyup', function () { completado() })
}

// Adicionar frase de alerta invisível (display: none) //
in_form_nome.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_nome">Digite seu nome</div>';
in_form_CNPJ.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_CNPJ">Digite seu CNPJ</div>';
in_form_cep.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_cep">Digite seu cep</div>';
in_form_logradouro.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_logradouro">Digite seu logradouro</div>';
in_form_numero.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_numero">Digite seu numero</div>';
in_form_bairro.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_bairro">Digite seu bairro</div>';
in_form_cidade.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_cidade">Digite sua cidade</div>';
in_form_email.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_email">Digite seu email</div>';
in_form_email.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_emailErrado">Insira seu email neste formato:<br> nome@exemplo.com</div>';
in_form_senha.parentElement.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_senha">Digite sua senha</div>';
in_form_senha.parentElement.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_senhaErrada">A senha deve ter pelo menos 8 caracteres (contendo letras maiúsculas e minúsculas, números e caracteres especiais)</div>';
in_form_confirmarSenha.parentElement.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_confirmarSenha">Digite a confirmação da sua senha!</div>';
in_form_confirmarSenha.parentElement.parentElement.innerHTML += '<div class="alerta" style="display:none" id="ErroConfirmarSenha">Suas senhas estão diferentes!</div>';
// -----------------------------------------------------------//

// Variável para verificar se a string contém no mínimo 1 número, 1 letra minúscula, 1 letra maiúscula, 1 caracter especial, além de conter no mínimo 8 caracteres e no máximo 20
var senhaCaracteres = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
// -------------------------------------//

// https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
// Com a regex que está inserida na variável emailPadrao, nós verificamos o seguite:
// Qualquer tipo de string;
// Seguida por um caractere @ (que é obrigatório em e-mails);
// Seguido por algum outro texto, o domínio/provedor;
// E então temos a presença de um ponto, que também é obrigatório;
// E por fim mais um texto, validando tanto emails .com quanto .com.br, e outros que tenham terminologias diferentes
var emailPadrao = /\S+@\S+\.\S+/;
// --------------------------------------------//


//Função para falso cadastro e verificação de campos vazios
function cadastrar() {

  // Todos os campos de Cadastrar
  var nome = in_form_nome.value;
  var CNPJ = in_form_CNPJ.value;
  var cep = in_form_cep.value;
  var logradouro = in_form_logradouro.value;
  var numero = in_form_numero.value;
  var bairro = in_form_bairro.value;
  var cidade = in_form_cidade.value;
  var telefone = in_form_telefone.value;
  var celular = in_form_celular.value;
  var email = in_form_email.value;
  var senha = in_form_senha.value;
  var confirmarSenha = in_form_confirmarSenha.value;
  var termos = in_form_termos.checked;

  // Variavel usada para amrmazenar os dados de nome, email e senha cadastrados usados no login falso
  var array = [nome, email, senha];
  //-----------------------------

  // variável booleana para verificar se há campos vazios
  var campovazio = nome == "" || CNPJ == "" || cep == "" || logradouro == "" || numero == "" || bairro == "" || cidade == "" || email == "" || senha == "" || confirmarSenha == "";


  // A função ".match()" serve para pesquisar na string a expressão supracitada
  var senhaErrada = senha.match(senhaCaracteres) == null;

  // variável para verificar se o confirmar senha não está igual a senha
  var confirmarSenhaErrada = senha != confirmarSenha;

  // variável para verificar se o email não está nos padrões
  var emailErrado = emailPadrao.test(email) == false;

  if (campovazio || confirmarSenhaErrada || emailErrado || senhaErrada) {

    if (emailErrado) {
      //Se estiver errado, aparecer o alerta com display block
      alert_emailErrado.style.display = "block"
    }

    if (senhaErrada) {
      alert_senhaErrada.style.display = "block"
    }

    if (campovazio) {

      alert("Por favor, complete todos os campos!");

      //Se estiver vazio, aparecer o alerta com display block
      if (nome == "") {
        alert_nome.style.display = "block"
      }
      if (CNPJ == "") {
        alert_CNPJ.style.display = "block"
      }
      if (cep == "") {
        alert_cep.style.display = "block"
      }
      if (logradouro == "") {
        alert_logradouro.style.display = "block"
      }
      if (numero == "") {
        alert_numero.style.display = "block"
      }
      if (bairro == "") {
        alert_bairro.style.display = "block"
      }
      if (cidade == "") {
        alert_cidade.style.display = "block"
      }
      if (email == "") {
        alert_emailErrado.style.display = "none"
        alert_email.style.display = "block"
      }
      if (senha == "") {
        alert_senhaErrada.style.display = "none"
        alert_senha.style.display = "block"
      }
      if (confirmarSenha == "") {
        alert_confirmarSenha.style.display = "block"
      }
    }

    if (confirmarSenhaErrada) {

      //Limpar mensagem da senha vazia
      alert_confirmarSenha.style.display = "none"

      //Se estiver errado, aparecer o alerta com display block
      ErroConfirmarSenha.style.display = "block";
    }

  }
  // Se os termos não forem assinados
  else if (!termos) {

    alert("Por favor, aceite os Termos de Política e Privacidade antes de seguir.");

    //Função criada abaixo para deixar a cor vermelha
    checkTermos();
  } else {
    cadastrarBanco();
  }
}

// Função de trocar a cor do input check quando estiver CHECKED ou não.
function checkTermos() {
  if (in_form_termos.checked == true) {
    in_form_termos.parentElement.lastElementChild.style.color = 'green';
  } else {
    in_form_termos.parentElement.lastElementChild.style.color = 'red';
  }
}

// Função para verificar se um input ja foi completado ou ainda está vazio.
function completado() {
  var nome = in_form_nome.value;
  var CNPJ = in_form_CNPJ.value;
  var cep = in_form_cep.value;
  var logradouro = in_form_logradouro.value;
  var numero = in_form_numero.value;
  var bairro = in_form_bairro.value;
  var cidade = in_form_cidade.value;
  var telefone = in_form_telefone.value;
  var celular = in_form_celular.value;
  var email = in_form_email.value;
  var senha = in_form_senha.value;
  var confirmarSenha = in_form_confirmarSenha.value;

  var emailErrado = emailPadrao.test(email) == false;
  var senhaErrada = senha.match(senhaCaracteres) == null;


  // Se o campo for diferente de vazio (ou seja, completado), coloque o display none (sumir a mensagem de alerta)
  if (nome != "") {
    alert_nome.style.display = "none"
  }
  if (CNPJ != "") {
    alert_CNPJ.style.display = "none"
  }
  if (cep != "") {
    alert_cep.style.display = "none"
  }
  if (logradouro != "") {
    alert_logradouro.style.display = "none"
  }
  if (numero != "") {
    alert_numero.style.display = "none"
  }
  if (bairro != "") {
    alert_bairro.style.display = "none"
  }
  if (cidade != "") {
    alert_cidade.style.display = "none"
  }
  if (email != "") {
    alert_email.style.display = "none"
  }
  if (!(emailErrado)) {
    alert_emailErrado.style.display = "none"
  }
  if (senha != "") {
    alert_senha.style.display = "none"
  }
  if (!(senhaErrada)) {
    alert_senhaErrada.style.display = "none"
  }
  if (confirmarSenha != "") {
    alert_confirmarSenha.style.display = "none"
  }
  if (senha == confirmarSenha) {
    ErroConfirmarSenha.style.display = "none"
  }

}

function eyes() {
  if (in_form_senha.type == "password" || in_form_confirmarSenha.type == "password") {
    in_form_senha.type = "text";
    img_eye_senha.src = "img/eye.png";

    in_form_confirmarSenha.type = "text";
    img_eye_confirmar.src = "img/eye.png";
  } else {
    in_form_senha.type = "password";
    img_eye_senha.src = "img/hidden.png";

    in_form_confirmarSenha.type = "password";
    img_eye_confirmar.src = "img/hidden.png";
  }
}

function cadastrarBanco() {
  aguardar();

  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo
  var nomeVar = in_form_nome.value;
  var CNPJVar = in_form_CNPJ.value;
  var telefone1Var = in_form_telefone.value;
  var telefone2Var = in_form_celular.value;
  var emailVar = in_form_email.value;
  var senhaVar = in_form_senha.value;
  var confirmacaoSenhaVar = in_form_confirmarSenha.value;

  if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "") {
    cardErro.style.display = "block"
    mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";

    finalizarAguardar();
    return false;
  }
  else {
    setInterval(fecharModal, 5000)
  }

  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      cnpjServer: CNPJVar,
      telefone1Server: telefone1Var,
      telefone2Server: telefone2Var,
      emailServer: emailVar,
      senhaServer: senhaVar,
    })
  }).then(function (resposta) {

    console.log("resposta: ", resposta);

    if (resposta.ok) {
      alerta_erro.style.display = "flex";
      document.body.style.overflow = 'hidden'
      mensagem_erro.style.display = 'block';

      cadastrarEndereco()

      setTimeout(() => {
        window.location = "login.html";
      }, "2000")

    } else {
      mostrarModal("Houve um erro ao tentar realizar o cadastro!");
      setTimeout(fecharModal,5000)
      throw ("Houve um erro ao tentar realizar o cadastro!");
      
    }
  }).catch(function (resposta) {
    mostrarModal("Houve um erro ao tentar realizar o cadastro!");
    setTimeout(fecharModal,5000)
    console.log(`#ERRO: ${resposta}`);
  });

  return false;
}


function cadastrarEndereco() {
  var ruaVar = in_form_logradouro.value;
  var bairroVar = in_form_bairro.value;
  var numeroVar = in_form_numero.value;
  var complementoVar = in_form_complemento.value;
  var cepVar = in_form_cep.value;

  if (ruaVar == "" || bairroVar == "" || numeroVar == "" || cepVar == "") {
    cardErro.style.display = "block"
    mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";

    finalizarAguardar();
    return false;
  }
  else {
    setInterval(fecharModal, 5000)
  }

  fetch("/usuarios/cadastrarEndereco", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ruaServer: ruaVar,
      bairroServer: bairroVar,
      numeroServer: numeroVar,
      complementoServer: complementoVar,
      cepServer: cepVar,
    })
  }).then(function (resposta) {

    console.log("resposta: ", resposta);

    if (resposta.ok) {
console.log("FOI");
    } 
    else {
      mostrarModal("Houve um erro ao tentar realizar o cadastro!");
      throw ("Houve um erro ao tentar realizar o cadastro!");
    }
  }).catch(function (resposta) {
    mostrarModal(resposta)
    console.log(`#ERRO: ${resposta}`);
  });

  return false;
}