class Fleche {
	valeur = -8;
	heure = 0;
	#volee;

	static valeursFleche = [
		{ name : 'Non tirée', value : '-8' },
		{ name : '10+', value : '11' },
		{ name : '10', value : '10' },
		{ name : '9', value : '9' },
		{ name : '8', value : '8' },
		{ name : '7', value : '7' },
		{ name : '6', value : '6' },
		{ name : '5', value : '5' },
		{ name : '4', value : '4' },
		{ name : '3', value : '3' },
		{ name : '2', value : '2' },
		{ name : '1', value : '1' },
		{ name : '0 - Paille', value : '0' },
		{ name : '0 - Perdue', value : '-1' }
	]


	static heureFleche = [
		{ name : '1 - NNE', value : '1' },
		{ name : '2 - ENE', value : '2' },
		{ name : '3 - E', value : '3' },
		{ name : '4 - ESE', value : '4' },
		{ name : '5 - SSE', value : '5' },
		{ name : '6 - S', value : '6' },
		{ name : '7 - SSO', value : '7' },
		{ name : '8 - OSO', value : '8' },
		{ name : '9 - O', value : '9' },
		{ name : '10 - ONO', value : '10' },
		{ name : '11 - NNO', value : '11' },
		{ name : '12 - N', value : '12' }
	]

	constructor(volee, valeur) {
		this.#volee = volee;
		this.valeur = valeur;
		this.heure = 0;
	}
	setHeure(heure) {
		if(heure > 0 && heure < 13) {
			this.heure = heure;
		}
	}
	getVolee() {
		return this.#volee;
	}
	
	getScore() {
		let value = (this.valeur == '10+' ? 10 : parseInt(this.valeur));
		value = (isNaN(value) ? 0 : value);
		toLog("get Score flèche " + value);
		return new Score(0, 1, (value < 0 ? 0 : value));
	}



	getHeureAsText() {
		if(this.valeur > 8 || this.valeur < 1) return "";
		let retour = "";
		let value = this.getDecalage(true);
		if(value < -2) retour += " - trop basse (" + value + ")";
		if(value > 2) retour += " - trop haute (" + value + ")";
		value = this.getDecalage();
		if(value < -2)retour += " - trop à gauche (" + value + ")";
		if(value > 2) retour += " - trop à droite (" + value + ")";
		return retour;
	}

	getDistance() {
		if(this.valeur < 1) return 0; //pour le moment annule le décalage
		return 10 - this.valeur;
	}

	checkHeureValue() { return (this.heure < 13 && this.heure > 0); }
	
	convertHeureAsRad() {
		if(!this.checkHeureValue()) return null;
		return Math.PI * ((this.heure > 3) ? 360 - (this.heure - 3) * 30 : 30 * (3 - this.heure)) / 180;
	}

	getDecalage(vertical) {
		let degres = this.convertHeureAsRad();
		if(degres == null) return 0;
		return this.getDistance() * Math.round(10 * (vertical ? Math.sin(degres) : Math.cos(degres))) / 10;
	}

	toString() {
		if(this.valeur > 10) return "10+";
		let value = parseInt(this.valeur);
		if(isNaN(value) || value < 1) return "0 - paille";
		return value + " " + this.getHeureAsText();
	}
}