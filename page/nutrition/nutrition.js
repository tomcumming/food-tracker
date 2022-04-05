import { findElement } from "../../script/query.js";

const foodForm = findElement(HTMLFormElement, document.body, "#food-form");
const formSubmitBtn = findElement(
  HTMLInputElement,
  foodForm,
  'input[type="submit"]'
);

const url = new URL(window.location.href);
const backUrl = url.searchParams.get("backTo");
const foodId = url.searchParams.get("food");
if (foodId === null) throw new Error(`No food ID provided`);

foodForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submitting");
});
formSubmitBtn.disabled = false;
