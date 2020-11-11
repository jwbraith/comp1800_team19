let countDownLength = new Date().getSeconds() + 60;
let now = new Date().getSeconds();
let x = setInterval(function() {
  let distance = countDownLength - now;
  let seconds = distance;
  document.getElementById("count").innerHTML = seconds;
}, 1000);