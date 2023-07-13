//On récupère le photograph et ces médias dans la Session et créé les chemin des dossiers!
const photographData = JSON.parse(localStorage.getItem("_photographSession"));
const mediasPath = `assets/photographers/${photographData.name
  .split(" ")
  .join("-")}/`;
const portraitPath = `assets/photographers/Photographers_ID_Photos/${photographData.portrait}`;

/**
 * Au chargement de la page on lance la fonction displayPhotographDetails;
 */
window.addEventListener("load", () => {
  displayPhotographDetails(photographData);
});

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
  photographName.tabIndex = 2;

  //Tab3
  photographLocation.tabIndex = 3;

  contactBtn.setAttribute("alt", "Contact me");
  //Tab4
  contactBtn.tabIndex = 4;

  //On récupere l'image du photographe
  photographImg.setAttribute("src", portraitPath);
  photographImg.setAttribute("alt", photographData.name);
  photographPicture.className = "photograph-picture";
  photographPicture.append(photographImg);
  photographHeader.append(photographPicture);
  //Tab5
  photographImg.tabIndex = 5;

  //Tab6
  totalLikesAndPrice.tabIndex = 6;
  totalLikesAndPrice.id = "total-likes-price";
  totalLikes.className = "total-likes icon-heart";

  let totalLikesCount = 0;
  totalLikesCount = photographData.medias.map((m) => {
    return (totalLikesCount += m.likes);
  });

  totalLikes.textContent = totalLikesCount.slice(-1)[0];

  price.className = "price";
  price.textContent = photographData.price;

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

  filterLabel.className = "filter-label";
  filterLabel.textContent = "Trier par";
  //Tab7
  filterLabel.tabIndex = 7;

  const selectFilter = document.createElement("select");
  selectFilter.setAttribute("aria-label", "Order by");
  //Tab8
  selectFilter.tabIndex = 8;

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

  mediaArr = filterMedias("", photographData.medias);
  displayMediaGallery(mediaArr);

  selectFilter.onchange = () => {
    mediaArr = filterMedias(selectFilter.value, photographData.medias);
    displayMediaGallery(mediaArr);
  };
};

//Fonction pour afficher la galerie des medias du photograph
const displayMediaGallery = (medias) => {
  //On créé la Galerie
  const photographGalleryDiv = document.querySelector("#photograph-gallery");
  photographGalleryDiv.textContent = "";

  medias.map((m) => {
    const article = document.createElement("article");
    const mediaInfo = document.createElement("div");
    const mediaTitle = document.createElement("span");
    const mediaLikes = document.createElement("span");

    article.style.cursor = "pointer";

    if (m.image) {
      const photographMediaImg = document.createElement("img");
      photographMediaImg.setAttribute("src", mediasPath + m.image);
      photographMediaImg.setAttribute("alt", m.title);
      photographMediaImg.setAttribute("title", m.title);
      photographMediaImg.onclick = () => openLightBox(m, medias);
      article.append(photographMediaImg);
    } else {
      const photographMediaVideo = document.createElement("video");
      photographMediaVideo.controls = false;
      photographMediaVideo.tabIndex = -1;
      photographMediaVideo.id = "photograph-media-video";
      photographMediaVideo.setAttribute("src", mediasPath + m.video);
      photographMediaVideo.setAttribute("alt", m.title);
      photographMediaVideo.setAttribute("title", m.title);
      photographMediaVideo.onclick = () => openLightBox(m, medias);
      article.append(photographMediaVideo);
    }

    //Tab9
    article.tabIndex = 0;

    mediaTitle.className = "media-title";
    mediaTitle.textContent = m.title;
    //Tab10
    mediaTitle.tabIndex = 0;

    mediaLikes.setAttribute("aria-label", "likes");
    mediaLikes.id = m.id;
    mediaLikes.className = "media-likes icon-heart";
    mediaLikes.style.cursor = "pointer";
    mediaLikes.textContent = m.likes;
    //Tab11
    mediaLikes.tabIndex = 0;

    mediaLikes.onclick = () => updateLikes(m);

    mediaInfo.className = "media-info";
    mediaInfo.append(mediaTitle);
    mediaInfo.append(mediaLikes);

    article.append(mediaInfo);

    photographGalleryDiv.append(article);
  });
};
