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
  var array = [nome,email,senha];
  //-----------------------------

  var campovazio = nome == "" || CNPJ == "" || tipo == "" || cep == "" || logradouro == "" || numero == "" || bairro == "" || cidade == "" || complemento == "" || telefone == "" || celular == "" || email == "" || senha == "" || confirmarSenha == "";

  // Se tiver algum campo vazio ou se a senha não estiver igual a confirmar senha
  if (campovazio || senha != confirmarSenha) {

    // Se o confirmar senha estiver errado
    if (senha != confirmarSenha) {
      if (in_form_confirmarSenha.parentElement.lastElementChild == in_form_confirmarSenha) { // Se o elemento filho for o próprio input. Se tirar essa verificação, podem aparecer várias mensagens repetidadas.
        in_form_confirmarSenha.parentElement.innerHTML += '<div class="alerta" id="ErroConfirmarSenha">Suas senhas estão diferentes!</div>';
      }
    }
    // Se tiver um campo vazio
    if (campovazio) {

      alert("Por favor, complete todos os campos!");

      // Mesma lógica do confirmar senha
      if (nome == "") {
        if (in_form_nome.parentElement.lastElementChild == in_form_nome) {
          in_form_nome.parentElement.innerHTML += '<div class="alerta" id="alert_nome">Digite seu nome</div>';
        }
      }
      if (CNPJ == "") {
        if (in_form_CNPJ.parentElement.lastElementChild == in_form_CNPJ) {
          in_form_CNPJ.parentElement.innerHTML += '<div class="alerta" id="alert_CNPJ">Digite seu CNPJ</div>';
        }
      }
      if (tipo == "") {
        if (in_form_tipo.parentElement.lastElementChild == in_form_tipo) {
          in_form_tipo.parentElement.innerHTML += '<div class="alerta" id="alert_tipo">Digite seu tipo</div>';
        }
      }
      if (cep == "") {
        if (in_form_cep.parentElement.lastElementChild == in_form_cep) {
          in_form_cep.parentElement.innerHTML += '<div class="alerta" id="alert_cep">Digite seu cep</div>';
        };
      }
      if (logradouro == "") {
        if (in_form_logradouro.parentElement.lastElementChild == in_form_logradouro) {
          in_form_logradouro.parentElement.innerHTML += '<div class="alerta" id="alert_logradouro">Digite seu logradouro</div>';
        };
      }
      if (numero == "") {
        if (in_form_numero.parentElement.lastElementChild == in_form_numero) {
          in_form_numero.parentElement.innerHTML += '<div class="alerta" id="alert_numero">Digite seu numero</div>';
        };
      }
      if (bairro == "") {
        if (in_form_bairro.parentElement.lastElementChild == in_form_bairro) {
          in_form_bairro.parentElement.innerHTML += '<div class="alerta" id="alert_bairro">Digite seu bairro</div>';
        };
      }
      if (cidade == "") {
        if (in_form_cidade.parentElement.lastElementChild == in_form_cidade) {
          in_form_cidade.parentElement.innerHTML += '<div class="alerta" id="alert_cidade">Digite sua cidade</div>';
        };
      }
      if (complemento == "") {
        if (in_form_complemento.parentElement.lastElementChild == in_form_complemento) {
          in_form_complemento.parentElement.innerHTML += '<div class="alerta" id="alert_complemento">Digite seu complemento</div>';
        };
      }
      if (telefone == "") {
        if (in_form_telefone.parentElement.lastElementChild == in_form_telefone) {
          in_form_telefone.parentElement.innerHTML += '<div class="alerta" id="alert_telefone">Digite seu telefone</div>';
        };
      }
      if (celular == "") {
        if (in_form_celular.parentElement.lastElementChild == in_form_celular) {
          in_form_celular.parentElement.innerHTML += '<div class="alerta" id="alert_celular">Digite seu celular</div>';
        };
      }
      if (email == "") {
        if (in_form_email.parentElement.lastElementChild == in_form_email) {
          in_form_email.parentElement.innerHTML += '<div class="alerta" id="alert_email">Digite seu email</div>';
        };
      }
      if (senha == "") {
        if (in_form_senha.parentElement.lastElementChild == in_form_senha) {
          in_form_senha.parentElement.innerHTML += '<div class="alerta" id="alert_senha">Digite sua senha</div>';
        };
      }
      if (confirmarSenha == "") {
        if (in_form_confirmarSenha.parentElement.lastElementChild == in_form_confirmarSenha) {
          in_form_confirmarSenha.parentElement.innerHTML += '<div class="alerta" id="alert_confirmarSenha">Digite a confirmação da sua senha!</div>';
        };
      }
    }

    // Se os termos não forem assinados
  } else if (!termos) {
    // Limpar aviso de confirmar senha. Se passou para essa estapa, é porque a senha confirmou.
      if (!(document.getElementById("ErroConfirmarSenha") == null)) {
      document.getElementById("ErroConfirmarSenha").remove(); // remove() exclui um elemento
      }
      alert("Por favor, aceite os Termos de Política e Privacidade antes de seguir.");
      //Se não estiver checked, a cor ficará vermelha
      checkTermos();
  } else {
      // Usuário Cadastrado!!
      alert(`Usuário ${nome} cadastrado com sucesso!`);
      /* Guardar o as informações do usuario no banco de dados fake. Função stringify 
      usada para converter um array em um string já que
      não é possivel guardar arrays no Local Storage-----------------*/
      localStorage.setItem(localStorage.length,JSON.stringify(array));
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

  // Lógica: 
  // Se o campo for diferente de vazio (ou seja, completado), faça:
  // se existir um ID alerta (Ou seja, se não for nulo. Se não tiver essa verificação, dá erro. Ele seleciona um campo que não existe), faça: 
  // remova o elemento com ID.

  if (nome != "") {
    if (!(document.getElementById("alert_nome") == null)) {
      document.getElementById("alert_nome").remove();
    }
  }
  if (CNPJ != "") {
    if (!(document.getElementById("alert_CNPJ") == null)) {
      document.getElementById("alert_CNPJ").remove();
    }
  }
  if (tipo != "") {
    if (!(document.getElementById("alert_tipo") == null)) {
      document.getElementById("alert_tipo").remove();
    }
  }
  if (cep != "") {
    if (!(document.getElementById("alert_cep") == null)) {
      document.getElementById("alert_cep").remove();
    }
  }
  if (logradouro != "") {
    if (!(document.getElementById("alert_logradouro") == null)) {
      document.getElementById("alert_logradouro").remove();
    }
  }
  if (numero != "") {
    if (!(document.getElementById("alert_numero") == null)) {
      document.getElementById("alert_numero").remove();
    }
  }
  if (bairro != "") {
    if (!(document.getElementById("alert_bairro") == null)) {
      document.getElementById("alert_bairro").remove();
    }
  }
  if (cidade != "") {
    if (!(document.getElementById("alert_cidade") == null)) {
      document.getElementById("alert_cidade").remove();
    }
  }
  if (complemento != "") {
    if (!(document.getElementById("alert_complemento") == null)) {
      document.getElementById("alert_complemento").remove();
    }
  }
  if (telefone != "") {
    if (!(document.getElementById("alert_telefone") == null)) {
      document.getElementById("alert_telefone").remove();
    }
  }
  if (celular != "") {
    if (!(document.getElementById("alert_celular") == null)) {
      document.getElementById("alert_celular").remove();
    }
  }
  if (email != "") {
    if (!(document.getElementById("alert_email") == null)) {
      document.getElementById("alert_email").remove();
    }
  }
  if (senha != "") {
    if (!(document.getElementById("alert_senha") == null)) {
      document.getElementById("alert_senha").remove();
    }
  }
  if (confirmarSenha != "") {
    if (!(document.getElementById("alert_confirmarSenha") == null)) {
      document.getElementById("alert_confirmarSenha").remove();
    }
  }
}

