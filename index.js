(async function () {
  const response = await fetch("./datasets/config.json");
  const food = await response.json();

  $(document).ready(function () {
    let drawer = $("#plotNav");
    drawer.empty();

    drawer.append(`<h2 class="sidenav-title">Data</h2>`);
    drawer.append(
      `<ion-icon name="close-outline" class="closebtn" onclick="closeNav('plotNav')"></ion-icon>`
    );

    datasets = {};
    // $.getJSON("./datasets/config.json", function (data) {
    //   $.each(data, function (key, entry) {
    //     drawer.append(
    //       $("<a></a>")
    //         .attr("onclick", `openNav('${entry.parameter_longName}')`)
    //         .text(entry.parameter_longName)
    //     );

    //     drawer.after(
    //       $("<div></div>")
    //         .attr({
    //           id: `${entry.parameter_longName}`,
    //           class: "sidenav",
    //         })
    //         .append(`<h2 class="sidenav-title">${entry.parameter_longName}</h2>`)
    //         .append(
    //           `<ion-icon name="close-outline" class="closebtn" onclick="closeNav('${entry.parameter_longName}')"></ion-icon>`
    //         )
    //     );
    //   });
    // });

    $.getJSON("./datasets/config.json", function (data) {
      $.each(data, function (key, entry) {
        drawer.append(
          $("<a></a>")
            .attr("onclick", `createDatasetDrawer('${JSON.stringify(entry)}}')`)
            .text(entry.parameter_longName)
        );
      });
    });
  });
})();

function createDatasetDrawer(payload) {
  const data = JSON.parse(payload.slice(0, -1));
  console.log(data.parameter_longName);
  $(document).ready(function () {
    let drawer = $("#plotNav");
    let datasetId = data.parameter_longName.replaceAll(" ", "-");
    drawer
      .after(
        $("<div></div>")
          .attr({
            id: datasetId,
            class: "sidenav",
          })
          .append(`<h2 class="sidenav-title">${data.parameter_longName}</h2>`)
          .append(
            `<ion-icon name="close-outline" class="closebtn" onclick="closeNav('${datasetId}')"></ion-icon>`
          )
      )
      .after(
        data.category.forEach((dataset) => {
          console.log(data.parameter_longName);
          $(`#${datasetId}`).append(
            $("<a></a>")
              .text(dataset.dataset_shortTitle)
              .attr(
                "onclick",
                `retrieveCSV('${data.parameter_longName}','${dataset.dataset_shortTitle}','${bin_id}')`
              )
          );
        })
      )
      .after(openNav(`${datasetId}`));
  });
}

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
    document.getElementById(id).style.width = "1170px";
    document.getElementById(id).style.height = "600px";
  } else {
    document.getElementById(id).style.width = "1650px";
    document.getElementById(id).style.height = "750px";
  }
  document.getElementById("plotButtonContainer").style.visibility = "visible";
  document.getElementById("plot-closebtn").style.visibility = "visible";
  document.getElementById("plot-openbtn").style.visibility = "hidden";
}
