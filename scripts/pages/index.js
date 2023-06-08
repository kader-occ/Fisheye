//On récupere les données JSON des photographes
const getPhotographers = async () => {
    let response = await fetch('data/photographers.json');

    if (response.ok) {
        return response.json();
    } else {
        alert("HTTP-Error: " + response.status);
    }
}

//Affiche les données JSON dans le DOM
const displayData = async (data) => {

    const photographersSection = document.querySelector(".photographer_section");

    //On créé un array avec les données structurées [photograph, [medias]]
    data.photographers.map((p) => {
        p['medias'] = data.media.filter((m) => {
            if (m.photographerId === p.id) {
                return m;
            }
        })
    });

    console.log(data.photographers);

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

