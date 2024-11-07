const display = document.querySelector(".display");
const buttonContainer = document.querySelector(".button-container");
buttonContainer.addEventListener("click", (event) => {
    if (event.target.type === "submit") {
        if (event.target.textContent === "C") {
            display.textContent = "";
        } else if (event.target.textContent.match(/[0-9]/)) {
            display.textContent = display.textContent + event.target.textContent;
        } else if (event.target.textContent.match(/[÷ || × || − || +]/)) {
            if (!display.textContent.match(/[÷ || × || − || +]/)) {
                display.textContent = display.textContent + " " + event.target.textContent + " ";
            }
        } else if (event.target.textContent.match(/[=]/)) {
            const array = display.textContent.split(" ");
            display.textContent = operate(parseFloat(array[0]), parseFloat(array[2]), array[1]);
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