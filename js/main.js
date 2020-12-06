
const footerContainer = document.querySelector(".footer--inner");
const upcomingLaunches = document.querySelector(".launches--upcoming");
const recentLaunches = document.querySelector(".launches--recent");
const previousLaunches = document.querySelector(".launches--previous");
const footerContentUrl = "https://api.spacexdata.com/v4/company/";
const launchesUpcomingUrl = "https://api.spacexdata.com/v4/launches/upcoming";
const recentLaunchesUrl = "https://api.spacexdata.com/v4/launches/latest";
const previousLaunchesUrl = "https://api.spacexdata.com/v4/launches/past";
const corsFix = "https://noroffcors.herokuapp.com/";

//Upcoming launches

async function getLaunches() {
  try {
    const responseLaunches = await fetch(corsFix + launchesUpcomingUrl);
    const launchesJson = await responseLaunches.json();
    console.log(launchesJson);
    upcomingLaunches.innerHTML = "";
    for (let i = 0; i < launchesJson.length; i++) {
      upcomingLaunches.innerHTML += `<a href="https://www.spacex.com/launches/" target="_blank">
                                    <div class="launches">
                                      <h3 style="color: white">${launchesJson[i].name}</h3>
                                      <h3 style="color:white">${launchesJson[i].date_local}</h3>
                                    </div>
                                    </a>`;
    }
  } catch (error) {
    console.log(error);
    upcomingLaunches.innerHTML = displayError("Something went wrong, try again later")
  }
}

getLaunches();

//recent launches

async function getRecentLaunches() {
  try {
    const responseRecentLaunches = await fetch(corsFix + recentLaunchesUrl);
    const recentLaunchesJson = await responseRecentLaunches.json();
    console.log(recentLaunchesJson);
    recentLaunches.innerHTML = "";

      recentLaunches.innerHTML += `<a href="${recentLaunchesJson.links.webcast}" target="_blank>
                                  <div class="launches">
                                  <img alt="No image provided" class="patch" src="${recentLaunchesJson.links.patch.small}">
                                  <h3 style="color: white">${recentLaunchesJson.name}</h3>
                                  <p style="color: white">${recentLaunchesJson.date_local}</p>
                                  <p class="launch--details">${recentLaunchesJson.details}</p>
                                    </div></a>`;

   
  
  } catch (error) {
    recentLaunches.innerHTML = displayError("Something went wrong, try again later")
  }
}
getRecentLaunches()
//Previous Launches

async function getPreviousLaunches() {
  try {
    const responsePreviousLaunches = await fetch(corsFix + previousLaunchesUrl);
    const previousLaunchesJson = await responsePreviousLaunches.json();
    console.log(previousLaunchesJson);
    previousLaunches.innerHTML = "";

    for (let i = 0; i < previousLaunchesJson.length; i++) {
      console.log(previousLaunchesJson[i]);
      if (previousLaunchesJson[i].details === null) { //I only wanted to show past launches with a description.
        continue;
      } if (i === 9) { //Limiting the results from the API. This can be anything. Since the result in this case is more than 100, I set this to 10 past launches.
        break;
      }

      previousLaunches.innerHTML += `<div class="launches">
                                    <img class="patch" src="${previousLaunchesJson[i].links.patch.small}">
                                    <h3 style="color: white">${previousLaunchesJson[i].name}</h3>
                                    <p style="color: white">${previousLaunchesJson[i].date_local}</p>
                                    <p class="launch--details">${previousLaunchesJson[i].details}</p>
                                      </div>`;
    }
  } catch (error) {
    previousLaunches.innerHTML = displayError("Something went wrong, try again later")
  }
}

//Footer content

let requestOptions = {
  method: "GET",
  redirect: "follow",
};

async function getCompany() {
  try {
    const response = await fetch(footerContentUrl, requestOptions);
    const companyInfo = await response.json();
    footerContainer.innerHTML += `<div class="cards">    
                                    <h3>SpaceX Headquarters:</h3>
                                    <p style="color:white">${companyInfo.headquarters.address}</p>
                                    <p>${companyInfo.headquarters.city}</p>
                                    <p>${companyInfo.headquarters.state}</p>
                                  </div>
                                  <div class="cards">
                                    <h3>Follow us on social Media</h3>
                                    <a href="${companyInfo.links.elon_twitter}" target=_blank>Elon Musk Twitter</a>
                                    <a href="${companyInfo.links.flickr}" target=_blank>Flickr</a>
                                    <a href="${companyInfo.links.twitter}" target=_blank>Twitter</a>
                                    <a href="${companyInfo.links.website}" target=_blank>SpaceX Website</a>
                                  </div>`;
  } catch(error) {
    footerContainer.innerHTML = displayError("Something went wrong, try again later")
  }
}

getCompany();

//Toggle past launches with the CTA

const launchButton = document.getElementById("getPastLaunches");
launchButton.addEventListener("click", getPreviousLaunches);
