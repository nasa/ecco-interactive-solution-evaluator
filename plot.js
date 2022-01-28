//Plotly code by itself. Will be used later.
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'scatter'
  };
  
  var trace2 = {
    x: [1, 2, 3, 4],
    y: [16, 5, 11, 9],
    type: 'scatter'
  };
  
  var data = [trace1, trace2];


  export function dataRandomizer(){
    trace1.y = []
    trace2.y = []
    for(let i = 0; i < 4; i++){
      trace1.y.push(Math.floor(Math.random()*100));
      trace2.y.push(Math.floor(Math.random()*100));
    }
    Plotly.newPlot('plotGraph', data)
  }
