//Get the DOM
const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const numberElement = document.getElementById("number");
const symbolsElement = document.getElementById("symbol");
const generateElement = document.getElementById("generate");
const copyElement = document.getElementById("copy");

const randomFunction = {
  lowercase: getRandomLower,
  uppercase: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

generateElement.addEventListener("click", () => {
  const length = +lengthElement.value;
  const hasLowerCase = lowercaseElement.checked;
  const hasUpperCase = uppercaseElement.checked;
  const hasNumber = numberElement.checked;
  const hasSymbol = symbolsElement.checked;

  resultElement.innerText = generatePassword(
    hasLowerCase,
    hasUpperCase,
    hasNumber,
    hasSymbol,
    length
  );
});

//Copy password
copyElement.addEventListener("click", () => {
  const textarea = document.createElement("textarea");

  const password = resultElement.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;

  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  document.querySelector(".oncopy").style.display = "block";

  setTimeout(() => {
    document.querySelector(".oncopy").style.display = "none";
  }, 150);
});

//Generate the password combination
function generatePassword(lowercase, uppercase, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lowercase + uppercase + number + symbol;

  //   console.log(typesCount);

  const typesArray = [
    { lowercase },
    { uppercase },
    { number },
    { symbol }
  ].filter(item => Object.values(item)[0]);

  console.log(typesArray);

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach(type => {
      const funcName = Object.keys(type)[0];

      generatedPassword += randomFunction[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Functions for every settings

//Get the random lowercase letter
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

//Get the random uppercase letter
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//Get the random number
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

//Get the random symbol
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

console.log(getRandomSymbol());
