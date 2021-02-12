for (var i = 1; i <= 5; i++) {
  (function() {
    let j = i;
    setTimeout(function() {
      console.log("i: " + j);
    }, j * 1000);
  })();
}
