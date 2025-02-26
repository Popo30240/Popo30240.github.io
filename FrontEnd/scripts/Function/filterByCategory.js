/**
 * Cette fonction filtre les données de l'API par catégorie
 * @param {string} array 
 * @param {string} category 
 * @returns {object} : les données de l'API filtrées par catégorie
 */
function filterByCategory(array, category) {
    const objetFilter = array.filter(array => array.category.name === category);
    return array.filter(item => item.category.name === category);
}