// ===== Math =====
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) return "Nice try 😏";
  return a / b;
}

function operate(op, a, b) {
  a = Number(a);
  b = Number(b);

  if (op === "+") return add(a, b);
  if (op === "-") return subtract(a, b);
  if (op === "*") return multiply(a, b);
  if (op === "/") return divide(a, b);
}

// ===== DOM =====
const display = document.getElementById("display");
const calculation = document.getElementById("calculation");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const decimalBtn = document.querySelector(".decimal");
const backspace = document.querySelector(".backspace");

// ===== State =====
let firstNumber = null;
let currentOperator = null;
let resetDisplay = false;

// ===== Helpers =====
function roundResult(num) {
  return Math.round(num * 100000) / 100000;
}

function clearAll() {
  display.textContent = "0";
  calculation.textContent = "";
  firstNumber = null;
  currentOperator = null;
  resetDisplay = false;
}

function appendNumber(num) {
  if (display.textContent === "0" || resetDisplay) {
    display.textContent = num;
    resetDisplay = false;
  } else {
    display.textContent += num;
  }
}

function appendDecimal() {
  if (resetDisplay) {
    display.textContent = "0.";
    resetDisplay = false;
    return;
  }
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
}

function setOperator(op) {
  if (currentOperator && !resetDisplay) {
    const result = operate(currentOperator, firstNumber, display.textContent);
    if (result === "Nice try 😏") {
      display.textContent = result;
      return;
    }
    display.textContent = roundResult(result);
    firstNumber = display.textContent;
  } else {
    firstNumber = display.textContent;
  }

  currentOperator = op;
  calculation.textContent = `${firstNumber} ${currentOperator}`;
  resetDisplay = true;
}

function evaluate() {
  if (!currentOperator || resetDisplay) return;

  const result = operate(currentOperator, firstNumber, display.textContent);
  calculation.textContent = `${firstNumber} ${currentOperator} ${display.textContent} =`;

  if (result === "Nice try 😏") {
    display.textContent = result;
    return;
  }

  display.textContent = roundResult(result);
  firstNumber = display.textContent;
  currentOperator = null;
  resetDisplay = true;
}

function deleteLast() {
  if (display.textContent.length === 1) {
    display.textContent = "0";
  } else {
    display.textContent = display.textContent.slice(0, -1);
  }
}

// ===== Click events =====
numbers.forEach(btn =>
  btn.addEventListener("click", () => appendNumber(btn.textContent))
);

operators.forEach(btn =>
  btn.addEventListener("click", () => setOperator(btn.textContent))
);

decimalBtn.addEventListener("click", appendDecimal);
equals.addEventListener("click", evaluate);
clear.addEventListener("click", clearAll);
backspace.addEventListener("click", deleteLast);

// ===== Keyboard support =====
window.addEventListener("keydown", e => {
  if (e.key >= "0" && e.key <= "9") appendNumber(e.key);
  if (e.key === ".") appendDecimal();
  if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
  if (e.key === "Enter" || e.key === "=") evaluate();
  if (e.key === "Backspace") deleteLast();
  if (e.key === "Escape") clearAll();
});
