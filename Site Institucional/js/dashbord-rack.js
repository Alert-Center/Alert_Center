
// Código para configurar o eixo x do Gráfico
const labels = [
  '00:00',
  '04:00',
  '08:00',
  '12:00',
  '16:00',
  '20:00',
];


// Código para configurar Gráfico do Rack1
const rack = {
  labels: labels,
  datasets: [{
    label: 'Temperatura',

    borderColor: 'rgb(255,0, 0)',
    data: [0, 30, 25, 22, 20, 30, 21],
  },
  {
    label: 'Umidade',
    borderColor: 'rgb(00, 00, 255)',
    data: [0, 60, 70, 89, 55, 90, 100],
  }
  ]
}

// Código para configurar Gráfico do Rack2
const rackTwo = {
  labels: labels,
  datasets: [{
    label: 'Temperatura',

    borderColor: 'rgb(255,0, 0)',
    data: [0, 30, 25, 22, 20, 30, 21],
  },
  {
    label: 'Umidade',
    borderColor: 'rgb(00, 00, 255)',
    data: [0, 60, 70, 89, 55, 90, 100],
  }
  ]
}

// Código para configurar Gráfico do Rack3
const rackTree = {
  labels: labels,
  datasets: [{
    label: 'Temperatura',

    borderColor: 'rgb(255,0, 0)',
    data: [0, 23, 23, 22, 25, 27, 21],
  },
  {
    label: 'Umidade',
    borderColor: 'rgb(00, 00, 255)',
    data: [0, 22, 23, 22, 44, 90, 100],
  }
  ]
}

// Código para configurar Gráfico do Rack4
const rackFour = {
  labels: labels,
  datasets: [{
    label: 'Temperatura',

    borderColor: 'rgb(255,0, 0)',
    data: [0, 12, 19, 20, 20, 25, 22],
  },
  {
    label: 'Umidade',
    borderColor: 'rgb(00, 00, 255)',
    data: [0, 50, 30, 29, 45, 80, 100],
  }
  ]
}

// Código para modificar as cores do Eixo X e Y dos Gráficos
const options =  {
  scales:
{
  x: {
    grid:{
      color:'rgba(255,255,255,.1)'
    }

  },
  y: {
    grid: {
      color: 'rgba(255,255,255,0.5)'
    }
  }
}
};

// Inserir dados nos gráficos , informar qual o tipo de gráfico e inserir as labels e os dados definidos acima
const config =
  [
    {
      type: 'line',
      data: rack,
      options: options
    },
    {
      type: 'line',
      data: rackTwo,
      options: options,
      plugins:{
        tooltip:{
          enabled:true
        }
      }
    },

    {
      type: 'line',
      data: rackTree,
      options: options
    },

    {
      type: 'line',
      data: rackFour,
      options: options
    },
  ];

  // Renderizando Gráficos no Dashboard dos Racks
const rack1 = new Chart(document.getElementById('rack1'), config[0]);
const rack2 = new Chart(document.getElementById('rack2'), config[1]);
const rack3 = new Chart(document.getElementById('rack3'), config[2]);
const rack4 = new Chart(document.getElementById('rack4'), config[3]);