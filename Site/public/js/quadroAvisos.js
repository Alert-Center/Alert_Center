function inserirAlerta(json,quartil,filtroTemperaturaMaior,filtroTemperaturaMenor,filtroUmidadeMaior,filtroUmidadeMenor){
  console.log(json)
     var divAlerta=document.querySelectorAll(".quartil")[quartil];
     var validacaoUmidade;
     var validacaoTemperatura; 
  for(var i =0;i<json.length;i++){
     validacaoUmidade = json[i].umidade>=filtroUmidadeMenor && json[i].umidade<=filtroUmidadeMaior;
     validacaoTemperatura = json[i].temperatura>=filtroTemperaturaMenor && json[i].temperatura<=filtroTemperaturaMaior;

    divAlerta.innerHTML+=
    `<div class="alerta">
    <div class="title"><h2><iconify-icon icon="ic:outline-warning"></iconify-icon> ALERTA : ${validacaoUmidade ? "UMIDADE":""} ${validacaoTemperatura ? "TEMPERATURA":""}</h2> <div class="msg">${validacaoUmidade ? "REGULE A UMIDADE DO AMBIENTE DO DATA CENTER":""} ${validacaoTemperatura ? "REGULE A TEMPERATURA DO SEU DATA CENTER":""}</div></div>
    <div class="temperatura">RACK ${json[i].identificacao}: ${validacaoTemperatura? "TEMPERATURA: "+json[i].temperatura+"°C<br>":""}
    ${validacaoUmidade? "UMIDADE:"+json[i].umidade+"%<br>":""}
    </div>
    <div class="time">${json[i].data}</div> 
  </div>`    
   }
  }




function pegarAlerta(filtroTemperaturaMenor,filtroTemperaturaMaior,filtroUmidadeMenor,filtroUmidadeMaior,quartil){
  fetch(`/avisos/listarAvisos`,{
    method:'post',
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify({
      filtroTemperaturaMenor,
      filtroTemperaturaMaior,
      filtroUmidadeMenor,
      filtroUmidadeMaior,
    })
  })
  .then((resposta)=>{
    resposta.json().then((json)=>{
      inserirAlerta(json,quartil,filtroTemperaturaMaior,filtroTemperaturaMenor,filtroUmidadeMaior,filtroUmidadeMenor);
    }).catch((erro)=>{
      console.log(erro)
    })
  })
}
pegarAlerta(0,18,0,30,0);
pegarAlerta(19,22,31,46,1);
pegarAlerta(27,31,63,79,2);
pegarAlerta(32,400,80,100,3);



