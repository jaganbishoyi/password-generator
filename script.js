const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const clipboard = document.getElementById('clipboard');
const generate = document.getElementById('generate');
const output = document.querySelector("output");
const strengthBadge = document.getElementById('StrengthDisplay');
const resultContainer = document.querySelector('.result-container');

const getRandom = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
const mediumPassword = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

lengthEl.addEventListener('input', (event) => {
    const { value, min, max, step } = event.target;
    getPercentage(value, min, max, step);
});

generate.addEventListener('click', () => {
    genPassword();
});

uppercaseEl.addEventListener('input', () => {
    genPassword();
});

lowercaseEl.addEventListener('input', () => {
    genPassword();
});

numbersEl.addEventListener('input', () => {
    genPassword();
});

symbolsEl.addEventListener('input', () => {
    genPassword();
});

window.addEventListener('DOMContentLoaded', (event) => {
    getPercentage(lengthEl.value, lengthEl.min, lengthEl.max, lengthEl.step);
});

clipboard.addEventListener('click', () => {
    debugger
    navigator.clipboard.writeText(resultEl.value);

    const tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + resultEl.value;
});

clipboard.addEventListener("mouseout", () => {
    const tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
});

function getPercentage(value, min, max, step) {
    const parent = document.getElementById("length").parentElement;
    const decimals = step && step.includes(".") ? step.split(".")[1] : 1;
    const percent = `${(((value - min) / (max - min)) * 100).toFixed(decimals)}%`;
    parent.style.setProperty("--p", percent);

    output.value = `Length: ${value}`;
    genPassword();
}

function genPassword() {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    const generatedPassword = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
    resultEl.value = generatedPassword;
    StrengthChecker(generatedPassword);
}

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }]
        .filter(item => Object.values(item)[0]);
    // Doesn't have a selected type
    if (typesCount === 0) {
        return '';
    }

    // create a loop
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += getRandom[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function StrengthChecker(Password) {
    if (strongPassword.test(Password)) {
        strengthBadge.style.color = "green";
        result.style.color = "green";
        strengthBadge.textContent = 'Strong';
        resultContainer.style.boxShadow = 'inset 0 0 10px 0 green ';
    } else if (mediumPassword.test(Password)) {
        strengthBadge.style.color = 'orange';
        result.style.color = 'orange';
        strengthBadge.textContent = 'Medium';
        resultContainer.style.boxShadow = 'inset 0 0 10px 0 orange ';
    } else {
        strengthBadge.style.color = 'red';
        result.style.color = 'red';
        strengthBadge.textContent = 'Weak';
        resultContainer.style.boxShadow = 'inset 0 0 10px 0 red';
    }
}

// Social Panel JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
    social_panel_container.classList.toggle('visible');
});

close_btn.addEventListener('click', () => {
    social_panel_container.classList.remove('visible');
});