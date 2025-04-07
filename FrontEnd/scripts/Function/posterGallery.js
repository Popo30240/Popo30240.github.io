/**
 * 
 * @param {array} dataArray : tableau d'objets contenant les données de la galerie
 * @returns {void} : aucune valeur de retour
 */
// Fonction pour afficher la galerie avec les données fournies de l'API
function posterGallery(dataArray) {
    const ClassGallery = document.querySelector(".gallery");
    
    // Nettoyer la galerie avant de recharger
    ClassGallery.innerHTML = '';
    
    // Générer la galerie en appelant une fonction pour chaque élément
    for (let i = 0; i < dataArray.length; i++) {
        genereGallery(dataArray[i]);
    }
}