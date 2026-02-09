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

console.log(
  heightMainUnitEl,
  heightSecondaryUnitEl,
  weightMainUnitEl,
  weightSecondaryUnitEl,
);

let isMetric = false;
let isImperial = true;

wrappers.forEach((wrapperEl) => {
  wrapperEl.addEventListener("click", (e) => {
    const inputEl = wrapperEl.querySelector("input");
    if (e.target === inputEl) return;

    inputEl.focus();
    const length = inputEl.value.length;
    inputEl.setSelectionRange(length, length);
  });
});

inputMetricEl.addEventListener("click", onMetricClicked);
inputImperialEl.addEventListener("click", onImperialClicked);
updateUi();

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
