class Fieldset {
	name;
	inputs;

	constructor(name) {
		this.name = name;
		this.inputs = [];
	}

	addInput(input) {
		this.inputs.push(input);
	}

	render() {
		let content = "<div class='fieldset'><span class='title'>" + this.name + "</span> -";
		for(const input of fieldset.inputs) {
			content += input.render();
		}
		return content + "<div>";
	}

	
}