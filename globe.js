// Mock data for the plotly graph and creation
var trace1 = {
  x: [1, 2, 3, 4],
  y: [10, 15, 13, 17],
  type: "scatter",
};

var trace2 = {
  x: [1, 2, 3, 4],
  y: [16, 5, 11, 9],
  type: "scatter",
};

var data2 = [trace1, trace2];

// console.log(evaluate_cmap);

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
    .onHexClick(() => dataRandomizer());
})();
