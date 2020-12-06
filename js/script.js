var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer AAAAAAAAAAAAAAAAAAAAAPThJQEAAAAACjMrScjFfGIV7u9myYUnQPE5J3A%3DNbHgJQnY225IybdmKtGcKU9S06qRcKi5axWJNSedpYiV3JL1P2"
);
myHeaders.append(
  "Cookie",
  'personalization_id="v1_rDghf3nbac8J+K7CCy+CJQ=="; guest_id=v1%3A160461112338379738; lang=en'
);

const corsFix = "https://noroffcors.herokuapp.com/";
const tweetContainer = document.querySelector(".tweet-feed");

const urlTweet =
  "https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=34743251&count=1";
let requestOptionsTweetFeed = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

const getTweets = async () => {
  try {
    const responseTweets = await fetch(
      corsFix + urlTweet,
      requestOptionsTweetFeed
    );
    const jsonTweets = await responseTweets.json();
    console.log(jsonTweets);
    tweetContainer.innerHTML = "";
    createHtml(jsonTweets);
  } catch (error) {
    tweetContainer.innerHTML = displayError(
      "Something went wrong, try again later"
    );
  }
};

getTweets();

//Create HTML from the json. This is the easiest way I found to display images and text.

const createHtml = (jsonTweets) => {
  for (let i = 0; i < jsonTweets.length; i++) {
    let innerArray = jsonTweets[i].entities.media;
    if (innerArray === undefined) {
      tweetContainer.innerHTML += `
        <a href="https://twitter.com/spacex">
          <div class="twitter-card">
          <p>@${jsonTweets[i].user.name}</p>
          <p>${americanTimeConverter(jsonTweets[i].created_at)}</p
          <p>${jsonTweets[i].text}</p>
          <p>Retweets: ${jsonTweets[i].retweet_count}</p>
          </div>
          </a>
          `;
      continue;
    } else {
      for (let j = 0; j < innerArray.length; j++) {
        let imageUrl = innerArray[j].media_url;
        tweetContainer.innerHTML += `
          <a href="https://twitter.com/spacex">
          <div class="twitter-card">
          <p>Latest Tweet by ${jsonTweets[i].user.name}</p>
          <p>${americanTimeConverter(jsonTweets[i].created_at)}</p>
          <img class="thumbnail" src="${imageUrl}">
          <p>${jsonTweets[i].text}</p>
          <p>Retweets: ${jsonTweets[i].retweet_count}</p>
          </div>
          </a>
          `;
      }
    }
  }
};

/*************************************Recent launches.*********************************************************************/

const latestLaunchUrl = "https://api.spacexdata.com/v4/launches/latest";
const latestLaunchContainer = document.querySelector(".recent-launches");

const fetchLatestLaunch = async () => {
  try {
    const response = await fetch(corsFix + latestLaunchUrl);
    const latestLaunchResult = await response.json();
    latestLaunchHtml(latestLaunchResult);
  } catch (error) {
    latestLaunchContainer.innerHTML = displayError(
      "Something went wrong, try again later"
    );
  }
};

fetchLatestLaunch();

const latestLaunchHtml = (latestLaunchResult) => {
  const vehicleName = latestLaunchResult.name;
  const launchDate = latestLaunchResult.date_utc;
  const description = latestLaunchResult.details;
  const article = latestLaunchResult.links.article;
  const liveFeed = latestLaunchResult.links.webcast;

  latestLaunchContainer.innerHTML = `
  <div class="card">
  <h2 class="headline">${vehicleName}</h2>
  <p>${americanTimeConverter(launchDate)}</p>
  <p>${description}</p>
  <a href="${article}" target="_blank">Link to article</a>
  <a class="cta" href="${liveFeed}" target="_blank">Live stream</a>
  </div>`;
};

/*************************************************Next launch****************************************************************/

const nextLaunchUrl = "https://api.spacexdata.com/v4/launches/next";
const nextLaunchContainer = document.querySelector(".next-launch");

const fetchNextLaunch = async () => {
  try {
    const response = await fetch(corsFix + nextLaunchUrl);
    const latestLaunchResult = await response.json();
    nextLauncHtml(latestLaunchResult);
    console.log(latestLaunchResult);
  } catch (error) {
    nextLaunchContainer.innerHtml = displayError(
      "Something went wrong, try again later"
    );
  }
};

fetchNextLaunch();

const nextLauncHtml = (latestLaunchResult) => {
  const vehicleName = latestLaunchResult.name;
  const launchDate = latestLaunchResult.date_utc;
  const description = latestLaunchResult.details;
  const article = latestLaunchResult.links.article;
  const liveFeed = latestLaunchResult.links.webcast;
  nextLaunchContainer.innerHTML = `
  <div class="card">
  <h2 class="headline">${vehicleName}</h2>
  <p>${americanTimeConverter(launchDate)}</p>
  <a href="${article}" target="_blank">Read article here</a>
  <a class="cta" href="${liveFeed}" target="_blank">Live stream</a>
  </div>`;

  /****************************Countdown to next launch. Credits goes to W3 schools for the conversion formula ***********************/

  const countdownTimer = setInterval(() => {
    const countdownContainer = document.querySelector("#countdown");

    const launchTime = Date.parse(launchDate);
    const now = Date.parse(new Date());
    const totalTimeRemaining = launchTime - now;

    const seconds = Math.floor((totalTimeRemaining / 1000) % 60);
    const minutes = Math.floor((totalTimeRemaining / 1000 / 60) % 60);
    const hours = Math.floor((totalTimeRemaining / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalTimeRemaining / (1000 * 60 * 60 * 24));

    countdownContainer.innerHTML = `
    <div class="countdown">
      <div class="days">
        <p class="number">${days}</p> 
        <p class="letters">days</p>
      </div>
      <div class="hours">
        <p class="number">${hours}</p> 
        <p class="letters">hours</p>
      </div>
      <div class="minutes">
        <p class="number">${minutes}</p> 
        <p class="letters">minutes</p>
      </div>
      <div class="seconds">
        <p class="number">${seconds}</p> 
        <p class="letters">seconds</p>
      </div>
    </div>`;

    if (totalTimeRemaining < 0) {
      clearInterval(countdownTimer);
      countdownContainer.innerHTML = `<h2 class="countdown__LaunchedMessage">${vehicleName} launched</h2>`;
    }
  }, 1000);
};

/****************************************************Upcoming launches.**********************************************/

const pastLaunchesContainer = document.querySelector(".upcoming-launches");
const launchesUpcomingUrl = "https://api.spacexdata.com/v4/launches/upcoming";

const getUpcomingLaunches = async () => {
  try {
    const responseUpcomingLaunches = await fetch(corsFix + launchesUpcomingUrl);
    const upcomingLaunches = await responseUpcomingLaunches.json();
    console.log(upcomingLaunches);
    mapUpcomingLaunches(upcomingLaunches);
  } catch (error) {
    console.log(error);
  }
};

getUpcomingLaunches();

function displayDetails(text) {
  return `
    <h3>Mission details</h3>
    <p>${text}</p>
    `;
}

function launchTemplate(launch) {
  return `
    <div class="card">
    <h2 class="headline">${launch.name}</h2>
    <p><strong>Launch date:</strong> ${americanTimeConverter(
      launch.date_utc
    )}</p>
    <p>${
      launch.details
        ? displayDetails(launch.details)
        : "No details for this mission at this point. This will be updated automatically from SpaceX, shortly before launch."
    }</p>
    </div>
    `;
}

function mapUpcomingLaunches(upcomingLaunches) {
  pastLaunchesContainer.innerHTML = `${upcomingLaunches
    .map(launchTemplate)
    .join("")}`;
}
