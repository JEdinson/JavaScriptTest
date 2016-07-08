$(document).ready(function () {
	var sopa = $("#selectTable");
	
	var letras = ["A", "Ñ", "I", "L" ,"E", "S", "A", "R", "E", "N" , "M" , "M", "A" ,"I" ,"P" , "E","S", "R","O", "D", "A", "R" , "O",  "L","O","C" ,"A","R", "O", "G", "R","A" ,"N" ,"A", "T","E","R" ,"C" ,"E" ,"R","I","L","E","D","R","A" ,"N" ,"N" , "Ñ" , "U" , "L" , "R" , "O" , "C","M" ,"A" ,"T" , "Z" , "O" , "E" , "L" , "J" , "O","I" ,"L" ,"A" , "I" , "V" , "A" , "S" , "O" , "R","L" ,"B" ,"V" , "A" , "N" , "E" ,"G" ,"R" ,"O"];
	
	var colores = ["amarillo", "añil", "azul", "blanco", "colorado", "magenta", "granate", "gris", "lila", "marrón", "negro", "ocre", "rojo", "rosa", "sepia", "verde ", "violeta"];
	
	for(var i = 0; i< letras.length; i++){
		var letra = $("<li>");
		letra.text(letras[i]).addClass("ui-widget-content");
		sopa.append(letra)
	}
		
	for (var i = 0; i < colores.length; i++) {
        var letra = $("<li>");
        letra.text(colores[i]);
        $("#colores").append(letra);
    }
	
	sopa.selectable();
});