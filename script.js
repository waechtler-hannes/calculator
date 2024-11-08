// Selectors

const calcDisplay = document.querySelector(".calc-display");
const resultDisplay = document.querySelector(".result-display");
const buttonContainer = document.querySelector(".button-container");

// Event-listeners

buttonContainer.addEventListener("click", (e) => {
    if (isButton(e)) {
        if (isClear(e)) {
            removeLastChar();
        } else if (isClearAll(e)) {
            clearDisplay();
        } else {
            updateDisplay(e);
        }
        calcDisplay.focus();
        calcDisplay.scrollLeft = calcDisplay.scrollWidth;
    }
})

// Calculations

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
    return a / b;
}

function operate(a, b, operator) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "−":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
    }
}

// Displaychanges

function clearDisplay() {
    calcDisplay.value = "";
    resultDisplay.value = "";
}

function updateDisplay(e) {
    if (isNumber(e)) {
        appendNumber(e);
    } else if (isOperator(e) && operatorAllowed()) {
        appendOperator(e);
    } else if (isDot(e) && dotAllowed()) {
        appendDot(e);
    } else if (isEqualSign(e) && equalSignAllowed()) {
        appendEqualSign(e);
        showResult();
    }
}

function removeLastChar() {
    if (calcDisplay.value.at(-1) === " ") {
        removeOperator();
    } else if (calcDisplay.value.at(-1) != "=") {
        calcDisplay.value = calcDisplay.value.slice(0, -1);
    }
}

function removeOperator() {
    calcDisplay.value = calcDisplay.value.slice(0, -3);
}

// Results

function showResult() {
    const array = calcDisplay.value.split(" ");
    if (array[2]) {
        resultDisplay.value = +operate(parseFloat(array[0]), parseFloat(array[2]), array[1]).toFixed(15);
    }
}

function useResult(e) {
    const array = calcDisplay.value.split(" ");
    if (array[2]) {
        calcDisplay.value = +operate(parseFloat(array[0]), parseFloat(array[2]), array[1]).toFixed(15) + " " + e.target.textContent + " ";
    }
}

// Button-checks

function isButton(e) {
    return e.target.type === "submit";
}

function isClear(e) {
    return e.target.textContent === "C";
}

function isClearAll(e) {
    return e.target.textContent === "AC";
}

function isNumber(e) {
    return e.target.textContent.match(/[0-9]/);
}

function isOperator(e) {
    return e.target.textContent.match(/[÷ || × || − || +]/);
}

function isEqualSign(e) {
    return e.target.textContent.match(/[=]/);
}

function isDot(e) {
    return e.target.textContent.match(/[.]/);
}

// Permissions

function dotAllowed() {
    return !(calcDisplay.value.match(/[.].*[÷ || × || − || +].*[.]/) || calcDisplay.value.match(/[÷ || × || − || +].*[.]/) || (calcDisplay.value.match(/[.]/) && !calcDisplay.value.match(/[÷ || × || − || +]/)));
}

function operatorAllowed() {
    return calcDisplay.value != "";
}

function equalSignAllowed() {
    return calcDisplay.value.match(/[0-9].*[÷ || × || − || +].*[0-9]/) && !calcDisplay.value.match(/[=]/);
}

// Append characters

function appendNumber(e) {
    if (resultDisplay.value === "") {
        calcDisplay.value += e.target.textContent;
    } else {
        clearDisplay();
        updateDisplay(e);
    }
}

function appendOperator(e) {
    if (calcDisplay.value.at(-1) === " ") {
        removeOperator();
        appendOperator(e);
    } else if (calcDisplay.value.match(/[0-9].*[÷ || × || − || +].*[0-9]/) && resultDisplay.value === ""){
        useResult(e);
    } else if (resultDisplay.value === "") {
        if (calcDisplay.value.at(-1) === ".") calcDisplay.value += "0"
            calcDisplay.value += " " + e.target.textContent + " ";
    } else {
        calcDisplay.value = resultDisplay.value + " " + e.target.textContent + " ";
        resultDisplay.value = "";
    }
}

function appendDot(e) {
    if(calcDisplay.value === "" || calcDisplay.value.at(-1) === " ") {
        calcDisplay.value += 0 + e.target.textContent;
    } else {
        calcDisplay.value += e.target.textContent;
    }
}

function appendEqualSign(e) {
    if (calcDisplay.value.at(-1) === ".") calcDisplay.value += "0";
    calcDisplay.value += " =";
}