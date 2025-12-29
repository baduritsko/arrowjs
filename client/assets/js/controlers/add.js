function displayAddSeance()
{
	afficheur.drawForm("Ajouter une nouvelle séance", [
		{
			label: 'Blason',
			id: 'blason',
			options: [
				{ name : 'trispots', value : 'tri' },
				{ name : '122 cm', value : '122' },
				{ name : '80 cm', value : '80' },
				{ name : '60 cm', value : '60' },
				{ name : '40 cm', value : '40', selected : true}				
			]
		},
		{
			label: 'Distance',
			id: 'distance',
			options: [
				{ name : '30 mètres', value : '30' },
				{ name : '50 mètres', value : '50' },
				{ name : '70 mètres', value : '70' },
				{ name : '10 mètres', value : '10' },
				{ name : '15 mètres', value : '15' },
				{ name : '18 mètres', value : '18', selected : true },
				{ name : '20 mètres', value : '20' }
			]
		}
	], 'saveNewSeance');
}
function saveNewSeance()
{
	const blason = document.getElementById("blason").value;
	const distance = document.getElementById("distance").value;
	if(!Seance.checkBlason(blason) || !Seance.checkDistance(distance)) {
		toLog("valeurs incorrectes");
		return;
	}
	const seance = new Seance(getFormattedDate(), distance, blason);
	datamgr.addSeance(seance);
	displayListeVolees(seance.getId());
}

function saveNewVolee(idSeance) {
	const seance = datamgr.getSeance(idSeance);
	if(seance == null) {
		toLog("Séance non existante pour ajout de volée");
		return;
	}
	const volee = seance.addVolee();
	afficheur.setVolee(volee);
	displayFormListeFleches(volee.getId());
}

function saveFlechesVolee() {
	const volee = afficheur.getVolee();
	if(volee == null) {
		return;
	}
	for(let i = 1; i < 20; i++) {
		const element = document.getElementById("fleche" + i);
		if(element == null) break;
		const value = element.value;
		if(value < -1) {
			toLog("flèche " + i + "non tirée");
			continue;
		}
		toLog("fleche" + i + " a la valeur " + value);
		volee.addFleche(value);
	}
	DataManager.getInstance().saveLocalStorage();
	displayListeVolees(volee.getSeance().getId());
}