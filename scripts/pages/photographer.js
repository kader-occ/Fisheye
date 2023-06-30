/**
 * Au chargement de la page on lance la fonction displayPhotographDetails;
 */
window.addEventListener("load", () => {
  displayPhotographDetails(photographData);
});

//On récupère le photograph et ces médias dans la Session et créé les chemin des dossiers!
const photographData = JSON.parse(localStorage.getItem("_photographSession"));
const mediasPath = `assets/photographers/${photographData.name
  .split(" ")
  .join("-")}/`;
const portraitPath = `assets/photographers/Photographers_ID_Photos/${photographData.portrait}`;

//Fonction Filtre des Photos
const filterMedias = (filterVal, mediaArr) => {
  switch (filterVal) {
    case "Popularité":
      return mediaArr.sort((a, b) => {
        return b.likes - a.likes;
      });
    case "Date":
      return mediaArr.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    case "Titre":
      return mediaArr.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    default:
      return mediaArr;
  }
};

//Fonction Update Likes
const updateLikes = (media) => {
  media.likes++;
  const likesDom = document.getElementById(`${media.id}`);
  const totalLikesDom = document.querySelector(".total-likes");
  likesDom.textContent = media.likes;
  parseInt(totalLikesDom.textContent++);
};

//Fonction pour afficher les medias du photograph
const displayMediaGallery = (medias) => {
  //On créé la Gallerie
  const photographGallery = document.querySelector("#photograph-gallery");
  photographGallery.textContent = "";

  medias.map((m) => {
    const figure = document.createElement("figure");
    const mediaInfo = document.createElement("div");
    const mediaTitle = document.createElement("span");
    const mediaLikes = document.createElement("span");

    figure.setAttribute("alt", m.title);

    if (m.image) {
      const photographMediaImg = document.createElement("img");
      photographMediaImg.setAttribute("src", mediasPath + m.image);
      photographMediaImg.setAttribute("alt", m.title);
      figure.append(photographMediaImg);
    } else {
      const photographMediaVideo = document.createElement("video");
      photographMediaVideo.controls = true;
      photographMediaVideo.tabIndex = -1;
      photographMediaVideo.setAttribute("src", mediasPath + m.video);
      photographMediaVideo.setAttribute("alt", m.title);
      figure.append(photographMediaVideo);
    }

    //Tab9
    figure.tabIndex = 9;

    mediaTitle.className = "media-title";
    mediaTitle.textContent = m.title;
    //Tab10
    mediaTitle.tabIndex = 10;

    mediaLikes.setAttribute("aria-label", "likes");
    mediaLikes.id = m.id;
    mediaLikes.className = "media-likes icon-heart";
    mediaLikes.style.cursor = "pointer";
    mediaLikes.textContent = m.likes;
    //Tab11
    mediaLikes.tabIndex = 11;

    mediaLikes.onclick = () => updateLikes(m);

    mediaInfo.className = "media-info";
    mediaInfo.append(mediaTitle);
    mediaInfo.append(mediaLikes);

    figure.append(mediaInfo);

    photographGallery.append(figure);
  });
};

const displayPhotographDetails = (photographData) => {
  //On créé les élements DOM
  const main = document.querySelector("main");
  const photographHeader = document.querySelector(".photograph-header");
  const contactBtn = document.querySelector(".contact_button");
  const photographInfo = document.createElement("div");
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

  photographImg.setAttribute("alt", photographData.name);
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

  photographHeader.insertBefore(photographInfo, contactBtn);
  photographInfo.append(photographName);
  photographInfo.append(photographLocation);
  photographInfo.append(photographTagline);

  //On récupere la ville du photographe
  photographLocation.className = "photograph-location";
  photographLocation.textContent =
    photographData.city + ", " + photographData.country;

  //On récupere la description du photographe
  photographTagline.className = "photograph-tagline";
  photographTagline.textContent = photographData.tagline;

  //On récupere l'image du photographe
  photographImg.setAttribute("src", portraitPath);
  photographPicture.className = "photograph-picture";
  photographPicture.append(photographImg);
  photographHeader.append(photographPicture);

  //On créé la Filtre
  const photographFilter = document.querySelector("#photograph-filter");

  //Tab7
  photographFilter.tabIndex = 7;

  const selectFilter = document.createElement("select");
  selectFilter.setAttribute("aria-label", "Order by");
  //Tab8
  selectFilter.tabIndex = 8;
  const filterTitle = document.createElement("span");

  filterTitle.className = "filter-title";
  filterTitle.textContent = "Trier par";

  photographFilter.append(filterTitle);

  let filterOptions = ["Popularité", "Date", "Titre"];

  //On ajoute les options au Select Filter
  for (let i = 0; i < filterOptions.length; i++) {
    let option = document.createElement("option");
    option.value = filterOptions[i];
    option.text = filterOptions[i];
    selectFilter.appendChild(option);
  }

  selectFilter.className = "select-filter";
  photographFilter.append(selectFilter);

  mediaArr = filterMedias("", photographData.medias);
  displayMediaGallery(mediaArr);

  selectFilter.onchange = () => {
    mediaArr = filterMedias(selectFilter.value, photographData.medias);
    displayMediaGallery(mediaArr);
  };
};
