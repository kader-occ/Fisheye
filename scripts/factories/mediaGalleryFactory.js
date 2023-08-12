const mediaGalleryFactory = (media, medias) => {
  const getMediaCardDOM = () => {
    const article = document.createElement("article");
    const mediaInfo = document.createElement("div");
    const mediaTitle = document.createElement("span");
    const mediaLikes = document.createElement("span");

    article.style.cursor = "pointer";

    if (media.image) {
      const photographMediaImg = document.createElement("img");
      photographMediaImg.setAttribute("src", mediasPath + media.image);
      photographMediaImg.setAttribute("alt", media.title);
      photographMediaImg.setAttribute("title", media.title);
      photographMediaImg.onclick = () => openLightBox(media, medias);
      photographMediaImg.addEventListener("keypress", (ev) => {
        if (ev.key === "Enter") {
          openLightBox(media, medias);
        }
      });
      //Tab9
      photographMediaImg.tabIndex = 9;
      article.append(photographMediaImg);
    } else {
      const photographMediaVideo = document.createElement("video");
      photographMediaVideo.controls = false;
      photographMediaVideo.tabIndex = -1;
      photographMediaVideo.id = "photograph-media-video";
      photographMediaVideo.setAttribute("src", mediasPath + media.video);
      photographMediaVideo.setAttribute("alt", media.title);
      photographMediaVideo.setAttribute("title", media.title);
      photographMediaVideo.onclick = () => openLightBox(media, medias);
      photographMediaVideo.addEventListener("keypress", (ev) => {
        if (ev.key === "Enter") {
          openLightBox(media, medias);
        }
      });
      //Tab9
      photographMediaVideo.tabIndex = 9;
      article.append(photographMediaVideo);
    }

    mediaTitle.className = "media-title";
    mediaTitle.textContent = media.title;
    //Tab10
    mediaTitle.tabIndex = 10;

    mediaLikes.setAttribute("aria-label", "likes");
    mediaLikes.id = media.id;
    mediaLikes.className = "media-likes icon-heart";
    mediaLikes.style.cursor = "pointer";
    mediaLikes.textContent = media.likes;
    //Tab11
    mediaLikes.tabIndex = 11;

    mediaLikes.onclick = () => updateLikes(media);
    mediaLikes.addEventListener("keypress", (ev) => {
      if (ev.key === "Enter") {
        updateLikes(media);
      }
    });

    mediaInfo.className = "media-info";
    mediaInfo.append(mediaTitle);
    mediaInfo.append(mediaLikes);
    article.append(mediaInfo);

    return article;
  };

  return { media, getMediaCardDOM };
};
