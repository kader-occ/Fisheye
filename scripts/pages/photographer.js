//On récupère le photograph et ces médias dans la Session !
const photographData = JSON.parse(localStorage.getItem("_photographSession"));

const displayMediaGallery = (medias) => {
  //On créé la Gallerie
  const photographGallery = document.querySelector("#photograph-gallery");
  const mediaPath = `assets/photographers/${photographData.name}/`;

  medias.map((m) => {
    const figure = document.createElement("figure");
    const mediaInfo = document.createElement("div");
    const mediaTitle = document.createElement("span");
    const mediaLikes = document.createElement("span");

    figure.setAttribute("alt", m.title);

    //Tab9
    mediaInfo.tabIndex = 0;

    //Tab10
    mediaTitle.tabIndex = 0;

    //Tab11
    mediaLikes.tabIndex = 0;

    if (m.image) {
      const photographMediaImg = document.createElement("img");
      photographMediaImg.setAttribute("src", mediaPath + m.image);
      photographMediaImg.setAttribute("alt", m.title);
      figure.append(photographMediaImg);
    } else {
      const photographMediaVideo = document.createElement("video");
      photographMediaVideo.controls = true;
      photographMediaVideo.tabIndex = -1;
      photographMediaVideo.setAttribute("src", mediaPath + m.video);
      photographMediaVideo.setAttribute("alt", m.title);
      figure.append(photographMediaVideo);
    }

    mediaTitle.className = "media-title";
    mediaTitle.textContent = m.title;

    mediaLikes.className = "media-likes";
    mediaLikes.textContent = m.likes;

    mediaInfo.className = "media-info";
    mediaInfo.append(mediaTitle);
    mediaInfo.append(mediaLikes);

    figure.append(mediaInfo);

    photographGallery.append(figure);
  });
};

const displayPhotograph = (photographData) => {
  console.log(photographData);

  const pictureUrl = `assets/photographers/Photographers_ID_Photos/${photographData.portrait}`;

  //On créé les élements
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
  photographName.tabIndex = 0;

  //Tab3
  photographLocation.tabIndex = 0;

  contactBtn.setAttribute("alt", "Contact me");
  //Tab4
  contactBtn.tabIndex = 0;

  photographImg.setAttribute("alt", photographData.name);
  //Tab5
  photographImg.tabIndex = 0;

  //Tab6
  totalLikesAndPrice.tabIndex = 6;
  totalLikesAndPrice.id = "total-likes-price";
  totalLikes.className = "total-likes";

  let totalLikesCount = 0;
  totalLikesCount = photographData.medias.map((m) => {
    totalLikesCount = totalLikesCount += m.likes;
    return totalLikesCount;
  });

  console.log(totalLikesCount);

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
  photographImg.setAttribute("src", pictureUrl);
  photographPicture.className = "photograph-picture";
  photographPicture.append(photographImg);
  photographHeader.append(photographPicture);

  //On créé la Filtre
  const photographFilter = document.querySelector("#photograph-filter");

  //Tab7
  photographFilter.tabIndex = 0;

  const selectFilter = document.createElement("select");
  //Tab8
  selectFilter.tabIndex = 0;
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

  displayMediaGallery(photographData.medias);
};

displayPhotograph(photographData);
