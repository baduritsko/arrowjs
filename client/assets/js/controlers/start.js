const main = new Main();
const afficheur = main.getHtmlRenderer();
const datamgr = main.getDataManager();

document.addEventListener("DOMContentLoaded", () => {

	getAccueil();


});
function getAccueil() {
	main.reset();
	afficheur.getAppSpace(true);
	afficheur.drawAppMenu();
	displayListeSeances();
}

