
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
      console.log("Données de l'API", dataGallery);

      // On génére le bouton tous
      genereButton("tous");

      //On affiche les données de l'API
      for (let i = 0; i < dataGallery.length; i++) {
        genereGallery(dataGallery[i]);
      }

      // On récupère les catégories de la galerie
      const category = dataGallery.map(item => item.category.name);
      console.log("Catégories de la galerie", category);
      // On supprime les doublons
      const noDuplicateCategory = [...new Set(category)];
      console.log("Catégories de la galerie sans doublons", noDuplicateCategory);

      // On génére les boutons pour chaqu'une des catégories
      for (let i = 0; i < noDuplicateCategory.length; i++) {
        genereButton(noDuplicateCategory[i]);
      }

/*
      const boutonAll = document.querySelector("button");
      boutonAll.addEventListener("click", function () {
        // On efface le contenu de la class gallery
        document.querySelector(".gallery").innerHTML = "";
        // On affiche les données de l'API par catégorie
        for (let i = 0; i < dataGallery.length; i++) {
          genereGallery(dataGallery[i]);
        }
      });
*/
/*
      const boutonObjet = document.querySelector("button");
      boutonObjet.addEventListener("click", function () {
        // On efface le contenu de la class gallery
        document.querySelector(".gallery").innerHTML = "";
        // On filtre les données de l'API par catégorie
        category = filterByCategory(dataGallery, "Objets")
        //On affiche les données de l'API par catégorie
        for (let i = 0; i < category.length; i++) {
          genereGallery(category[i]);
        }
      });
*/
/*
      const boutonAppartements = document.querySelector("button");
      boutonAppartements.addEventListener("click", function () {
        // On efface le contenu de la class gallery
        document.querySelector(".gallery").innerHTML = "";
        // On filtre les données de l'API par catégorie
        category = filterByCategory(dataGallery, "Appartements")
        On affiche les données de l'API par catégorie
        for (let i = 0; i < category.length; i++) {
          genereGallery(category[i]);
        }
      });
*/
/*
      const boutonHotelsRestaurants = document.querySelector("button");
      boutonHotelsRestaurants.addEventListener("click", function () {
        // On efface le contenu de la class gallery
        document.querySelector(".gallery").innerHTML = "";
        // On filtre les données de l'API par catégorie
        category = filterByCategory(dataGallery, "Hotels & restaurants")
        // On affiche les données de l'API par catégorie
        for (let i = 0; i < category.length; i++) {
          genereGallery(category[i]);
        }
      });
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