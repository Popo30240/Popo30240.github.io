document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Empêche le rechargement de la page
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    
    try {
        // Authentification pour récupérer le token
      const response = await fetch('http://localhost:5678/api/users/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        // Stocker le token renvoyé par le serveur dans le LocalStorage
        localStorage.setItem('authToken', data.token);
        console.log(localStorage)
        messageDiv.style.color = 'green';
        messageDiv.innerText = "Vous êtes connecté en administrateur !";
        // Redirection ou autre action après une connexion réussie
        window.location.href = '/admin-dashboard'; // Exemple de redirection
      } else {
        const errorData = await response.json();
        messageDiv.style.color = 'red';
        messageDiv.innerText = errorData.message || "Mauvais identifiants.","Veuillez recommencez";
      }
    } catch (error) {
      console.error("Erreur:", error);
      messageDiv.style.color = 'red';
      messageDiv.innerText = "Erreur serveur. Veuillez réessayer plus tard.";
    }
  });




