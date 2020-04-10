const main = document.querySelector("main");
const section = document.createElement("section");
main.appendChild(section);
section.classList.add("calcWrap");

const divDisplay = document.createElement("div");
section.appendChild(divDisplay);

const inputDisplay = document.createElement("input");
section.appendChild(inputDisplay);
inputDisplay.readOnly = true;
inputDisplay.placeholder = "0";

const digits = document.createElement("div");
section.appendChild(digits);
digits.classList.add("digits");

for (let i = 0; i < 10; i++) {
  const digitButtons = document.createElement("button");
  digits.appendChild(digitButtons);
  digitButtons.textContent = i;
}

const opers = document.createElement("div");
section.appendChild(opers);
opers.classList.add("opers");

const opersArr = [
  "+",
  "-",
  "/",
  "*",
  "\u{0221A}",
  "\u{0221B}",
  "\u{0207F}",
  ".",
];

for (let i = 0; i < 8; i++) {
  const operButtons = document.createElement("button");
  opers.appendChild(operButtons);
  operButtons.textContent = opersArr[i];
}

const equally = document.createElement("button");
section.appendChild(equally);
equally.textContent = "=";
equally.addEventListener("click", calculete);

function cleanAll() {
  inputDisplay.value = "";
}

function cleanDiv() {
  divDisplay.textContent = "";
}

const clean = document.createElement("button");
section.appendChild(clean);
clean.textContent = "C";
clean.addEventListener("click", cleanAll);

const cleanOne = document.createElement("button");
section.appendChild(cleanOne);
cleanOne.textContent = "←";
cleanOne.addEventListener(
  "click",
  () =>
    (inputDisplay.value = inputDisplay.value.substring(
      0,
      inputDisplay.value.length - 1
    ))
);

const colorButton = document.createElement("input");
colorButton.type = "color";
section.appendChild(colorButton);

document
  .querySelectorAll(".digits button")
  .forEach((button) => button.addEventListener("click", digitPressed));

function digitPressed(ev) {
  inputDisplay.value += ev.target.innerText;
}

document
  .querySelectorAll(".opers button")
  .forEach((button) => button.addEventListener("click", opersPressed));

function opersPressed() {
  if (inputDisplay.value != 0) {
    if (this.textContent === "+") {
      divDisplay.textContent = inputDisplay.value + "+";
      cleanAll();
    }
    if (this.textContent === "-") {
      divDisplay.textContent = inputDisplay.value + "-";
      cleanAll();
    }
    if (this.textContent === "/") {
      divDisplay.textContent = inputDisplay.value + "/";
      cleanAll();
    }
    if (this.textContent === "*") {
      divDisplay.textContent = inputDisplay.value + "*";
      cleanAll();
    }
    if (this.textContent === ".") {
      if(inputDisplay.value.slice(-1) != "."){
      inputDisplay.value += ".";
      } else{
        inputDisplay.value = inputDisplay.value.substring(
          0,
          inputDisplay.value.length - 1
        )
      }
    }
    if (this.textContent === "\u{0221A}") {
      inputDisplay.value = Math.sqrt(inputDisplay.value);
    }
    if (this.textContent === "\u{0221B}") {
      inputDisplay.value = Math.cbrt(inputDisplay.value);
    }
    if (this.textContent === "\u{0207F}") {
      divDisplay.textContent = inputDisplay.value + "^";
      cleanAll();
    }
  }
}

function calculete() {
  const lastSymbol = divDisplay.textContent.slice(-1);
  if (inputDisplay.value != 0) {
    if (lastSymbol === "+") {
      inputDisplay.value =
        parseFloat(divDisplay.textContent) + parseFloat(inputDisplay.value);
      cleanDiv();
    }
    if (lastSymbol === "-") {
      inputDisplay.value =
        parseFloat(divDisplay.textContent) - parseFloat(inputDisplay.value);
      cleanDiv();
    }
    if (lastSymbol === "*") {
      inputDisplay.value =
        parseFloat(divDisplay.textContent) * parseFloat(inputDisplay.value);
      cleanDiv();
    }
    if (lastSymbol === "/" && inputDisplay.value != 0) {
      inputDisplay.value =
        parseFloat(divDisplay.textContent) / parseFloat(inputDisplay.value);
      cleanDiv();
    }
    if (lastSymbol === "^") {
      inputDisplay.value = Math.pow(
        parseFloat(divDisplay.textContent),
        parseFloat(inputDisplay.value)
      );
      cleanDiv();
    }
  }
}

colorButton.addEventListener(
  "change",
  () => (section.style.backgroundColor = colorButton.value)
);
