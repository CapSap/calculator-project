let inputString = "";
const notNumbers = [".", "×", "÷", "+", "-"];
const operators = ["×", "÷", "+", "-"];

const screen = document.querySelector(".case__screen");
const number1Screen = document.querySelector("#case__screen--number1");
const operatorScreen = document.querySelector("#case__screen--operation");
const number2Screen = document.querySelector("#case__screen--number2");
const resultScreen = document.querySelector("#case__screen--result");

const buttons = document.querySelectorAll(".btn");
const numButtons = document.querySelectorAll(".btn--number");
const operatorButtons = document.querySelectorAll(".btn--operator");
const equalsButton = document.querySelector("#btn--equals");
const clearButton = document.querySelector("#btn--clear");

// calculate function that takes in an array that came from equalsButton
// it runs until it can return a single value.
// if it finds a "x" or "÷" it will reduce 3 elelments in array to a single evaluated value, and continue.

const betterCalculationFunction = (array) => {
  let returnArray = [...array];
  while (returnArray.length > 1) {
    console.log(returnArray);
    if (returnArray.includes("×")) {
      const index = returnArray.indexOf("×");
      const result =
        parseFloat(returnArray[index - 1]) * parseFloat(returnArray[index + 1]);
      returnArray.splice(index - 1, 3, result);
    } else if (returnArray.includes("÷")) {
      const index = returnArray.indexOf("÷");
      const result =
        parseFloat(returnArray[index - 1]) / parseFloat(returnArray[index + 1]);
      returnArray.splice(index - 1, 3, result);
    } else if (returnArray.includes("+")) {
      const index = returnArray.indexOf("+");
      const result =
        parseFloat(returnArray[index - 1]) + parseFloat(returnArray[index + 1]);
      returnArray.splice(index - 1, 3, result);
    } else if (returnArray.includes("-")) {
      const index = returnArray.indexOf("-");
      const result =
        parseFloat(returnArray[index - 1]) - parseFloat(returnArray[index + 1]);
      returnArray.splice(index - 1, 3, result);
    }
  }
  return parseFloat(returnArray);
};

// run this function on button press to add button value to inputString.
// prevent adding operator to blank input and prevent adding adjacent operators.

const acceptUserInput = (e) => {
  if (operators.includes(e.target.value) && inputString === "") {
  } else if (
    !notNumbers.includes(inputString.slice(-1)) ||
    !notNumbers.includes(e.target.value)
  ) {
    inputString += e.target.value;
    number1Screen.innerHTML = inputString;
  }
};
//event listener for num buttons and "."
numButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    acceptUserInput(e);
  })
);
// event listener for operator buttons.
operatorButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    acceptUserInput(e);
  });
});

equalsButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputArray = inputString.split(/([\d\.]+)/).filter((x) => x !== "");

  let result = betterCalculationFunction(inputArray);

  resultScreen.innerHTML = result;

  // add a new class if results are long
  const resultString = "" + result;
  if (resultString.length > 12) {
    resultScreen.className =
      "case__screen--result case__screen--result-smaller";
  }
});

clearButton.addEventListener("click", (e) => {
  e.preventDefault();
  number1 = "";
  number2 = "";
  operator = "";
  inputString = "";

  number1Screen.innerHTML = "";
  operatorScreen.innerHTML = "";
  number2Screen.innerHTML = "";
  resultScreen.innerHTML = "";
});
