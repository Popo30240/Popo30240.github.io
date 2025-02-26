/**
 * Cette fonction permet de ratacher l'action des boutons aux catégories de la galerie
 * @param {string} array
 * @param {string} category 
 * @param {number} indexButton
 */
function buttonsAction (array,category) {     
    const bouton = document.querySelectorAll("button")[indexButton];
    bouton.addEventListener("click", function () {
    // On efface le contenu de la class gallery
    document.querySelector(".gallery").innerHTML = "";
    // On filtre les données de l'API par catégorie
    category = filterByCategory(array, category)
    //On affiche les données de l'API par catégorie
    for (let i = 0; i < category.length; i++) {
        genereGallery(category[i]);
    }
    });
} 
