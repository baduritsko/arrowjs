class Select {
	id;
	label;
	options;
	valueOnEdit = null;

	constructor(id, label, options) {
		this.id = id;
		this.label = label;
		this.options = options;
	}

	render() {
		let retour = "<label for='" + this.id + "'>" + this.label + " : </label>";
		retour += "<select id='" + this.id + "'>";
		for(const option of this.options) {
			let selected = option.hasOwnProperty('selected') ? 'selected' : '';
			if(this.valueOnEdit != null) {
				if(this.valueOnEdit == option.value) { selected = 'selected'; }
			}
			retour.join("<option value='" + option.value + "'" + selected + ">" + option.name + "</option>");
		}
		retour += "</select>";
		return retour;
	} 
}