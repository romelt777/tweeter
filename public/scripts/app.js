/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

function createTweetElement(tweetInfo){
//filling in hard coded tweet w/ data from object.


// function to fix cross script vulnerbility, doesnt directly use text into html but converts to text first.
  const input = tweetInfo.content.text;
  function escape(input){
    var span = document.createElement('span');
    span.appendChild(document.createTextNode(tweetInfo.content.text));
    return span.innerHTML;
  }

const safeHTML = `${escape(tweetInfo.content.text)}`;
// console.log(input);
// console.log($('<span>')
return ` <article class="tweet-container">
        <header>
          <img class="logo" src="${tweetInfo.user.avatars.small}" >
          <h2 class="name">${tweetInfo.user.name}</h2>
          <h4 class ="handle">${tweetInfo.user.handle}</h4>
        </header>` +
        '<span>' + safeHTML + '</span>' +
        `<footer>
          <h6 class="date">${tweetInfo.created_at}</h6>
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
  if($('textarea').serialize().length > 145){
    event.preventDefault();
    alert("Your tweet is too long.");
  } else if(($('textarea').serialize().length) === 5){
    event.preventDefault();
    alert("Empty tweets are not allowed.");
  } else {
    // alert($('textarea').serialize().length);
    event.preventDefault();
    $.post("/tweets", $('textarea').serialize(), function(data, status) {
      loadTweets();
    });
  }
});


//code for the button to load compose tweet html
$('#load-compose').click(function () {
  $('#new-tweet').slideToggle("slow");
  $('textarea').select();
  console.log("im here");
});



//function to load tweets from website then send them to render function.
function loadTweets() {
  $.get("/tweets", function(data, status) {
    // alert("hey")
    // alert(renderTweets(data));

   $('.tweets-container').empty().prepend(renderTweets(data.reverse()));
  });
}


loadTweets();


});