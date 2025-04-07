// Fonction pour afficher la galerie avec les données fournies
function posterGallery(dataArray) {
    const ClassGallery = document.querySelector(".gallery");
    
    // Nettoyer la galerie avant de recharger
    ClassGallery.innerHTML = '';
    
    // Générer la galerie en appelant une fonction pour chaque élément
    for (let i = 0; i < dataArray.length; i++) {
        genereGallery(dataArray[i]);
    }
}