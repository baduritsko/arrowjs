function displayAddSeance()
{
	afficheur.drawForm("Ajouter une nouvelle séance", [
		{ label: 'Blason', id: 'blason', options: Seance.typeBlasons},
		{ label: 'Distance', id: 'distance', options: Seance.distances},
		{ label: 'Concours', id: 'concours', options: [{ name: "Non", value: 0}, { name: "Oui", value: 1}]}
	], 'saveNewSeance');
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