import $ from "jquery";

export let textOnOff = "";
export function textOnOffFunc(onOff) {
  clearInterval(textOnOff);
  clearInterval(timer);
  resetWaitingFunc();
  textOnOff = setInterval(function () {
    setTimeout(function () {
      document.getElementById("display").innerText = "";
    }, 200);
    setTimeout(function () {
      document.getElementById("display").innerText = onOff ? "ON" : "OFF";
    }, 400);
  }, 400);
  setTimeout(() => {
    clearInterval(textOnOff);
    if (onOff) setTimeout(() => waitingFunc(), 200);
  }, 1200);
}

export let dots = [];
export function waitingFunc() {
  let timerForOneDot = 120;
  let numOfDots = 3;
  for (let i = 0; i < numOfDots; i++) {
    dots[i] = setInterval(function () {
      setTimeout(function () {
        document.getElementById("display").innerText = ".".repeat(i + 1);
      }, timerForOneDot * i);
    }, timerForOneDot * numOfDots);
  }
}

export function resetWaitingFunc() {
  for (let i = 0; i < dots.length; i++) {
    clearInterval(dots[i]);
  }
}

let timer = "";
let timeSinceLastPress = 0;

export function inactivityAnimation(time) {
  setTimeout(() => {
    resetWaitingFunc();
    if (timeSinceLastPress > (time * 0.8) / 1000) {
      waitingFunc();
      clearInterval(timer);
    }
  }, time);
}

export function restartInactivityAnimation() {
  clearInterval(timer);
  timeSinceLastPress = 0;
  timer = setInterval(() => {
    timeSinceLastPress++;
  }, 1000);
}

export function enableBtns(handleKeyboardPress) {
  $("#right-side").css("pointerEvents", "none");
  setTimeout(() => {
    $("#left-side, #right-side").css("pointerEvents", "auto");
    $("#drum-machine").css("opacity", "1");
    $("#volumeRange").css("pointerEvents", "auto");
    document.addEventListener("keydown", handleKeyboardPress);
  }, 1500);
}

export function disableBtns(handleKeyboardPress) {
  $("#left-side, #right-side").css("pointerEvents", "none");
  document.removeEventListener("keydown", handleKeyboardPress);
  setTimeout(() => {
    $("#drum-machine").css("opacity", "0.8");
    $("#powerButton").css("pointerEvents", "auto");
    $("#volumeRange").css("pointerEvents", "none");
  }, 1500);
}
