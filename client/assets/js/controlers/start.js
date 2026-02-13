const main = new Main();
const afficheur = main.getHtmlRenderer();
const datamgr = main.getDataManager();

function getAccueil() {
	main.reset();
	afficheur.getAppSpace(true);
	afficheur.drawAppMenu();
	displayListeSeances();
}

getAccueil();