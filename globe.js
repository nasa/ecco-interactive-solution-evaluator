let plotData = [];
let date = [];
let up = [];
let dn = [];
let trace1 = {};
let trace2 = {};

d3.csv(
  "https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv",
  function (data) {
    date.push(data.Date);
    up.push(data.up);
    dn.push(data.dn);
  }
);

function originalGraph() {
  trace1 = {
    type: "scatter",
    mode: "lines",
    name: "AAPL High",
    x: date,
    y: up,
    line: { color: "#17BECF" },
  };

  trace2 = {
    type: "scatter",
    mode: "lines",
    name: "AAPL Low",
    x: date,
    y: dn,
    line: { color: "#7F7F7F" },
  };

  displayGraph(trace1, trace2);
}

function displayGraph(t1, t2) {
  trace1 = {
    type: "scatter",
    mode: "lines",
    name: t1.name,
    x: date,
    y: t1.y,
    line: { color: "#17BECF" },
  };

  trace2 = {
    type: "scatter",
    mode: "lines",
    name: t2.name,
    x: date,
    y: t2.y,
    line: { color: "#7F7F7F" },
  };

  plotData = [trace1, trace2];

  Plotly.newPlot("plotGraph", plotData);
}

function average(trace) {
  sum = 0;
  for (let i = 0; i < trace.length; i++) {
    sum += Number(trace[i]);
  }
  return sum / trace.length;
}

function averageGraph(trace1, trace2) {
  let averageTrace1 = {
    type: "scatter",
    mode: "lines",
    name: "Average APPL High",
    x: date,
    y: [],
    line: { color: "#17BECF" },
  };

  let averageTrace2 = {
    type: "scatter",
    mode: "lines",
    name: "Average APPL Low",
    x: date,
    y: [],
    line: { color: "#7F7F7F" },
  };
  for (let i = 0; i < trace1.length; i++) {
    averageTrace1.y.push(Number(trace1[i]) - average(trace1));
  }

  for (let i = 0; i < trace2.length; i++) {
    averageTrace2.y.push(Number(trace2[i]) - average(trace2));
  }

  displayGraph(averageTrace1, averageTrace2);
}

function subtractGraph(trace1, trace2) {
  let subtractTrace = {
    type: "scatter",
    mode: "lines",
    name: "Subtraction",
    x: date,
    y: [],
    line: { color: "#17BECF" },
  };

  let emptyTrace = {
    type: "scatter",
    mode: "lines",
    name: "N/A",
    x: date,
    y: [],
    line: { color: "#17BECF" },
  };

  for (let i = 0; i < trace1.length; i++) {
    subtractTrace.y.push(Number(trace1[i] - trace2[i]));
  }
  console.log(subtractTrace.y);
  displayGraph(subtractTrace, emptyTrace);
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
    .onHexClick(() => originalGraph());
})();
