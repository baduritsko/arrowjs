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

	toString() {
		return "Séance du " + formatFrenchDate(this.date) + " à " + this.distance + " m sur blason de " + this.blason + " cm";
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

	static checkBlason(value) {
		toLog("checking blason with value " + value)
		return ['tri', '122', '80', '60', '40'].includes(value);
	}

	static checkDistance(value) {
		toLog("checking distance with value " + value)
		return ['10', '15', '18', '30', '50', '70'].includes(value);
	}

}