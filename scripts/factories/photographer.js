// fonction Factory pour créer une Card(Article) de photographe dans le DOM
const photographerFactory = (data) => {

    const photograph = { ...data };
    const pictureUrl = `assets/photographers/Photographers_ID_Photos/${photograph.portrait}`;

    const setPhotographLocalSession = (photograph) => {
        localStorage.setItem('_photographSession', JSON.stringify(photograph));
        window.location.href = "photographer.html";
    }

    const getUserCardDOM = () => {
        //On créé les élément de la Card (Article)
        const article = document.createElement('article');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const location = document.createElement('p');
        const tagline = document.createElement('p');
        const price = document.createElement('p');

        //On récupere l'image du photographe
        img.setAttribute("src", pictureUrl);

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

        img.onclick = () => setPhotographLocalSession(photograph);

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