import { mediasPath } from "../pages/photographer.js";

/**
 * Fonction Fermeture LightBox
 */
const closeLightBox = () => {
  document.onkeydown = null;
  const lightBoxDiv = document.querySelector("#light-box");
  if (lightBoxDiv) lightBoxDiv.remove();
};

/**
 * Fonction Navigation LightBox Media
 * @param {string} action
 * @param {Array} medias
 */
const handleMediaToDisplay = (action, medias) => {
  const currentMediaLightBox = document.querySelector(".media-light-box");
  const currentMediaFile = currentMediaLightBox.src.split("/").pop();
  const titleMedia = document.querySelector(".title-media");

  const currentMedia = medias.find((m) => {
    if (m.image) {
      return m.image === currentMediaFile;
    } else {
      return m.video === currentMediaFile;
    }
  });

  let mediaToDisplay;

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
  titleMedia.remove();

  const lightBoxDiv = document.querySelector("#light-box");
  const titleMediaToDisplay = document.createElement("p");
  titleMediaToDisplay.className = "title-media";

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

  titleMediaToDisplay.textContent = mediaToDisplay.title;
  lightBoxDiv.append(titleMediaToDisplay);
};

/**
 * Fonction Affiche LightBox
 * @param {Object} currentMedia
 * @param {Array} medias
 */
export const displayLightBox = (currentMedia, medias) => {
  const body = document.querySelector("body");
  const lightBoxDiv = document.createElement("div");
  const btnNextMedia = document.createElement("button");
  const btnPrevMedia = document.createElement("button");
  const btnCloseLightBox = document.createElement("button");
  const titleMedia = document.createElement("p");
  const spanLastFocus = document.createElement("span");

  lightBoxDiv.role = "dialog";

  btnCloseLightBox.className = "btn btn-close-light-box";
  btnNextMedia.className = "btn btn-light-box-navigation btn-next-media";
  btnPrevMedia.className = "btn btn-light-box-navigation btn-prev-media";

  btnCloseLightBox.textContent = "X";

  btnNextMedia.textContent = ">";
  btnPrevMedia.textContent = "<";

  lightBoxDiv.id = "light-box";

  //Tab1
  lightBoxDiv.tabIndex = 1;

  body.append(lightBoxDiv);
  lightBoxDiv.focus();

  if (currentMedia.video) {
    const mediaSrc = mediasPath + currentMedia.video;
    const video = document.createElement("video");
    video.className = "media-light-box";
    video.setAttribute("src", mediaSrc);
    video.setAttribute("alt", currentMedia.title);
    video.ariaLabel = currentMedia.title;
    video.controls = false;
    video.autoplay = true;
    //Tab2
    video.tabIndex = 2;
    lightBoxDiv.append(video);
  } else {
    const mediaSrc = mediasPath + currentMedia.image;
    const img = document.createElement("img");
    img.className = "media-light-box";
    img.setAttribute("src", mediaSrc);
    img.setAttribute("alt", currentMedia.title);
    img.ariaLabel = currentMedia.title;
    //Tab2
    img.tabIndex = 2;
    lightBoxDiv.append(img);
  }

  titleMedia.className = "title-media";
  titleMedia.textContent = currentMedia.title;

  //Tab3
  titleMedia.tabIndex = 3;

  lightBoxDiv.append(titleMedia);

  //LightBox Navigation et touches clavier

  //Tab4
  btnPrevMedia.tabIndex = 4;
  btnPrevMedia.ariaLabel = "Aller vers image précedente";
  btnPrevMedia.onclick = () => handleMediaToDisplay("prev", medias);
  //Tab5
  btnNextMedia.tabIndex = 5;
  btnNextMedia.ariaLabel = "Aller vers image suivante";
  btnNextMedia.onclick = () => handleMediaToDisplay("next", medias);

  //Tab6
  btnCloseLightBox.tabIndex = 6;
  btnCloseLightBox.ariaLabel =
    "Fermer la boite de dialogue de la gallerie media";
  btnCloseLightBox.onclick = () => closeLightBox();
  btnCloseLightBox.addEventListener("keypress", (ev) => {
    if (ev.key === "Enter") {
      closeLightBox();
    }
  });

  //Tab 7 Dernier focus
  spanLastFocus.tabIndex = 7;

  lightBoxDiv.append(btnCloseLightBox);
  lightBoxDiv.append(btnNextMedia);
  lightBoxDiv.append(btnPrevMedia);
  lightBoxDiv.append(spanLastFocus);

  lightBoxDiv.addEventListener("keyup", (ev) => {
    if (ev.key === "Escape") {
      closeLightBox();
    }
    if (ev.key === "Tab") {
      if (document.activeElement.tabIndex == 7) {
        lightBoxDiv.focus();
      }
    }
  });

  const checkKey = (ev) => {
    if (ev.keyCode == "37") {
      //Touche fleche gauche
      handleMediaToDisplay("prev", medias);
    } else if (ev.keyCode == "39") {
      //Touche fleche droite
      handleMediaToDisplay("next", medias);
    }
  };

  document.onkeydown = checkKey;
};
