function initValidat(){

  $camposCFormato = $('input[idformatocampo]');
	
	$camposCFormato.each(function(){
		var opc = $(this).attr('idformatocampo');
		if(opc == "1"){ //Telefonos
			onlyRealNumbers($(this).attr("id"));
		}else if(opc == "2"){
			onlyNaturalNumbers($(this).attr("id"));
		}else if(opc == "3"){
			onlyAlphabetics($(this).attr('id'));
		}else if(opc == "4"){
     		this.onblur = function(){toLowerCase(this);};
			this.onkeyup = function(){toLowerCase(this);};
		}else if(opc == "6"){
			//CALCULAMOS ANIOS Y MESES
			calculateMonthsToYears($(this).attr('id'), "cmb"+$(this).attr('id')+"Anios", "cmb"+$(this).attr('id')+"Meses");
		}else if(opc == "7"){
			onlyAlphaNumeric($(this).attr('id'));
		}else if(opc == "8"){
			this.onblur = function(){validateEmail($(this).attr('id'));};
			//validateEmail($(this).attr('id'));
		}
		
	});

  var $formElementsRequireds = $(".required");
	
	$formElementsRequireds.each(function(it){
		if($(this).attr("tipoCampo") == 'C' || $(this).attr("tipoCampo") == 'D' || $(this).attr("tipoCampo") == 'F'){
			var mandatoryClass = "a4sys-obligatorio";
			var id = $(this).attr('id');
			var valor = $("#"+id);
			this.onblur = function(){if(Trim(valor.val()) == '-1'){$(this).addClass(mandatoryClass);}else{$(this).removeClass(mandatoryClass);} };
		}
	});

	$("#seccion_e").change(function(){
		if($(this).val()>0){
			$("#municipios").show('slow');
			if($("#municipio_e").val()>0){
				$("#distritos").show('slow');
			}else{
				$("#distritos").hide('slow');
			}
		}else{
			$("#municipios").hide('slow');
			$("#distritos").hide('slow');
		}		
	});
	$("#municipio_e").change(function(){
		if($(this).val()>0){
			$("#distritos").show('slow');
		}else{
			$("#distritos").hide('slow');
		}		
	});

  
  
}

function cambiarEstado() {
	var valEstado = $('#seccion_e').val();
	// GET FORM INPUT
	var data_Estados = new FormData();
	data_Estados.append("valEstado", valEstado);
	// AJAX
	var xhr_dataEstados = new XMLHttpRequest();
	xhr_dataEstados.open("POST", "../js/get_municipios.php", true);
	xhr_dataEstados.onload = function () {
		if (this.status == 200) {
			var res_listaMunicipios = JSON.parse(this.response);
			if (res_listaMunicipios.status == true) {
				setTimeout(function () {
					document.getElementById("municipio_e").innerHTML = res_listaMunicipios["listaMunicipios"];
					var valMunicipio = $('#municipio_e').val();
					//alert("VALOR Municipio: " + valMunicipio );
					if(valMunicipio==0){
						document.getElementById("seccion_c").value = '';
						document.getElementById("distritos_e").innerHTML = '';
					}else{
						//$("#distritos").hide('slow');
					}
				}, 200);
			} else {
				alert("ERROR DE CARGA DE DATOS");
			}
		} else {
			alert("ERROR AL CARGAR ARCHIVO PHP, VALOR " + valEstado );
		}
	};
	xhr_dataEstados.send(data_Estados);
}

function buscarSeccion() {
	var valEstado = $('#seccion_e').val();
	var seccion_c = $('#seccion_c').val();
	if (valEstado==0) {
		alert("Debes seleccionar previamente el Estado.");
	}else{
		// GET FORM INPUT
		var data_Seccion = new FormData();
		data_Seccion.append("valEstado", valEstado);
		data_Seccion.append("seccion_c", seccion_c);
		// AJAX
		var xhr_dataSeccion = new XMLHttpRequest();
		xhr_dataSeccion.open("POST", "../js/get_seccion.php", true);
		xhr_dataSeccion.onload = function () {
			if (this.status == 200) {
				var res_searchSeccion = JSON.parse(this.response);
				if (res_searchSeccion.status == true) {
					setTimeout(function () {
						$("#municipios").show('slow');
						$("#distritos").show('slow');
						document.getElementById("municipio_e").innerHTML = res_searchSeccion["listaMunicipios"];
						document.getElementById("distritos_e").innerHTML = res_searchSeccion["dtoseleccionado"];
					}, 200);
				} else {
					alert("ERROR DE CARGA DE DATOS");
				}
			} else {
				alert("ERROR AL CARGAR ARCHIVO PHP, VALOR " + seccion_c );
			}
		};
		xhr_dataSeccion.send(data_Seccion);
	}
	
}

function creaPasword() {
	var pass_crear = $('#pass_crear').val();
		// GET FORM INPUT
		var data_Password = new FormData();
		//data_Password.append("valEstado", valEstado);
		// AJAX
		var xhr_dataPassword = new XMLHttpRequest();
		xhr_dataPassword.open("POST", "../js/get_password.php", true);
		xhr_dataPassword.onload = function () {
			if (this.status == 200) {
				var res_crearPassword = JSON.parse(this.response);
				if (res_crearPassword.status == true) {
					setTimeout(function () {
						document.getElementById("pass_crear").value = res_crearPassword["new_password"];
					}, 200);
				} else {
					alert("ERROR DE CARGA DE DATOS");
				}
			} else {
				alert("ERROR AL CARGAR ARCHIVO PHP, VALOR " + seccion_c );
			}
		};
		xhr_dataPassword.send(data_Password);
}

function selectMunicipio() {
	var valEstado = $('#seccion_e').val();
	var valMunicipio = $('#municipio_e').val();
	// GET FORM INPUT
	var data_Mpio = new FormData();
	data_Mpio.append("valEstado", valEstado);
	data_Mpio.append("valMunicipio", valMunicipio);
	// AJAX
	var xhr_dataMpio = new XMLHttpRequest();
	xhr_dataMpio.open("POST", "../js/get_distritos.php", true);
	xhr_dataMpio.onload = function () {
		if (this.status == 200) {
			var res_listaMpio = JSON.parse(this.response);
			if (res_listaMpio.status == true) {
				setTimeout(function () {
					document.getElementById("distritos_e").innerHTML = res_listaMpio["dtoseleccionado"];
				}, 200);
			} else {
				alert("ERROR DE CARGA DE DATOS");
			}
		} else {
			alert("ERROR AL CARGAR ARCHIVO PHP, VALOR " + valMunicipio );
		}
	};
	xhr_dataMpio.send(data_Mpio);
}

function ValidPhone(objTel,AddCarac){ 
	var count = 0;
	if(objTel.value!=''){ 
			if(objTel.value.charAt(0) == 0){ 
				alertPane("Este Tel&eacute;fono NO es VALIDO. NOTA: EL TEL&Eacute;FONO NO PUEDE EMPEZAR CON CERO.", null, null, objTel.id);
				count++;
			} 
			if(objTel.value.length != 10 + AddCarac){ 
				alertPane("Este Tel&eacute;fono NO es VALIDO. NOTA: EL TEL&Eacute;FONO DEBE TENER CLAVE LADA.", null, null, objTel.id);
				count++;
			}  
				                                                          

	} 
	if(count > 0){
		return false;
	}else{
		return true;
	}
 }

 function validateUnRepeatPhone(telefono, label){
	var bandera = false;
	var tel = $('#'+telefono.id).val();
	var res = tel.split("");
	
	
	for(var i=0; i< res.length;i++){
		var count = 0;
		for(var j=0; j< res.length; j++){
			if(res[i] == res[j+1]){
				count++;
			}
		}
		 
	}
	
	if(count > 6){
		alertPane("Se detect&oacute; nÃºmeros repetidos en <b>" + label + "</b>", null, null, telefono.id);
		return true;
	}else{
		return false
	}
}

function borrarUsuario(idUsuario, nombre) {
	//alert("Accion 1, Folio: " + folio);
	var respuesta = confirm("¿Estas seguro de borrar este usuario? " + nombre);
	if (respuesta == true) {
    //window.open("exit.html", "Thanks for Visiting!");
		var idUsuario = idUsuario;
		//var seccion_c = $('#seccion_c').val();
		// GET FORM INPUT
		var data_Borrar = new FormData();
		data_Borrar.append("idUsuario", idUsuario);
		// AJAX
		var xhr_dataBorrar = new XMLHttpRequest();
		xhr_dataBorrar.open("POST", "../js/get_borrarUsuario.php", true);
		xhr_dataBorrar.onload = function () {
			if (this.status == 200) {
				var res_Borrar = JSON.parse(this.response);
				if (res_Borrar.status == true) {
					setTimeout(function () {
						//document.getElementById("municipio_e").innerHTML = res_Borrar["listaMunicipios"];
						alert("Se ha borrado el usuario: " + nombre);
						window.location.href = "https://sufragio21.com/panel/usuarios.php";
					}, 200);
				} else {
					alert("ERROR DE CARGA DE DATOS");
				}
			} else {
				alert("ERROR AL CARGAR ARCHIVO PHP");
			}
		};
		xhr_dataBorrar.send(data_Borrar);
  }
	
}

function verificar(idUsuario, nombre) {
	//alert("Accion 1, Folio: " + folio);
	var respuesta = confirm("Confirmas la verificación de " + nombre);
	if (respuesta == true) {
    //window.open("exit.html", "Thanks for Visiting!");
		var idUsuario = idUsuario;
		//var seccion_c = $('#seccion_c').val();
		// GET FORM INPUT
		var data_Borrar = new FormData();
		data_Borrar.append("idUsuario", idUsuario);
		// AJAX
		var xhr_dataBorrar = new XMLHttpRequest();
		xhr_dataBorrar.open("POST", "../js/get_verificar.php", true);
		xhr_dataBorrar.onload = function () {
			if (this.status == 200) {
				var res_Borrar = JSON.parse(this.response);
				if (res_Borrar.status == true) {
					setTimeout(function () {
						//alert("Has confirmado a: " + nombre);
						document.getElementById("cbox"+idUsuario).checked = true;
						$("#cbox"+idUsuario).addClass("d-none");
						$("#filaBase"+idUsuario).addClass("bg-success text-white");
						//document.getElementById("filaBase"+idUsuario).addClass('bg-success text-white');
					}, 200);
				} else {
					alert("ERROR DE CARGA DE DATOS");
				}
			} else {
				alert("ERROR AL CARGAR ARCHIVO PHP");
			}
		};
		xhr_dataBorrar.send(data_Borrar);
  } else {
		document.getElementById("cbox"+idUsuario).checked = false;
	}
}
function desverificar(idUsuario, nombre) {
	//alert("Accion 1, Folio: " + folio);
	var respuesta = confirm("Quitar verificación a: " + nombre);
	if (respuesta == true) {
    //window.open("exit.html", "Thanks for Visiting!");
		var idUsuario = idUsuario;
		//var seccion_c = $('#seccion_c').val();
		// GET FORM INPUT
		var data_Borrar = new FormData();
		data_Borrar.append("idUsuario", idUsuario);
		// AJAX
		var xhr_dataBorrar = new XMLHttpRequest();
		xhr_dataBorrar.open("POST", "../js/get_desverificar.php", true);
		xhr_dataBorrar.onload = function () {
			if (this.status == 200) {
				var res_Borrar = JSON.parse(this.response);
				if (res_Borrar.status == true) {
					setTimeout(function () {
						//alert("Has confirmado a: " + nombre);
						document.getElementById("cbox"+idUsuario).checked = false;
						$("#cbox"+idUsuario).addClass("d-none");
						$("#filaBase"+idUsuario).removeClass("bg-success text-white");
						//document.getElementById("filaBase"+idUsuario).removeClass('bg-success text-white');
					}, 200);
				} else {
					alert("ERROR DE CARGA DE DATOS");
				}
			} else {
				alert("ERROR AL CARGAR ARCHIVO PHP");
			}
		};
		xhr_dataBorrar.send(data_Borrar);
  } else {
		document.getElementById("cbox"+idUsuario).checked = true;
	}	
}

function afirmo(actUsuario) {
	//alert("Accion 1, Folio: " + folio);
	var respuesta = confirm("Confirmas su asistencia satisfactoria?" + actUsuario);
	if (respuesta == true) {
    //window.open("exit.html", "Thanks for Visiting!");
		var act = actUsuario;
		//var seccion_c = $('#seccion_c').val();
		// GET FORM INPUT
		var data_afirmar = new FormData();
		data_afirmar.append("actUsuario", act);
		// AJAX
		var xhr_dataAfirmar = new XMLHttpRequest();
		xhr_dataAfirmar.open("POST", "../js/get_afirmar.php", true);
		xhr_dataAfirmar.onload = function () {
			if (this.status == 200) {
				var res_Afirmar = JSON.parse(this.response);
				if (res_Afirmar.status == true) {
					setTimeout(function () {
						//alert("Has confirmado a: " + nombre);
						$("#btn_afirmativo"+actUsuario).addClass("d-none");
						$("#btn_cancelado"+actUsuario).addClass("d-none");
					}, 200);
				} else {
					alert("ERROR DE CARGA DE DATOS");
				}
			} else {
				alert("ERROR AL CARGAR ARCHIVO PHP");
			}
		};
		xhr_dataAfirmar.send(data_afirmar);
  } else {
	}
}
function cancelo(actUsuario) {
	//alert("Accion 1, Folio: " + folio);
	var respuesta = confirm("Confirmas que no asistio?" + actUsuario);
	if (respuesta == true) {
    //window.open("exit.html", "Thanks for Visiting!");
		var act = actUsuario;
		//var seccion_c = $('#seccion_c').val();
		// GET FORM INPUT
		var data_afirmar = new FormData();
		data_afirmar.append("actUsuario", act);
		// AJAX
		var xhr_dataAfirmar = new XMLHttpRequest();
		xhr_dataAfirmar.open("POST", "../js/get_cancelar.php", true);
		xhr_dataAfirmar.onload = function () {
			if (this.status == 200) {
				var res_Afirmar = JSON.parse(this.response);
				if (res_Afirmar.status == true) {
					setTimeout(function () {
						//alert("Has confirmado a: " + nombre);
						$("#btn_afirmativo"+actUsuario).addClass("d-none");
						$("#btn_cancelado"+actUsuario).addClass("d-none");
					}, 200);
				} else {
					alert("ERROR DE CARGA DE DATOS");
				}
			} else {
				alert("ERROR AL CARGAR ARCHIVO PHP");
			}
		};
		xhr_dataAfirmar.send(data_afirmar);
  } else {
	}
}