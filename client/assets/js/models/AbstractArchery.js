class AbstractArchery {
	id;

	getScore() { this.#notImplementedMethod("getScore()");	}
	toString() { this.#notImplementedMethod("toString()");	}
	getDecalage(vertical)  { this.#notImplementedMethod("getDecalage()"); }
	getHeureAsText() { this.#notImplementedMethod("getHeureAsText()"); }



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

	getId() { return this.id; }

	#notImplementedMethod(method) {
		toLog("The method " + method + " must be implemented");
	}
}