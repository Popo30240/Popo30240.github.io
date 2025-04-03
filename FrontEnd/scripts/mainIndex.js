
async function lunchGallery() {

  try {
    
    const responseWorks = await fetch(urlWorks);
    if (!responseWorks.ok) {
      throw new Error("Erreur réseau : " + responseWorks.status);
    }

    dataGallery = await responseWorks.json();
    //localStorage.setItem('dataGallery', dataGallery);
    
    const responseCategories = await fetch(urlCategories);
    if (!responseCategories.ok) {
      throw new Error("Erreur réseau : " + responseCategories.status);
    }

    dataCategories = await responseCategories.json();
    //localStorage.setItem('dataCategories', dataCategories);

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

lunchGallery();