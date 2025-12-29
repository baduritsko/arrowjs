class Afficheur {
	#selectedSeance
	#selectedVolee

	setSeance(seance) {
		this.#selectedSeance = seance;
		this.#selectedVolee = null;
	}

	setVolee(volee) {
		this.#selectedVolee = volee;
	}
	getVolee() {
		return this.#selectedVolee;
	}
	getSeance() {
		return this.#selectedSeance;
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
		let content = "<button onclick='getAccueil();'>Accueil</button>";
		
		if(this.#selectedVolee) {
			content += "<button onclick='displayListeVolees(\"" + this.#selectedSeance.getId() + "\");'>Retour à la séance</button>";
			content += "<br><h3>" + this.#selectedVolee.toString(true) + "</h3>";
			content += "<div id='deleteSpace'><button onclick='showDeleteVolee();'>Supprimer cette volée</button></div>";
		}
		else if(this.#selectedSeance) {
			content += "<br><h3>" + this.#selectedSeance.toString(true) + "</h3>";
			content += "<div id='deleteSpace'><button onclick='showDeleteSeance();'>Supprimer cette séance</button></div>";
		}
		am.innerHTML = content;
	}

	drawListe(title, iterable, displayItemFn, fonctionAddClick = null, nameAddClick = null, paramsAddClick = null) {
		const lt = this.getAppSpace(true);
		if(lt == null) return;
		let content = "<h3>" + title + "</h3>";
		if(fonctionAddClick != null && nameAddClick != null) { //affiche un bouton pour ajouter un nouvel élément à la liste
			content += "<button class='full-width' onclick='" + fonctionAddClick + "(" + (paramsAddClick != null ? '"' + paramsAddClick + '"' : "") + ");'>" + nameAddClick + "</button>";
		}
		for(let key in iterable) { //Affiche les éléments de la liste
			let obj = iterable[key];

			content += displayItemFn(obj);
			/*

			if(displayItemFn != null) {
				content += "<button class='full-width' onclick='" + displayItemFn(obj) + "(\"" + obj.getId() + "\");'>" + obj + "</button>";
			}
			else content += "<p>Flèche : " + obj.getValue()[1] + "</p>";

			*/
			
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