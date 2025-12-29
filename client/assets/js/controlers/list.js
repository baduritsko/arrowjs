function displayListeSeances() {
	afficheur.drawAppMenu();

	afficheur.drawListe('Liste des séances', datamgr.getSeances(), (seance) => { return "<button class='full-width' onclick='displayListeVolees(\"" + seance.getId() + "\");'>" + seance + "</button>"; }, 'displayAddSeance', 'Ajouter une nouvelle séance');
	

	/*
	afficheur.drawListe('Liste des séances', datamgr.getSeances(), (obj) => { return 'displayListeVolees'; }, 'displayAddSeance', 'Ajouter une nouvelle séance');


	*/
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

	afficheur.drawListe('Liste des volées', volees, (volee) => { return "<button class='full-width' onclick='" + volee.hasValue('displayListeFleches', 'displayFormListeFleches') + "(\"" + volee.getId() + "\");'>" + volee + "</button>"; }, 'saveNewVolee', 'Ajouter une nouvelle volée', seance.getId());
	



	/*
	afficheur.drawListe('Liste des volées', volees, (obj) => { return ((obj.getValue()[0] > 0) ? 'displayListeFleches' : 'displayFormListeFleches'); }, 'saveNewVolee', 'Ajouter une nouvelle volée', seance.getId());
	*/
}

function displayListeFleches(idVolee) {
	const volee = datamgr.getVolee(idVolee);
	if(volee == null) {
		toLog("Volée non trouvée");
		return;
	}
	afficheur.setVolee(volee);
	afficheur.drawAppMenu();

	afficheur.drawListe("Liste des flèches", volee.getFleches(), (fleche) => { return "<p>Flèche : " + fleche + "</p>"; });


	/*
	afficheur.drawListe("Liste des flèches", volee.getFleches());*/
}

function displayFormListeFleches(idVolee) {
	const volee = datamgr.getVolee(idVolee);
	if(volee == null) {
		toLog("Volée non trouvée");
		return;
	}
	afficheur.setVolee(volee);
	afficheur.drawAppMenu();

	const valeursFleche = [
		{ name : 'Non tirée', value : '-8' },
		{ name : '10+', value : '11' },
		{ name : '10', value : '10' },
		{ name : '9', value : '9' },
		{ name : '8', value : '8' },
		{ name : '7', value : '7' },
		{ name : '6', value : '6' },
		{ name : '5', value : '5' },
		{ name : '4', value : '4' },
		{ name : '3', value : '3' },
		{ name : '2', value : '2' },
		{ name : '1', value : '1' },
		{ name : 'Paille', value : '0' },
		{ name : 'Perdue', value : '-1' }
	]
	afficheur.drawForm("Valeurs des flèches", [
		{ label: 'Flèche 1', id: 'fleche1', options: valeursFleche },
		{ label: 'Flèche 2', id: 'fleche2', options: valeursFleche },
		{ label: 'Flèche 3', id: 'fleche3', options: valeursFleche },
		{ label: 'Flèche 4', id: 'fleche4', options: valeursFleche },
		{ label: 'Flèche 5', id: 'fleche5', options: valeursFleche },
		{ label: 'Flèche 6', id: 'fleche6', options: valeursFleche }
	], 'saveFlechesVolee');
}