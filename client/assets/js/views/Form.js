class Form {
	title; //a String that represents the title of a form 
	action; //a String that reprensents the method to performs on click
	fieldsets; //an array of fieldsets elements that contains inputs (with render method)

	constructor(title, action) {
		this.title = title;
		this.action = action;
		this.fieldsets = [];
	}

	addFieldset(fieldset) {
		this.fieldsets.push(fieldset);
	}

	render() {
		let content = "<h3>" + this.title + "</h3>";
		for(const fieldset of this.fieldsets) {
			content += fieldset.render();
		}
		return content + "<button class='full-width' onclick='" + this.action + "'>Ajouter</button>";
	}
}