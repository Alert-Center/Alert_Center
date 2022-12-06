var cep = document.getElementById('in_form_cep')
var logradouro = document.getElementById('in_form_logradouro')
var bairro = document.getElementById('in_form_bairro')
var cidade = document.getElementById('in_form_cidade')

function pegarEndereco() {
    var script = document.createElement('script')

    script.src = `https://viacep.com.br/ws/${cep.value}/json/?callback=retornarEndereco`;

    document.body.appendChild(script);
}
 
function retornarEndereco(endereco) {
    logradouro.value = (endereco.logradouro);
    bairro.value = (endereco.bairro);
    cidade.value = (endereco.localidade)

}