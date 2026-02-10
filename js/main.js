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

let isMetric = false;
let isImperial = true;

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
}

function onMetricClicked() {
  isMetric = true;
  isImperial = false;

  updateUi();
  console.log(`Metric clicked`);
}

function onImperialClicked() {
  isImperial = true;
  isMetric = false;

  updateUi();
  console.log(`Imperial clicked`);
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
