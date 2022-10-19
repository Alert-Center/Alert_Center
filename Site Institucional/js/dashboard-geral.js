  /* Inserir nome do usuário que teve seu login aprovado, 
  Dados guardados no armazenamento sa sessão(Veja a pagina script.js:45)*/
  nome1.innerHTML = sessionStorage.getItem(0);
  nome.innerHTML = sessionStorage.getItem(0);

// Função para criar navbar dropdown
var subMenu = document.getElementById("subMenu")

function alternarMenu() {
  subMenu.classList.toggle("open-menu")
}

// Chart.js - 1º Gráfico - Temperatura racks
const labels_rack = [
  'Rack 1',
  'Rack 2',
  'Rack 3',
  'Rack 4',
  'Rack 5',
  'Rack 6',
  'Rack 7',
]

const data_rack = {
  labels: labels_rack,
  datasets: [{
    label: 'Temperatura (ºC)',
    backgroundColor:'rgba(75, 192, 192)',
    borderColor: '#E0211B',
    data: [19, 21, 20, 19, 20, 17, 23],
  }]
};

const config_rack = {
  type: 'bar',
  data: data_rack,
  options: {
    scales: {
      y: {
        ticks: {
          color: '#FFF'
        }
      },
      x: {
        beginAtZero: true,
        type: 'linear',
        grid: {
          color: '#FFF'
        },
        ticks: {
          color: '#FFF'
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Temperatura dos racks do data center 1 no dia 10/10/2022',
        align: "start",
        color: '#FFF',
        font: {
          size: 20,
          weight: 600,
          lineHeight: 1.0,
        }
      }
    },
    indexAxis: 'y',
  },
};

const myChart_rack = new Chart(
  document.getElementById('chart-relatorio-rack'),
  config_rack
);


// Chart.js - 2º Gráfico - Relatório Downtimes 
const labels_downtimes = [
  'Jan',
  'Fev',
  'Mar',
  'Abri',
  'Mai',
  'Jun',
  'Jul',
]

const data_downtimes = {
  labels: labels_downtimes,
  datasets: [{
    label: 'Downtimes',
    backgroundColor: '#078BEE',
    borderColor: '#078BEE',
    data: [5, 8, 6, 10, 3, 9, 4],
  }]
};

const config_downtimes = {
  type: 'bar',
  data: data_downtimes,
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
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Ocorrência de downtimes no 1º semestre do ano de 2022',
        align: "start",
        color: '#FFF',
        font: {
          size: 20,
          weight: 600,
          lineHeight: 1.0,
        }
      }
    },
  },
};

const myChart_downtime = new Chart(
  document.getElementById('chart-relatorio-downtime'),
  config_downtimes
);

// Chart.js - 3º Gráfico - Gráfico geral de temperatura
const labels_geral_temp = ['12:00','12:10','12:20','12:30', '12:40', '12:50', '13:00', '13:10', '13:20', '13:30', '13:40', '13:50', '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00',
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
const labels_geral_umid = ['12:00','12:10','12:20','12:30', '12:40', '12:50', '13:00', '13:10', '13:20', '13:30', '13:40', '13:50', '14:00', '14:10', '14:20', '14:30', '14:40', '14:50', '15:00',
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