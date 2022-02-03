let plotData = [];
let date = [];
let up = [];
let dn = [];

d3.csv(
  "https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv",
  function (data) {
    date.push(data.Date);
    up.push(data.up);
    dn.push(data.dn);
  }
);

let trace1 = {
  type: "scatter",
  mode: "lines",
  name: "AAPL High",
  x: date,
  y: up,
  line: { color: "#17BECF" },
};

let trace2 = {
  type: "scatter",
  mode: "lines",
  name: "AAPL Low",
  x: date,
  y: dn,
  line: { color: "#7F7F7F" },
};

plotData = [trace1, trace2];

// Function to randomize the y-axis data in the graphs upon each click and display a new graph
function dataRandomizer() {
  trace1.y = [];
  trace2.y = [];
  for (let i = 0; i < 4; i++) {
    trace1.y.push(Math.floor(Math.random() * 100));
    trace2.y.push(Math.floor(Math.random() * 100));
  }
  Plotly.newPlot("plotGraph", data2);
}

function average(trace) {
  sum = 0;
  for (let i = 0; i < trace.length; i++) {
    sum += Number(trace[i]);
  }
  return sum / trace.length;
}

function averageGraph(trace) {
  let averageTrace = {
    type: "scatter",
    mode: "lines",
    name: "Average",
    x: date,
    y: [],
    line: { color: "#17BECF" },
  };
  for (let i = 0; i < trace.length; i++) {
    averageTrace.y.push(Number(trace[i]) - average(trace));
  }

  Plotly.newPlot("plotGraph", [averageTrace, trace2]);
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
    .onHexClick(() => Plotly.newPlot("plotGraph", plotData));
})();
