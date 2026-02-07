function displayAddSeance()
{
	const form = new Form("Ajouter une nouvelle séance", 'saveNewSeance();');
	form.addFieldset(new Select('blason', 'Blason', Seance.typeBlasons));
	form.addFieldset(new Select('distance', 'Distance', Seance.distances));
	form.addFieldset(new Select('concours', 'Concours', [{ name: "Non", value: 0}, { name: "Oui", value: 1}]));
	afficheur.drawFullForm(form);
}
function saveNewSeance()
{
	const blason = document.getElementById("blason").value;
	const distance = document.getElementById("distance").value;
	const concours = (document.getElementById("concours").value == 1);
	if(!Seance.checkBlason(blason) || !Seance.checkDistance(distance)) {
		toLog("valeurs incorrectes");
		return;
	}
	const seance = new Seance(getFormattedDate(), distance, blason, concours);
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
	main.setVolee(volee);
	displayFormListeFleches(volee.getId());
}

function saveFlechesVolee() {
	const volee = main.getSelectedVolee();
	if(volee == null) {
		return;
	}
	for(let i = 1; i < 20; i++) {
		const element = document.getElementById("valeur" + i);
		if(element == null) break;
		const value = element.value;
		if(value < -1) {
			toLog("flèche " + i + "non tirée");
			continue;
		}
		const heure = document.getElementById("heure" + i).value ?? 0;
		toLog("fleche" + i + " a la valeur " + value + " et position " + heure);
		const fleche = new Fleche(volee, value);
		fleche.setHeure(heure);
		volee.addFleche(fleche);
	}
	DataManager.getInstance().saveLocalStorage();
	displayListeVolees(volee.getSeance().getId());
}