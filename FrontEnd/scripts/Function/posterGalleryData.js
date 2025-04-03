/**
 * 
 * @param {string} url : l'url de l'API
 * On effectue l'appel API pour récupérer les données
 */
async function posterGalleryData(url) {
    try {
            // On effectue l'appel API pour récupérer les données
            const resultat = await fetch(url);
            if (!resultat.ok) {
                throw new Error("Erreur réseau : " + resultat.status);
            }

            // On convertit le résultat en JSON
            dataGallery = await resultat.json();
            console.log("Données de la galerie", dataGallery);

            const ClassGallery = document.querySelector(".gallery");
            
            // Clean la galerie avant de recharger
            ClassGallery.innerHTML = '';

            // On génère toute la galerie
            for (let i = 0; i < dataGallery.length; i++) {
                genereGallery(dataGallery[i]);
            }

        } catch (error) {

            console.error("Erreur :", error);
    }
}