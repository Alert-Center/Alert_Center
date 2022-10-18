// Função para fazer a validação do e-mail
function analisar_email() {
  var email = in_form_email.value;

  var emailCorreto = email.indexOf("@" && ".") >= 0;

  if (!emailCorreto) {
    msg_email.innerHTML = `Insira seu email neste formato: <strong style="color:red;">nome@exemplo.com!</strong>`;
  } else {
    msg_email.innerHTML = ``;
  }
}

// Função para fazer a validação da senha
function analisar_senha() {
  var senha = in_form_senha.value 
  var confirmacaoSenha = in_form_confirmarSenha.value
  // A expressão utilizada abaixo, serve para validar a string, a qual deve conter no mínimo 1 número, 1 letra minúscula, 1 letra maiúscula, 1 caracter especial, além de conter no mínimo 9 caracteres e no máximo 20
  // A função ".match()" serve para pesquisar na string a expressão supracitada
  var senhaCaracteres =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{9,20}$/;
  var senhaCorreta = senha.match(senhaCaracteres);
  var confirmacaoSenhaCorreta = confirmacaoSenha.match(senhaCaracteres);

  if (!senhaCorreta || !confirmacaoSenhaCorreta) {
    msg_senha.innerHTML = `A senha deve conter mais de 8 caracteres, contendo <strong>números</strong>, <strong>caracteres especiais</strong>, <strong>letras maiúsculas</strong> e <strong>minúsculas</strong>.`;
  } else {
    msg_senha.innerHTML = ``;
  }
}

// OBSERVAÇÕES
//parentElement: elemento pai (elemento que a tag está dentro)
//LastElementChild: ultimo elemento filho (última tag que está dentro dele)

// Para todos os elementos filhos do div_campos, adicionar o evento "completado()". Isso apenas para não repetir 
// o evento onkeyup() em todos os campos do HTML.
for (key of div_campos.children) {
  key.addEventListener('keyup', function () { completado() })
}

// Adicionar frase de alerta invisível (display: none) //
in_form_confirmarSenha.parentElement.innerHTML += '<div class="alerta" style="display:none" id="ErroConfirmarSenha">Suas senhas estão diferentes!</div>';
in_form_nome.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_nome">Digite seu nome</div>';
in_form_CNPJ.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_CNPJ">Digite seu CNPJ</div>';
in_form_tipo.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_tipo">Digite seu tipo</div>';
in_form_cep.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_cep">Digite seu cep</div>';
in_form_logradouro.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_logradouro">Digite seu logradouro</div>';
in_form_numero.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_numero">Digite seu numero</div>';
in_form_bairro.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_bairro">Digite seu bairro</div>';
in_form_cidade.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_cidade">Digite sua cidade</div>';
in_form_complemento.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_complemento">Digite seu complemento</div>';
in_form_telefone.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_telefone">Digite seu telefone</div>';
in_form_celular.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_celular">Digite seu celular</div>';
in_form_email.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_email">Digite seu email</div>';
in_form_email.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_emailErrado">Insira seu email neste formato:<br> nome@exemplo.com</div>';
in_form_senha.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_senha">Digite sua senha</div>';
in_form_senha.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_senhaErrada">A senha deve ter pelo menos 8 caracteres (contendo letras maiúsculas e minúsculas, números e caracteres especiais)</div>';
in_form_confirmarSenha.parentElement.innerHTML += '<div class="alerta" style="display:none" id="alert_confirmarSenha">Digite a confirmação da sua senha!</div>';
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
  var tipo = in_form_tipo.value;
  var cep = in_form_cep.value;
  var logradouro = in_form_logradouro.value;
  var numero = in_form_numero.value;
  var bairro = in_form_bairro.value;
  var cidade = in_form_cidade.value;
  var complemento = in_form_complemento.value;
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
  var campovazio = nome == "" || CNPJ == "" || tipo == "" || cep == "" || logradouro == "" || numero == "" || bairro == "" || cidade == "" || complemento == "" || telefone == "" || celular == "" || email == "" || senha == "" || confirmarSenha == "";


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
      if (tipo == "") {
        alert_tipo.style.display = "block"
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
      if (complemento == "") {
        alert_complemento.style.display = "block"
      }
      if (telefone == "") {
        alert_telefone.style.display = "block"
      }
      if (celular == "") {
        alert_celular.style.display = "block"
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
    // Usuário Cadastrado!!
    alert(`Usuário ${nome} cadastrado com sucesso!`);
    /* Guardar o as informações do usuario no banco de dados fake. Função stringify 
    usada para converter um array em um string já que
    não é possivel guardar arrays no Local Storage-----------------*/
    localStorage.setItem(localStorage.length, JSON.stringify(array));
    // ------------------------------------------------------------
    window.location.href = "login.html"; //redirecionar a página para o login
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
  var tipo = in_form_tipo.value;
  var cep = in_form_cep.value;
  var logradouro = in_form_logradouro.value;
  var numero = in_form_numero.value;
  var bairro = in_form_bairro.value;
  var cidade = in_form_cidade.value;
  var complemento = in_form_complemento.value;
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
  if (tipo != "") {
    alert_tipo.style.display = "none"
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
  if (complemento != "") {
    alert_complemento.style.display = "none"
  }
  if (telefone != "") {
    alert_telefone.style.display = "none"
  }
  if (celular != "") {
    alert_celular.style.display = "none"
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