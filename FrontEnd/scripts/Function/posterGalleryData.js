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
            const gallery = await resultat.json();
            console.log("Données de la galerie", gallery);

            // On génère toute la galerie
            for (let i = 0; i < gallery.length; i++) {
                genereGallery(gallery[i]);
            }

        } catch (error) {

            console.error("Erreur :", error);
    }
}