/* Set the width of the side navigation to 250px */
function openNav(id) {
  document.getElementById(id).style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav(id) {
  document.getElementById(id).style.width = "0";
}

function closePlot(id) {
  document.getElementById(id).style.width = "0";
  document.getElementById("plotButtonContainer").style.visibility = "hidden";
  document.getElementById("plot-openbtn").style.visibility = "visible";
}

function openPlot(id) {
  let screen = window.matchMedia("(max-height: 800px)");
  if (screen.matches) {
    document.getElementById(id).style.width = "1100px";
    document.getElementById(id).style.height = "600px";
  } else {
    document.getElementById(id).style.width = "600px";
    document.getElementById(id).style.height = "400px";
  }
  document.getElementById("plotButtonContainer").style.visibility = "visible";
  document.getElementById("plot-closebtn").style.visibility = "visible";
  document.getElementById("plot-openbtn").style.visibility = "hidden";
}
