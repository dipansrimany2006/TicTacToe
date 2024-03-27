let boxes = document.querySelectorAll(".box");
let body = document.querySelector("body");
let audioturn = new Audio("/assets/mixkit-arcade-game-jump-coin-216.wav");
let gamewinsound = new Audio("/assets/success-fanfare-trumpets-6185.mp3");
let gamedrawsound = new Audio("/assets/mixkit-video-game-win-2016.wav");
// let gamestartsound = new Audio("/assets/mixkit-ethereal-fairy-win-sound-2019.wav")
let winimg = document.querySelector(".winimg");
let welcome = document.querySelector(".welcome");
let turn = true;
let count = 0;
let msg = document.querySelector(".msg");
let drawgame=false;
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
let turnX = document.querySelector(".turnX");
let turnO = document.querySelector(".turnO");
turnX.classList.add("hide");
turnO.classList.add("hide");
winimg.classList.add("hide");

const game = () => {
  welcome.classList.add("hide");
  turnX.classList.remove("hide");
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turn === true) {
        box.classList.add("x");
        turnX.classList.add("hide");
        turnO.classList.remove("hide");
        box.innerHTML = "X";
        audioturn.play();
        turn = false;
      } else {
        box.classList.add("o");
        turnO.classList.add("hide");
        turnX.classList.remove("hide");
        box.innerHTML = "O";
        audioturn.play();
        turn = true;
      }
      box.disabled = true;
      count++;

      let isWinner = checkWinner();

      if (count === 9 && !isWinner) {
        gameDraw();
        setTimeout(reset, 4000);
      }
    });
  });
};

const reset = ()=>{
    
    boxes.forEach((box)=> {
        console.log(box);
        box.classList.remove("x");
        box.classList.remove("o");
        box.innerHTML="";
        box.disabled=false;
        count =0;
   }); 
    // turn = true;
    msg.innerHTML="";
    winimg.classList.add("hide");
}
const gameDraw = () => {
  turnX.classList.add("hide");
  turnO.classList.add("hide");
  disabledbtns();
  msg.innerHTML = "Game Draw!";
  drawgame=true;
  gamedrawsound.play();
};
const disabledbtns = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};
const checkWinner = () => {
  for (let idx of winPatterns) {
    let pos1 = boxes[idx[0]].innerHTML;
    let pos2 = boxes[idx[1]].innerHTML;
    let pos3 = boxes[idx[2]].innerHTML;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 == pos2 && pos2 == pos3) {
        disabledbtns();
        turnX.classList.add("hide");
        turnO.classList.add("hide");
        msg.innerHTML = `Congratulation! Winner is ${pos1}`;
        gamewinsound.play();
        winimg.classList.remove("hide");
        setTimeout(reset, 4000);
        return true;
      }
    }
  }
};

const myTimeout = setTimeout(game, 3000);
