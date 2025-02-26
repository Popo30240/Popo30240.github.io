/**
 * 
 * @param {string} array : les données de l'API
 * On crée une balise figure
 * * On crée une balise img
 * On récupère l'url de l'image de la galerie
 * On crée une balise figcaption
 * On récupère le titre de la galerie
 * On pointe sur la class gallery
 * On ajoute la balise figure à la class gallery
 * On ajoute la balise img et la balise figcaption à la balise figure
 * On affiche les données de l'API dans
 * la balise figure
 */

function genereGallery(array) {        
    const itemGallery = array;
  
    const baliseElement = document.createElement("figure");
  
    const imageElement = document.createElement("img");
    imageElement.src = itemGallery.imageUrl;
    //console.log("Image de la galerie", itemGallery.imageUrl);
  
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = itemGallery.title;
    //console.log("Titre de la galerie", itemGallery.title);
  
    const classGallery = document.querySelector(".gallery");
    classGallery.appendChild(baliseElement);
  
    baliseElement.appendChild(imageElement);
    baliseElement.appendChild(titleElement);
    console.log("Données de l'API", itemGallery);
  }