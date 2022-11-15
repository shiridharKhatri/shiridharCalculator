let screen = "";
let numBtns = document.querySelectorAll(".btn");
let screenInp = document.getElementById("screenInp");
let secScreen = document.getElementById("sec-screen");
let sound = new Audio('sound/click.mp3')
Array.from(numBtns).forEach((elements) => {
  elements.addEventListener("click", (e) => {
    let targettedElems = e.target.innerHTML;
    if (targettedElems == "X") {
      targettedElems = "*";
      screen += targettedElems;
      screenInp.value = screen;
    } else if (targettedElems == "÷") {
      targettedElems = "/";
      screen += targettedElems;
      screenInp.value = screen;
    } else if (targettedElems == "AC") {
      targettedElems = "";
      screen = targettedElems;
      screenInp.value = screen;
    } else if (targettedElems == "=") {
      screen = eval(screen);
      screenInp.value = screen;
      secScreen.innerHTML = "";
    } else if (targettedElems == `<i class="fa-solid fa-delete-left"></i>`) {
      screen = screen.substr(0, screen.length - 1);
      screenInp.value = screen;
    } else {
      screen += targettedElems;
      screenInp.value = screen;
    }
    if (eval(screen) == undefined) {
      secScreen.innerHTML = "";
    } else if (targettedElems == "=") {
      secScreen.innerHTML = "";
    } else {
      secScreen.innerHTML = eval(screen);
      
    }
    sound.play();
  });
});
function scrSum() {
  let historyData = localStorage.getItem("history");
  let date = new Date();
  let time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

  let hObj = {
    qsn: screen,
    ans: eval(screen),
    time: `${date.toDateString()} At ${time}`,
  };
  if (historyData == null) {
    historyObj = [];
  } else {
    historyObj = JSON.parse(historyData);
  }
  historyObj.push(hObj);
  localStorage.setItem("history", JSON.stringify(historyObj));

  let html = "";
  Array.from(historyObj).forEach((numbers) => {
    html += `
        <div class="cont">
        <h2><i class="fa-solid fa-calculator"></i> ${numbers.qsn}</h2>
        <h4>= ${numbers.ans}</h4>
        <p>${numbers.time}</p>
      </div>
        `;
  });
  let historyContent = document.querySelector(".historyContent");
  historyContent.innerHTML = html;
}
let historySc =
  document.querySelector(".history").firstElementChild.firstElementChild;
let historyScreen = document.querySelector(".historyScreen");
historySc.addEventListener("click", () => {
  historyScreen.style.right = "0%";
});
document.getElementById("cross").addEventListener("click", () => {
  historyScreen.style.right = "-90%";
});

let clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

let loader = document.querySelector(".loader");
function loading() {
  loader.style.display = "none";
}