let historico = [];

google.charts.load('current', {'packages':['corechart']});
//google.charts.setOnLoadCallback(pontos_acumulados);

function pontos_acumulados() {

  const hist = fillHist();

    console.log(hist);
/*
    var data = google.visualization.arrayToDataTable([
      ['Rodadas', 'Tales', 'Danilinho'],
      ['01',  5,      3],
      ['02',  8,      5],
      ['03',  12,       9],
      ['04',  13,      13],
      ['05',  13,       15],
      ['06',  19,       18]
  
    ]);
*/
    var data = google.visualization.arrayToDataTable(hist);

    var options = {
      title: 'Pontuação acumulada',
      curveType: 'function',
      legend: { position: 'top' }
    };
  
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  
    chart.draw(data, options);
  }

  function fillHist(){

    const resp = [];

    for(let i=-1; i<times[0].acumulado.length; i++){ // coluna
      resp.push([(i+1).toString()]);
      for(let j=0; j<times.length; j++){ // linha
        if(i<0){
          resp[i+1].push(times[j].nome);          
        }else{
          resp[i+1].push(times[j].acumulado[i]);          
        }
      }
      

    }

    return resp;

  }