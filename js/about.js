const companyInfo = document.querySelector(".company--info");

const urlAbout = "https://api.spacexdata.com/v4/company";

async function getCompanyInfo() {
  try {
    const response = await fetch(urlAbout);
    const info = await response.json();
    console.log(info);
    companyInfo.innerHTML += `<div class="cards"><p>${info.summary}</p></div>`;
  } catch (error) {
    console.log(error);
  }
}

getCompanyInfo();
