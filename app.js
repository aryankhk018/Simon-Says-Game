let gameSeq = [];
let userSeq = [];

let body = document.querySelector("body");
let h2 = document.querySelector("h2");
let h3 = document.getElementById("display_High");

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
//Initializing highscore to zero
let highScore = 0;

//this statement starts the game
document.addEventListener("keypress", function () {
  //   console.log("game Started");

  //This statement restricts the game to be started only once

  if (started == false) {
    console.log("game Started");

    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 300);
}

let levelUp = function () {
  userSeq = [];
  level++;

  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randClr = btns[randIdx];
  let randBtn = document.querySelector(`.${randClr}`);

  gameSeq.push(randClr);
  console.log(gameSeq);

  btnFlash(randBtn);
};

function checkAns(idx) {
  // console.log("curr level:", level);
  //  let idx= level-1;
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      // console.log("correct");
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was: <b>${level}</b> <br>
    Press any key to restart`;
    changeBg();
    updateHighScore(level);
    reset();
  }
}

//this statement detects which button was pressed
let btnPress = function () {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  console.log(userColor);

  userSeq.push(userColor);
  console.log(userSeq);

  checkAns(userSeq.length - 1);
};

//This statement adds eventlisteners to all the btns
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function changeBg() {
  body.classList.add("changeBg");

  setTimeout(function () {
    body.classList.remove("changeBg");
  }, 300);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function updateHighScore(level) {
  if (level > highScore) {
    console.log("High score updated");
    highScore = level;
    h3.innerText = `Your High score is : ${highScore}`;
  }
}
