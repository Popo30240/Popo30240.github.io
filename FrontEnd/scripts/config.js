// Variables
// Vérifier si les données existent déjà dans le localStorage
const storedGallery = localStorage.getItem("dataGallery");
const storedCategories = localStorage.getItem("dataCategories");

const tokenLocalStorage = localStorage.getItem("authToken");
console.log("Token stocké :", tokenLocalStorage);

const urlWorks = 'http://localhost:5678/api/works';
const urlCategories = 'http://localhost:5678/api/categories';
const urlLogin = 'http://localhost:5678/api/users/login';