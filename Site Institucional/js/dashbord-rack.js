const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};

const rack1 = new Chart(document.getElementById('rack1'),config);
const rack2 = new Chart(document.getElementById('rack2'),config);
const rack3 = new Chart(document.getElementById('rack3'),config);
const rack4 = new Chart(document.getElementById('rack4'),config);