$(document).ready(function () {
	Interfaz.asignarEventos();
	Interfaz.aplicarEstilo();
	Datos.cargarCiudad();
});

Interfaz = {	
	asignarEventos:  function () {
		$("#btnCargar").bind("click", Datos.cargarJSON);
		
		$("input[type='radio'][name='rdEdicion']").change(function () {
			if ($("#rdEnLinea").prop("checked") == true) {
				$("#contenedorControles").animate({ "opacity": "0" }, 1000, function () {
					$(this).hide();
				});
			}
			else { 
				$("#contenedorControles").show().animate({ "opacity":  "1"}, 1000);
			}
		});
	},

	aplicarEstilo: function() {
		$("input[type='text'],select").addClass("cajatexto");			
	}
}

Datos = {
	DatosCargados: [],
	
	cargarCiudad: function() {
		$.ajax({
            type: "GET",
            async: false,
            url: "http://192.168.1.112/Ejercicio/JS/5/ciudadp.json?callback=?",
            dataType: "jsonp",
			jsonpCallback: "jsonCallback",
            contentType: "application/json; charset=utf-8"
        })		
        .done(function (data, textStatus, jqXHR) {
			$.each(data.ciudades, function(i, item) {
				$("<option>").attr("value", item.IDCiudad).html(item.Nombre).appendTo($("#ddlCiudad"));
			});
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown +  " error");
        })
	},

	cargarJSON: function() {
		$.ajax({
            type: "GET",
            async: false,
            url: "http://192.168.1.112/Ejercicio/JS/5/datap.json?callback=?",
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
	
	construirFila:(fila, item){
		var span1 = $("<span>").data({
			"tipoControl": "textbox",
			"campo": "PrimerNombre"
		}).html(item.PrimerNombre);
				
		$("<td>").html(span1).appendTo(fila);
				
		var span2 = $("<span>").data({
			"tipoControl": "textbox",
			"campo": "SegundoNombre"
		}).html(item.SegundoNombre);
	
		$("<td>").html(span2).appendTo(fila);
				
		var span3 = $("<span>").data({
			"tipoControl": "textbox",
			"campo": "Apellido"
		}).html(item.Apellido);
				
		$("<td>").html(span3).appendTo(fila);
				
		var span4= $("<span>").data({
			"tipoControl": "select",
			"campo": "Ciudad"
		}).html(item.Ciudad);
				
		$("<td>").html(span4).appendTo(fila);
				
		var span5= $("<span>").data({
			"tipoControl": "radiobutton",
			"campo": "Genero"
		}).html(item.Genero);
				
		$("<td>").html(span5).appendTo(fila);	
				
		var span6 = $("<span>").data({
			"tipoControl": "checkbox",
			"campo": "Estado"
		}).html(item.Estado);
			
		$("<td>").html(span6).appendTo(fila);
	},
	
	construirContenido: function (datos){
		try
		{
			Datos.DatosCargados = datos;
			$("#tblDatoContenido").empty();
			
			$.each(datos, function(i, item) {
				var fila = $("<tr>").attr("data-idpersonaje", item.IDPersonaje);
			
				var span1 = $("<span>").data({
												"tipoControl": "textbox",
												"campo": "PrimerNombre"
											}).html(item.PrimerNombre);
				
				$("<td>").html(span1).appendTo(fila);
				
				var span2 = $("<span>").data({
												"tipoControl": "textbox",
												"campo": "SegundoNombre"
											}).html(item.SegundoNombre);
	
				$("<td>").html(span2).appendTo(fila);
				
				var span3 = $("<span>").data({
								"tipoControl": "textbox",
								"campo": "Apellido"
							}).html(item.Apellido);
				
				$("<td>").html(span3).appendTo(fila);
				
				var span4= $("<span>").data({
												"tipoControl": "select",
												"campo": "Ciudad"
											}).html(item.Ciudad);
				
				$("<td>").html(span4).appendTo(fila);
				
				var span5= $("<span>").data({
												"tipoControl": "radiobutton",
												"campo": "Genero"
											}).html(item.Genero);
				
				$("<td>").html(span5).appendTo(fila);	
				
				var span6 = $("<span>").data({
								"tipoControl": "checkbox",
								"campo": "Estado"
							}).html(item.Estado);
			
				$("<td>").html(span6).appendTo(fila);
				
				$("#tblDatoContenido").append(fila);
			});
			
			if ($("#rdEnLinea").prop("checked") == true)
				$("#tblDatoContenido").find("tr").click(Datos.editarContenidoEnLinea);
			else
				$("#tblDatoContenido").find("tr").click(Datos.editarContenido);
		}
		catch (e)
		{
			alert(e);
		}
	},
	
	editarContenido: function () {
		var idPersonaje = $(this).data("idpersonaje");
	
		var filtrado = $.grep(Datos.DatosCargados, function (item, i) {
			return item.IDPersonaje == idPersonaje;
		});
	
		$("#txtPrimerNombre").val(filtrado[0].PrimerNombre);
		$("#txtSegundoNombre").val(filtrado[0].SegundoNombre);
		$("#txApellido").val(filtrado[0].Apellido);	
		$("#ddlCiudad").val(filtrado[0].Ciudad);	

		$("#rdMasculino").prop("checked", $("#rdMasculino").val() == filtrado[0].Genero);
		$("#rdFemenino").prop("checked", $("#rdFemenino").val() == filtrado[0].Genero);
		$("#chkEstado").prop("checked", "true" == filtrado[0].Estado);
	},
	
	editarContenidoEnLinea: function () {
		var idPersonaje = $(this).data("idpersonaje");
	
		var filtrado = $.grep(Datos.DatosCargados, function (item, i) {
			return item.IDPersonaje == idPersonaje;
		});
		
		//var controles = $(this).find("span[data-tipoControl='textbox']").replaceWith($("<input>").attr("type", "text"));
		
		$(this).find("span").filter(function (index) {
			return $(this).data("tipoControl") == "textbox";
		})
		.replaceWith(function () { return $("<input>").attr("type", "text").addClass("cajatexto").val(filtrado[0][$(this).data("campo")]); });
		
		$(this).find("span").filter(function (index) {
			return $(this).data("tipoControl") == "select";
		})
		.replaceWith($("#ddlCiudad").clone().val(filtrado[0].Ciudad));
		
		$(this).find("span").filter(function (index) {
			return $(this).data("tipoControl") == "radiobutton";
		})
		.replaceWith(function () { 
			var contenedor = $("#contenedorGenero").clone(); 
			contenedor.find("input[type='radio']").attr("name", "rd" + idPersonaje);
			return contenedor;
		});
		
		$(this).find("span").filter(function (index) {
			return $(this).data("tipoControl") == "checkbox";
		})
		.replaceWith($("#chkEstado").clone().prop("checked", filtrado[0].Estado == "true"));
	},	
	
	filtrarContenido: function () {
	
	},
	
	restaurarContenido: function()
	{
		$("#tblDatoContenido").find("tr[data-idpersonaje!='"+idPersonaje+"']")
		.empty().
		each(function(i,item){
			var fila = $(this).data("idPersonaje");
			var filtradoFila = $.grep(Dato.DatosCargados, function(item, i){
				return item.IDPersonaje == idPersonajeFila;
			});
			Datos.contruirFila(fila, filtradoFila[0]);
		});
	}
	
	guardarDatos:function ()
	{
		var objeto = {};
		objeto.IDPersonaje = null;
		objeto.PrimerNombre = $("#txtPrimerNombre").val();
		objeto.SegundoNombre = $("#txtSegundoNombre").val();
		objeto.Apellido = $("#ddlCiudad").val();
	}
}