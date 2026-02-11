// Math functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "Error";
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  if (operator === "+") return add(a, b);
  if (operator === "-") return subtract(a, b);
  if (operator === "*") return multiply(a, b);
  if (operator === "/") return divide(a, b);
}

// Calculator logic
const display = document.getElementById("display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");

let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let shouldResetDisplay = false;

numbers.forEach(button => {
  button.addEventListener("click", () => {
    if (display.textContent === "0" || shouldResetDisplay) {
      display.textContent = button.textContent;
      shouldResetDisplay = false;
    } else {
      display.textContent += button.textContent;
    }
  });
});

operators.forEach(button => {
  button.addEventListener("click", () => {
    firstNumber = display.textContent;
    currentOperator = button.textContent;
    shouldResetDisplay = true;
  });
});

equals.addEventListener("click", () => {
  secondNumber = display.textContent;
  display.textContent = operate(currentOperator, firstNumber, secondNumber);
  shouldResetDisplay = true;
});

clear.addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
});
