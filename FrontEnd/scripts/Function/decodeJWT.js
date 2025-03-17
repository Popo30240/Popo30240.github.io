// Définition des fonctions de décodage de JWT et de récupération des informations contenues dans le token :             
function decodeJWT(token) {
    const base64Url = token.split('.')[1]; // Récupérer le payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
  
    // Retourner le JSON décodé
    return JSON.parse(jsonPayload);
  }