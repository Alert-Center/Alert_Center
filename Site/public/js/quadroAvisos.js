/* Inserir nome do usuário que teve seu login aprovado, 
  Dados guardados no armazenamento sa sessão(Veja a pagina script.js:45)*/
nome1.innerHTML = sessionStorage.NOME_USUARIO;

// Função para deixar destacado a página atual
const list = document.querySelectorAll('.list');

function activeLink() {
  list.forEach((item) =>
    item.classList.remove('active'));
  this.classList.add('active');
}

list.forEach((item) =>
  item.addEventListener('click', activeLink));

function inserirAlerta(json, quartil, filtroTemperaturaMaior, filtroTemperaturaMenor, filtroUmidadeMaior, filtroUmidadeMenor) {
  
  var loadingAlerta = document.querySelectorAll(".loading")[quartil];
  loadingAlerta.style.display="none";
  var divAlerta = document.querySelectorAll(".quartil")[quartil];
  var validacaoUmidade;
  var validacaoTemperatura;
  var validacaoMensagemTemperatura;
  var validacaoMensagemUmidade;



  for (var i = 0; i < json.length; i++) {
    validacaoUmidade = json[i].umidade >= filtroUmidadeMenor && json[i].umidade <= filtroUmidadeMaior;
    validacaoTemperatura = json[i].temperatura >= filtroTemperaturaMenor && json[i].temperatura <= filtroTemperaturaMaior;
    validacaoMensagemTemperatura=json[i].temperatura<=22 ? `AUMENTE SUA TEMPERATURA EM ${(22-json[i].temperatura).toFixed(2)}°C`: `DIMINUA SUA TEMPERATURA EM ${(json[i].temperatura-26).toFixed(2)}°C`;
    
    validacaoMensagemUmidade=json[i].umidade<=47 ? `AUMENTE SUA UMIDADE EM ${(47-json[i].umidade).toFixed(2)}%`: `DIMINUA SUA UMIDADE EM ${(json[i].umidade-62).toFixed(2)}%`;
  
    
    divAlerta.innerHTML +=
      `<div class="alerta">
    <div class="title"><h2><iconify-icon icon="ic:outline-warning"></iconify-icon> ALERTA : ${validacaoUmidade ? "UMIDADE" : ""} ${validacaoTemperatura ? "TEMPERATURA" : ""}</h2> <div class="msg">${validacaoUmidade ? validacaoMensagemUmidade : ""} ${validacaoTemperatura ? validacaoMensagemTemperatura : ""}</div></div>
    <div class="temperatura">RACK ${json[i].identificacao}: ${validacaoTemperatura ? "TEMPERATURA: " + json[i].temperatura + "°C<br>" : ""}
    ${validacaoUmidade ? "UMIDADE:" + json[i].umidade + "%<br>" : ""}
    </div>
    <div class="time">${json[i].data}</div> 
  </div>`
  }


  }



function pegarAlerta(filtroTemperaturaMenor, filtroTemperaturaMaior, filtroUmidadeMenor, filtroUmidadeMaior, quartil) {
  fetch(`/avisos/listarAvisos`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      filtroTemperaturaMenor,
      filtroTemperaturaMaior,
      filtroUmidadeMenor,
      filtroUmidadeMaior,
      idEmpresa:sessionStorage.ID_EMPRESA,
    })
  })
    .then((resposta) => {
      resposta.json().then((json) => {  
        inserirAlerta(json, quartil, filtroTemperaturaMaior, filtroTemperaturaMenor, filtroUmidadeMaior, filtroUmidadeMenor);
      }).catch((erro) => {
        console.log(erro)
      })
    })
}
pegarAlerta(0, 18, 0, 30, 0);
pegarAlerta(19, 22, 31, 46, 1);
pegarAlerta(27, 31, 63, 79, 2);
pegarAlerta(32, 400, 80, 100, 3);

// Integração da ferramenta de Help Desk com o Site (Chat Box)
//<![CDATA[
  var ttChatLoaderS = document.createElement('script');
  document.tomticketChatLoaderScriptVersion = 2;
  ttChatLoaderS.src = 'https://ondata.tomticket.com/scripts-chat/chat.min.js'
  + '?id=EP59760'
  + '&account=3824640P16112022101310'
  + '&autoOpen=0'
  + '&hideWhenOffline=0'
  + '&d=ondata'
  + '&ts=' + new Date().getTime()
  + '&ref=' + encodeURIComponent(document.URL);
  document.body.appendChild(ttChatLoaderS);
  //]]>

