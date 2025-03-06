let globalData;

async function fetchData(url) {
    try {
        const response = await fetch(url);
        
        // Vérification si la requête a réussi (status 200-299)
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        globalData = data; // Stocker les données dans la variable globale
        return data; // Retourne l'objet JSON récupéré
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return null; // Retourne null en cas d'erreur pour éviter un crash
    }
}