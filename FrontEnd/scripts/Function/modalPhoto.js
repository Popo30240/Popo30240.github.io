// Sélection des éléments du DOM
const modalGallery = document.getElementById('gallery-modal');
const modalAddPhoto = document.getElementById('add-photo-modal');
const openModalBtn = document.getElementById('buttonModification');
const closeBtnModalGallery = document.getElementById('close-btn-modalGallery');
const closeBtnModalAddPhoto = document.getElementById('close-btn-modalAddPhoto');
const galleryEdition = document.getElementById('gallery-edition');
const addPhotoBtn = document.getElementById('add-photo-btn');
const backButtonOnModalGallery = document.getElementById('backModalGallery-btn');
const adminLogoutBtn = document.getElementById('admin-logout-btn');
const photoInput = document.getElementById('photo-input');
const titleInput = document.getElementById('title-input');
const categoryInput = document.getElementById('category-input');
const validateBtn = document.getElementById('validate-btn');
const preview = document.getElementById('preview'); // Élément pour l'aperçu de l'image
const errorMessage = document.getElementById('error-message'); // Élément pour afficher les messages d'erreur
const categorySelect = document.getElementById('category-input');
const addPictureBtn = document.querySelector('.add-picture-btn'); // Bouton d'ajout de photo
const formatPhoto = document.getElementById('format-photo'); // Élément pour la condition de photo

// Gestion de l'ouverture et fermeture des modales avec addEventListener
openModalBtn.addEventListener('click', () => {
    modalGallery.style.display = 'block';
});
closeBtnModalGallery.addEventListener('click', () => {
    modalGallery.style.display = 'none';
});
closeBtnModalAddPhoto.addEventListener('click', () => {
    modalAddPhoto.style.display = 'none';
});

// Fermer la modale en cliquant en dehors
window.addEventListener('click', (event) => {
    if (event.target === modalGallery) {
        modalGallery.style.display = 'none';
    }
    if (event.target === modalAddPhoto) {
        modalAddPhoto.style.display = 'none';
    }
});

// Navigation entre modales
addPhotoBtn.addEventListener('click', () => {
    modalGallery.style.display = 'none';
    modalAddPhoto.style.display = 'block';
    addPictureBtn.style.display = 'block'; // Afficher le bouton d'ajout de photo
    formatPhoto.style.display = 'block'; // Afficher le texte d'instructions
});

backButtonOnModalGallery.addEventListener('click', () => {
    modalAddPhoto.style.display = 'none';
    modalGallery.style.display = 'block';
});

// Déconnexion de l'administrateur
adminLogoutBtn.addEventListener('click', () => {
    localStorage.removeItem('authToken');
    window.location.href = 'index.html';
});

// Fonction de vérification du formulaire
function checkForm() {
    if (
        photoInput.files.length > 0 &&
        titleInput.value.trim() !== "" &&
        categoryInput.value.trim() !== ""
    ) {
        validateBtn.classList.add('active');
    } else {
        validateBtn.classList.remove('active');
    }
}

// Aperçu de l'image lors de la sélection d'un fichier
photoInput.addEventListener('change', () => {
    checkForm();
    const file = photoInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = e => {
            if (preview) {
                preview.src = e.target.result;
                preview.style.display = 'block';

                addPictureBtn.style.display = 'none'; // Masquer le bouton d'ajout de photo
                formatPhoto.style.display = 'none'; // Masquer le texte d'instructions
            }
        };
        reader.readAsDataURL(file);
    }
});

// Actualiser la vérification du formulaire sur les inputs texte
titleInput.addEventListener('input', checkForm);
categoryInput.addEventListener('input', checkForm);

// Gestion de l'envoi du formulaire
validateBtn.addEventListener('click', () => {
    const file = photoInput.files[0];
    if (!file || !['image/jpeg', 'image/png'].includes(file.type) || file.size > 4 * 1024 * 1024) {
        alert('Fichier invalide. Veuillez choisir une image JPG ou PNG de moins de 4Mo.');
        return;
    }

    // Création d'un objet FormData pour l'envoi de l'image et des données associées
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', titleInput.value.trim());
    formData.append('category', categoryInput.value.trim());
    console.log("FormData :", formData);

    // Envoi de la requête POST (utilisation de FormData pour la gestion des fichiers)
    fetch(urlWorks, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenLocalStorage}`
            // Pas de Content-Type à spécifier, le navigateur s'en charge pour FormData
        },
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log("Image ajoutée avec succès.");
            // Réinitialiser le formulaire et fermer la modale d'ajout
            modalAddPhoto.style.display = 'none';
            photoInput.value = '';
            titleInput.value = '';
            categoryInput.value = '';
            validateBtn.classList.remove('active');
            if (preview) {
                preview.style.display = 'none';
            }
        } else {
            console.error("Erreur lors de l'ajout de l'image :", response.status);

            errorMessage.textContent = "Erreur numéro " + response.status + " lors de l'ajout de l'image. Veuillez réessayer." ;
            errorMessage.style.display = 'block';
            errorMessage.style.color = 'red'; // Couleur rouge pour l'erreur
            errorMessage.style.fontSize = '16px'; // Taille de police pour l'erreur

            setTimeout(() => {
                if (errorMessage) {
                    errorMessage.style.display = 'none';
                }
            }, 5000); // Masquer le message après 5 secondes
        }
    })
    .catch(error => {
        console.error("Erreur réseau lors de l'ajout de l'image :", error);
    });
});

// Fonction asynchrone pour charger et afficher la galerie d'édition
async function modalEdition() {
    
    // Remplacer 'urlWorks' par l'URL de votre API
    const dataGallery = await fetchReturnData(urlWorks);
    if (dataGallery) {
        // On passe le résultat (data) en argument à posterGallery
        posterGallery(dataGallery);
    } else {
        console.error("Aucune donnée récupérée venant de " + urlWorks);
    }

    // Remplacer 'urlCategories' par l'URL de votre API
    const dataCategories = await fetchReturnData(urlCategories);
    if (dataCategories) {         
        // Vider le select avant de le remplir
        categorySelect.innerHTML = '<option value="">-- Choisissez une catégorie --</option>';

        // Remplir le select avec les catégories
        dataCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } else {
        console.error("Aucune catégorie récupérée venant de " + urlCategories);
    }

    // Nettoyer la galerie avant de la recharger
    galleryEdition.innerHTML = '';

    dataGallery.forEach(img => {
        const div = document.createElement('div');
        div.classList.add('image-container');

        const image = document.createElement('img');
        image.src = img.imageUrl;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteBtn.classList.add('delete-btn');

        // Suppression de l'image via l'API
        deleteBtn.addEventListener('click', () => {
            const apiUrl = `http://localhost:5678/api/works/${img.id}`;
            fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenLocalStorage}`
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log(`Image ${img.id} supprimée avec succès.`);
                    // Recharger la galerie après suppression
                    modalEdition();
                } else {
                    console.error("Erreur lors de la suppression de l'image :", response.status);
                }
            })
            .catch(error => {
                console.error("Erreur réseau lors de la suppression :", error);
            });
        });

        div.appendChild(image);
        div.appendChild(deleteBtn);
        galleryEdition.appendChild(div);
    });
  
} // Fin de la fonction modalPhoto