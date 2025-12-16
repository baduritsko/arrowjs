class DataManager {
	#seances;


	constructor() {
		this.seances = [];

	}

	addSeance(seance) {
		toLog(seance.constructor.name);
		if(!(seance instanceof Seance)) return;
		this.seances.push(seance);
	}

	getSeances() {
		return this.seances;
	}

	getSeance(idSeance) {
		for(let key in this.seances) {
			const seance = this.seances[key];
			if(seance.getId() == idSeance) return seance;
		}
		return null;
	}

	getVolee(idVolee) {
		for(let key in this.seances) {
			const volee = this.seances[key].getVolee(idVolee);
			if(volee != null) return volee;
		}
		return null;
	}

	saveLocalStorage() {
		localStorage.setItem('data_arrow_js', JSON.stringify(this));
	}

	static loadLocalStorage() {
		const data = JSON.parse(localStorage.getItem('data_arrow_js'));
		return 

	}



}