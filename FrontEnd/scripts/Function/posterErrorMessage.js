
function posterErrorMessage() {
    const errorMessage = document.getElementById('error-message'); // Assurez-vous que l'élément existe dans le DOM
    errorMessage.style.display = 'block';
    errorMessage.style.color = 'red'; // Couleur rouge pour l'erreur
    errorMessage.style.fontSize = '16px'; // Taille de police pour l'erreur

    setTimeout(() => {
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }, 5000); // Masquer le message après 5 secondes
}