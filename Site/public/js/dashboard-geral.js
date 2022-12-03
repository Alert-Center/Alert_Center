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


// ----------------------------------- função para KPI --------------------------------------------------
function obterKPI(KPI, filtro) {
  var idEmpresa = sessionStorage.ID_EMPRESA;

  fetch(`/medidas/KPI/${idEmpresa}/${KPI}/${filtro}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {

        console.log(" ----------- PESQUISANDO KPI -----------");

        // Temperatura -------------------------------------------------- 
        if (filtro == 'temperatura <= 18') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoT")[0].innerHTML = resposta[0].KPI + 'ºC';
            document.querySelectorAll("#fonteT")[0].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateT")[0].innerHTML = resposta[0].dtMetrica
          }
        }
        if (filtro == 'temperatura >= 19 and temperatura <= 22') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoT")[1].innerHTML = resposta[0].KPI + 'ºC';
            document.querySelectorAll("#fonteT")[1].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateT")[1].innerHTML = resposta[0].dtMetrica
          }
        }
        if (filtro == 'temperatura >= 27 and temperatura <= 31') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoT")[2].innerHTML = resposta[0].KPI + 'ºC';
            document.querySelectorAll("#fonteT")[2].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateT")[2].innerHTML = resposta[0].dtMetrica
          }
        }
        if (filtro == 'temperatura >= 32') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoT")[3].innerHTML = resposta[0].KPI + 'ºC';
            document.querySelectorAll("#fonteT")[3].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateT")[3].innerHTML = resposta[0].dtMetrica
          }
        }
        //  -------------------------------------------------- 



        // UMIDADE -------------------------------------------------- 
        if (filtro == 'umidade <= 30') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoU")[0].innerHTML = resposta[0].KPI + '%';
            document.querySelectorAll("#fonteU")[0].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateU")[0].innerHTML = resposta[0].dtMetrica;
          }
        }
        if (filtro == 'umidade >= 31 and umidade <= 46') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoU")[1].innerHTML = resposta[0].KPI + '%';
            document.querySelectorAll("#fonteU")[1].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateU")[1].innerHTML = resposta[0].dtMetrica
          }
        }
        if (filtro == 'umidade >= 63 and umidade <= 79') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoU")[2].innerHTML = resposta[0].KPI + '%';
            document.querySelectorAll("#fonteU")[2].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateU")[2].innerHTML = resposta[0].dtMetrica
          }
        }
        if (filtro == 'umidade >= 80') {
          if (resposta[0].KPI != null) {
            document.querySelectorAll("#dadoU")[3].innerHTML = resposta[0].KPI + '%';
            document.querySelectorAll("#fonteU")[3].innerHTML = `Data Center ${resposta[0].idDataCenter} | Rack  ${resposta[0].idRack}`
            document.querySelectorAll("#dateU")[3].innerHTML = resposta[0].dtMetrica
          }
        }
        // -------------------------------------------------- 

        setTimeout(() => obterKPI(KPI, filtro), 2000);

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}


// Chamar função para atualizar as KPI's
obterKPI('min(temperatura)', 'temperatura <= 18');
obterKPI('min(temperatura)', 'temperatura >= 19 and temperatura <= 22');
obterKPI('max(temperatura)', 'temperatura >= 27 and temperatura <= 31');
obterKPI('max(temperatura)', 'temperatura >= 32');

obterKPI('min(umidade)', 'umidade <= 30');
obterKPI('min(umidade)', 'umidade >= 31 and umidade <= 46');
obterKPI('max(umidade)', 'umidade >= 63 and umidade <= 79');
obterKPI('max(umidade)', 'umidade >= 80');

// -------------------------------------------------------------------------------------







// Chart.js - 3º Gráfico - Gráfico geral de temperatura
const labels_geral_temp = ['12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00', '13:10', '13:20', '13:30', '13:40', '13:50', '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00',
];

const data_geral_temp = {
  labels: labels_geral_temp,
  datasets: [{
    label: 'Temperatura (ºC)',
    backgroundColor: '#E0211B',
    borderColor: '#E0211B',
    pointRadius: 5,
    pointBorderWidth: 1,
    pointBorderColor: 'white',
    data: [23, 24, 27, 30, 25, 22, 21, 20, 22, 20, 25, 28, 30, 32, 27, 25, 26, 25, 21],
  },
  {
    label: 'Temperatura ideal',
    backgroundColor: 'rgba(112, 255, 99, 0.25)',
  }]
};

const config_geral_temp = {
  type: 'line',
  data: data_geral_temp,
  options: {
    scales: {
      y: {
        ticks: {
          color: '#FFF'
        },
        beginAtZero: true,
        type: 'linear',
        grid: {
          color: '#FFF'
        }
      },
      x: {
        ticks: {
          color: '#FFF'
        },
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          box1: {
            type: 'box',
            yMin: 23,
            yMax: 26,
            xMin: 0,
            xMax: 18,
            backgroundColor: 'rgba(112, 255, 99, 0.25)',
          }
        }
      },
      title: {
        display: true,
        text: 'Temperatura média do data center 1 no dia 12/10/2022',
        align: 'start',
        fullSize: false,
        color: '#FFF',
        font: {
          size: 20,
          weight: 600,
          lineHeight: 1.0,
        }
      }
    },
  }
};

const myChart_geral_temp = new Chart(
  document.getElementById('chart-geral-temp'),
  config_geral_temp
);


// Chart.js - 4º Gráfico - Gráfico geral de umidade
Chart.defaults.font.color = 'black';
const labels_geral_umid = ['12:00', '12:10', '12:20', '12:30', '12:40', '12:50', '13:00', '13:10', '13:20', '13:30', '13:40', '13:50', '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00',
];

const data_geral_umid = {
  labels: labels_geral_umid,
  datasets: [{
    label: 'Umidade (%)',
    backgroundColor: '#078BEE',
    borderColor: '#078BEE',
    pointRadius: 5,
    pointBorderWidth: 1,
    pointBorderColor: 'white',
    data: [62, 58, 60, 55, 57, 56, 61, 63, 64, 67, 68, 66, 62, 59, 56, 55, 57, 59, 60],
  },
  {
    label: 'Umidade ideal',
    backgroundColor: 'rgba(112, 255, 99, 0.25)',
  }]
};

// Linha horizontal de parâmetro

yAxes: [{
  display: true,
  gridLines: {
    color: '#fff'
  },
  ticks: {
    fontColor: 'black' // aqui branco
  },
}]

const config_geral_umid = {
  type: 'line',
  data: data_geral_umid,
  options: {
    scales: {
      y: {
        ticks: {
          color: '#FFF'
        },
        beginAtZero: true,
        type: 'linear',
        grid: {
          color: '#FFF'
        }
      },
      x: {
        ticks: {
          color: '#FFF'
        },
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      autocolors: false,
      annotation: {
        annotations: {
          box1: {
            type: 'box',
            yMin: 47,
            yMax: 62,
            xMin: 0,
            xMax: 18,
            backgroundColor: 'rgba(112, 255, 99, 0.25)'
          }
        }
      },
      title: {
        display: true,
        text: 'Umidade média do data center 1 no dia 12/10/2022',
        align: "start",
        fullSize: false,
        color: '#FFF',
        font: {
          size: 20,
          weight: 600,
          lineHeight: 1.0,
        }
      }
    },
  }
};

const myChart_geral_umid = new Chart(
  document.getElementById('chart-geral-umid'),
  config_geral_umid
);