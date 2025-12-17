class Afficheur {
	#selectedSeance
	#selectedVolee

	setSeance(seance) {
		this.#selectedSeance = seance;
	}

	setVolee(volee) {
		this.#selectedVolee = volee;
	}
	getVolee(volee) {
		return this.#selectedVolee;
	}

	reset() {
		this.#selectedSeance = null;
		this.#selectedVolee = null;
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
		if(this.#selectedVolee) {
			am.innerHTML += "<button onclick='displayListeVolees(\"" + this.#selectedSeance.getId() + "\");'>Retour à la séance</button>";
			am.innerHTML += "<br><h3>" + this.#selectedVolee + "</h3>";
		}
		else if(this.#selectedSeance) {
			am.innerHTML += "<br><h3>" + this.#selectedSeance + "</h3>";
		}
	}

	drawListe(title, iterable, fonctionItemClick = null, fonctionAddClick = null, nameAddClick = null, paramsAddClick = null) {
		const lt = this.getAppSpace(true);
		if(lt == null) return;
		let content = "<h3>" + title + "</h3>";
		if(fonctionAddClick != null && nameAddClick != null) { //affiche un bouton pour ajouter un nouvel élément à la liste
			content += "<button class='full-width' onclick='" + fonctionAddClick + "(" + (paramsAddClick != null ? '"' + paramsAddClick + '"' : "") + ");'>" + nameAddClick + "</button>";
		}
		for(let key in iterable) { //Affiche les éléments de la liste
			let obj = iterable[key];
			if(fonctionItemClick != null) {
				content += "<button class='full-width' onclick='" + fonctionItemClick(obj) + "(\"" + obj.getId() + "\");'>" + obj + "</button>";
			}
			else content += "<p>Flèche : " + obj.getValue()[1] + "</p>";
		}
		lt.innerHTML = content;
	}

	drawForm(formName, iterable, fonctionSubmit, valueOnEdit = null) {
		const fs = this.getAppSpace(true);
		if(fs == null) return;
		let content = "<h3>" + formName + "</h3>";
		for(let key in iterable) {
			let obj = iterable[key];
			let options = obj.options;
			if(options != null) {
				content += "<div class='button-like'><label for='" + obj.id + "'>" + obj.label + " : </label><select id='" + obj.id + "'>";
				for(let optKey in options) {
					let option = options[optKey];
					let selected = option.hasOwnProperty('selected') ? 'selected' : '';
					if(valueOnEdit != null) {
						if(valueOnEdit == option.value) { selected = 'selected'; }
					}
					content += "<option value='" + option.value + "'" + selected + ">" + option.name + "</option>";
				}
				content += "</select></div>";
			}
		}
		content += "<button class='full-width' onclick='" + fonctionSubmit + "();'>Ajouter</button>";
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