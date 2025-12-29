class Seance {
	idSeance;
	volees;
	date;
	distance;
	blason;
	compteurVolees;

	constructor(date, distance, blason, idSeance = null, compteurVolees = 1) {
		this.idSeance = (idSeance == null) ? this.idSeance = crypto.randomUUID() : idSeance;
		this.date = date;
		this.distance = distance;
		this.blason = blason;
		this.volees = [];
		this.compteurVolees = compteurVolees;
	}

	toString(longString = false) {
		let retour = "Séance du " + formatFrenchDate(this.date) + " à " + this.distance + " m sur blason de " + this.blason + " cm";
		if(longString) {
			let scoreSeance = this.getValue();
			if(scoreSeance[0] > 0) {
				retour += "<br>" + conjugue(scoreSeance[3], 'volée', 'volées', true) + " - " + conjugue(scoreSeance[0], 'flèche', 'flèches', true)
				retour += "<br>Total : " + scoreSeance[1] + ", moyenne : " + scoreSeance[2];
			}
		}
		return retour;
	}
	getValue() { //retourne nbFleches, total, moyenne, nbVolees
		let total = 0, nbFleches = 0, nbVolees = 0;
		for(let key in this.volees) {
			const scoreVolee = this.volees[key].getValue();
			if(scoreVolee[0] > 0) {
				nbFleches += scoreVolee[0];
				total += scoreVolee[1];
				nbVolees++;
			}
		}
		if(nbFleches == 0 || nbVolees == 0) return [0, 0, 0, 0];
		return [nbFleches, total, Math.round(10 * total / nbFleches) / 10, nbVolees];
	}
	getId() {
		return this.idSeance;
	}
	getVolees() {
		return this.volees;
	}
	getVolee(idVolee) {
		for(let key in this.volees) {
			const volee = this.volees[key];
			if(volee.getId() == idVolee) return volee;
		}
		return null;
	}
	addVolee() {
		const volee = new Volee(this, this.compteurVolees++);
		this.volees.push(volee);
		DataManager.getInstance().saveLocalStorage();
		return volee;
	}
	deleteVolee(idVolee) {
		for(let key in this.volees) {
			const volee = this.volees[key];
			if(volee.getId() == idVolee) {
				delete this.volees[key];
			}
		}
	}

	static checkBlason(value) {
		toLog("checking blason with value " + value)
		return ['tri', '122', '80', '60', '40'].includes(value);
	}

	static checkDistance(value) {
		toLog("checking distance with value " + value)
		return ['10', '15', '18', '30', '50', '70'].includes(value);
	}

}