// fonction Factory pour créer une Card(Article) de photographe dans le DOM
function photographerFactory(data) {
    const photograph = { ...data };

    const picture = `assets/photographers/Photographers_ID_Photos/${photograph.portrait}`;

    function setPhotographLocalSession(photograph, photographLink) {
        localStorage.setItem('photograph', JSON.stringify(photograph));
        window.location.replace(photographLink);
    }

    function getUserCardDOM() {
        //On créé les élément de la Card (Article)
        const article = document.createElement('article');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const location = document.createElement('p');
        const tagline = document.createElement('p');
        const price = document.createElement('p');

        //On créé le lien dynamique vers chaque photographe
        const photographLink = "photographer.html"

        //On récupere l'image du photographe
        img.setAttribute("src", picture);

        //On récupere le nom du photographe
        h2.textContent = photograph.name;

        //On récupere la ville et pays du photographe
        location.className = 'location';
        location.textContent = photograph.city + ', ' + photograph.country;

        //On récupere la description du photographe
        tagline.className = 'tagline';
        tagline.textContent = photograph.tagline;

        //On récupere le tarif journalier du photographe
        price.className = 'price';
        price.textContent = photograph.price + '€/jour';

        img.onclick = () => setPhotographLocalSession(photograph, photographLink);

        //On envoi au DOM chaque element
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(tagline);
        article.appendChild(price);
        return (article);
    }
    return { photograph, getUserCardDOM }
}