google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(pontos);

function pontos() {
  var data = google.visualization.arrayToDataTable([
    ['Rodadas', 'Tales', 'Danilinho'],
    ['01',  1000,      400],
    ['02',  800,      460],
    ['03',  660,       600],
    ['04',  1030,      540],
    ['05',  660,       1120],

    ['27',  660,       1120]

  ]);

  var options = {
    title: 'Pontuação por Rodada',
    curveType: 'function',
    legend: { position: 'top' }
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}

function pontos_acumulados() {
    var data = google.visualization.arrayToDataTable([
      ['Rodadas', 'Tales', 'Danilinho'],
      ['01',  5,      3],
      ['02',  8,      5],
      ['03',  12,       9],
      ['04',  13,      13],
      ['05',  13,       15],
      ['06',  19,       18]
  
    ]);
  
    var options = {
      title: 'Pontuação acumulada',
      curveType: 'function',
      legend: { position: 'top' }
    };
  
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  
    chart.draw(data, options);
  }