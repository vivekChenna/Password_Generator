const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const SymbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbolString = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let passwordLength = 10;
let password = "";
let checkCount = 1;

function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}
handleSlider();

function setIndicator(color) {
  indicator.style.backgroundColor = color;
}

// setIndicator("green");

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumber() {
  return getRandomInteger(0, 9);
}

function generateLowerCase() {
  let randomNumber = getRandomInteger(97, 123);
  return String.fromCharCode(randomNumber);
}

function upperCase() {
  return String.fromCharCode(getRandomInteger(65, 91));
}

function generateSymbol() {
  const randomNumber = getRandomInteger(0, symbolString.length);
  return symbolString.charAt(randomNumber);
}

function CalcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSymbol = false;

  if (uppercaseCheck.checked) {
    hasUpper = true;
  }

  if (lowercaseCheck.checked) {
    hasLower = true;
  }

  if (SymbolCheck.checked) {
    hasSymbol = true;
  }

  if (numberCheck.checked) {
    hasNum = true;
  }

  if (hasUpper && hasLower && (hasSymbol || hasNum) && password.length >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSymbol) &&
    password.length >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
  } catch (error) {
    copyMsg.innerText = "failed";
  }

  copyMsg.classList.add(".active");

  setTimeout(() => {
    copyMsg.classList.remove(".active");
  }, 2000);
}

// jabh bhi aap kuch input de rahe ho
// left slide ya right slide (input me)
// then password ki length bhi change karenge
inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) {
    copyContent();
  }
});


generateBtn.addEventListener('click',()=>{

    
})