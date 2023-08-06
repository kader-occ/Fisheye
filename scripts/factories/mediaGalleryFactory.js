const mediaGalleryFactory = (m, medias) => {
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
    photographMediaImg.addEventListener("keypress", (ev) => {
      if (ev.key === "Enter") {
        openLightBox(m, medias);
      }
    });
    //Tab9
    photographMediaImg.tabIndex = 0;
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
    photographMediaVideo.addEventListener("keypress", (ev) => {
      if (ev.key === "Enter") {
        openLightBox(m, medias);
      }
    });
    //Tab9
    photographMediaVideo.tabIndex = 0;
    article.append(photographMediaVideo);
  }

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
  mediaLikes.addEventListener("keypress", (ev) => {
    if (ev.key === "Enter") {
      updateLikes(m);
    }
  });

  mediaInfo.className = "media-info";
  mediaInfo.append(mediaTitle);
  mediaInfo.append(mediaLikes);
  article.append(mediaInfo);

  return article;
};
