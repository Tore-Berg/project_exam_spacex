const detailsContainer = document.querySelector(".details");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const flightNumber = params.get("flight_number");
const corsFixDetails = "https://noroffcors.herokuapp.com/";
const detailsUrl = "https://api.spacexdata.com/v3/launches/" + flightNumber;

const getDetails = async () => {
  try {
    const responseDetails = await fetch(corsFixDetails + detailsUrl);
    const missionDetails = await responseDetails.json();
    console.log(missionDetails);
    createDetailsHtml(missionDetails);
  } catch (error) {
    detailsContainer.innerHTML = displayError(
      "Something went wrong, try again later"
    );
  }
};
getDetails();

const createDetailsHtml = (missionDetails) => {
  const flightNumber = missionDetails.flight_number;
  const missionName = missionDetails.mission_name;
  const missionImage = missionDetails.links.flickr_images;
  const rocket = missionDetails.rocket.rocket_name;
  const description = missionDetails.details;
  const article = missionDetails.links.article_link;
  const launchSite = missionDetails.launch_site.site_name_long;
  const video = missionDetails.links.video_link;
  const launchDate = missionDetails.launch_date_utc;
  const success = missionDetails.launch_success;

  detailsContainer.innerHTML = `
    <div class="details-card">
    <h1 class="headline">${missionName}</h1>
    <img class="details-image" src="${missionImage}" alt="#no-image provided">
    <p>${description}</p>
    <p><strong>Rocket Name:</strong> ${rocket}</p>
    <p><strong>FlightNO:</strong> ${flightNumber}</p>
    <p><strong>Launch Site:</strong> ${launchSite}</p>
    <p><strong>Launch Date:</strong> ${americanTimeConverter(launchDate)}</p>
    <a href="${article}" target="_blank">Read article here</a>
    <h2 class="headline success-launch">${
      success ? "Successful launch" : "launch failed"
    }</h2>
    <a class="cta" href="${video}" target="_blank">Watch Video</a>
    </div>
    `;
};
