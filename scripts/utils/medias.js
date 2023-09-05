//Fonction Filtre galerie
export const filterMedias = (filterVal, mediaArr) => {
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
export const updateLikes = (media) => {
  media.likes++;
  const likesDom = document.getElementById(`${media.id}`);
  const totalLikesDom = document.querySelector(".total-likes");
  likesDom.textContent = media.likes;
  likesDom.setAttribute("aria-label", media.likes + " likes");
  parseInt(totalLikesDom.textContent++);
};
