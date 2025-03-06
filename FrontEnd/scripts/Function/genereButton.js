/**
 * 
 * @param {string} category : les catégories de la galerie
 * On pointe sur le titre de la section portfolio
 * On crée une balise button
 * On ajoute le texte du bouton 
 * genereButton(category);
 */

function genereButton(category) {
    const buttonFiltrer = category;
    const sectionPortfolio = document.querySelector(".buttons");
    const buttonElement = document.createElement("button");
    //buttonElement.className(".buttonFiltrer");
    buttonElement.innerText = buttonFiltrer;
    sectionPortfolio.appendChild(buttonElement);
  }