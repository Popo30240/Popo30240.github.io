/* Fonctions */

/**
 * 
 * @param {string} category : les catégories de la galerie
 * On pointe sur le titre de la section portfolio
 * On crée une balise button
 * On ajoute le texte du bouton 
 * genereButton(category);
 */

function genereButton(category) {
  const buttonFiltrer = category;
  const sectionPortfolio = document.querySelector(".titlePortfolio");
  const buttonElement = document.createElement("button");
  //buttonElement.className(buttonFiltrer);
  buttonElement.innerText = buttonFiltrer;
  sectionPortfolio.appendChild(buttonElement);
}
/*
function filterByCategory(array, category) {
  return array.filter(item => item.category.name === category);
}
*/

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

/**
 * Cette fonction permet de récupérer les données de l'API et de les filtrer par catégorie
 * On pointe sur l'url de l'API
 * @param {string} url : l'url de l'API
 * On retourne les données de l'API et on les converties en JSON
 * @returns {object} : les données de l'API
 */
/*La fonction async permet de continuer à éxécuter la suite du code après la fonction pendant son traitement */

async function fetchDataGallery() {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      if (!response.ok) {
        throw new Error("Erreur réseau : " + response.status);
      }
      const dataGallery = await response.json();
      //console.log("Données de l'API", dataGallery);

      const boutonAll = document.querySelector("button");
      boutonAll.addEventListener("click", function () {
        for (let i = 0; i < dataGallery.length; i++) {
          genereGallery(dataGallery[i]);
        }
      });

      /*
      for (let i = 0; i < dataGallery.length; i++) {
        const Category = dataGallery[i].category.name;
        console.log("type de la catégorie", Category);
      }
        */
      /*
      const Category = dataGallery[i].category.id;
      console.log("type de la catégorie", Category);
      genereButton(Category);

      for (let i = 0; i < dataGallery.length; i++) {
        genereButton(dataGallery[i].category.name);
      }
*/
/*
      dataGallery.forEach(item => {
        const typeCategory = item.category.name;
        console.log("type de la catégorie", typeCategory);
        
        switch (typeCategory) {
          case 1:
            genereButton(typeCategory);
            break;
          case 2:
            genereButton(typeCategory);
            break;
          case 3:
            genereButton(typeCategory);
            break;
          default:
            break;
        }
      });
*/
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }
  
fetchDataGallery();

genereButton("tous");

