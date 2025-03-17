document.getElementById('login-form').addEventListener('submit', async function(e) {
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
      // Si l'email et le mot de passe sont corrects
      if (response.ok) {
        // On récupére le token dans le data de la réponse
        const data = await response.json();
        console.log(data);
        const token = data.token; // Extraire le token du JSON
        console.log("Token reçu :", token);
  
        if (token) {
            const decoded = decodeJWT(token);
            console.log("Informations contenues dans le token :", decoded);
        }
        /*
        // Étape 2 : Validation du token auprès du serveur
        const validationResponse = await fetch('http://localhost:5678/api/users/validateToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        */
        //if (validationResponse.ok) {
          // Le token est validé, on le stocke dans le LocalStorage
         //localStorage.setItem('authToken', token);
          messageDiv.style.color = 'green';
          messageDiv.innerText = "Vous êtes connecté au mode édition !";
          // Redirection vers le mode édition
          window.location.href = 'modeEdition.html';
        //} else {
          // Si la validation échoue
          //messageDiv.style.color = 'red';
          //messageDiv.innerText = "Erreur dans l’identifiant ou le mot de passe";
        //}
      } else {
        // Si l'authentification initiale échoue
        messageDiv.style.color = 'red';
        messageDiv.innerText = "Erreur dans l’identifiant ou le mot de passe";
      }
    } catch (error) {
      console.error("Erreur:", error);
      messageDiv.style.color = 'red';
      messageDiv.innerText = "Erreur serveur. Veuillez réessayer plus tard.";
    }
  });