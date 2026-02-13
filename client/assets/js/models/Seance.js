class Seance {
	idSeance;
	volees;
	date;
	distance;
	blason;
	compteurVolees;
	concours;

	constructor(date, distance, blason, isConcours, idSeance = null, compteurVolees = 1) {
		this.idSeance = (idSeance == null) ? this.idSeance = crypto.randomUUID() : idSeance;
		this.date = date;
		this.distance = distance;
		this.blason = blason;
		this.volees = [];
		this.compteurVolees = compteurVolees;
		this.concours = isConcours;
	}

	static typeBlasons = [
		{ name : 'trispots', value : 'tri' },
		{ name : '122 cm', value : '122' },
		{ name : '80 cm', value : '80' },
		{ name : '60 cm', value : '60' },
		{ name : '40 cm', value : '40', selected : true}				
	];

	static checkBlason(value) {
		toLog("checking blason with value " + value);
		return this.typeBlasons.some((blason) => blason.value == value);
	}

	static distances = [
		{ name : '30 mètres', value : '30' },
		{ name : '50 mètres', value : '50' },
		{ name : '70 mètres', value : '70' },
		{ name : '10 mètres', value : '10' },
		{ name : '15 mètres', value : '15' },
		{ name : '18 mètres', value : '18', selected : true },
		{ name : '20 mètres', value : '20' }
	];

	static checkDistance(value) {
		toLog("checking distance with value " + value);
		return this.distances.some((distance) => distance.value == value);
	}
	isConcours() {
		return this.concours;
	}

	toString(longString = false) {
		let retour = (this.concours ? "Concours" : "Séance");
		retour += " du " + formatFrenchDate(this.date) + " à " + this.distance + " m sur blason de " + this.blason + " cm";
		if(longString) {
			const score = this.getScore();
			if(score.hasValue()) {
				retour += "<br>" + score.getNombreVolees(true) + " - " + score.getNombreFleches(true);
				retour += "<br>Total : " + score.getTotal(true) + ", moyenne : " + score.getMoyenne();
			}
		}
		return retour;
	}
	getScore() {
		const score = new Score();
		for(const volee of this.volees) {
			score.addVolee(volee);
		}
		return score;
	}

	getId() {
		return this.idSeance;
	}
	getVolees() {
		return this.volees;
	}
	getVolee(idVolee) {
		if(idVolee instanceof Volee) idVolee = idVolee.getId();
		return this.volees.find(volee => volee.getId() === idVolee) || null;
	}
	addVolee() {
		const volee = new Volee(this, this.compteurVolees++);
		this.volees.push(volee);
		DataManager.getInstance().saveLocalStorage();
		return volee;
	}
	deleteVolee(idVolee) {
		for(let i = 0; i < this.volees.length; i++)
		{
			const volee = this.volees[i];
			if(volee == null) continue;
			if(volee.getId() == idVolee) {
				this.volees.splice(i, 1);
				break;
			}
		}
	}
}