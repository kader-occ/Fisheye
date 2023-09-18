import { filterMedias } from "../utils/medias.js";
import { mediaGalleryFactory } from "../factories/mediaGalleryFactory.js";
import { displayModal } from "../utils/contactForm.js";

//On récupère le photograph et ces médias dans la Session et créé les chemin des dossiers!
const photographData = JSON.parse(localStorage.getItem("_photographSession"));
export const mediasPath = `assets/photographers/${photographData.name
  .split(" ")
  .join("-")}/`;
const portraitPath = `assets/photographers/Photographers_ID_Photos/${photographData.portrait}`;

/**
 * Au chargement de la page on lance la fonction displayPhotographDetails;
 */
window.addEventListener("load", () => {
  displayPhotographDetails(photographData);
});

/**
 * Fonction pour afficher les détails du photographe
 * @param {Array} photographData
 */
const displayPhotographDetails = (photographData) => {
  //On créé les élements DOM
  const main = document.querySelector("main");
  const photographHeader = document.querySelector(".photograph-header");
  const contactBtn = document.querySelector(".contact_button");
  const photographInfoDiv = document.createElement("div");
  const photographFilterDiv = document.createElement("div");
  const photographGalleryDiv = document.createElement("div");
  const photographName = document.createElement("h1");
  const photographLocation = document.createElement("p");
  const photographTagline = document.createElement("p");
  const totalLikesAndPrice = document.createElement("div");
  const totalLikes = document.createElement("span");
  const price = document.createElement("span");

  const photographPicture = document.createElement("div");
  const photographImg = document.createElement("img");

  //On récupere le nom du photographe
  photographName.className = "photograph-name";
  photographName.textContent = photographData.name;

  //Tab 2
  photographName.tabIndex = 0;

  //Tab3
  photographLocation.tabIndex = 0;

  //Tab4
  contactBtn.tabIndex = 0;
  contactBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    displayModal(photographData);
  });

  //On récupere l'image du photographe
  photographImg.setAttribute("src", portraitPath);
  photographImg.setAttribute("alt", photographData.name);
  photographPicture.className = "photograph-picture";
  photographPicture.append(photographImg);
  photographHeader.append(photographPicture);
  //Tab5
  photographImg.tabIndex = 0;

  //Tab6
  totalLikesAndPrice.tabIndex = 0;
  totalLikesAndPrice.id = "total-likes-price";
  totalLikes.className = "total-likes icon-heart";

  let totalLikesCount = 0;
  totalLikesCount = photographData.medias.map((m) => {
    return (totalLikesCount += m.likes);
  });

  totalLikes.textContent = totalLikesCount.slice(-1)[0];
  totalLikes.setAttribute(
    "aria-label",
    totalLikesCount.slice(-1)[0] + " likes"
  );

  price.className = "price";
  price.textContent = photographData.price;
  price.setAttribute("aria-label", photographData.price + " euros par jour");

  totalLikesAndPrice.append(totalLikes);
  totalLikesAndPrice.append(price);

  main.append(totalLikesAndPrice);

  photographHeader.insertBefore(photographInfoDiv, contactBtn);
  photographInfoDiv.append(photographName);
  photographInfoDiv.append(photographLocation);
  photographInfoDiv.append(photographTagline);

  //On récupere la ville du photographe
  photographLocation.className = "photograph-location";
  photographLocation.textContent =
    photographData.city + ", " + photographData.country;

  //On récupere la description du photographe
  photographTagline.className = "photograph-tagline";
  photographTagline.textContent = photographData.tagline;

  //On créé le Filtre
  photographFilterDiv.id = "photograph-filter";
  main.append(photographFilterDiv);

  photographGalleryDiv.id = "photograph-gallery";
  main.append(photographGalleryDiv);

  const filterLabel = document.createElement("label");

  filterLabel.id = "filter-label";
  filterLabel.className = "filter-label";
  filterLabel.textContent = "Trier par";
  filterLabel.ariaHidden = true;
  //Tab7
  filterLabel.tabIndex = 0;

  const selectFilter = document.createElement("select");
  selectFilter.id = "filter-label";
  selectFilter.setAttribute("aria-label", "Trier par");
  //Tab8
  selectFilter.tabIndex = 0;

  photographFilterDiv.append(filterLabel);

  let filterOptionArr = ["Popularité", "Date", "Titre"];

  //On ajoute les options au Select Filter
  for (let i = 0; i < filterOptionArr.length; i++) {
    let option = document.createElement("option");
    option.value = filterOptionArr[i];
    option.text = filterOptionArr[i];
    selectFilter.appendChild(option);
  }

  selectFilter.className = "select-filter";
  photographFilterDiv.append(selectFilter);

  let mediaArr = [];

  mediaArr = filterMedias("", photographData.medias);
  displayMediaGallery(mediaArr);

  selectFilter.onchange = () => {
    const articles = document.querySelectorAll("#media-gallery-card");

    if (articles) {
      articles.forEach((article) => {
        article.remove();
      });
    }
    mediaArr = filterMedias(selectFilter.value, photographData.medias);
    displayMediaGallery(mediaArr);
  };
};

/**
 * Affiche la galerie des medias du photographe
 * @param {Array} medias
 */
const displayMediaGallery = (medias) => {
  //On créé la Galerie
  const photographGalleryDiv = document.querySelector("#photograph-gallery");

  medias.map((media) => {
    const mediaGalleryModel = mediaGalleryFactory(media, medias);
    const mediaGalleryCard = mediaGalleryModel.getMediaCardDOM();
    photographGalleryDiv.append(mediaGalleryCard);
  });
};
