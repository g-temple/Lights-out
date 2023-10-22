const buttons = document.querySelectorAll(".color-button");
const resetBtn = document.getElementById("reset");
const counter = document.getElementById("count");

let n = parseInt(
  document
    .getElementById("n")
    .innerHTML.substring(
      document.getElementById("n").innerHTML.length - 1,
      document.getElementById("n").innerHTML.length
    )
);

resetBtn.addEventListener("click", () => {
  buttons.forEach((btn) => {
    btn.style.backgroundColor = "white";
  });
  counter.innerHTML = "Count: 0";
});

topBtns = [];

if (document.getElementById("t0") != null) {
  for (let i = 0; i < n * n; i++) {
    topBtns.push(document.getElementById("t" + i));
  }
}
addListeners(topBtns);

midBtns = [];

if (document.getElementById("m0") != null) {
  for (let i = 0; i < n * n; i++) {
    midBtns.push(document.getElementById("m" + i));
  }
}

addListeners(midBtns);

botBtns = [];
if (document.getElementById("b0") != null) {
  for (let i = 0; i < n * n; i++) {
    botBtns.push(document.getElementById("b" + i));
  }
}
addListeners(botBtns);

// if more layers are present
iBtns = [];
if (document.getElementById("i0") != null) {
  for (let i = 0; i < n * n; i++) {
    iBtns.push(document.getElementById("i" + i));
  }
}
addListeners(iBtns);

uBtns = [];
if (document.getElementById("u0") != null) {
  for (let i = 0; i < n * n; i++) {
    uBtns.push(document.getElementById("u" + i));
  }
}
addListeners(uBtns);

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
  array.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Change the color of the clicked button
      changeColor(button);

      // evalute which noncoplanar buttons are affected by a particular button press
      if (n == 2) {
        if (button.id.charAt(0) == "t") {
          changeColor(botBtns[index]);
        }
        if (button.id.charAt(0) == "b") {
          changeColor(topBtns[index]);
        }
      }

      if (n == 3) {
        if (button.id.charAt(0) == "t" || button.id.charAt(0) == "b") {
          changeColor(midBtns[index]);
        }
        if (button.id.charAt(0) == "m") {
          changeColor(topBtns[index]);
          changeColor(botBtns[index]);
        }
      }

      if (n == 4) {
        if (button.id.charAt(0) == "t") {
          changeColor(midBtns[index]);
        }
        if (button.id.charAt(0) == "m") {
          changeColor(topBtns[index]);
          changeColor(iBtns[index]);
        }
        if (button.id.charAt(0) == "i") {
          changeColor(midBtns[index]);
          changeColor(botBtns[index]);
        }
        if (button.id.charAt(0) == "b") {
          changeColor(iBtns[index]);
        }
      }
      if (n == 5) {
        if (button.id.charAt(0) == "t") {
          changeColor(uBtns[index]);
        }
        if (button.id.charAt(0) == "u") {
          changeColor(topBtns[index]);
          changeColor(midBtns[index]);
        }
        if (button.id.charAt(0) == "m") {
          changeColor(uBtns[index]);
          changeColor(iBtns[index]);
        }
        if (button.id.charAt(0) == "i") {
          changeColor(midBtns[index]);
          changeColor(botBtns[index]);
        }
        if (button.id.charAt(0) == "b") {
          changeColor(iBtns[index]);
        }
      }

      // Get row and column of the clicked button
      const row = Math.floor(index / n);
      const col = index % n;

      // Define relative positions of adjacent buttons: above, below, left, and right
      const adjacentPositions = [
        [row - 1, col], // above
        [row + 1, col], // below
        [row, col - 1], // left
        [row, col + 1], // right
      ];

      // Change the color of adjacent buttons (if they are within the grid)
      adjacentPositions.forEach((position) => {
        const [row, col] = position;
        const idx = row * n + col;
        if (row >= 0 && row < n && col >= 0 && col < n) {
          changeColor(array[idx]);
        }
      });

      updateCount();
    });
  });
}
