/** 
 * @param {string} url : L'URL de l'API à laquelle faire la requête.
 * @returns {Promise<Object>} - Une promesse qui rtourne les données récupérées en JSON.
 */
// Fonction asynchrone pour récupérer des données depuis une API
// Utilisation de l'API Fetch pour effectuer une requête GET
async function fetchReturnData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Erreur réseau : " + response.status);
            return;
        }
        const dataJSON = await response.json();
        return dataJSON; // Retourne les données JSON
    } catch (error) {
        console.error("Erreur :", error);
    }
    // En cas d'erreur, undefined est retourné
}