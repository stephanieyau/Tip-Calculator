"use strict";

// Selecting elements
const billInput = document.getElementById("bill__input");
const tipBtn = document.querySelectorAll(".btn__tip-item");
const customInput = document.getElementById("custom__input");
const peopleInput = document.getElementById("people__input");

const resultTip = document.getElementById("result__tip");
const resultTotal = document.getElementById("result__total");

const btnCalculate = document.querySelector(".btn__calculate");
const btnReset = document.querySelector(".btn__reset");

const warning1 = document.querySelector(".warning-1");
const warning2 = document.querySelector(".warning-2");
const warning3 = document.querySelector(".warning-3");

let billAmount,
  tipAmount,
  customAmount,
  peopleAmount,
  resultsTipAmount,
  resultsTotalAmount;

// Reusable function - remove all warning classes

function removeAllWarnings() {
  warning1.classList.add("hidden");
  warning2.classList.add("hidden");
  warning3.classList.add("hidden");
  billInput.classList.remove("form-hidden");
  peopleInput.classList.remove("form-hidden");
}

// const btnChangeColor = function () {
//   tipBtn.forEach(function () {
//     tipBtn.insertAdjacentHTML(
//       "beforeend",
//       <button
//         class="btn btn__tip-item btn__tip-item-selected"
//         data-btn="0.05"
//       ></button>
//     );
//   });
// };

// Starting conditions & defining our variables

const init = function () {
  billInput.value = "";
  customInput.value = "";
  peopleInput.value = "";
  resultTip.textContent = "0.00";
  resultTotal.textContent = "0.00";

  tipAmount = undefined;
  customAmount = "";
  peopleAmount = "";
  resultsTipAmount = "";
  resultsTotalAmount = "";

  removeAllWarnings();
};

init();

// When user selects tip - define tipAmount here upon click
tipBtn.forEach(function (i) {
  i.addEventListener("click", function () {
    tipAmount = Number(i.getAttribute("data-btn")); // note: tipAmount is a string originally. I've made this into a number
    customInput.value = "";

    // i.classList.add("btn__tip-item-selected");
  }); // Note: tipAmount is undefined UNLESS you call the tipBtn function that's set outside this current function. Once clicked, tipAmount will be assigned the value of that button.
});

// Revert to original colour when another tip amount is clicked/selected

// Compute
btnCalculate.addEventListener("click", function () {
  billAmount = Number(billInput.value);
  customAmount = Number(customInput.value);
  peopleAmount = Number(peopleInput.value);

  // If bill value missing, display warning
  if (billInput.value.length == 0) {
    warning1.classList.remove("hidden");
    billInput.classList.add("form-hidden");
  }

  // If tip amount missing, display warning
  if (tipAmount == undefined && customInput.value.length == 0) {
    warning2.classList.remove("hidden");
  }

  // If people value missing, display warning
  if (peopleInput.value.length == 0) {
    warning3.classList.remove("hidden");
    peopleInput.classList.add("form-hidden");
  }

  // If >= 1 field(s) missing, return
  if (
    billInput.value.length == 0 ||
    peopleInput.value.length == 0 ||
    (tipAmount == undefined && customInput.value.length == 0)
  )
    return;

  // If all fields entered, execute function
  // Scenario 1: user selects tip
  if (tipAmount !== undefined && customInput.value.length == 0) {
    resultsTipAmount = (billAmount * tipAmount) / peopleAmount;
    resultsTotalAmount = billAmount / peopleAmount + resultsTipAmount;

    resultTip.textContent = resultsTipAmount.toFixed(2);
    resultTotal.textContent = resultsTotalAmount.toFixed(2);

    removeAllWarnings();
  } else if (customInput.value.length !== 0) {
    //Note: calculation error before because you wrote "typeof tipAmount == undefined". Know the difference!
    // Scenario 2: user enters custom tip
    customAmount = customInput.value / 100;
    resultsTipAmount = (billAmount * customAmount) / peopleAmount;
    resultsTotalAmount = billAmount / peopleAmount + resultsTipAmount;

    resultTip.textContent = resultsTipAmount.toFixed(2);
    resultTotal.textContent = resultsTotalAmount.toFixed(2);

    removeAllWarnings();
  }
});

// Resetting
btnReset.addEventListener("click", init);

// Function that keeps button colour permanently changed when selected
// When a button is selected, we want the below function to happen...
