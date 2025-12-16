const afficheur = new Afficheur();
const datamgr = DataManager.loadLocalStorage();

document.addEventListener("DOMContentLoaded", () => {
	
	afficheur.render();
});


