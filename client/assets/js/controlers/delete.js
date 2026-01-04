function showDeleteSeance() {
	const space = document.getElementById("deleteSpace");
	if(space == null) {
		toLog("missing");
		return;
	}
	let content = "<button onclick='deleteSeanceCascade(\"" + main.getSelectedSeance(true) + "\");' class='important-msg'>Supprimer</button>";
	content += "<button onclick='displayListeVolees(\"" + main.getSelectedSeance(true) + "\");'>Annuler</button>";
	space.innerHTML = content;
}

function deleteSeanceCascade(idSeance) {
	DataManager.getInstance().deleteSeance(idSeance);
	main.setSeance(null);
	afficheur.drawAppMenu();
	afficheur.getAppSpace(true);
	displayListeSeances();
}

function showDeleteVolee() {
	const space = document.getElementById("deleteSpace");
	if(space == null) {
		toLog("missing");
		return;
	}
	let content = "<button onclick='deleteVoleeCascade(\"" + main.getSelectedSeance(true) + "\", \"" + main.getSelectedVolee(true) + "\");' class='important-msg'>Supprimer</button>";
	content += "<button onclick='displayListeFleches(\"" + main.getSelectedVolee(true) + "\");'>Annuler</button>";
	space.innerHTML = content;
}

function deleteVoleeCascade(idSeance, idVolee) {
	toLog("delecting volee " + idVolee + " in seance " + idSeance + "...");
	DataManager.getInstance().deleteVolee(idSeance, idVolee);
	main.setVolee(null);
	afficheur.drawAppMenu();
	toLog("refreshing app space...");
	afficheur.getAppSpace(true);
	displayListeVolees(idSeance);
}