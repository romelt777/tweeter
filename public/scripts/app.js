/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  console.log("Im working again");

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

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}


var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log("tst", $tweet); // to see what it looks like
$('.tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});