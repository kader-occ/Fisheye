//Fonction Filtre galerie
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
  const photographGalleryDiv = document.querySelector("#photograph-gallery");
  photographGalleryDiv.textContent = "";

  medias.map((m) => {
    const figure = document.createElement("figure");
    const mediaInfo = document.createElement("div");
    const mediaTitle = document.createElement("span");
    const mediaLikes = document.createElement("span");

    figure.setAttribute("alt", m.title);
    figure.style.cursor = "pointer";

    if (m.image) {
      const photographMediaImg = document.createElement("img");
      photographMediaImg.setAttribute("src", mediasPath + m.image);
      photographMediaImg.setAttribute("alt", m.title);
      photographMediaImg.setAttribute("title", m.title);
      photographMediaImg.onclick = () => openLightBox(m, medias);
      figure.append(photographMediaImg);
    } else {
      const photographMediaVideo = document.createElement("video");
      photographMediaVideo.controls = true;
      photographMediaVideo.tabIndex = -1;
      photographMediaVideo.id = "photograph-media-video";
      photographMediaVideo.setAttribute("src", mediasPath + m.video);
      photographMediaVideo.setAttribute("alt", m.title);
      photographMediaVideo.setAttribute("title", m.title);
      photographMediaVideo.onclick = () => openLightBox(m, medias);
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

    photographGalleryDiv.append(figure);
  });
};
