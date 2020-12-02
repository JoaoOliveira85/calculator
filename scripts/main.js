let workingMemory = ""

const buttonList = ["1", "2", "3", "-", "4", "5", "6", "+", "7", "8", "9", "*", "C", "0", "=", "/"]

const keypad = document.getElementById("keys");

const add = function(x, y) {
    return x + y;
}

const subtract = function(x, y) {
    return x - y;
}

const multiply = function(x, y) {
    return x * y;
}

const divide = function(x, y) {
    return x / y;
}

const parseOperations = function(operationList) {
    let arrangedOrder = []
    let numberOfoperations = 0;
    let previousOperationIndex = 0;
    let expectedOperators = ["+", "-", "*", "/"];
    for (let i = previousOperationIndex; i < operationList.length; i++){
        if (expectedOperators.indexOf(operationList[i]) != -1) {
            arrangedOrder[numberOfoperations] = {
                priority: "0",
                operationType: "+",
                operandA: operationList.slice(previousOperationIndex, i)
            }
            for (let j = i + 1; j < operationList.length && expectedOperators.indexOf(operationList[j]) === -1; j++) {
                console.log("teste")
                arrangedOrder[numberOfoperations]["operandB"] = operationList.slice(i + 1, j + 1);
            }
        }       
    }
    return arrangedOrder;
}

// console.log(parseOperations("123+345"))

const evaluate = function(element) {
    for (let i = 0; i < element.length; i++) {
        if (element[i] === "*") {
            return multiply(parseInt(element.slice(0, i), 10), parseInt(element.slice(i + 1, element.length + 1), 10)); 
        } else if (element[i] === "+") {
            return add(parseInt(element.slice(0, i), 10), parseInt(element.slice(i + 1, element.length + 1), 10)); 
        } else if (element[i] === "-") {
            return subtract(parseInt(element.slice(0, i), 10), parseInt(element.slice(i + 1, element.length + 1), 10)); 
        } else if (element[i] === "/") {
                return divide(parseInt(element.slice(0, i), 10), parseInt(element.slice(i + 1, element.length + 1), 10));
        } 
    }
}

for (let i = 0; i < buttonList.length; i++){
    const key = document.createElement("button");
    key.innerText = buttonList[i];
    key.id = `key${i}`;
    key.className = "keys"
    keypad.appendChild(key);
    key.addEventListener("click", () => {
        if (buttonList[i] === "=") {
            workingMemory = evaluate(workingMemory);
            outputDisplay.value = workingMemory;
        } else if (buttonList[i] === "C") {
            workingMemory = "";
            outputDisplay.value = workingMemory;
        } else {
            workingMemory += buttonList[i];
            outputDisplay.value = workingMemory;
        }
    })
}

