/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

function createTweetElement(tweetInfo){
//filling in hard coded tweet w/ data from object.

return ` <article class="tweets-container">
        <header>
          <img class="logo" src="${tweetInfo.user.avatars.small}" >
          <h2 class="name">${tweetInfo.user.name}</h2>
          <h4 class ="handle">${tweetInfo.user.handle}</h4>
        </header>
          <span class="tweet">${tweetInfo.content.text}</span>
        <footer>
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

//function to load tweets from website then send them to render function.
function loadTweets() {
  $.get("/tweets", function(data, status) {
    // alert("hey")
    // alert(renderTweets(data));
   $('.tweets-container').append(renderTweets(data));
  });
}



loadTweets();









});