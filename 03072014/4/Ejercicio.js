$(document).ready(function () {
	Interfaz.asignarEventos();
	Interfaz.aplicarEstilo();
	Datos.cargarJSON();
});

Interfaz = {	
	asignarEventos:  function () {
		$("#btnCargar").bind("click", Datos.cargarJSON);
	
		$("#btnOcultarControles").click(Interfaz.ocultarControles);
	},

	aplicarEstilo: function() {
		$("input[type='text'],select").addClass("cajatexto");			
	},

	ocultarControles: function () {
		if ($(this).val() == "Ocultar") {
			$("input[id^='txt']").hide();
			$(this).val("Mostrar");
		}
		else {
			$("input[id^='txt']").show();
			$(this).val("Ocultar");
		}
	}
}

Datos = {

	CargarCiudad: function(){
		$.ajax({
            type: "GET",
            async: false,
            url: "http://192.168.1.107/Ejercicio/JS/4/ciudadp.json?callback=?",
            dataType: "jsonp",
			jsonpCallback: "jsonCallback",
            contentType: "application/json; charset=utf-8"
			
			.done(function (data, textStatus, jqXHR) {
			Datos.construirContenido(data.personajes);
			$.each(data.ciudadp,function(i,item)){
			$("<options>").val(item.IDCiudad).html(item.Nombre).appendTo($("$ddlCiudad"))
			}
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown +  " error");
        })
}
	cargarJSON: function() {
		$.ajax({
            type: "GET",
            async: false,
            url: "http://192.168.1.107/Ejercicio/JS/4/datap.json?callback=?",
            dataType: "jsonp",
			jsonpCallback: "jsonCallback",
            contentType: "application/json; charset=utf-8"
        })		
        .done(function (data, textStatus, jqXHR) {
			Datos.construirContenido(data.personajes);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown +  " error");
        })
	},
	
	construirContenido: function (datos){
		try
		{
			$.each(datos, function(i, item) {
				var fila = $("<tr>").attr("data-idpersonaje", item.IDPersonaje);
			
				$("<td>").html(item.PrimerNombre).appendTo(fila);
				$("<td>").html(item.SegundoNombre).appendTo(fila);
				$("<td>").html(item.Apellido).appendTo(fila);
				$("<td>").html(item.Ciudad).appendTo(fila);
				$("<td>").html(item.Genero).appendTo(fila);			
				$("<td>").html(item.Estado).appendTo(fila);
				
				$("#tblDatoContenido").append(fila);
			});
		}
		catch (e)
		{
			alert(e);
		}
	}	
}