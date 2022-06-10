# ecco-interactive-solution-evaluator
ECCO Interactive Solution Evaluator

Learn More about ECCO: https://www.ecco-group.org/

This tool is utilized to help ocean scientist analyze and evaluate oceanic data collected from monitors and satellites. This facilitates their daily tasks.

## Setup
- Clone and Pull Github Repo
- Type `npm i` in the terminal to pull all the necessary dependecies
- Note: Most of the libraries and dependecies are utilizing the script tag and are client side
- Type `npm start` to run a localhost version of the application

## Brief Overview 06/10/2022
- The application can be split into three parts: The Globe, The Plot, The Drawer

### The Globe:
- The globe is interactive and rerenders based on dataset change currently
- Those 'polkadots/coordinates/geodesic bins' are areas a user can click and select to measure
- Upon clicking and selecting a dataset, note: there is a default dataset selected upon loading, a plot will show up

### The Plot:
- Upon selecting a dataset and a bin, a plot will show up
- A user can do numerous features such as zoom in, screen shot, fullscreen, etc
- The key feature are the operational buttons on the bottom.
- A user can subtract, average, square, and return to the original as operational buttons
- A user can also hide and show the plot

### The Drawer:
- The side navigation bar on the left is known as the dataset drawer
- Upon reloading or first view, the drawer is set to a default. Typically it is the first category and first dataset within that category in the config.json file
- A user can exit out of the default drawer and open one with the hamburger button on the top left
- A user will then be prompted with a category drawer to decide what category to select
- Each category will open its own seperate drawer filled with its own datasets
- A user can change/select a dataset which will cause a rerender of the globe bin's colors and a plot display

## Known Bugs/Tasks:
- The CSS is horrendous. The plot will shift left and right to hide itself
- The drawer does not highlight what is currently selected. This is crucial when showing the default being pre-selected and other datasets glowing when selected. This also causes a dataset that was previously selected to no longer glow. Attempt to utilize JQuery to fix this
- A dropdown box feature to change the type of measured model trace and measured cost.
- The reactivness of the application, if a user were to resize or utilize different screen size it does not adjust very well
- The logo is very set to two different screen sizes, needs to be more reactive
- Odd white borders on the application if a user scrolled
- About button that opens a modal displaying with this application is and what ECCO is
