const buttons = document.querySelectorAll(".color-button");
const resetBtn = document.getElementById("reset");
const counter = document.getElementById("count");

resetBtn.addEventListener("click", () => {
  buttons.forEach((btn) => {
    btn.style.backgroundColor = "white";
  });
});

const topBtns = [];

topBtns.push(document.getElementById("t0"));
topBtns.push(document.getElementById("t1"));
topBtns.push(document.getElementById("t2"));
topBtns.push(document.getElementById("t3"));
topBtns.push(document.getElementById("t4"));
topBtns.push(document.getElementById("t5"));
topBtns.push(document.getElementById("t6"));
topBtns.push(document.getElementById("t7"));
topBtns.push(document.getElementById("t8"));

addListeners(topBtns);

midBtns = [];

midBtns.push(document.getElementById("m0"));
midBtns.push(document.getElementById("m1"));
midBtns.push(document.getElementById("m2"));
midBtns.push(document.getElementById("m3"));
midBtns.push(document.getElementById("m4"));
midBtns.push(document.getElementById("m5"));
midBtns.push(document.getElementById("m6"));
midBtns.push(document.getElementById("m7"));
midBtns.push(document.getElementById("m8"));

addListeners(midBtns);

botBtns = [];

botBtns.push(document.getElementById("b0"));
botBtns.push(document.getElementById("b1"));
botBtns.push(document.getElementById("b2"));
botBtns.push(document.getElementById("b3"));
botBtns.push(document.getElementById("b4"));
botBtns.push(document.getElementById("b5"));
botBtns.push(document.getElementById("b6"));
botBtns.push(document.getElementById("b7"));
botBtns.push(document.getElementById("b8"));

addListeners(botBtns);

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

      if (button.id.charAt(0) == "t" || button.id.charAt(0) == "b") {
        changeColor(midBtns[index]);
      }
      if (button.id.charAt(0) == "m") {
        changeColor(topBtns[index]);
        changeColor(botBtns[index]);
      }

      // Get row and column of the clicked button
      const row = Math.floor(index / 3);
      const col = index % 3;

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
        const idx = row * 3 + col;
        if (row >= 0 && row < 3 && col >= 0 && col < 3) {
          changeColor(array[idx]);
        }
      });

      updateCount();
    });
  });
}
