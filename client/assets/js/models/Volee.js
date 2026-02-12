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



	
	toString(longString = false) {
		let retour;
		retour =  "Volée à " + this.heure;
		if(longString) {
			const values = this.getValue();
			if(values[0] > 0) { //au moins une flèche
				retour = "Volée de " + conjugue(values[0], 'flèche', 'flèches', true) +  " à " + this.heure;
				retour += "<br>Total : " + values[1] + ", moyenne : " + values[2];
			}
		}
		return retour;
	}
	addFleche(fleche) {
		this.fleches.push(fleche);
		return fleche;
	}


	/**
	 * Retourne les valeurs d'une volée
	 * @returns - un tableau avec le nombre de flèches de la volée, le total des points, la moyenne et le nombre de volées (à 1)
	 */

	getValue() { //retourne nbFleches, total, moyenne, nbVolees
		let total = 0, nbFleches = 0;
		for(const fleche of this.fleches) {
			total += fleche.getValue()[1];
			nbFleches++;
		}
		if(nbFleches == 0) return [0, 0, 0, 0];
		return [nbFleches, total, Math.round(10 * total / nbFleches) / 10, 1];
	}

	/**
	 * Retourne un boléen qui indique 
	 * @param {*} onTrue - la valeur à retourner si vrai (true par défaut)
	 * @param {*} onFalse - la valeur à retourner si faux (false par défaut)
	 * @returns - un booléen qui indique si une volée à au moins un flèche tirée
	 */
	hasValue(onTrue = true, onFalse = false) { 
		return (this.getValue()[0] > 0 ? onTrue : onFalse);
	}
}