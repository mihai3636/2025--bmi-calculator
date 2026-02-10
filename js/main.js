console.log("Hello world!");

const wrappers = document.querySelectorAll(".input-wrapper");
const inputMetricEl = document.getElementById("radioMetric");
const inputImperialEl = document.getElementById("radioImperial");
const resultEl = document.querySelector(".result");
const calculatorEl = document.querySelector(".calculator");

const heightMainUnitEl = document.getElementById("heightMainUnit");
const heightSecondaryUnitEl = document.getElementById("heightSecondaryUnit");

const weightMainUnitEl = document.getElementById("weightMainUnit");
const weightSecondaryUnitEl = document.getElementById("weightSecondaryUnit");

const inputHeightPrincipalEl = document.getElementById("inputHeightPrincipal");
const inputHeightSecondaryEl = document.getElementById("inputHeightSecondary");

const inputWeightPrincipalEl = document.getElementById("inputWeightPrincipal");
const inputWeightSecondaryEl = document.getElementById("inputWeightSecondary");

const resultValueEl = document.querySelector(".result-value");
const resultInfoEl = document.querySelector(".result-info");

let isMetric = true;
let isImperial = false;

let heightPrincipal = null;
let heightSecondary = null;

let weightPrincipal = null;
let weightSecondary = null;

let resultBmi = null;

wrappers.forEach((wrapperEl) => {
  wrapperEl.addEventListener("click", (e) => {
    const inputEl = wrapperEl.querySelector("input");
    if (e.target === inputEl) return;

    inputEl.focus();
  });
});

inputMetricEl.addEventListener("click", onMetricClicked);
inputImperialEl.addEventListener("click", onImperialClicked);
updateUi();

inputHeightPrincipalEl.addEventListener("beforeinput", allowOnlyNumbers);
inputHeightSecondaryEl.addEventListener("beforeinput", allowOnlyNumbers);

inputWeightPrincipalEl.addEventListener("beforeinput", allowOnlyNumbers);
inputWeightSecondaryEl.addEventListener("beforeinput", allowOnlyNumbers);

inputHeightPrincipalEl.addEventListener("input", (ev) => {
  if (inputHeightPrincipalEl.value === "") {
    heightPrincipal = null;
  } else {
    heightPrincipal = inputHeightPrincipalEl.value;
  }

  updateUi();
});

inputHeightSecondaryEl.addEventListener("input", (ev) => {
  if (inputHeightSecondaryEl.value === "") {
    heightSecondary = null;
  } else {
    heightSecondary = inputHeightSecondaryEl.value;
  }

  updateUi();
});

inputWeightPrincipalEl.addEventListener("input", (ev) => {
  let value = inputWeightPrincipalEl.value;
  if (value === "") {
    weightPrincipal = null;
  } else {
    weightPrincipal = inputWeightPrincipalEl.value;
  }

  updateUi();
});

inputWeightSecondaryEl.addEventListener("input", (ev) => {
  let value = inputWeightSecondaryEl.value;
  if (value === "") {
    weightSecondary = null;
  } else {
    weightSecondary = inputWeightSecondaryEl.value;
  }

  updateUi();
});

function allowOnlyNumbers(e) {
  if (e.data === null) return;

  if (isNaN(e.target.value + e.data)) {
    e.preventDefault();
    return;
  }
}

function updateUi() {
  if (isMetric) showMetric();
  if (isImperial) showImperial();

  computeGeneralBmi();
  updateInputs();
  updateBmi();
}

function onMetricClicked() {
  isMetric = true;
  isImperial = false;

  updateUi();
}

function onImperialClicked() {
  isImperial = true;
  isMetric = false;

  updateUi();
}

function showMetric() {
  calculatorEl.classList.add("metric");
  inputMetricEl.checked = true;
  heightMainUnitEl.textContent = "m";
  weightMainUnitEl.textContent = "kg";
}

function showImperial() {
  calculatorEl.classList.remove("metric");
  inputImperialEl.checked = true;
  heightMainUnitEl.textContent = "ft";
  weightMainUnitEl.textContent = "st";
}

function updateInputs() {
  inputHeightPrincipalEl.value = heightPrincipal ?? "";
  inputHeightSecondaryEl.value = heightSecondary ?? "";

  inputWeightPrincipalEl.value = weightPrincipal ?? "";
  inputWeightSecondaryEl.value = weightSecondary ?? "";
}

function updateBmi() {
  if (resultBmi === null) {
    resultEl.classList.add("result--welcome");
    return;
  }

  resultEl.classList.remove("result--welcome");
  let resultValue = String(resultBmi.toFixed(1));
  if (resultValue.length > 5) {
    resultValue = "Huge";
  }

  resultValueEl.textContent = resultValue;

  console.log(resultBmi);
  let text;
  if (resultBmi <= 18.5) {
    text =
      "Underweight: Below the healthy weight range. Consider a balanced diet to reach a healthier weight.";
  } else if (resultBmi <= 24.9) {
    text =
      "Healthy weight: Within the recommended range. Maintain your current lifestyle for overall health.";
  } else if (resultBmi <= 29.9) {
    text =
      "Overweight: Above the healthy weight range. A balanced diet and regular exercise may help manage your weight.";
  } else {
    text =
      "Obese: Significantly above the healthy weight range. Consult a healthcare professional for guidance on achieving a healthier weight.";
  }

  resultInfoEl.textContent = text;
}

function computeGeneralBmi() {
  if (Number(heightPrincipal) === 0) return;

  if (isMetric) computeBmiMetric();
  if (isImperial) computeBmiImperial();
}

function computeBmiMetric() {
  resultBmi = computeBmi(Number(heightPrincipal), Number(weightPrincipal));
}

function computeBmiImperial() {
  const weightInPounds = Number(weightPrincipal) * 14 + Number(weightSecondary);
  const heightInInches = Number(heightPrincipal) * 12 + Number(heightSecondary);

  const weightInKgs = weightInPounds * 0.45359237;
  const heightInMeters = heightInInches * 0.0254;

  resultBmi = computeBmi(heightInMeters, weightInKgs);
}

// height in meters
// weight in kgs
function computeBmi(height, weight) {
  return weight / (height * height);
}
