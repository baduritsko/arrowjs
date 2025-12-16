function displayListeSeances() {
	afficheur.drawAppMenu();
	afficheur.drawListe('Liste des séances', datamgr.getSeances(), 'displayListeVolees', 'displayAddSeance', 'Ajouter une nouvelle séance');
}

function displayListeVolees(idSeance) {
	const seance = datamgr.getSeance(idSeance);
	if(seance == null) {
		toLog("Séance non trouvée");
		return;
	}
	afficheur.setSeance(seance);
	afficheur.setVolee(null);
	afficheur.drawAppMenu();
	const volees = seance.getVolees();
	if(volees == null) {
		//mettre un truc ici
	}
	afficheur.drawListe('Liste des volées', volees, 'displayListeFleches', 'saveNewVolee', 'Ajouter une nouvelle volée', seance.getId());
}

function displayListeFleches(idVolee) {
	const volee = datamgr.getVolee(idVolee);
	if(volee == null) {
		toLog("Volée non trouvée");
		return;
	}
	afficheur.setVolee(volee);
	afficheur.drawAppMenu();

	afficheur.getAppSpace(true);
}