const calcDisplay = document.querySelector(".calc-display");
const resultDisplay = document.querySelector(".result-display");
const buttonContainer = document.querySelector(".button-container");

buttonContainer.addEventListener("click", (e) => {
    if (isButton(e)) {
        if (isClear(e)) {
            clearDisplay();
        } else if (isNumber(e) || isOperator(e) || isDot(e)) {
            updateDisplay(e);
        } else if (isEqualSign(e)) {
            showResult();
        }
        calcDisplay.focus();
        calcDisplay.scrollLeft = calcDisplay.scrollWidth;
    }
})

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

function clearDisplay() {
    calcDisplay.value = "";
    resultDisplay.value = "";
}

function showResult() {
    const array = calcDisplay.value.split(" ");
    if (array[2]) {
        if (calcDisplay.value.at(-1) === ".") calcDisplay.value += "0";
        if (resultDisplay.value === "") calcDisplay.value += " =";
        resultDisplay.value = +operate(parseFloat(array[0]), parseFloat(array[2]), array[1]).toFixed(15);
    }
}

function useResult(e) {
    const array = calcDisplay.value.split(" ");
    if (array[2]) {
        calcDisplay.value = +operate(parseFloat(array[0]), parseFloat(array[2]), array[1]).toFixed(15) + " " + e.target.textContent + " ";
    }
}

function updateDisplay(e) {
    if (resultDisplay.value === "") {
        if (isDot(e) && (calcDisplay.value === "" || calcDisplay.value.at(-1) === " ")) {
            calcDisplay.value += 0 + e.target.textContent;
        } else if (isNumber(e) || (isDot(e) && dotAllowed())) {
            calcDisplay.value += e.target.textContent;
        } else if (isOperator(e) && operatorAllowed()) {
            if (calcDisplay.value.at(-1) === ".") {
                calcDisplay.value += "0 " + e.target.textContent + " ";
            } else {
                calcDisplay.value += " " + e.target.textContent + " ";
            }
        } else if (isOperator(e)) {
            useResult(e);
        }
    } else {
        if (isNumber(e)) {
            clearDisplay();
            updateDisplay(e);
        } else if (isOperator(e))
            calcDisplay.value = resultDisplay.value + " " + e.target.textContent + " ";
            resultDisplay.value = "";
    }
}

function isButton(e) {
    return e.target.type === "submit";
}

function isClear(e) {
    return e.target.textContent === "C";
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

function dotAllowed() {
    return !(calcDisplay.value.match(/[.].*[+].*[.]/) || calcDisplay.value.match(/[+].*[.]/) || (calcDisplay.value.match(/[.]/) && !calcDisplay.value.match(/[+]/)));
}

function operatorAllowed() {
    return !calcDisplay.value.match(/[÷ || × || − || +]/) && calcDisplay.value.match(/[0-9]/);
}