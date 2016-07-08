$(document).ready(function () {
    var baraja = [];
    var i = 0;
    for (i; i < 52; i++) {
        baraja.push(0)
    }
    i = 0;
    while (i<52) {
        indice = Math.floor((Math.random() * 52));
        if (baraja[indice]==0) {
            baraja[indice] = i;
            i++;
        }
    }
    i = 0;
    var cartas = $("#Baraja");
    var repartir=6;
    var indiceCol=1;
    for (i; i < baraja.length; i++) {
        var carta = $("<li>");
        carta.attr("id", ("C" + baraja[i]));
        if (i < 29) {
            var columna = $("#Columna" + indiceCol);            
            columna.append(carta);
            if (indiceCol % 7 == 0) {
                indiceCol = indiceCol - repartir;
                repartir--;
            }
            indiceCol++;
        }
        else {            
            cartas.append(carta);
        }
    }
    //$("#Baraja li:nth-last-child(-n+3)").css("margin-right", "-73px");

    $("ul").sortable({
        connectWith: "ul"
    }).disableSelection();
});