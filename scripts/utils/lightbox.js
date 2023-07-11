//Fonction Fermeture LightBox
const closeLightBox = () => {
  const lightBoxDiv = document.querySelector("#light-box");
  main.style.opacity = 1;
  //lightBoxDiv.style.animation = "lightBoxCloseAnimtation 2s";
  lightBoxDiv.remove();
};

//Fonction Navigation LightBox Media
const handleMediaToDisplay = (action, medias) => {
  const currentMediaLightBox = document.querySelector(".media-light-box");
  const currentMediaFile = currentMediaLightBox.src.split("/").pop();

  const currentMedia = medias.find((m) => {
    if (m.image) {
      return m.image === currentMediaFile;
    } else {
      return m.video === currentMediaFile;
    }
  });

  const currentIndex = medias.indexOf(currentMedia);

  if (action === "next") {
    //Si le media est le dernier du tableau au recupere le premier index sinon on recupere l'index d'apres
    if (currentIndex === medias.length - 1) {
      mediaToDisplay = medias[0];
    } else {
      mediaToDisplay = medias[medias.indexOf(currentMedia) + 1];
    }
  } else {
    //Si le media est le premier du tableau au recupere le dernier index sinon on recupere l'index d'avant
    if (currentIndex === 0) {
      mediaToDisplay = medias[medias.length - 1];
    } else {
      mediaToDisplay = medias[medias.indexOf(currentMedia) - 1];
    }
  }

  currentMediaLightBox.remove();

  const lightBoxDiv = document.querySelector("#light-box");

  if (mediaToDisplay.image) {
    const mediaSrc = mediasPath + mediaToDisplay.image;
    const img = document.createElement("img");
    img.className = "media-light-box";
    img.setAttribute("src", mediaSrc);
    lightBoxDiv.append(img);
  } else {
    const mediaSrc = mediasPath + mediaToDisplay.video;
    const video = document.createElement("video");
    video.className = "media-light-box";
    video.setAttribute("src", mediaSrc);
    video.controls = true;
    video.autoplay = true;
    video.tabIndex = -1;
    lightBoxDiv.append(video);
  }
};

//Fonction Ouverture LightBox
const openLightBox = (currentMedia, medias) => {
  const body = document.querySelector("body");
  const lightBoxDiv = document.createElement("div");
  const btnNextMedia = document.createElement("button");
  const btnPrevMedia = document.createElement("button");
  const btnCloseLightBox = document.createElement("button");

  btnCloseLightBox.className = "btn btn-close-light-box";
  btnCloseLightBox.setAttribute("alt", "Fermer la light box");
  btnCloseLightBox.setAttribute("title", "Fermer la light box");

  btnNextMedia.className = "btn btn-light-box-navigation btn-next-media";
  btnNextMedia.setAttribute("alt", "Media suivant");
  btnNextMedia.setAttribute("title", "Media suivant");

  btnPrevMedia.className = "btn btn-light-box-navigation btn-prev-media";
  btnPrevMedia.setAttribute("alt", "Media précedent");
  btnPrevMedia.setAttribute("title", "Media précedent");

  btnCloseLightBox.textContent = "X";

  btnNextMedia.textContent = ">";
  btnPrevMedia.textContent = "<";

  lightBoxDiv.id = "light-box";
  body.append(lightBoxDiv);

  lightBoxDiv.append(btnCloseLightBox);
  lightBoxDiv.append(btnNextMedia);
  lightBoxDiv.append(btnPrevMedia);

  if (currentMedia.video) {
    const mediaSrc = mediasPath + currentMedia.video;
    const video = document.createElement("video");
    video.className = "media-light-box";
    video.setAttribute("src", mediaSrc);
    video.controls = true;
    video.autoplay = true;
    video.tabIndex = -1;
    lightBoxDiv.append(video);
  } else {
    const mediaSrc = mediasPath + currentMedia.image;
    const img = document.createElement("img");
    img.className = "media-light-box";
    img.setAttribute("src", mediaSrc);
    lightBoxDiv.append(img);
  }

  btnNextMedia.onclick = () => handleMediaToDisplay("next", medias);
  btnPrevMedia.onclick = () => handleMediaToDisplay("prev", medias);

  btnCloseLightBox.onclick = () => closeLightBox();
};
