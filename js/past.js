const pastLaunchesUrl = "https://api.spacexdata.com/v3/launches/past";
const corsFix = "https://noroffcors.herokuapp.com/";
const pastLaunchesContainer = document.querySelector(".past-launches")

const getPastLaunches = async () => {
  try {
    const responsePastLaunches = await fetch(corsFix + pastLaunchesUrl);
    const pastLaunchesResult = await responsePastLaunches.json();
    pastLaunchesContainer.innerHTML = ""
    console.log(pastLaunchesResult)
    createPastLaunchHtml(pastLaunchesResult)
  } catch (error) {
    console.log(error);
  }
}

getPastLaunches();


const createPastLaunchHtml = (pastLaunchesResult) => {
  pastLaunchesResult.map(pastLaunch => {
    console.log(pastLaunch)
    pastLaunchesContainer.innerHTML += createCards(pastLaunch);
  })
}

const createCards = (pastLaunch) => {
  
  const pastLaunchCardHtml = `
  <div class="card">
  <h3 class="headline">${pastLaunch.mission_name}</h3>
  <img class="patch" src=${pastLaunch.links.mission_patch_small} alt=${pastLaunch.mission_name}>
  <p>${americanTimeConverter(pastLaunch.launch_date_utc)}</p>
  <p><b>Flight:</b> ${pastLaunch.flight_number}</p>
  <p><strong>Launch site:</strong> ${pastLaunch.launch_site.site_name_long}</p>
  <p><strong>Rocket:</strong> ${pastLaunch.rocket.rocket_name}</p>
  <div>
  <a class="cta" href="details.html?flight_number=${pastLaunch.flight_number}">Learn more</a>
  </div>
  </div>`;
  return pastLaunchCardHtml;
};
