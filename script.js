const calcDisplay = document.querySelector(".calc-display");
const resultDisplay = document.querySelector(".result-display");
const buttonContainer = document.querySelector(".button-container");

buttonContainer.addEventListener("click", (e) => {
    if (isButton(e)) {
        if (isClear(e)) {
            clearDisplay();
        } else if (isNumber(e) || isOperator(e)) {
            updateDisplay(e);
        } else if (isEqualSign(e)) {
            showResult();
        }
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
    calcDisplay.textContent = "";
    resultDisplay.textContent = "";
}

function showResult() {
    const array = calcDisplay.textContent.split(" ");
    if (array[2]) resultDisplay.textContent = operate(parseFloat(array[0]), parseFloat(array[2]), array[1]);
}

function updateDisplay(e) {
    if (resultDisplay.textContent === "") {
        if (isNumber(e)) {
            calcDisplay.textContent += e.target.textContent;
        } else if (isOperator(e) && operatorAllowed()) {
            calcDisplay.textContent += " " + e.target.textContent + " ";
        }    
    } else {
        if (isNumber(e)) {
            clearDisplay();
            updateDisplay(e);
        } else if (isOperator(e))
            calcDisplay.textContent = resultDisplay.textContent + " " + e.target.textContent + " ";
            resultDisplay.textContent = "";
    }
}

function isButton(e) {
    return e.target.type === "submit";
}

function isClear(e) {
    return e.target.textContent === "C";
}

function isNumber(e) {
    return e.target.textContent.match(/[0-9]/)
}

function isOperator(e) {
    return e.target.textContent.match(/[÷ || × || − || +]/);
}

function isEqualSign(e) {
    return e.target.textContent.match(/[=]/);
}

function operatorAllowed() {
    return !calcDisplay.textContent.match(/[÷ || × || − || +]/) && calcDisplay.textContent.match(/[0-9]/)
}