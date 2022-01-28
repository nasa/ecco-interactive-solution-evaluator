  // Mock data for the plotly graph and creation
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

  // Function to randomize the y-axis data in the graphs upon each click and display a new graph
  function dataRandomizer(){
    trace1.y = []
    trace2.y = []
    for(let i = 0; i < 4; i++){
      trace1.y.push(Math.floor(Math.random()*100));
      trace2.y.push(Math.floor(Math.random()*100));
    }
    Plotly.newPlot('plotGraph', data)
  }

  // Main code to fetch the json and transcribe it to points and interative features
  fetch('./points-data/geo_bins_642.json').then(res => res.json()).then(oceans => {
      const ref = document.getElementById("globeViz");
      const world = Globe();
      world(ref)
        .globeImageUrl('./earth.png')
        .hexBinPointsData(oceans.features)
        .hexBinPointLat(d => d.geometry.coordinates[1])
        .hexBinPointLng(d => d.geometry.coordinates[0])
        .hexAltitude(0.001)
        .hexBinResolution(2)
        .hexMargin(0.1)
        .hexTopColor(() => `#${(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)}`)
        .hexSideColor(() => ('#00000'))
        .hexLabel(d => `${d.points[0].properties.bin_id}`)
        .onHexClick(() => dataRandomizer())
      });
