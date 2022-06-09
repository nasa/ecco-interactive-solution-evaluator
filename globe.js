//Global Variable Creation
let plotData = [];
let date = [];
let trace1 = {};
let trace2 = {};
let layout = {};
let A = [];
let B = [];
let measurement = "";
let bin_id = -1;
let dataset = "GHRSST 0.25deg daily";
let category = "Sea Surface Temperature";

function retrieveBinId(currBin_id) {
  bin_id = currBin_id;
  retrieveCSV(category, dataset);
}

async function retrieveCostCSV(currCategory, currDataset) {
  let cost = [];
  const costData = await d3.csv(
    "./stats/" + currCategory + "/" + currDataset + "/Cost.csv"
  );
  for (let i = 0; i < costData.length; i++) {
    cost.push(costData[i].Cost);
  }
  globeRender(cost);
}

async function retrieveCSV(currCategory, currDataset) {
  if (currDataset != dataset) {
    retrieveCostCSV(currCategory, currDataset);
  }
  category = currCategory;
  dataset = currDataset;
  if (bin_id == -1) {
    alert("Please select a geodesic cell");
  } else {
    A = [];
    B = [];
    date = [];
    const dataA = await d3.csv(
      "./graph-data/" + category + "/" + dataset + "/Model/" + bin_id + ".csv"
    );
    const dataB = await d3.csv(
      "./graph-data/" +
        category +
        "/" +
        dataset +
        "/Observed/" +
        bin_id +
        ".csv"
    );
    measurement = dataA.columns[2];
    for (let i = 0; i < dataA.length; i++) {
      A.push(dataA[i][measurement]);
      B.push(dataB[i][measurement]);
      date.push(dataA[i].Time);
    }
    originalGraph();
  }
}
function setDefault(currCategory, currDataset) {
  dataset = currDataset;
  category = currCategory;
}
//Retrieves original graph
function originalGraph() {
  trace1 = {
    type: "scatter",
    mode: "lines",
    name: measurement + " Model",
    dataClass: 0,
    x: date,
    y: A,
    line: { color: "#17BECF" },
  };

  trace2 = {
    type: "scatter",
    mode: "lines",
    name: measurement + " Observed",
    dataClass: 1,
    x: date,
    y: B,
    line: { color: "#7F7F7F" },
  };
  plotData = [trace1, trace2];
  layout = {
    showlegend: true,
    legend: {
      orientation: "h",
      traceorder: "normal",
      y: -0.25,
    },
    title: {
      text: dataset + " " + bin_id,
      font: {
        family: "Courier New, monospace",
        size: 24,
      },
      xref: "paper",
      x: 0.05,
    },
    xaxis: {
      title: {
        text: "Date",
        font: {
          family: "Courier New, monospace",
          size: 18,
          color: "#7f7f7f",
        },
      },
    },
    yaxis: {
      title: {
        text: measurement,
        font: {
          family: "Courier New, monospace",
          size: 18,
          color: "#7f7f7f",
        },
      },
    },
  };

  displayGraph(plotData, layout);
}

//Function to plot the data into the graphs
function displayGraph(originalTraces, graphLayout) {
  openPlot("plotGraph");
  Plotly.newPlot("plotGraph", originalTraces, graphLayout);
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
      x: date,
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
  displayGraph(plotData, layout);
}

//Function to produce a graph displaying the subtraction between two traces
function subtractGraph(dataArray) {
  plotData = dataArray;
  let subtractTrace = {
    type: "scatter",
    mode: "lines",
    name: "Subtract" + " " + plotData[0].name.replace("Model", "Trace"),
    x: date,
    y: [],
    line: { color: "#17BECF" },
  };
  if (plotData.length == 2) {
    for (let i = 0; i < plotData[0].y.length; i++) {
      subtractTrace.y.push(Number(plotData[0].y[i] - plotData[1].y[i]));
    }
    plotData = [subtractTrace];
    displayGraph(plotData, layout);
  } else {
    alert("You need atleast two traces!");
  }
  console.log(plotData);
}

//Function to square the current trace and display the graph
function squareGraph(originalTraces) {
  squareTraces = [];
  for (let i = 0; i < originalTraces.length; i++) {
    let newTrace = {
      type: "scatter",
      mode: "lines",
      name: "Square " + originalTraces[i].name,
      x: date,
      y: [],
      line: originalTraces[i].line,
    };

    for (let j = 0; j < originalTraces[i].y.length; j++) {
      newTrace.y.push(Math.pow(Number(originalTraces[i].y[j]), 2));
    }
    squareTraces.push(newTrace);
  }
  plotData = squareTraces;
  displayGraph(squareTraces, layout);
  console.log(plotData);
}

//function to provide color mapping
function colorMap(bin_id, cost) {
  //TODO: call the globe render function upon dataset click, fix UI to show default dataset, add dropdown bars for model traces and type of cost, fix jquery duplicate drawer creation
  maxValue = Math.max(...cost);
  colorScale = Math.abs(cost[bin_id]) / maxValue;
  colorMapRGB = evaluate_cmap(colorScale, "OrRd", false);
  return rgbToHex(colorMapRGB[0], colorMapRGB[1], colorMapRGB[2]);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

async function globeRender(cost) {
  // Main code to fetch the json and transcribe it to points and interative features
  const points = await fetch("./points-data/geo_bins_642.json");
  const oceans = await points.json();
  const world = Globe();
  const ref = document.getElementById("globeViz");
  world(ref)
    .globeImageUrl("./assets/earth.png")
    .pointsData(oceans.features)
    .pointLat((d) => d.geometry.coordinates[1])
    .pointLng((d) => d.geometry.coordinates[0])
    .pointLabel((d) => `${d.properties.bin_id}`)
    .pointColor((d) => colorMap(d.properties.bin_id, cost))
    .pointAltitude(0.001)
    .pointRadius(1)
    .onPointClick((d) => retrieveBinId(d.properties.bin_id));
}
retrieveCostCSV(category, dataset);
