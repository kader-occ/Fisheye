// fonction Factory pour créer une Card(Article) de photographe dans le DOM
const photographerFactory = (data) => {
  const photograph = { ...data };
  const pictureUrl = `assets/photographers/Photographers_ID_Photos/${photograph.portrait}`;

  const showPhotographDetails = (photograph) => {
    localStorage.setItem("_photographSession", JSON.stringify(photograph));
    window.location.href = "photographer.html";
  };

  const getUserCardDOM = () => {
    //On créé les élément de la Card (Article)
    const article = document.createElement("article");
    const photographUrl = document.createElement("a");
    const photographImg = document.createElement("img");
    const photographName = document.createElement("h2");
    const photographLocation = document.createElement("p");
    const tagline = document.createElement("p");
    const price = document.createElement("p");

    photographUrl.style.cursor = "pointer";
    photographUrl.tabIndex = 0;

    //On récupere l'image du photographe
    photographImg.setAttribute("src", pictureUrl);

    //On récupere le nom du photographe
    photographName.textContent = photograph.name;

    //On récupere la ville et pays du photographe
    photographLocation.className = "location";
    photographLocation.textContent =
      photograph.city + ", " + photograph.country;

    //On récupere la description du photographe
    tagline.className = "tagline";
    tagline.textContent = photograph.tagline;
    tagline.tabIndex = 0;

    //On récupere le tarif journalier du photographe
    price.className = "price";
    price.textContent = photograph.price + "€/jour";

    //Ajout evenement sur le clic le Nom et l'image du photograph
    photographUrl.append(photographImg);
    photographUrl.append(photographName);
    photographUrl.onclick = () => showPhotographDetails(photograph);

    //On envoi au DOM chaque element
    article.appendChild(photographUrl);
    article.appendChild(photographLocation);
    article.appendChild(tagline);
    article.appendChild(price);
    return article;
  };
  return { photograph, getUserCardDOM };
};
