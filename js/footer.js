const footerContent = document.querySelector(".footer-inner")
//Footer content.

const footerContentUrl = "https://api.spacexdata.com/v4/company/";
const corsFixFooter = "https://noroffcors.herokuapp.com/";

async function getCompanyInfo() {
  try {
    const responseCompany = await fetch(corsFixFooter + footerContentUrl);
    const company = await responseCompany.json()
    console.log(company);
    
    footerContentHtml(company);
  } catch (error) {
    footerContent.innerHTML = displayError("Something went wrong, try again later");
  }
}

getCompanyInfo();

const footerContentHtml = (company) =>
  (footerContent.innerHTML += `
    <div class="location">
    <h3>SpaceX Headquarters</h3>
    <p>${company.headquarters.address}</p>
    <p>${company.headquarters.city}</p>
    <p>${company.headquarters.state}</p>
    </div>
    <div class="footer-links">
    <h3>Follow, like, share</h3>
    <ul>
    <li><a href="${company.links.elon_twitter}" target="_blank">Elon Twitter</a></li>
    <li><a href="${company.links.flickr}" target="_blank">Flickr</a></li>
    <li><a href="${company.links.twitter}" target="_blank">SpaceX Twitter</a></li>
    <li><a href="${company.links.website}" target="_blank">SpaceX official Website</a></li>
    </ul>
`);
