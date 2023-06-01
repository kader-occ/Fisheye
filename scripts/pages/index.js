//On récupere les données JSON des photographes
async function getPhotographers() {
    let response = await fetch('data/photographers.json');

    if (response.ok) {
        return response.json();
    } else {
        alert("HTTP-Error: " + response.status);
    }

}

//Affiche les données JSON dans le DOM
async function displayData(data) {
    const photographersSection = document.querySelector(".photographer_section");

    /*
    // On créé un array avec des données strucutrées {photograph, [media]}
    const datas = data.photographers.map((p) => {
        return data.media.map((m) => {
            console.log(p.id === m.photographerId);
        });
    })*/

    data.photographers.map((photographer) => {
        console.log(photographer);
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
};

init();

