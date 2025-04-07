// Variables constantes

const tokenLocalStorage = localStorage.getItem("authToken");
console.log("Token stocké :", tokenLocalStorage);

const urlWorks = 'http://localhost:5678/api/works';
const urlCategories = 'http://localhost:5678/api/categories';
const urlLogin = 'http://localhost:5678/api/users/login';