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
let checkCount = 0;

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

function generateUpperCase() {
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

function shufflePassword(array) {
  // Fisher Yates Method
  // apply on array

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[j];
    array[i] = array[j];
    array[j] = temp;
  }

  let str = "";
  array.forEach((element) => {
    str += element;
  });

  return str;
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
    copyMsg.innerText = "";
    copyMsg.classList.remove(".active");
  }, 2000);
}

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

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

generateBtn.addEventListener("click", () => {
  if (checkCount == 0) {
    return;
  }

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  password = "";

  let funcArr = [];

  if (uppercaseCheck.checked) {
    funcArr.push(generateUpperCase);
  }
  if (lowercaseCheck.checked) {
    funcArr.push(generateLowerCase);
  }
  if (SymbolCheck.checked) {
    funcArr.push(generateSymbol);
  }
  if (numberCheck.checked) {
    funcArr.push(getRandomNumber);
  }

  //   compulsory addition in password

  for (let i = 0; i < funcArr.length; i++) {
    password += funcArr[i]();
  }

  //   remaining addition

  for (let i = 0; i < passwordLength - funcArr.length; i++) {
    let randomIndex = getRandomInteger(0, funcArr.length);

    password += funcArr[randomIndex]();
  }

  //   shuffle the password

  password = shufflePassword(Array.from(password));

  passwordDisplay.value = password;

  CalcStrength();
});
