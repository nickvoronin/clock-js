"use strict";
let timer = setInterval( function() {
  let text = document.body;
  text.scrollTop += 3;
  console.log(text.scrollTop);
}, 50)
