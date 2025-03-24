adminConnected = true;
console.log("Admin connecté :", adminConnected);

posterGalleryData(urlWorks);

// Variables

const adminLogoutBtn = document.getElementById('admin-logout-btn');
const modalGallery = document.getElementById('gallery-modal');
const modalAddPhoto = document.getElementById('add-photo-modal');
const openModalBtn = document.getElementById('buttonModification');
const closeBtn = document.querySelector('.close-btn');
const gallery = document.getElementById('gallery-edition');
const addPhotoBtn = document.getElementById('add-photo-btn');

// Ouvrir et fermer la modale
openModalBtn.onclick = () => modalGallery.style.display = 'block';
closeBtn.onclick = () => modalGallery.style.display = 'none';
// Fermer la modale en cliquant en dehors
window.onclick = (event) => {
    if (event.target === modalGallery) modalGallery.style.display = 'none';
};

// Charger les images depuis une API
async function editionModalGallery() {

    const response = await fetch(urlWorks);
    const images = await response.json();

    gallery.innerHTML = '';

    images.forEach(img => {
        const div = document.createElement('div');
        div.classList.add('image-container');

        const image = document.createElement('img');
        image.src = img.imageUrl;
        //console.log("Image de la galerie", img.imageUrl);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => div.remove(); // Pour supprimer l'image visuellement

        div.appendChild(image);
        div.appendChild(deleteBtn);
        gallery.appendChild(div);
    });
}

// Simuler l'ajout d'une photo
addPhotoBtn.onclick = () => {
    // On ferme la modale
    modalGallery.style.display = 'none';
    // On ouvre la modale pour ajouter des photos
    modalAddPhoto.style.display = 'block';
};

// Déconnexion de l'administrateur
adminLogoutBtn.onclick = () => {
    localStorage.removeItem('authToken');
    adminConnected = false;
    window.location.href = 'index.html';
};

// Initialiser la galerie au chargement
editionModalGallery();