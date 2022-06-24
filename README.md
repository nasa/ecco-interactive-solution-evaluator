# ecco-interactive-solution-evaluator

ECCO Interactive Solution Evaluator

Learn More about ECCO: https://www.ecco-group.org/

This tool is utilized to help ocean scientists analyze and evaluate oceanic data collected from monitors and satellites. This facilitates their daily tasks.

## Setup

- Clone and Pull Github Repo
- Install Node.js: https://nodejs.org/en/
- The Node version utilized is `v16.13.1` (You can type node -v in your terminal to see what version you have)
- If you use NVM you can type `nvm install 16.13.1`
- IMPORTANT: Make sure to have the exact version of Node
- Type `npm install` in the terminal to pull all the necessary dependecies
- Note: Most of the libraries and dependecies are utilizing the script tag and are client side
- Download this [zip](https://figshare.com/articles/dataset/ECCO-ISE_Sample_Data/20054285) file. Inside it contains two folders `graph-data` and `stats`
- Insert the two files into the root of the folder (ECCO-Interactive-Solution-Evaluator)
- Type `npm start` to run a localhost version of the application

## Docker

A Docker image can be built and run with: `docker-compose up`

## Brief Overview 06/10/2022

- The application can be split into three parts: The Globe, The Plot, The Drawer

### The Globe

- The globe is interactive and rerenders based on dataset change currently
- Those 'polkadots/coordinates/geodesic bins' are areas a user can click and select to measure
- Upon clicking and selecting a dataset, note: there is a default dataset selected upon loading, a plot will show up

### The Plot

- Upon selecting a dataset and a bin, a plot will show up
- A user can do numerous features such as zoom in, screen shot, fullscreen, etc
- The key feature are the operational buttons on the bottom.
- A user can subtract, average, square, and return to the original as operational buttons
- A user can also hide and show the plot

### The Drawer

- The side navigation bar on the left is known as the dataset drawer
- Upon reloading or first view, the drawer is set to a default. Typically it is the first category and first dataset within that category in the config.json file
- A user can exit out of the default drawer and open one with the hamburger button on the top left
- A user will then be prompted with a category drawer to decide what category to select
- Each category will open its own seperate drawer filled with its own datasets
- A user can change/select a dataset which will cause a rerender of the globe bin's colors and a plot display

## Additional Information

### Data Folders

- The `graph-data` folder is the folder than contains all of the CSV data for the plots
- The `graph-data` folder is ordered by graph-data > category > dataset > model or observed > 0-641 csv files. The file number pertains to the bin id
- The `stats` folder contains the 'costs' csv data for the globe bin colors
- The `stats` folder is ordered by stats > category > dataset > cost.csv
- Note that the `stats` folder should be altered to stats > category > dataset > cost > csv

### Scripts

- The folder labeled scripts contains python scripts that generate sample data
- The script labeled cost-creation.py creates the cost csvs.
- The script labeled csv-creation.py creates the graph csvs.
- It is important to note that some code is hardcoded, the header name, the date range, the route, and etc. Upon creating a new file, make sure the hardcoded data matches up with what you want
- It is also important to keep the organization of the data the same. Refer to the data folders.

### Config.JSON

- The config.JSON file contains all of the categories (objects) and datasets (objects inside an object) that will be utilized in this application.
- Currently, it is used to populate the drawer and to create a default dataset
- The JSON file contains objects (those are the categories i.e. Sea Surface Salinity)
- Those category objects contain datasets (those datasets are also objects)
- Then those dataset objects just contain properties of its dataset name and original file name
- If you like to add more datasets, please always add them to the config.JSON as well.

## Known Bugs/Tasks

- The CSS is horrendous. The plot will shift left and right to hide itself
- The drawer does not highlight what is currently selected. This is crucial when showing the default being pre-selected and other datasets glowing when selected. This also causes a dataset that was previously selected to no longer glow. Attempt to utilize JQuery to fix this
- A dropdown box feature to change the type of measured model trace and measured cost.
- The reactivness of the application, if a user were to resize or utilize different screen size it does not adjust very well
- The logo is very set to two different screen sizes, needs to be more reactive
- Odd white borders on the application if a user scrolled
- About button that opens a modal displaying with this application is and what ECCO is
- A more info button that refers to the dataset's file name and displays that metadata
