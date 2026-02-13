class Volee {
	idVolee;
	ordreVolee;
	#seance;
	heure;
	fleches;

	constructor(seance, ordreVolee, idVolee = null, heure = null) {
		this.idVolee = (idVolee == null) ? this.idVolee = crypto.randomUUID() : idVolee;
		this.#seance = seance;
		this.ordreVolee = ordreVolee;
		if(heure == null) {
			const now = new Date(Date.now());
			this.heure = now.getHours() + ":" + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes());
		}
		else this.heure = heure;
		this.fleches = [];
	}
	
	getId() { return this.idVolee; }
	getSeance() { return this.#seance; }
	getFleches() { return this.fleches; }

	
	toString(longString = false, withDecalage = false) {
		let retour;
		retour =  this.ordreVolee + " - Volée à " + this.heure;
		if(longString) {
			const score = this.getScore();
			if(score.hasValue()) { //au moins une flèche
				retour = this.ordreVolee +  " - Volée de " + score.getNombreFleches(true) +  " à " + this.heure;
				retour += "<br>Total : " + score.getTotal(true) + ", moyenne : " + score.getMoyenne();
				if(withDecalage) {
					retour += "<br>Moyenne décalage " + this.getHeureAsText();
				}
			}
		}
		return retour;
	}

	getHeureAsText() {
		const valueX = this.getDecalage(false);
		const valueY = this.getDecalage(true);
		if(Math.abs(valueY) <= 0.9 && Math.abs(valueX) <= 0.9) return "";

		let retour = "<br>Moyenne décalage : ";
		if(valueY < -0.9) retour += "trop basse (" + valueY + ") ";
		if(valueY > 0.9) retour += "trop haute (" + valueY + ") ";

		if(valueX < -0.9)retour += "trop à gauche (" + valueX + ")";
		if(valueX > 0.9) retour += "trop à droite (" + valueX + ")";
		return retour;
	}

	getDecalage(vertical) {
		let decalageTotal = 0;
		let nbFleches = 0;
		for(const fleche of this.fleches) {
			decalageTotal += fleche.getDecalage(vertical);
			nbFleches++;
		}
		return Math.round(10 * decalageTotal / nbFleches) / 10;
	}

	addFleche(fleche) {
		this.fleches.push(fleche);
		return fleche;
	}


	getScore() {
		const score = new Score(1);
		for(const fleche of this.fleches) {
			score.addFleche(fleche);
		}
		return score;
	}

	/**
	 * Retourne un boléen qui indique si une volée à au moins un flèche tirée
	 * @param {*} onTrue - la valeur à retourner si vrai (true par défaut)
	 * @param {*} onFalse - la valeur à retourner si faux (false par défaut)
	 * @returns - un booléen qui indique si une volée à au moins un flèche tirée
	 */
	hasValue(onTrue = true, onFalse = false) { 
		return (this.getScore().hasValue() ? onTrue : onFalse);
	}
}