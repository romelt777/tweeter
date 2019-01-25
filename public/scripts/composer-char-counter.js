
$(document).ready(function() {

});




//setting variable for character counter,
var char = 140;
var count = document.getElementsByClassName("counter");
count[0].innerHTML = char;


//get elements by class returns an object so we must reference which.
//listens to text box, if key is pressed then function is run.

var listen1 = document.getElementsByName("text");
listen1[0].addEventListener("keypress", testFunction);
function testFunction() {
  // console.log(this.value.length);
  char = 139 - this.value.length;
  // console.log("tst", charLength);
  if (char < 0){
    count[0].innerHTML = char;
    document.getElementsByClassName("counter")[0].style.color = "red";
    return char;
  } else {
    count[0].innerHTML = char;
    document.getElementsByClassName("counter")[0].style.color = "black";
    return char;
  }
}

//backspace updates later