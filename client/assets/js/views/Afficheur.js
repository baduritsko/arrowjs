class Afficheur {
	#selectedSeance
	#selectedVolee

	constructor() {

	}

	setSeance(seance) {
		this.selectedSeance = seance;
	}

	setVolee(volee) {
		this.selectedVolee = volee;
	}

	reset() {
		this.selectedSeance = null;
		this.selectedVolee = null;
	}

	render() {
		this.drawAppMenu();
	}

	drawAppMenu() {
		const am = document.getElementById("appMenu");
		if(am === null) {
			toLog("#appMenu n'est pas disponible");
			return null;
		}
		am.innerHTML = "<button onclick='getAccueil();'>Accueil</button>";
		if(this.selectedVolee) {
			am.innerHTML += "<button onclick='displayListeVolees(\"" + this.selectedSeance.getId() + "\");'>Retour à la séance</button>";
			am.innerHTML += "<br><h3>" + this.selectedVolee + "</h3>";
		}
		else if(this.selectedSeance) {
			am.innerHTML += "<br><h3>" + this.selectedSeance + "</h3>";
		}
	}

	drawListe(title, iterable, fonctionItemClick, fonctionAddClick = null, nameAddClick = null, paramsAddClick = null) {
		const lt = this.getAppSpace(true);
		if(lt == null) return;
		let content = "<h3>" + title + "</h3>";
		if(fonctionAddClick != null && nameAddClick != null) { //affiche un bouton pour ajouter un nouvel élément à la liste
			content += "<button onclick='" + fonctionAddClick + "(" + (paramsAddClick != null ? '"' + paramsAddClick + '"' : "") + ");'>" + nameAddClick + "</button>";
		}
		for(let key in iterable) { //Affiche les éléments de la liste
			let obj = iterable[key];
			content += "<button onclick='" + fonctionItemClick + "(\"" + obj.getId() + "\");'>" + obj + "</button>";
		}
		lt.innerHTML = content;
	}

	drawForm(formName, iterable, fonctionSubmit) {
		const fs = this.getAppSpace(true);
		if(fs == null) return;
		let content = "<h3>" + formName + "</h3>";
		for(let key in iterable) {
			let obj = iterable[key];
			let options = obj.options;
			if(options != null) {
				content += "<label for='" + obj.id + "'>" + obj.label + " : </label><select id='" + obj.id + "'>";
				for(let optKey in options) {
					let option = options[optKey];
					let selected = option.hasOwnProperty('selected') ? 'selected' : '';
					content += "<option value='" + option.value + "'" + selected + ">" + option.name + "</option>";
				}
				content += "</select>";
			}
		}
		content += "<br><button onclick='" + fonctionSubmit + "();'>Ajouter</button>";
		fs.innerHTML = content;
	}

	getAppSpace(free = false) {
		const as = document.getElementById("appSpace");
		if(as == null) {
			toLog("#appSpace n'est pas disponible");
			return null;
		}
		if(free) as.innerHTML = "";
		return as;
	}
}