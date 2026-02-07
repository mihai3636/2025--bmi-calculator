console.log("Hello world!");

const wrappers = document.querySelectorAll(".input-wrapper");

wrappers.forEach((wrapperEl) => {
  wrapperEl.addEventListener("click", (e) => {
    const inputEl = wrapperEl.querySelector("input");
    if (e.target === inputEl) return;

    inputEl.focus();
    const length = inputEl.value.length;
    inputEl.setSelectionRange(length, length);
  });
});
