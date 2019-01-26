
$(document).ready(function() {

function createTweetElement(tweetInfo){

// function to fix cross script vulnerbility, doesnt directly use text into html but converts to text first.
  const input = tweetInfo.content.text;
  function escape(input){
    var span = document.createElement('span');
    span.appendChild(document.createTextNode(tweetInfo.content.text));
    return span.innerHTML;
  }

const safeHTML = `${escape(tweetInfo.content.text)}`;

//for the date i can use the stamp then convert to how many days ago or minutes or seconds using if statements.
// console.log(`${tweetInfo.created_at}`);

//this is the differernce in milliseconds between creation and now. we will have to convert to actual time.
let diff = (Date.now() - (`${tweetInfo.created_at}`));

//60 000 miliseconds in a minute, If under one minute convert to seconds then round.
if(diff < 60000) {
  diff = Math.round(((diff / 60000) * 60)) + " seconds ago. ";
} else if(60000 <= diff && diff < 90000) {
  diff = Math.round(((diff / 3600000) * 60)) + " minute ago."; // if the diff is between 1 and 1.5 minutes round to one minute remove the s.
} else if(90000 <= diff && diff < 3600000) {
  diff = Math.round(((diff / 3600000) * 60)) + " minutes ago."; //convert to minutes.
} else if(3600000 <= diff && diff < 5400000) {
  diff = Math.round(((diff / 86400000) * 24)) + " hour ago.";  //converts to hours. this is always be one hour.
} else if(5400000 <= diff && diff < 86400000) {
  diff = Math.round(((diff / 86400000) * 24)) + " hours ago."; //converts to hours
} else if(86400000 <= diff && diff < 129600000) {
  diff = Math.round(((diff / 31556952000) * 365)) + " day ago.";  //concerts to one day
} else if(86400000 <= diff && diff < 31556952000) {
  diff = Math.round(((diff / 31556952000) * 365)) + " days ago.";  //concerts to days,
} else if(31556952000 <= diff && diff < 47335428000) {
  diff = Math.round(((diff / 31556952000))) + " year ago." //if between 1.0 and 1.5 years convert to a single year.
} else{
  diff = Math.round(((diff / 31556952000))) + " years ago." // if over 1.5 years, will convert to 2 years or more.
}


return ` <article class="tweet-container">
        <header>
          <img class="logo" src="${tweetInfo.user.avatars.small}" >
          <h2 class="name">${tweetInfo.user.name}</h2>
          <h4 class ="handle">${tweetInfo.user.handle}</h4>
        </header>` +
        '<span>' + safeHTML + '</span>' +
        `<footer>
          <h6 class="date">${diff}</h6>
          <img src="/images/like.png">
          <img src="/images/post.png">
          <img src="/images/retweet.png">
        </footer>
      </article>`
}

function renderTweets(tweets) {
//this function cycles through entire tweet data array and feeds each one to the createTweetElement function. saved the result of each function call.
  var result = "";
  for(let i = 0; i < tweets.length; i++){
    result += createTweetElement(tweets[i]);
  }
  return result;
}

      //  catchthe submission of form using jquerry,
      // prevent the default event from happening.
      // instead make an ajax request instead of post request.

$("form").submit(function(event) {
  event.preventDefault();
  $('.emptyError').slideUp("fast"); //slide up error codes.
  $('.longError').slideUp("fast");

  if($('textarea').serialize().length > 145){ //use 145 because of "text=" is 5 characters.
    event.preventDefault();
    $('.longError').slideDown("fast");
  } else if(($('textarea').serialize().length) === 5){
    event.preventDefault();
    $('.emptyError').slideDown("fast");
  } else {
    event.preventDefault();
    $.post("/tweets", $('textarea').serialize(), function(data, status) {
    loadTweets();
    });
    $('textarea').val(''); //this clears the text area, after successful tweet.
    count[0].innerHTML = 140; //resets the counter.
  }
});


//setting variable for character counter,
var char = 140;
var count = document.getElementsByClassName("counter");
count[0].innerHTML = char;


//get elements by name returns an array so we must reference to use.

var listen1 = document.getElementsByName("text");
listen1[0].addEventListener("keypress", characterCounter); //listens to text box, if key is pressed then function is called.

function characterCounter() {
  char = 139 - this.value.length;
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


//code for the button to load compose tweet html
$('#load-compose').click(function () {
  $('#new-tweet').slideToggle("slow");
  $('textarea').select();
});


//function to load tweets from website then send them to render function.
function loadTweets() {
  $.get("/tweets", function(data, status) {
   $('.tweets-container').empty().prepend(renderTweets(data.reverse()));
  });
}

loadTweets();
});