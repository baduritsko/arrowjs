class Main {
	#selectedSeance;
	#selectedVolee;
	#htmlRenderer;
	#dataManager;

	constructor() {
		toLog("new instance of Main");
		this.#htmlRenderer = new Afficheur();
		if(this.#htmlRenderer == null) toLog("html renderer is not available");
		this.loadData();
		if(this.#dataManager == null) toLog("data manager is not available");
	}


	/**
	 * GENERAL PURPOSE METHODS
	 */

	loadData() {
		this.#dataManager = DataManager.loadLocalStorage();
	}
	saveData() {
		this.#dataManager.saveLocalStorage();
	}


	reset() {
		this.#selectedSeance = null;
		this.#selectedVolee = null;
	}

	getHtmlRenderer() { return this.#htmlRenderer; }
	getDataManager() { return this.#dataManager; }
	

	/**
	 * Returns the current seance
	 * @param {boolean} alternativeReturn - if true, returns the UUID of the object or empty String
	 * @returns - returns UUID or object
	 */
	getSelectedSeance(alternativeReturn = false) {
		if(this.#selectedSeance == null) {
			return (alternativeReturn ? "" : null);
		}
		return (alternativeReturn ? this.#selectedSeance.getId() : this.#selectedSeance);
	}

	/**
	 * Returns the current volee, if the current seance is OK
	 * @param {*} alternativeReturn - if true, returns the UUID of the object or empty String
	 * @returns - returns UUID or object
	 */
	getSelectedVolee(alternativeReturn = false) {
		if(this.#selectedSeance == null || this.#selectedVolee == null) {
			return (alternativeReturn ? "" : null);
		}
		return (alternativeReturn ? this.#selectedVolee.getId() : this.#selectedVolee);
	}

	/**
	 * Set a seance has the current one and reset the value of selectedVolee
	 * @param {*} seance - an instance of Seance or a Seance's UUID
	 * @returns - no returned value
	 */
	setSeance(seance) { //should set an instance of Seance in attribut even if the first param is an UUID
		this.#selectedVolee = null;
		if(seance instanceof Seance) {
			this.#selectedSeance = seance;
			return;
		}
		this.#selectedSeance = (seance == null ? null : this.#dataManager.getSeance(seance));
	}

	/**
	 * Set a volee has the current one if a seance is already selected and contains this volee
	 * @param {*} volee - an instance of Volee ou a Volee's UUID
	 * @returns - not returned value
	 */
	setVolee(volee) {
		this.#selectedVolee = null;
		if(this.#selectedSeance == null) return;
		this.#selectedVolee = (volee == null ? null : this.#selectedSeance.getVolee(volee));
	}

	/**
	 * 
	 */

}