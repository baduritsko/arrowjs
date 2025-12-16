class Volee {
	idVolee;
	#seance;
	heure;
	fleches;

	constructor(seance, idVolee , heure = null) {
		this.#seance = seance;
		this.idVolee = idVolee;
		if(heure == null) {
			const now = new Date(Date.now());
			this.heure = now.getHours() + ":" + (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes());
		}
		else this.heure = heure;
		this.fleches = [];
	}
	
	getId() {
		return this.idVolee;
	}
	getSeance() {
		return this.#seance;
	}
	toString() {
		return this.idVolee + " - " + "Volée à " + this.heure;
	}

}