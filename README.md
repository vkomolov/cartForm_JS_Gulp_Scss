# Cart Payment Form

## Introduction:
- To realize the Cart Payment Form using Gulp and npm-modules;
- To follow the image sample of the page to create;
- To use **BEM** notation;
- The data on the selected items for purchase can be located in **'localStorage'**;
- The purchase registration takes three stages, which separately show the inputs;
- To realize the search of the countries from (conditionally) fetched data.
When filling the input of the Country - to search and show the matching;
- To realize the inputs validation by the separate Regexp file;
- To write all class-names, etc.(connected to DOM) in the separate file for 
convenience in possible edit;

## Concept
- To realize the concept of the only object 'data', which contains all
the necessary information on styles classes, variables, functions etc...
The object 'data' will be sent to the functions through the arguments;
The functions will have the access to the data properties;
Unlike the clean funcs, here all the funcs work around one and the same
data and can modify the properties for the future use in the next funcs;
- Such concept of the only "data" usage is considered to be experimental;
### Stack: Gulp4, SCSS, ES-2015;

