function showDeleteSeance() {
	const space = document.getElementById("deleteSpace");
	if(space == null) {
		toLog("missing");
		return;
	}
	let content = "<button onclick='deleteSeanceCascade(\"" + afficheur.getSeance().getId() + "\");' class='important-msg'>Supprimer</button>";
	content += "<button onclick='displayListeVolees(\"" + afficheur.getSeance().getId() + "\");'>Annuler</button>";
	space.innerHTML = content;
}

function deleteSeanceCascade(idSeance) {
	DataManager.getInstance().deleteSeance(idSeance);
	afficheur.setSeance(null);
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
	let content = "<button onclick='deleteVoleeCascade(\"" + afficheur.getSeance().getId() + "\", \"" + afficheur.getVolee().getId() + "\");' class='important-msg'>Supprimer</button>";
	content += "<button onclick='displayListeFleches(\"" + afficheur.getVolee().getId() + "\");'>Annuler</button>";
	space.innerHTML = content;
}

function deleteVoleeCascade(idSeance, idVolee) {
	DataManager.getInstance().deleteVolee(idSeance, idVolee);
	afficheur.setVolee(null);
	afficheur.drawAppMenu();
	afficheur.getAppSpace(true);
	displayListeVolees(idSeance);
}