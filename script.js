// Should render the current calculation in a box at the top (calculator display)
// It should handle decimals
// It doesn’t need to support orders of operation
// It should not use eval() or Function() constructor

let number1 = "";
let number2 = "";
let operator = "";

const add = (a, b) => {
  return parseFloat(a) + parseFloat(b);
};
const minus = (a, b) => {
  return parseFloat(a) - parseFloat(b);
};
const divide = (a, b) => {
  return parseFloat(a) / parseFloat(b);
};
const multiply = (a, b) => {
  return parseFloat(a) * parseFloat(b);
};

// how to get button to run function?

const screen = document.querySelector(".case__screen");
const number1Screen = document.querySelector("#case__screen--number1");
const operatorScreen = document.querySelector("#case__screen--operation");
const number2Screen = document.querySelector("#case__screen--number2");
const resultScreen = document.querySelector("#case__screen--result");

console.log(number1Screen);

const buttons = document.querySelectorAll(".btn");
const numButtons = document.querySelectorAll(".btn--number");
const operatorButtons = document.querySelectorAll(".btn--operator");
const equalsButton = document.querySelector("#btn--equals");
const clearButton = document.querySelector("#btn--clear");

const myForm = document.querySelector("#form");

numButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (operator === "") {
      number1 += e.target.value;
      number1Screen.innerHTML = number1;
    } else {
      number2 += e.target.value;
      number2Screen.innerHTML = number2;
    }
  })
);

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    operator = e.target.value;
    operatorScreen.innerHTML = operator;
  });
});

equalsButton.addEventListener("click", (e) => {
  e.preventDefault();
  let result = "";

  if (operator === "+") {
    result = add(number1, number2);
  } else if (operator === "-") {
    result = minus(number1, number2);
  } else if (operator === "÷") {
    result = divide(number1, number2);
  } else if (operator === "×") {
    result = multiply(number1, number2);
  }
  resultScreen.innerHTML = result;

  console.log(result);
});

clearButton.addEventListener("click", (e) => {
  e.preventDefault();
  number1 = "";
  number2 = "";
  operator = "";

  number1Screen.innerHTML = "";
  operatorScreen.innerHTML = "";
  number2Screen.innerHTML = "";
  resultScreen.innerHTML = "";
});

const renderStuff = () => {};

const appendTextElement = (elementType, textString, parentElement) => {
  // 1. create a new html element
  const element = document.createElement(elementType);
  // 2. create a text node
  const text = document.createTextNode(textString);
  // 3. attach textNode(child) to html element(parent)
  element.appendChild(text);
  // 4. Attach the full html element(element with text inside it) to a parent on our html page
  parentElement.appendChild(element);
};

const testing = "1*2+3*4";
const testArr = testing.split(/([\d\.]+)/).filter((x) => x !== "");

const doTheCalculation = (testArr) => {
  doMultiplication = testArr
    .reduce(
      (workingArray, current, index) => {
        if (current === "*") {
          const result =
            parseFloat(workingArray[index - 1]) *
            parseFloat(workingArray[index + 1]);
          workingArray.splice(index, 1, result);
          workingArray[index - 1] = "";
          workingArray[index + 1] = "";
        }
        return workingArray;
      },
      [...testArr]
    )
    .filter((x) => x !== "");

  const doDivision = doMultiplication
    .reduce(
      (workingArray, current, index) => {
        if (current === "/") {
          const result =
            parseFloat(workingArray[index - 1]) /
            parseFloat(workingArray[index + 1]);
          workingArray.splice(index, 1, result);
          workingArray[index - 1] = "";
          workingArray[index + 1] = "";
        }
        return workingArray;
      },
      [...doMultiplication]
    )
    .filter((x) => x !== "");

  const doAddition = doDivision
    .reduce(
      (workingArray, current, index) => {
        if (current === "+") {
          const result =
            parseFloat(workingArray[index - 1]) +
            parseFloat(workingArray[index + 1]);
          workingArray.splice(index, 1, result);
          workingArray[index - 1] = "";
          workingArray[index + 1] = "";
        }
        return workingArray;
      },
      [...doDivision]
    )
    .filter((x) => x !== "");

  const doSubtraction = doAddition
    .reduce(
      (workingArray, current, index) => {
        if (current === "+") {
          const result =
            parseFloat(workingArray[index - 1]) +
            parseFloat(workingArray[index + 1]);
          workingArray.splice(index, 1, result);
          workingArray[index - 1] = "";
          workingArray[index + 1] = "";
        }
        return workingArray;
      },
      [...doAddition]
    )
    .filter((x) => x !== "");

  return doSubtraction;
};
