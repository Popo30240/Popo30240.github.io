
/**
 * Cette fonction permet de récupérer les données de l'API et de les filtrer par catégorie
 * On pointe sur l'url de l'API
 * @param {string} url : l'url de l'API
 * On retourne les données de l'API et on les converties en JSON
 * @returns {object} : les données de l'API
 */

let dataGallery, dataCategories;

async function fetchDataGallery() {
  try {
    
    if (storedGallery && storedCategories) {
      // Si elles existent, on les utilise
      dataGallery = JSON.parse(storedGallery);
      dataCategories = JSON.parse(storedCategories);
      console.log("Données récupérées depuis le localStorage", dataGallery, dataCategories);
    } else {
      // Sinon, on effectue les appels API
      const responseWorks = await fetch("http://localhost:5678/api/works");
      if (!responseWorks.ok) {
        throw new Error("Erreur réseau : " + responseWorks.status);
      }
      const responseCategories = await fetch("http://localhost:5678/api/categories");
      if (!responseCategories.ok) {
        throw new Error("Erreur réseau : " + responseCategories.status);
      }

      dataGallery = await responseWorks.json();
      dataCategories = await responseCategories.json();

      // Enregistrer les données dans le localStorage pour une utilisation future
      localStorage.setItem("dataGallery", JSON.stringify(dataGallery));
      localStorage.setItem("dataCategories", JSON.stringify(dataCategories));
      //console.log("Données sauvegardées dans le localStorage");
    }

    // Génération du bouton "tous"
    genereButton("Tous");

    // On génère toute la galerie
    for (let i = 0; i < dataGallery.length; i++) {
      genereGallery(dataGallery[i]);
    }

    // Génération des boutons pour chacune des catégories récupérées
    for (let i = 0; i < dataCategories.length; i++) {
      genereButton(dataCategories[i].name);
      console.log("Boutons générés par 'catégorie' :", dataCategories[i].name);
    }

    const boutons = document.querySelectorAll("button");
    console.log(boutons);

    for (let i = 0; i < boutons.length; i++) {
      boutons[i].addEventListener("click", function () {
        // On efface le contenu de la classe gallery
        document.querySelector(".gallery").innerHTML = "";
        console.log("Bouton cliqué :", boutons[i].innerText);
        console.log("Index du bouton :", i);

        // Si le bouton cliqué est "tous", on affiche toute la galerie
        if (boutons[i].innerText === "Tous") {
          for (let j = 0; j < dataGallery.length; j++) {
            genereGallery(dataGallery[j]);
          }
        } else {
          // Sinon, on filtre la galerie par catégorie
          const categoryFilter = filterByCategory(dataGallery, boutons[i].innerText);
          console.log("Données filtrées par catégorie :", categoryFilter);
          for (let j = 0; j < categoryFilter.length; j++) {
            genereGallery(categoryFilter[j]);
          }
        }
      });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}