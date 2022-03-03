//Global Variable Creation
let plotData = [];
let date = [];
let trace1 = {};
let trace2 = {};
let A = [];
let B = [];

//Retreiving APPL Stock CSV to load the graphs
d3.csv(
  "https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv",
  function (data) {
    date.push(data.Date);
  }
);

async function retrieveCSV(bin_id) {
  A = [];
  B = [];
  const dataA = await d3.csv("./graph-data/A_" + bin_id + ".csv");
  const dataB = await d3.csv("./graph-data/B_" + bin_id + ".csv");
  for (let i = 0; i < dataA.length; i++) {
    A.push(dataA[i].Y);
    B.push(dataB[i].Y);
  }
  console.log(A);
  originalGraph();
}

//Retrieves original graph
function originalGraph() {
  console.log(A);
  trace1 = {
    type: "scatter",
    mode: "lines",
    name: "AAPL High",
    dataClass: 0,
    x: date,
    y: A,
    line: { color: "#17BECF" },
  };

  trace2 = {
    type: "scatter",
    mode: "lines",
    name: "AAPL Low",
    dataClass: 1,
    x: date,
    y: B,
    line: { color: "#7F7F7F" },
  };
  console.log(A);
  plotData = [trace1, trace2];
  console.log(plotData);
  displayGraph(plotData);
}

//Function to plot the data into the graphs
function displayGraph(originalTraces) {
  console.log(originalTraces);
  Plotly.newPlot("plotGraph", originalTraces);
}

//Simple function to produce an average of an array
function average(trace) {
  sum = 0;
  for (let i = 0; i < trace.length; i++) {
    sum += Number(trace[i]);
  }
  return sum / trace.length;
}

//Function to produce a graph displaying the average
function averageGraph(originalTraces) {
  averageTraces = [];
  for (let i = 0; i < originalTraces.length; i++) {
    let newTrace = {
      type: "scatter",
      mode: "lines",
      name: "Average " + originalTraces[i].name,
      x: originalTraces[i].date,
      y: [],
      line: originalTraces[i].line,
    };

    for (let j = 0; j < originalTraces[i].y.length; j++) {
      newTrace.y.push(
        Number(originalTraces[i].y[j]) - average(originalTraces[i].y)
      );
    }
    averageTraces.push(newTrace);
  }
  plotData = averageTraces;
  displayGraph(plotData);
}

//Function to produce a graph displaying the subtraction between two traces
function subtractGraph(dataArray) {
  plotData = dataArray;
  if (plotData.length == 2) {
    let subtractTrace = {
      type: "scatter",
      mode: "lines",
      name: "Subtraction",
      x: date,
      y: [],
      line: { color: "#17BECF" },
    };

    for (let i = 0; i < plotData[0].y.length; i++) {
      subtractTrace.y.push(Number(plotData[0].y[i] - plotData[1].y[i]));
    }
    plotData = [subtractTrace];
    displayGraph(plotData);
  } else {
    console.log("You need atleast two traces!");
  }
}

//Function to square the current trace and display the graph
function squareGraph(originalTraces) {
  squareTraces = [];
  for (let i = 0; i < originalTraces.length; i++) {
    let newTrace = {
      type: "scatter",
      mode: "lines",
      name: "Square " + originalTraces[i].name,
      x: originalTraces[i].date,
      y: [],
      line: originalTraces[i].line,
    };

    for (let j = 0; j < originalTraces[i].y.length; j++) {
      newTrace.y.push(Math.pow(Number(originalTraces[i].y[j]), 2));
    }
    squareTraces.push(newTrace);
  }
  plotData = squareTraces;
  displayGraph(squareTraces);
}

//function to provide color mapping
function colorMap(longitude) {
  colorScale = Math.abs(longitude) / 90;
  colorMapRGB = evaluate_cmap(colorScale, "PuBu", false);

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  return rgbToHex(colorMapRGB[0], colorMapRGB[1], colorMapRGB[2]);
}

(async function () {
  // Main code to fetch the json and transcribe it to points and interative features
  const points = await fetch("./points-data/geo_bins_642.json");
  const oceans = await points.json();
  const world = Globe();
  const ref = document.getElementById("globeViz");
  world(ref)
    .globeImageUrl("./earth.png")
    .hexBinPointsData(oceans.features)
    .hexBinPointLat((d) => d.geometry.coordinates[1])
    .hexBinPointLng((d) => d.geometry.coordinates[0])
    .hexAltitude(0.001)
    .hexBinResolution(2)
    .hexMargin(0.1)
    .hexTopColor((d) => colorMap(d.points[0].geometry.coordinates[1]))
    .hexSideColor(() => "#00000")
    .hexLabel((d) => `${d.points[0].properties.bin_id}`)
    .onHexClick((d) => retrieveCSV(d.points[0].properties.bin_id));
})();
