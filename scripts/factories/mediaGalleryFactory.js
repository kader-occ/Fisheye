/**
 * Fonction Factory
 * @param {Object} media
 * @param {Array} medias
 * @returns
 */
const mediaGalleryFactory = (media, medias) => {
  /**
   * Fonction Factory pour créer une Card(Article) gallerie
   * @returnsHTMLElement
   */
  const getMediaCardDOM = () => {
    const article = document.createElement("article");
    const mediaInfo = document.createElement("div");
    const mediaTitle = document.createElement("span");
    const mediaLikes = document.createElement("span");

    article.id = "media-gallery-card";
    article.style.cursor = "pointer";

    if (media.image) {
      const photographMediaImg = document.createElement("img");
      photographMediaImg.setAttribute("src", mediasPath + media.image);
      photographMediaImg.setAttribute("alt", media.title);
      photographMediaImg.setAttribute("title", media.title);
      photographMediaImg.onclick = () => displayLightBox(media, medias);
      photographMediaImg.addEventListener("keypress", (ev) => {
        if (ev.key === "Enter") {
          displayLightBox(media, medias);
        }
      });
      //Tab9
      photographMediaImg.tabIndex = 0;
      article.append(photographMediaImg);
    } else {
      const photographMediaVideo = document.createElement("video");
      photographMediaVideo.controls = false;
      photographMediaVideo.id = "photograph-media-video";
      photographMediaVideo.setAttribute("src", mediasPath + media.video);
      photographMediaVideo.setAttribute("alt", media.title);
      photographMediaVideo.setAttribute("title", media.title);
      photographMediaVideo.onclick = () => displayLightBox(media, medias);
      photographMediaVideo.addEventListener("keypress", (ev) => {
        if (ev.key === "Enter") {
          displayLightBox(media, medias);
        }
      });
      //Tab9
      photographMediaVideo.tabIndex = 0;
      article.append(photographMediaVideo);
    }

    mediaTitle.className = "media-title";
    mediaTitle.textContent = media.title;
    //Tab10
    mediaTitle.tabIndex = 0;

    mediaLikes.setAttribute("aria-label", "likes");
    mediaLikes.id = media.id;
    mediaLikes.className = "media-likes icon-heart";
    mediaLikes.style.cursor = "pointer";
    mediaLikes.textContent = media.likes;
    //Tab11
    mediaLikes.tabIndex = 0;

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
