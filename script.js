let inputString = "";

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

numButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    inputString += e.target.value;
    number1Screen.innerHTML = inputString;
  })
);

operatorButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    inputString += e.target.value;
    number1Screen.innerHTML = inputString;
  });
});

equalsButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputArray = inputString.split(/([\d\.]+)/).filter((x) => x !== "");

  let result = betterCalculationFunction(inputArray);

  resultScreen.innerHTML = result;
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

  console.log(doMultiplication);

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

const testArr2 = ["2", "+", "2", "+", "3", "*", "4", "*", "3"];

console.log(doTheCalculation(testArr2));

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
