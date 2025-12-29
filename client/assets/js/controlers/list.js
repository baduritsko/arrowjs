function displayListeSeances(filter = false) {
	let seances = datamgr.getSeances();
	let filterValue = null;
	if(filter == "true") {
		filter = true;
		filterValue = document.getElementById("sortingSelect").value;
		switch(filterValue) {
			case "concoursOnly": 
				seances = seances.filter((seance) => seance.isConcours());
				break;
			default: filter = false;
		}
	}
	afficheur.drawListe(
		'Liste des séances', 
		seances, 
		(seance) => { return "<button class='full-width' onclick='displayListeVolees(\"" + seance.getId() + "\");'>" + seance + "</button>"; }, 
		true,
		{ functionName: 'displayListeSeances', optionsList: [{name: "Toutes les séances", value: "all"}, {name: "Seulement les concours", value: "concoursOnly"}], paramsList: '\"true\"', filterValue: filterValue},
		{ functionName: 'displayAddSeance', buttonName: 'Ajouter une nouvelle séance'});
}

function displayListeVolees(idSeance) {
	const seance = datamgr.getSeance(idSeance);
	if(seance == null) {
		toLog("Séance non trouvée");
		return;
	}
	main.setSeance(seance);
	main.setVolee(null);
	const volees = seance.getVolees();
	if(volees == null) {
		//mettre un truc ici
	}

	afficheur.drawListe(
		'Liste des volées', 
		volees, 
		(volee) => { return "<button class='full-width' onclick='" + volee.hasValue('displayListeFleches', 'displayFormListeFleches') + "(\"" + volee.getId() + "\");'>" + volee + "</button>"; }, 
		true,
		null, 
		{ functionName: 'saveNewVolee', buttonName: 'Ajouter une nouvelle volée', paramsList: '\"' + seance.getId()+ '\"' });
}

function displayListeFleches(idVolee) {
	const volee = datamgr.getVolee(idVolee);
	if(volee == null) {
		toLog("Volée non trouvée");
		return;
	}
	main.setVolee(volee);
	afficheur.drawListe(
		"Liste des flèches", 
		volee.getFleches(), 
		(fleche) => { return "<p>Flèche : " + fleche + "</p>"; },
		true
	);
}

function displayFormListeFleches(idVolee) {
	const volee = datamgr.getVolee(idVolee);
	if(volee == null) {
		toLog("Volée non trouvée");
		return;
	}
	main.setVolee(volee);
	afficheur.drawAppMenu();


	afficheur.drawForm("Valeurs des flèches", [
		{ label: 'Flèche 1', id: 'fleche1', options: Fleche.valeursFleche },
		{ label: 'Flèche 2', id: 'fleche2', options: Fleche.valeursFleche },
		{ label: 'Flèche 3', id: 'fleche3', options: Fleche.valeursFleche },
		{ label: 'Flèche 4', id: 'fleche4', options: Fleche.valeursFleche },
		{ label: 'Flèche 5', id: 'fleche5', options: Fleche.valeursFleche },
		{ label: 'Flèche 6', id: 'fleche6', options: Fleche.valeursFleche }
	], 'saveFlechesVolee');
}