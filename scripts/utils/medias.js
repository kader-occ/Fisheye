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
  const likesDom = document.getElementById(`${media.id}`);
  const totalLikesDom = document.querySelector(".total-likes");

  //Si isLiked est false on incrémente
  if (!media.isLiked) {
    let likes = media.likes + 1;
    likesDom.textContent = likes;
    likesDom.setAttribute("aria-label", likes + " likes");
    totalLikesDom.textContent = parseInt(totalLikesDom.textContent) + 1;
    media.isLiked = true;
  }
};
