
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

      const responseWorks = await fetch("http://localhost:5678/api/works");
      if (!responseWorks.ok) {
        throw new Error("Erreur réseau : " + responseWorks.status);
      }

      const responseCategories = await fetch("http://localhost:5678/api/categories");
      if (!responseCategories.ok) {
        throw new Error("Erreur réseau : " + responseCategories.status);
      }

      const dataGallery = await responseWorks.json();
      //console.log("Données de l'API 'Galerie' ", dataGallery);

      const dataCategories = await responseCategories.json();
      //console.log("Données de l'API 'catégorie' ", dataCategories);

      // On génére le bouton tous
      genereButton("tous");

      //On affiche la galerie daans sa totalité
      for (let i = 0; i < dataGallery.length; i++) {
        genereGallery(dataGallery[i]);
      }

      // On génére les boutons pour chaqu'une des catégories récupérées par l'API
      for (let i = 0; i < dataCategories.length; i++) {
        genereButton(dataCategories[i].name);
        console.log("Boutons générés par 'catégorie' ", dataCategories[i].name);
      }

      const boutons = document.querySelectorAll("button");
      console.log(boutons);

      for (let i = 0; i < boutons.length; i++) {
        boutons[i].addEventListener("click", function () {
          // On efface le contenu de la class gallery
          document.querySelector(".gallery").innerHTML = "";
          console.log("Boutons cliqués", boutons[i].innerText);
          console.log("Numéro de l'index des boutons est ", [i]);
          // Si le bouton cliqué est "tous" on affiche toute la galerie depuis l'API
          if (boutons[i].innerText === "tous") {
            for (let i = 0; i < dataGallery.length; i++) {
              genereGallery(dataGallery[i]);
            }
            // Sinon on filtre la galerie de l'API par catégorie
          } else {
            const categoryFilter = filterByCategory(dataGallery, boutons[i].innerText);
            console.log("Données générées par catégorie filtrée", categoryFilter);
            for (let i = 0; i < categoryFilter.length; i++) {
              genereGallery(categoryFilter[i]);
            }
          }
        });
      }  
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
}