import photographerFactory from "../factories/photographer.js";

/**
 * Fonction récupere les données JSON des photographes
 * @returns void
 */
const getPhotographers = async () => {
  let response = await fetch("data/photographers.json");

  if (response.ok) {
    return response.json();
  } else {
    alert("HTTP-Error: " + response.status);
  }
};

/**
 * Affiche les données JSON dans le DOM
 * @param {Array} data
 */
const displayData = async (data) => {
  const photographersSection = document.querySelector(".photographer_section");

  localStorage.removeItem("_photographSession");

  //On créé un array avec les données structurées [photograph, [medias]]
  data.photographers.map((photographer) => {
    photographer["medias"] = data.media.filter((media) => {
      if (media.photographerId === photographer.id) {
        //Ajout d'un index dans chaques media isLiked à false;
        media.isLiked = false;
        return media;
      }
    });
  });

  data.photographers.map((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

const init = async () => {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
};

init();
