if (tokenLocalStorage) {

    // Récupérer les données de la galerie et les afficher
    posterGalleryData(urlWorks);

    // Variables
    const backButtonOnModalGallery = document.getElementById('backModalGallery-btn');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    const modalGallery = document.getElementById('gallery-modal');
    const modalAddPhoto = document.getElementById('add-photo-modal');
    const openModalBtn = document.getElementById('buttonModification');
    const closeBtnModalGallery = document.getElementById('close-btn-modalGallery');
    const closeBtnModalAddPhoto = document.getElementById('close-btn-modalAddPhoto');
    const gallery = document.getElementById('gallery-edition');
    const addPhotoBtn = document.getElementById('add-photo-btn');

    // Ouvrir et fermer la modale
    openModalBtn.onclick = () => modalGallery.style.display = 'block';
    closeBtnModalGallery.onclick = () => modalGallery.style.display = 'none';
    closeBtnModalAddPhoto.onclick = () => modalAddPhoto.style.display = 'none';
    // Fermer la modale en cliquant en dehors
    window.onclick = (event) => {
        if (event.target === modalGallery) modalGallery.style.display = 'none';
        if (event.target === modalAddPhoto) modalAddPhoto.style.display = 'none';
    };


    // Charger les images depuis une API
    async function editionModalGallery() {

        const response = await fetch(urlWorks);
        const images = await response.json();

        // Clean avant de recharger
        gallery.innerHTML = '';

        images.forEach(img => {
            
            const div = document.createElement('div');
            div.classList.add('image-container');

            const image = document.createElement('img');
            image.src = img.imageUrl;
            //console.log("Image de la galerie", img.imageUrl);

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
            deleteBtn.classList.add('delete-btn');

            // Afficher l'ID des images de l'API
            //console.log("L'image", img.imageUrl, "a pour ID", img.id);
            deleteBtn.onclick = () => {
                const apiUrl = `http://localhost:5678/api/works/${img.id}`;
                console.log("L'ID sélectionnée pour la suppression est le numéro " + img.id + " et le lien de l'API est " + apiUrl); // Pour vérifier que l'image a bien été supprimée
                    fetch(apiUrl, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${tokenLocalStorage}`  // Envoi du token dans l'en-tête Authorization
                        }
                    })
                    .then(response => {
                    if (response.ok) {
                        console.log("L'élément a été supprimé avec succès.");
                    } else {
                        console.error("Erreur lors de la suppression de l'élément :", response.status);
                    }
                    })
                    .catch(error => {
                    console.error("Erreur réseau :", error);
                    });
                    editionModalGallery();// Pour recharger la galerie
            };

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

    backButtonOnModalGallery.onclick = () => {  
            // On ferme la modale
            modalGallery.style.display = 'block';
            // On ouvre la modale pour ajouter des photos
            modalAddPhoto.style.display = 'none';
    }

    // Déconnexion de l'administrateur
    adminLogoutBtn.onclick = () => {
        localStorage.removeItem('authToken');
        window.location.href = 'index.html';
    };

    // Initialiser la galerie au chargement
    editionModalGallery();

} else {
    window.location.href = 'pageLogin.html';
}