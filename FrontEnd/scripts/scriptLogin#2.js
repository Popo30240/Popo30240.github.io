document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    try {
        // Étape 1 : Authentification auprès du serveur en envoyant l'email et le mot de passe
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Réponse serveur :", data);

            const token = data.token; // Récupération du token
            console.log("Token reçu :", token);
            const refreshToken = data.refreshToken; // Récupération du refresh token
            console.log("Refresh token  reçu :", refreshToken);

            if (token && refreshToken) {
                // Vérification locale de l'expiration du token
                if (isTokenExpired(token)) {
                    console.log("Token expiré, tentative de rafraîchissement...");
                    const newToken = await refreshAccessToken(refreshToken);
                    if (!newToken) {
                        throw new Error("Impossible de rafraîchir le token");
                    }
                    localStorage.setItem('authToken', newToken);
                } else {
                    console.log("Token valide !");
                    localStorage.setItem('authToken', token);
                }

                // Étape 2 : Validation du token auprès du serveur
                const validationResponse = await validateToken(token);
                if (validationResponse) {
                    messageDiv.style.color = 'green';
                    messageDiv.innerText = "Vous êtes connecté au mode édition !";
                    window.location.href = 'modeEdition.html'; // Redirection
                } else {
                    messageDiv.style.color = 'red';
                    messageDiv.innerText = "Erreur dans l’identifiant ou le mot de passe";
                }
            }
        } else {
            messageDiv.style.color = 'red';
            messageDiv.innerText = "Erreur dans l’identifiant ou le mot de passe";
        }
    } catch (error) {
        console.error("Erreur:", error);
        messageDiv.style.color = 'red';
        messageDiv.innerText = "Erreur serveur. Veuillez réessayer plus tard.";
    }
});

/**
 * Fonction pour vérifier si un token est expiré
 */
function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload
        const exp = payload.exp; // Récupérer l'expiration
        const now = Math.floor(Date.now() / 1000); // Temps actuel en secondes
        return exp < now; // True si expiré, false sinon
    } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        return true; // Considérer le token invalide en cas d'erreur
    }
}

/**
 * Fonction pour valider un token auprès du serveur
 */
async function validateToken(token) {
    try {
        const response = await fetch('http://localhost:5678/api/users/validateToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log("Token validé auprès du serveur");
            return true;
        } else {
            console.warn("Token invalide ou expiré");
            return false;
        }
    } catch (error) {
        console.error("Erreur lors de la validation du token :", error);
        return false;
    }
}

/**
 * Fonction pour rafraîchir le token expiré
 */
async function refreshAccessToken(refreshToken) {
    try {
        const response = await fetch('http://localhost:5678/api/users/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refreshToken })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Nouveau token reçu :", data.token);
            return data.token;
        } else {
            console.warn("Impossible de rafraîchir le token");
            return null;
        }
    } catch (error) {
        console.error("Erreur lors du rafraîchissement du token :", error);
        return null;
    }
}