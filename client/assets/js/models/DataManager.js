class DataManager {
	seances;
	static #restauring = false;
	static #instance;


	constructor() {
		this.seances = [];
	}

	static getInstance() {
		if(DataManager.#instance == null) DataManager.#instance = new DataManager();
		return DataManager.#instance;
	}

	addSeance(seance) {
		toLog(seance.constructor.name);
		if(!(seance instanceof Seance)) return;
		this.seances.push(seance);
		this.saveLocalStorage();
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

	deleteSeance(idSeance) {
		this.seances = this.seances.filter(seance => seance.getId() !== idSeance);
		this.saveLocalStorage();
	}

	deleteVolee(idSeance, idVolee) {
		const seance = this.getSeance(idSeance);
		if(seance == null) return;
		seance.deleteVolee(idVolee);
	}

	saveLocalStorage() {
		toLog("saving...");
		if(DataManager.#restauring) {
			toLog("saving skiped");
			return;
		}
		localStorage.setItem('data_arrow_js', JSON.stringify(this));
		toLog("saved");
	}

	static loadLocalStorage() {
		toLog("restauring data from local storage...");
		const data = JSON.parse(localStorage.getItem('data_arrow_js'));
		let datamgr = new DataManager();
		if(data == null) {
			toLog("local file not found");
		}
		else {
			try {
				DataManager.#restauring = true;
				toLog(data);
				// Restaurer chaque séance
				if(data.seances && Array.isArray(data.seances)) {
					datamgr.seances = data.seances.map(seanceData => {
						// Créer une instance de Seance avec toutes les données
						const seance = new Seance(
							seanceData.date,
							seanceData.distance,
							seanceData.blason,
							seanceData.idSeance,
							seanceData.compteurVolees
						);
						// Restaurer les volées
						if(seanceData.volees && Array.isArray(seanceData.volees)) {
							seance.volees = seanceData.volees.map(voleeData => {
								// Créer une instance de Volee avec l'heure originale
								const volee = new Volee(
									seance,
									voleeData.ordreVolee,
									voleeData.idVolee,
									voleeData.heure
								);
								
								// Restaurer les flèches
								if(voleeData.fleches && Array.isArray(voleeData.fleches)) {
									volee.fleches = voleeData.fleches.map(flecheData => {
										return new Fleche(volee, flecheData.valeur);
									});
								}
								return volee;
							});
						}
						return seance;
					});
				}
				toLog("local data restaured");
			}
			catch(error) {
				toLog("issue while restauring local data");
				datamgr = new DataManager();
			}
		}
		DataManager.#restauring = false;
		DataManager.#instance = datamgr;
		return datamgr;
	}
}