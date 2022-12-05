// Toda vez que eu chamar o submit do formulario do simulador fincanceiro eu chamo a função de criarSimulacao com event por padrão!
document.getElementById("form_1").addEventListener('submit', criarSimulacao);

// Função para Criar Simulação de acordo com os valores que o usuario inseriu
function criarSimulacao(event) {
  // Função para evitar de atualizar a pagina
  event.preventDefault();
//Quantidade de racks para definir o custo de instalação
var racks = Number(in_racks.value);

//Quantidade de horas de downtime por mes e por ano
var inatividadeAnual = Number(in_inatividade.value);
var inatividadeMes = inatividadeAnual / 12;

//A receita vem em um ano, então informar a receita em uma hora
var receitaAnual = Number(in_receita.value);
var receitaHora = receitaAnual / 12 / 30 / 24;

// O prejuizo é a soma da perda de Receita com a perda produtividade
var prejuizoMes = inatividadeMes * receitaHora + inatividadeMes;
var prejuizoAno = inatividadeAnual * receitaHora + inatividadeAnual;

//Custo da nossa solução
var solucaoinstalacao = racks * 300; //300 reais por Rack (200 equipamento + 100 mão de obra)
var solucaoMensal = 600; //Custo do software de 600 reais mensais
var licenca_anual = 600 * 12; //Custo do software em um ano
var solucaoAnual = solucaoinstalacao + licenca_anual; //Custo da solução em um ano;

//Economia do Cliente é o quanto ele perde pelo quanto nossa solução custa (ou seja, o quanto ele evita de gastar)
var economiaMes1 = prejuizoMes - (solucaoMensal + solucaoinstalacao); //Primeiro mês há o custo da instalação
var economiaMeses = prejuizoMes - solucaoMensal; //Demais meses
var economiaAno = prejuizoAno - solucaoAnual; //Economia anual



  if (receitaAnual == "" || inatividadeAnual == "" || racks == "") {
      alert("Preencha todos os campos!");
  } else {

      //Efeito de esconder o container
      container_simulador.classList.add("hide")
      //Espere 500ms (o tempo da transition hide) para executar o resto da função
      setTimeout(function () {

          // Configuração para formatar números pelo método Intl.NumberFormat. https://criarprogramas.com/2021/06/05/formatando-numeros-em-javascript-com-intl-numberformat/#:~:text=Usando%20o%20par%C3%A2metro%20options&text=style%3A%20estilo%20do%20formato%20a,o%20padr%C3%A3o%20%C3%A9%20%22decimal%22%20.
          const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }
          const formatNumber = new Intl.NumberFormat('pt-BR', options)

          // Código para inserir a div com o resultado da conta do simulador
          container_simulador.innerHTML =
              `
                  <div class="container container-solucao" id="container_simulador1">
                      <div class="content-simulador">
                          <div class="container">

                              <div class="indicadores">
                                  <h1>Prejuízo</h1>
                                  <div class="indicador">
                                      <div class="title">
                                          <h2>Mensal</h2>
                                      </div>

                                      <div id="div_prejuizoMes" class="number prejuizo">${formatNumber.format(prejuizoMes)}</div>
                                  </div>

                                  <div class="indicador">
                                      <div class="title">
                                          <h2>Anual</h2>
                                      </div>

                                      <div id="div_prejuizoAno" class="number prejuizo">${formatNumber.format(prejuizoAno)}</div>
                                  </div>
                              </div>

                              <div class="indicadores">
                                  <h1>Solução</h1>
                                  <div class="indicador">
                                      <div class="title">
                                          <h2>Instalação</h2>
                                      </div>
                                  
                                      <div id="div_solucaoinstalacao" class="number">${formatNumber.format(solucaoinstalacao)}</div>
                                  </div>

                                  <div class="indicador">
                                      <div class="title">
                                          <h2>Licença Anual</h2>
                                      </div>

                                      <div id="div_licenca_anual" class="number">${formatNumber.format(licenca_anual)}</div>
                                  </div>
                              </div>

                              <div class="indicadores">
                                  <h1>Economia</h1>
                                  <div class="indicador">
                                      <div class="title">
                                          <h2>Mensal*</h2>
                                      </div>

                                      <div id="div_economiaMeses" class="number">${formatNumber.format(economiaMeses)}</div>
                                  </div>

                                  <div class="indicador">
                                      <div class="title">
                                          <h2>Anual</h2>
                                      </div>
                                  
                                      <div id="div_economiaAno" class="number">${formatNumber.format(economiaAno)}</div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div class="content-legenda">
                          <div class="container">
                              <div class="legenda">
                                  <img src="img/simulador/bx_trending-down.png">
                                  <p><span>Prejuízo: </span> compreende os gastos advindos dos downtimes.
                                  <p>
                              </div>

                              <div class="legenda">
                                  <img src="img/simulador/carbon_idea.png">
                                  <p><span>Solução: </span>engloba a análise de infraestrutura, instalação de equipamentos e a
                                      licença
                                      anual para acesso do sistema de monitoramento</p>
                              </div>
                              
                              <div class="legenda">
                                  <img src="img/simulador/bx_trending-up.png">
                                  <p><span>Economia:</span> representa o montante de gastos que foram poupados.</p>
                              </div>
                              
                              <div class="legenda">
                                  <img src="img/simulador/icons8-ponto-de-exclamação-64.png">
                                  <p><span> * No 1º mês</span> o valor será de ${formatNumber.format(economiaMes1)} por incluir o preço da instalação.
                                  </p>
                              </div>
                          </div>
                      </div>

                      <button class="btn btn-refazer" onclick="refazerSimulacao()">Refazer Simulação</button>
                  </div>
              `;

          //Trocar quando esconde para quando aparece
          container_simulador.classList.replace("hide", "appear")

          // Adicionar uma cor ao número dependendo se a economia for positiva ou negativa
          if (economiaMeses < 0) {
              div_economiaMeses.classList.add("prejuizo");
          } else {
              div_economiaMeses.classList.add("economia");
          }
          if (economiaAno < 0) {
              div_economiaAno.classList.add("prejuizo");
          } else {
              div_economiaAno.classList.add("economia");
          }
      }, 500);
  }
}

// Função para voltar a div ao seu estado inicial
function refazerSimulacao() {
    location.reload();
}

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