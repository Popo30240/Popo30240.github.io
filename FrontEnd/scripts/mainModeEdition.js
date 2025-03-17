// On récupère les données depuis le localStorage
dataGallery = JSON.parse(storedGallery);
console.log("Données récupérées depuis le localStorage", dataGallery);

// On génère toute la galerie
for (let i = 0; i < dataGallery.length; i++) {
    genereGallery(dataGallery[i]);
}

const modal = document.getElementById('gallery-modal');
const openModalBtn = document.getElementById('buttonModification');
const closeBtn = document.querySelector('.close-btn');
const gallery = document.getElementById('gallery-edition');
const addPhotoBtn = document.getElementById('add-photo-btn');

// Ouvrir et fermer la modale
openModalBtn.onclick = () => modal.style.display = 'block';
closeBtn.onclick = () => modal.style.display = 'none';
// Fermer la modale en cliquant en dehors
window.onclick = (event) => {
    if (event.target === modal) modal.style.display = 'none';
};

// Charger les images depuis une API fictive
function loadImages() {

    //gallery.innerHTML = '';

    dataGallery.forEach(img => {
        const div = document.createElement('div');
        div.classList.add('image-container');

        const image = document.createElement('img');
        image.src = img.thumbnailUrl;

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
    const imageUrl = prompt("Entrez l'URL de l'image :");
    if (imageUrl) {
        const div = document.createElement('div');
        div.classList.add('image-container');

        const image = document.createElement('img');
        image.src = imageUrl;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => div.remove();

        div.appendChild(image);
        div.appendChild(deleteBtn);
        gallery.appendChild(div);
    }
};

// Initialiser la galerie au chargement
loadImages();