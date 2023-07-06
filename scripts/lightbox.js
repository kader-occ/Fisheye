//Fonction Fermeture LightBox
const closeLightBox = () => {
  const lightBoxDiv = document.querySelector("#light-box");
  main.style.opacity = 1;
  //lightBoxDiv.style.animation = "lightBoxCloseAnimtation 2s";
  lightBoxDiv.remove();
};

//Fonction Media suivant
const nextMedia = (ev) => {
  console.log(ev);
};

//Fonction Media précedent
const prevMedia = (ev) => {
  console.log(ev);
};

//Fonction Ouverture LightBox
const openLightBox = (currentMedia, medias) => {
  console.log(currentMedia, medias);
  let mediaSrc = mediasPath + currentMedia.image;

  //Recupere l'extension du média
  const ext = mediaSrc.split(/[#?]/)[0].split(".").pop().trim();

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
  main.style.opacity = 0.2;
  body.append(lightBoxDiv);

  btnCloseLightBox.onclick = () => closeLightBox();

  btnNextMedia.onclick = (ev) => nextMedia(ev);
  btnPrevMedia.onclick = (ev) => prevMedia(ev);

  lightBoxDiv.append(btnCloseLightBox);
  lightBoxDiv.append(btnNextMedia);
  lightBoxDiv.append(btnPrevMedia);

  if (ext === "mp4") {
    const video = document.createElement("video");
    video.setAttribute("src", mediaSrc);
    video.controls = true;
    video.tabIndex = -1;
    lightBoxDiv.append(video);
  } else {
    const img = document.createElement("img");
    img.setAttribute("src", mediaSrc);
    lightBoxDiv.append(img);
  }
};
