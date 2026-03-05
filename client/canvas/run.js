function getContextFromCanvas() {
	let cnv = getCanvasFromDocument();
	if(cnv != null) return cnv.getContext("2d") || null;
}
function getCanvasFromDocument() {
	return document.getElementById("cnv") || null;
}
const cnvWidth = 600;
const cnvHeight = 600;
const twoPI = Math.PI * 2;

const cnv = document.getElementById("cnv");
cnv.width = cnvWidth;
cnv.height = cnvHeight;

var arrowNumber = 1;

class ArrowCoordinates {
	#x;
	#y;
	#value;
	#valueColor;

	constructor(x, y) {
		this.#x = x;
		this.#y = y;
		this.#calculate();
	}
	
	#calculate() {
		let distance = Math.sqrt(Math.pow(this.#x, 2) + Math.pow(this.#y, 2)); //calculates the distance from (0,0)
		this.#value = 10 - Math.floor(distance / 25); //calculates the value as an integer
		if(this.#value < 0) this.#value = 0; //the value is outside the target
		if(distance < 11) this.#valueColor = "10+";
		else if(this.#value === 0) this.#valueColor = "0 - Paille";
		else this.#valueColor = String(this.#value);
	}

	getX() { return this.#x; }
	getY() { return this.#y; }
	getValue() { return this.#value; }
	getValueColor() { return this.#valueColor; }

	getPositionInCanvasWithOffset(xOffset = 300, yOffset = 300) {
		return {
			x: xOffset + this.#x,
			y: yOffset - this.#y
		}
	}
}

function drawTargetInCanvas(levelSelected = -1) {
	const ctx = getContextFromCanvas();

	const circle = (ctx, radius, varColor, selectedRadius) => {
		ctx.beginPath();
		ctx.arc(300, 300, radius, 0, twoPI);
		ctx.closePath();
		if(selectedRadius === radius) ctx.fillStyle = "purple";
		else ctx.fillStyle = window.getComputedStyle(document.body).getPropertyValue(varColor);
		ctx.fill();
	};
	levelSelected = 225 - (levelSelected * 25);

	circle(ctx, 200, "--noir", levelSelected);
	circle(ctx, 175, "--noir", levelSelected);
	circle(ctx, 150, "--bleu", levelSelected);
	circle(ctx, 125, "--bleu", levelSelected);
	circle(ctx, 100, "--rouge", levelSelected);
	circle(ctx, 75, "--rouge", levelSelected);
	circle(ctx, 50, "--jaune", levelSelected);
	circle(ctx, 25, "--jaune", levelSelected);

	for(let i = 250; i >0; i -= 25) {
		if(i === 200 || i ===175) ctx.strokeStyle = "white";
		else ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.arc(300, 300, i, 0, twoPI);
		ctx.stroke();
	}
	ctx.beginPath();
	ctx.arc(300, 300, 10, 0, twoPI);
	ctx.stroke();

}
function getMouseCoordinatesInTargetFromEvent(event, xOffset = -300, yOffset = -300) {
	//xOffset and yOffset are integers that represents the center of the target in a canvas
	return new ArrowCoordinates(event.offsetX + xOffset, -(event.offsetY + yOffset));
}
document.getElementById("cnv").addEventListener('mousemove', (event) => {
	const texte = document.getElementById("position");
	const coord = getMouseCoordinatesInTargetFromEvent(event);
	texte.innerHTML = "Souris en [" + coord.getX() + ", " + coord.getY() + "] : " + coord.getValueColor();
});

function drawArrowAtCoordinates(coord) {
	let ctx = getContextFromCanvas();
	if(ctx != null) {
		ctx.save();
		ctx.translate(coord.getPositionInCanvasWithOffset().x, coord.getPositionInCanvasWithOffset().y);
		ctx.strokeStyle = "lime";
		ctx.fillStyle = "lime"
		ctx.lineWidth = 3;
		ctx.save();
		ctx.translate(18, -18);
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(12, -24);
		ctx.lineTo(24, -12);
		ctx.lineTo(0, -0);
		ctx.fill();
		ctx.restore();
		ctx.save();
		ctx.beginPath();
		ctx.arc(0, 0, 3, 0, twoPI);
		ctx.closePath();
		ctx.fillStyle = "grey";
		ctx.fill();
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(40, -40);
		ctx.stroke();
		ctx.restore();
		ctx.restore();
		ctx.fillStyle = "lime";     // couleur du texte
		ctx.font = "24px Arial";     // police et taille
		ctx.textAlign = "left";      // left | center | right
		ctx.textBaseline = "middle";    // top | middle | bottom | alphabetic

		ctx.fillText(arrowNumber++, coord.getPositionInCanvasWithOffset().x + 30, coord.getPositionInCanvasWithOffset().y - 8);
		
	}

}

getCanvasFromDocument().addEventListener("click", (event) => {
	drawArrowAtCoordinates(getMouseCoordinatesInTargetFromEvent(event));
	/*const coord = getMouseCoordinatesInTargetFromEvent(event);
	let ctx = getContextFromCanvas();
	if(ctx != null) {
		ctx.save();
		ctx.translate(coord.getPositionInCanvasWithOffset().x, coord.getPositionInCanvasWithOffset().y);
		ctx.beginPath();
		ctx.arc(0, 0, 10, 0, twoPI);
		ctx.closePath();
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.strokeStyle = "blue";
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0, -10);
		ctx.lineTo(0, 10);
		ctx.stroke();
		ctx.restore();
		ctx.beginPath();
		ctx.moveTo(10, 0);
		ctx.lineTo(-10, 0);
		ctx.stroke();
		ctx.restore();
	}
	*/
});

drawTargetInCanvas();
