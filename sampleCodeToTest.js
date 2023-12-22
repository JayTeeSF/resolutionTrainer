//sampleCodeToTest.js

const add = (a, b) => a + b;
const myVariable = "Hello World";

// module.exports = { add, myVariable, };

// Attach exported functions and variables to the global window object
window.productionCode = {
  add,
  myVariable,
};

