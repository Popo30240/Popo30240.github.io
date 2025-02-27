/**
 * Cette fonction permet de ratacher l'action des boutons aux catégories de la galerie
 * @param {string} boutons
 * @param {string} dataGallery
 * @param {string} category 
 * @param {number} indexButton
 */
function buttonsAction (boutons,dataCategoriesNumberName,dataGallery,indexButton) {     
    boutons.addEventListener("click", function () {
    // On efface le contenu de la class gallery
    document.querySelector(".gallery").innerHTML = "";
    // On filtre les données de l'API par catégorie
    const categoryFilter = filterByCategory(dataGallery, dataCategoriesNumberName)
    //On affiche les données de l'API par catégorie
    for (let i = 0; i < categoryFilter.length; i++) {
        genereGallery(categoryFilter[i]);
    }
    });
} 
