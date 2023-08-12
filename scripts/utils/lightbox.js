//Fonction Fermeture LightBox
const closeLightBox = () => {
  const lightBoxDiv = document.querySelector("#light-box");
  lightBoxDiv.remove();
};

//Fonction Navigation LightBox Media
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

//Fonction Ouverture LightBox
const openLightBox = (currentMedia, medias) => {
  const body = document.querySelector("body");
  const lightBoxDiv = document.createElement("div");
  const btnNextMedia = document.createElement("button");
  const btnPrevMedia = document.createElement("button");
  const btnCloseLightBox = document.createElement("button");
  const titleMedia = document.createElement("p");

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

  //Tab1
  lightBoxDiv.tabIndex = 0;

  body.append(lightBoxDiv);

  lightBoxDiv.append(btnCloseLightBox);
  lightBoxDiv.append(btnNextMedia);
  lightBoxDiv.append(btnPrevMedia);

  if (currentMedia.video) {
    const mediaSrc = mediasPath + currentMedia.video;
    const video = document.createElement("video");
    video.className = "media-light-box";
    video.setAttribute("src", mediaSrc);
    video.setAttribute("alt", currentMedia.title);
    video.ariaLabel = currentMedia.title;
    video.controls = true;
    video.autoplay = true;
    video.tabIndex = -1;
    //Tab2
    video.tabIndex = 1;
    lightBoxDiv.append(video);
  } else {
    const mediaSrc = mediasPath + currentMedia.image;
    const img = document.createElement("img");
    img.className = "media-light-box";
    img.setAttribute("src", mediaSrc);
    img.setAttribute("alt", currentMedia.title);
    img.ariaLabel = currentMedia.title;
    //Tab2
    img.tabIndex = 1;
    lightBoxDiv.append(img);
  }

  titleMedia.className = "title-media";
  titleMedia.textContent = currentMedia.title;

  //Tab3
  titleMedia.tabIndex = 2;

  lightBoxDiv.append(titleMedia);

  //LightBox Navigation et touches clavier

  //Tab4
  btnPrevMedia.tabIndex = 3;
  btnPrevMedia.ariaLabel = "Image précedente";
  btnPrevMedia.onclick = () => handleMediaToDisplay("prev", medias);
  //Tab5
  btnNextMedia.tabIndex = 4;
  btnNextMedia.ariaLabel = "Image suivante";
  btnNextMedia.focus();
  btnNextMedia.onclick = () => handleMediaToDisplay("next", medias);

  //Tab6
  btnCloseLightBox.tabIndex = 5;
  btnCloseLightBox.ariaLabel = "Fermer la lightbox";
  btnCloseLightBox.onclick = () => closeLightBox();
  btnCloseLightBox.addEventListener("keypress", (ev) => {
    if (ev.key === "Enter") {
      closeLightBox();
    }
  });

  lightBoxDiv.addEventListener("keyup", (ev) => {
    if (ev.key === "Escape") {
      closeLightBox();
    }
  });

  const checkKey = (ev) => {
    if (ev.keyCode == "37") {
      //Touche fleche gauche
      handleMediaToDisplay("next", medias);
    } else if (ev.keyCode == "39") {
      //Touche fleche droite
      handleMediaToDisplay("prev", medias);
    }
  };

  document.onkeydown = checkKey;
};
