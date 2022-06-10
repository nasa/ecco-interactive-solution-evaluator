//JQuery Code:
//Primary use of JQuery code is to populate side navigation bar/drawer based on config.json

//Automatic function to precreate the base drawer to select dataset categories
//Note: JQuery utilizes $ notation. Important to familarize yourself with JQuery
(async function () {
  $(document).ready(function () {
    //Base drawer creation
    let drawer = $("#plotNav");
    drawer.empty();

    drawer.append(`<h2 class="sidenav-title">Data</h2>`);
    drawer.append(
      `<ion-icon name="close-outline" class="closebtn" onclick="closeNav('plotNav')"></ion-icon>`
    );

    datasets = {};
    //Retrieve JSON function
    $.getJSON("./datasets/config.json", function (data) {
      $.each(data, function (key, entry) {
        drawer.append(
          $("<a></a>")
            .attr("onclick", `createDatasetDrawer('${JSON.stringify(entry)}}')`)
            .text(entry.parameter_longName)
        );
      });
      //Automatically create a dataset drawer
      createDefaultDrawer(data);
    });
    // Attempt to make the current selected anchor tag glow
    // let sideNavAnchor = drawer.children();
    // sideNavAnchor.on("click", function () {
    //   console.log("sup");
    // });
  });
})();

//Function to create a dataset drawer. Note that the default will always be the first category in the JSON and the selected dataset is the first dataset in the category
//Function takes in the JSON file
function createDefaultDrawer(data) {
  //Takes only the first category/object
  defaultData = data[0];
  $(document).ready(function () {
    //Create the category drawer
    let drawer = $("#plotNav");
    let datasetId = defaultData.parameter_longName.replaceAll(" ", "-");
    drawer
      .after(
        $("<div></div>")
          .attr({
            id: datasetId,
            class: "sidenav",
          })
          .append(
            `<h2 class="sidenav-title">${defaultData.parameter_longName}</h2>`
          )
          .append(
            `<ion-icon name="close-outline" class="closebtn" onclick="closeNav('${datasetId}')"></ion-icon>`
          )
      )
      .after(
        defaultData.category.forEach((dataset) => {
          $(`#${datasetId}`).append(
            $("<a></a>")
              .text(dataset.dataset_shortTitle)
              .attr({
                id: "datasetText",
                onclick: `retrieveCSV('${defaultData.parameter_longName}','${dataset.dataset_shortTitle}')`,
              })
          );
        })
      )
      .after(openNav(`${datasetId}`));
    let firstDataset = defaultData.category[0].dataset_shortTitle;
    //Function shown in globe.js to notify the global variables what is the preset default
    setDefault(defaultData.parameter_longName, firstDataset);
  });
}
//Function to create a category drawer. Important to note this function only triggers when a user selects a category, only creates then.
function createDatasetDrawer(payload) {
  const data = JSON.parse(payload.slice(0, -1));
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
          $(`#${datasetId}`).append(
            $("<a></a>")
              .text(dataset.dataset_shortTitle)
              .attr({
                id: "datasetText",
                onclick: `retrieveCSV('${data.parameter_longName}','${dataset.dataset_shortTitle}')`,
              })
          );
        })
      )
      .after(openNav(`${datasetId}`));
    //for each function to remove dataset category div duplicates
    $(`#${datasetId}`).each(function () {
      let $ids = $("[id=" + this.id + "]");
      if ($ids.length > 1) {
        $ids.not(":first").remove();
      }
    });
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
//Function to close / move the display plot
function closePlot(id) {
  document.getElementById(id).style.width = "0";
  document.getElementById("plotButtonContainer").style.visibility = "hidden";
  document.getElementById("plot-openbtn").style.visibility = "visible";
}
//Function to open / show the plot
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
