// /* Inserir nome do usuário que teve seu login aprovado, 
// Dados guardados no armazenamento sa sessão(Veja a pagina script.js:45)*/
nome.innerHTML = sessionStorage.NOME_USUARIO;
nome1.innerHTML = sessionStorage.NOME_USUARIO;

var grafico = 1

let proximaAtualizacao;

function obterDadosGrafico(idDataCenter, idRack, idSensor) {

  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  var idEmpresa = sessionStorage.ID_EMPRESA;

  fetch(`/medidas/ultimas/${idEmpresa}/${idDataCenter}/${idRack}/${idSensor}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {

        // var dataSemFormato = resposta[0].dtMetrica.slice(5, 10);
        // dataSemFormato = dataSemFormato.split('-');

        // var dataFormatada = `${dataSemFormato[1]} / ${dataSemFormato[0]}`

        // document.getElementById(`rack${idRack}Data`).innerHTML = dataFormatada;

        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

        plotarGrafico(resposta, idEmpresa, idDataCenter, idRack, idSensor);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGrafico(resposta, idEmpresa, idDataCenter, idRack, idSensor) {
  console.log('iniciando plotagem do gráfico...');
  console.log(resposta);
  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: labels,
    datasets: [{
      label: 'Temperatura (ºC)',
      backgroundColor: '#E0211B',
      borderColor: '#E0211B',
      pointRadius: 5,
      pointBorderWidth: 1,
      pointBorderColor: 'white',
      data: [],
    },
    {
      label: 'Umidade (%)',
      backgroundColor: '#078BEE',
      borderColor: '#078BEE',
      pointRadius: 5,
      pointBorderWidth: 1,
      pointBorderColor: 'white',
      data: [],
    }
    ]
  };


  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    if (chart == 2) {
      registro.temperatura += 20;
      registro.umidade += 20;
    }

    labels.push(registro.dtMetrica);

    dados.datasets[0].data.push(registro.temperatura);
    dados.datasets[1].data.push(registro.umidade);
  }

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log(`RACK : ${idRack}`)
  console.log('Labels:')
  console.log(labels)
  console.log('Dados:')
  console.log(dados.datasets)
  console.log('----------------------------------------------')


  // Código para modificar as cores do Eixo X e Y dos Gráficos
  const options = {
    scales:
    {
      x: {
        grid: {
          color: 'rgba(255,255,255,.1)'
        },
        ticks: {
          color: '#FFF'
        }

      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.5)'
        },
        ticks: {
          color: '#FFF'
        },
      }
    }
  };



  // Criando estrutura para plotar gráfico - config
  // Inserir dados nos gráficos , informar qual o tipo de gráfico e inserir as labels e os dados definidos acima
  var config = {
    type: 'line',
    data: dados,
    options: options
  };

  // Adicionando gráfico criado em div na tela

  let myChart = new Chart(
    document.getElementById(`rack${grafico}`),
    config
  );

  var chart = grafico;
  setTimeout(() => atualizarGrafico(idEmpresa, idDataCenter, idRack, idSensor, dados, myChart, chart), 2000);
  console.log(chart, 'CHARTRTTTTTTTT');
  grafico = 2;
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas,

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models


function atualizarGrafico(idEmpresa, idDataCenter, idRack, idSensor, dados, myChart, chart) {
  console.log(chart, 'CHARTRTTTTTTTT');
  fetch(`/medidas/tempo-real/${idEmpresa}/${idDataCenter}/${idRack}/${idSensor}/${chart}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (novoRegistro) {

        console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
        console.log(`Dados atuais do gráfico:`);
        console.log(dados);

        // document.getElementById("avisoCaptura").innerHTML = ""

        if (novoRegistro[0].dtMetrica == dados.labels[dados.labels.length - 1]) {
          console.log("---------------------------------------------------------------")
          console.log("Como não há dados novos para captura, o gráfico não atualizará.")

          document.getElementsByName("semDadosNovos")[0].style.display = "block";
          document.getElementsByName("semDadosNovos")[1].style.display = "block";
          
          console.log("Horário do novo dado capturado:")
          console.log(novoRegistro[0].dtMetrica)
          console.log("Horário do último dado capturado:")
          console.log(dados.labels[dados.labels.length - 1])
          console.log("---------------------------------------------------------------")
        } else {
          document.getElementsByName("semDadosNovos")[0].style.display = "none";
          document.getElementsByName("semDadosNovos")[1].style.display = "none";

          // tirando e colocando valores no gráfico
          dados.labels.shift(); // apagar o primeiro
          dados.labels.push(novoRegistro[0].dtMetrica); // incluir um novo momento

          dados.datasets[1].data.shift();  // apagar o primeiro de umidade
          dados.datasets[1].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

          dados.datasets[0].data.shift();  // apagar o primeiro de temperatura
          dados.datasets[0].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

          myChart.update();
        }

        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao = setTimeout(() => atualizarGrafico(idEmpresa, idDataCenter, idRack, idSensor, dados, myChart, chart), 2000);
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
      // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
      proximaAtualizacao = setTimeout(() => atualizarGrafico(idEmpresa, idDataCenter, idRack, idSensor, dados, myChart), 2000);
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}


//função para criar dropdown
function alternarMenu() {
  subMenu.classList.toggle("open-menu")
}


obterDadosGrafico(1, 1, 1);
obterDadosGrafico(1, 1, 1);