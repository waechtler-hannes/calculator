// Selectors

const calcDisplay = document.querySelector(".calc-display");
const resultDisplay = document.querySelector(".result-display");
const buttonContainer = document.querySelector(".button-container");

// Event-listeners

buttonContainer.addEventListener("click", (e) => {
    if (isButton(e)) {
        let eKey = e.target.textContent;
        if (isClear(eKey)) {
            removeLastChar();
        } else if (isClearAll(eKey)) {
            clearDisplay();
        } else {
            updateDisplay(eKey);
        }
        calcDisplay.focus();
        calcDisplay.scrollLeft = calcDisplay.scrollWidth;
    }
})

document.addEventListener("keydown", (e) => {
    let eKey = e.key;
    if (isNumber(eKey) || isDot(eKey) || isEqualSign(eKey) || isPlus(eKey)) {
        updateDisplay(eKey)
    } else if (isMinus(eKey)) {
        updateDisplay("−");
    } else if (isMulti(eKey)) {
        updateDisplay("×");
    } else if (isSlash(eKey)) {
        updateDisplay("÷");
    } else if (isEnter(eKey)) {
        updateDisplay("=");
    } else if (isBackspace(eKey)) {
        removeLastChar();
    } else if (isDelete(eKey)) {
        clearDisplay();
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

function updateDisplay(eKey) {
    if (isNumber(eKey)) {
        appendNumber(eKey);
    } else if (isOperator(eKey) && operatorAllowed()) {
        appendOperator(eKey);
    } else if (isDot(eKey) && dotAllowed()) {
        appendDot(eKey);
    } else if (isEqualSign(eKey) && equalSignAllowed()) {
        appendEqualSign(eKey);
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

function useResult(eKey) {
    const array = calcDisplay.value.split(" ");
    if (array[2]) {
        calcDisplay.value = +operate(parseFloat(array[0]), parseFloat(array[2]), array[1]).toFixed(15) + " " + eKey + " ";
    }
}

// Button-checks

function isButton(e) {
    return e.target.type === "submit";
}

function isClear(eKey) {
    return eKey === "C";
}

function isClearAll(eKey) {
    return eKey === "AC";
}

function isNumber(eKey) {
    return eKey.match(/[0-9]/);
}

function isOperator(eKey) {
    return eKey.match(/[÷ || × || − || +]/);
}

function isEqualSign(eKey) {
    return eKey.match(/[=]/);
}

function isDot(eKey) {
    return eKey.match(/[.]/);
}

// Keyboard-checks

function isBackspace(eKey) {
    return eKey === "Backspace";
}

function isDelete(eKey) {
    return eKey === "Delete";
}

function isEnter(eKey) {
    return eKey === "Enter";
}

function isMinus(eKey) {
    return eKey === "-";
}

function isPlus(eKey) {
    return eKey === "+";
}

function isMulti(eKey) {
    return eKey === "*";
}

function isSlash(eKey) {
    return eKey === "/";
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

function appendNumber(eKey) {
    if (resultDisplay.value === "") {
        calcDisplay.value += eKey;
    } else {
        clearDisplay();
        updateDisplay(eKey);
    }
}

function appendOperator(eKey) {
    if (calcDisplay.value.at(-1) === " ") {
        removeOperator();
        appendOperator(eKey);
    } else if (calcDisplay.value.match(/[0-9].*[÷ || × || − || +].*[0-9]/) && resultDisplay.value === ""){
        useResult(eKey);
    } else if (resultDisplay.value === "") {
        if (calcDisplay.value.at(-1) === ".") calcDisplay.value += "0"
            calcDisplay.value += " " + eKey + " ";
    } else {
        calcDisplay.value = resultDisplay.value + " " + eKey + " ";
        resultDisplay.value = "";
    }
}

function appendDot(eKey) {
    if(calcDisplay.value === "" || calcDisplay.value.at(-1) === " ") {
        calcDisplay.value += 0 + eKey;
    } else {
        calcDisplay.value += eKey;
    }
}

function appendEqualSign(eKey) {
    if (calcDisplay.value.at(-1) === ".") calcDisplay.value += "0";
    calcDisplay.value += " =";
}