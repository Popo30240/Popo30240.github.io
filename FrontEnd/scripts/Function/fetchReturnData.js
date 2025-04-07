// Fonction asynchrone pour récupérer les données
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