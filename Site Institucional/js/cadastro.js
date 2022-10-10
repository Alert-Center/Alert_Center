function cadastrar() {
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

    var campovazio = nome == "" || CNPJ == "" || tipo == "" || cep == "" || logradouro == "" || numero == "" || bairro == "" || cidade == "" || complemento == "" || telefone == "" || celular == "" || email == "" || senha == "" || confirmarSenha == "";

    if (campovazio) {
      alert("Por favor, complete todos os campos!");
    } else if (!termos) {
      alert("Por favor, aceite os Termos de Política e Privacidade antes de seguir.");
    } else {
      alert(`Usuário ${nome} cadastrado com sucesso!`)
      window.location.href = "login.html";
    }

  }