class Afficheur {
	drawAppMenu() {
		let content, seance, volee;
		const am = document.getElementById("appMenu");
		if(am === null) {
			toLog("#appMenu n'est pas disponible");
			return null;
		}
		content = "<button onclick='getAccueil();'>Accueil</button>";

		seance = main.getSelectedSeance();
		volee = main.getSelectedVolee();
		if(seance != null) {
			if(volee != null) {
				content += "<button onclick='displayListeVolees(\"" + seance.getId() + "\");'>Retour à la séance</button>";
				content += "<br><h3>" + volee.toString(true) + "</h3>";
				content += "<div id='deleteSpace'><button onclick='showDeleteVolee();'>Supprimer cette volée</button></div>";
			}
			else {
				content += "<br><h3>" + seance.toString(true) + "</h3>";
				content += "<div id='deleteSpace'><button onclick='showDeleteSeance();'>Supprimer cette séance</button></div>";
			}
		}
		am.innerHTML = content;
	}

	drawListe(title, iterable, displayItemFn, refreshMenu, sortingSelectData = null, addButtonData = null) {
		this.drawAppMenu();
		const lt = this.getAppSpace(true);
		if(lt == null) return;
		let content = "<h3>" + title + "</h3>";
		if(sortingSelectData != null) {
			content += "<span class='button-like'><label for='sortingSelect'>Critères : </label><select id='sortingSelect' onchange='" + sortingSelectData.functionName + "(" + sortingSelectData.paramsList + ");'>";
			const filterValue = sortingSelectData.filterValue;
			for(let option of sortingSelectData.optionsList) {
				content += "<option value='" + option.value + "'" + (filterValue == option.value ? " selected" : "") + ">" + option.name + "</option>";
			}
			content += "</select></span>";
		}
		if(addButtonData != null && addButtonData.functionName != "") {
			content += "<button onclick='" + addButtonData.functionName + "(" + addButtonData.paramsList + ");'>" + addButtonData.buttonName + "</button>";
		}
		if(sortingSelectData != null || addButtonData != null) content += "<br>";
		for(let obj of iterable) { 
			if(obj == null) continue;
			content += displayItemFn(obj);
		}
		lt.innerHTML = content;
	}


	drawFullForm(form, valueOnEdit = null) {
		const fs = this.getAppSpace(true);
		if(fs == null) return;
		fs.innerHTML = form.render();
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