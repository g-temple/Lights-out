const buttons = document.querySelectorAll(".color-button");
const resetBtn = document.getElementById("reset");
const counter = document.getElementById("count");

function changeColor(btn) {
  const currentColor = btn.style.backgroundColor;
  if (currentColor === "white" || currentColor === "") {
    btn.style.backgroundColor = "blue";
  } else {
    btn.style.backgroundColor = "white";
  }
}

function updateCount() {
  let on = 0;
  buttons.forEach((btn) => {
    if (btn.style.backgroundColor === "blue") on++;
  });

  counter.innerHTML = `Count: ${on}`;
}

function addListeners(array) {
  array.forEach((button, i) => {
    button.addEventListener("click", () => {
      //above
      changeColor(array[i - (i < 4 ? -12 : 4)]);

      //below
      changeColor(array[i + (i > 11 ? -12 : 4)]);

      // left
      changeColor(array[i - (i % 4 == 0 ? -3 : 1)]);

      // right
      changeColor(array[i + (i % 4 == 3 ? -3 : 1)]);

      changeColor(button);

      updateCount();
    });
  });
}

resetBtn.addEventListener("click", () => {
  buttons.forEach((btn) => {
    btn.style.backgroundColor = "white";
  });
  counter.innerHTML = "Count: 0";
});

addListeners(buttons);
