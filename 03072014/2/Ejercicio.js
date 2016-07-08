$(document).ready(function () {
	miClase.asignarEventos();
	miClase.aplicarEstilo();
});

miClase = {	
	asignarEventos:  function () {
		//$("#btnCargar").click(miClase.cargarJSON);
		$("#btnCargar").bind("click", miClase.cargarJSON);
		
		$("#btnQuitarEvento").click(function() {
			$("#btnCargar").unbind("click");
		});
	},

	aplicarEstilo: function() {
		//$("#txtPrimerNombre").addClass("cajatexto");
		//$("input[value='Primer nombre']").addClass("cajatexto");
		//$("input[value!='Primer nombre']").addClass("cajatexto");
		//$("input[id^='txt']").addClass("cajatexto");
		//$("input[id*='llido']").addClass("cajatexto");
		//$("input[id$='ombre']").addClass("cajatexto");
		//$("button").addClass("cajatexto");
		//$(".etiqueta").addClass("cajatexto");
		//$("button,select").addClass("cajatexto");
		//$("input[id^='txt']input[value*='Primer']").addClass("cajatexto");
		
		//$("table input:first").addClass("cajatexto");
		//$("table input:first-child").addClass("cajatexto");
		//$("table input[type='text']:last").addClass("cajatexto");
		//$("table input:nth-child(1)").addClass("cajatexto");
		//$("ul > li").addClass("cajatexto");
		//$("ul > li.etiqueta").addClass("cajatexto");
		
		//$("ul > li").removeClass("etiqueta");
		
		//$("#txtPrimerNombre").css("color", "#0099ff").addClass("letraverdana");
		//$("#txtPrimerNombre").css({color": "#0099ff", text-align": "right"});
		
		//$("#imgFoto").width("200px");
		//$("#imgFoto").height("200px");
	},
	
	cargarJSON: function() {
		$.getJSON("http://localhost/Ejercicio/JS/2/data.json", function (data) {
			miClase.construirContenido(data.personajes);
        });
		
		/*$.ajax({
            type: "GET",
            async: false,
            url: "http://cltechcladron/Ejercicio/JS/data.json?callback=?",
            dataType: "jsonp",
			jsonpCallback: "jsonCallback",
            contentType: "application/json; charset=utf-8"
        })*/
		
		$.ajax({
            type: "GET",
            async: false,
            url: "http://192.168.1.112/Ejercicio/JS/2/data.json?callback=?",
            dataType: "json",			
            contentType: "application/json; charset=utf-8"
        })
        .done(function (data, textStatus, jqXHR) {
			miClase.construirContenido(data.personajes);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown +  " error");
        });
	},
	
	construirContenido: function (datos){
		$.each(datos, function(i, item) {
			var fila = $("<tr>").attr("data-idpersonaje", item.IDPersonaje);
			var celda1 = $("<td>").html(item.PrimerNombre).appendTo(fila);
			var celda2 = $("<td>").html(item.SegundoNombre).appendTo(fila);
			var celda3 = $("<td>").html(item.Apellido).appendTo(fila);
			var celda4 = $("<td>").html(item.Ciudad).appendTo(fila);
			var celda5 = $("<td>").html(item.Genero).appendTo(fila);
			var celda6 = $("<td>").html(item.Estado).appendTo(fila);
			$("#tblDatoContenido").append(fila);
		});
	}
	
}