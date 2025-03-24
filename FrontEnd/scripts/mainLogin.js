console.log("Admin connecté :", adminConnected);

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Empêche le rechargement de la page

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const messageDiv = document.getElementById('message');

  try {
    // Étape 1 : Authentification auprès du serveur en envoyant l'email et le mot de passe
    const responseAuthentication = await fetch(urlLogin, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    // Vérification de la réponse
    if (responseAuthentication.ok) {

        // On récupère le token de la réponse et on le stocke dans le localStorage
        const data = await responseAuthentication.json();
        const token = data.token;

        // Stockage du token dans le localStorage
        localStorage.setItem('authToken', token);

        // Si la réponse est correcte, on affiche un message de réussite
        messageDiv.style.color = 'green';
        messageDiv.innerText = "Vous êtes connecté au mode édition !";

        // On vérifie si le token existe et on passe la variable adminConnected à true
        if (token) {
          // On indique que l'administrateur est connecté
          adminConnected = true;
        } else {
          adminConnected = false; 
        }

        // On vérifie si le token existe et si l'administrateur est connecté
        if (token && adminConnected === true) {
          // Redirection vers le mode édition après un court délai pour laisser le temps au message de s'afficher
          setTimeout(() => {
            window.location.href = 'modeEdition.html';
          }, 1500);
        }

      } else {

        // Si la réponse est incorrecte, on affiche un message d'erreur
        messageDiv.style.color = 'red';
        messageDiv.innerText = "Email ou mot de passe incorrect.";
    }

  } catch (error) {
    console.error("Erreur:", error);
    messageDiv.style.color = 'red';
    messageDiv.innerText = "Erreur serveur. Veuillez réessayer plus tard.";
  }

});