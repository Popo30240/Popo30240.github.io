/* Variables */

const arrayCatAll =[]

const arrayCatObjets =[]

const arrayCatApartments =[]

const arrayCatHotAndRes =[]

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
      dataGallery.forEach(item => {
        const id = item.category.id;
        arrayCatAll.push(id);
        //console.log("ID de la catégorie", id);
        
        switch (id) {
          case 1:
            arrayCatObjets.push(id);
            break;
          case 2:
            arrayCatApartments.push(id);
            break;
          case 3:
            arrayCatHotAndRes.push(id);
            break;
          default:
            arrayCatAll.push(id);
            break;
        }
      });
        console.log("Résultat des ID du tableau tous " + arrayCatAll);
        console.log("Résultat des ID du tableau objet filtré " + arrayCatObjets);
        console.log("Résultat des ID du tableau des appartements filtré " + arrayCatApartments);
        console.log("Résultat des ID du tableau des Hôtels et Restaurants filtré " + arrayCatHotAndRes);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }
  
fetchDataGallery();
