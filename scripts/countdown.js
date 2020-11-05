let countDownLength = new Date().getSeconds() + 60;
let x = setInterval(function() {
  let now = new Date().getSeconds();
  let distance = countDownLength - now;
  let seconds = Math.floor(distance);

  document.getElementById("count").innerHTML = seconds + "seconds";
}, 1000);