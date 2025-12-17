function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
  const day = String(date.getDate()).padStart(2, '0');
  return year + '-' + month + '-' + day;
}
function formatFrenchDate(value) {
	return value.substring(8, 10) + "/" + value.substring(5, 7) + "/" + value.substring(0, 4);
}
function toLog(texte) {
	console.log(texte);
}
function conjugue(value, singulier, pluriel, addValue = false) {
	return (addValue ? value + " " : "") + ((value > -2 && value < 2) ? singulier : pluriel);
}