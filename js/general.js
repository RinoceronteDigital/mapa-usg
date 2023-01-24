function loadRequirements(){
	$('#showhim').hover(
			function() {$('#showme').css({display:"block"});}, 
			function() {$('#showme').css({display:"none"});}
	);
}
function loadScriptProduct(){
	$("#imgProduct").mouseover(function() { $("#infoScript").css('visibility','visible'); });
    $("#imgProduct").mouseout(function() { $("#infoScript").css('visibility','hidden'); });	
}
function JustEmailChars(e){
	keypress = (document.all) ? e.keyCode : e.which; // 2
 	keychar = String.fromCharCode(keypress);
 	if (keypress == 8 || keypress == 0) {
 		return true;
 	}
 	numcheck = /[a-zA-ZÃ±Ã‘0-9@._\s -]/;
 	return numcheck.test(keychar);
}

function JustAlphaNumberGuion(e){
	keypress = (document.all) ? e.keyCode : e.which; // 2
 	keychar = String.fromCharCode(keypress);
 	if (keypress == 8 || keypress == 0) {
 		return true;
 	}
 	numcheck = /[a-zA-ZÃ±Ã‘0-9ÃÃ‰ÃÃ“ÃšÃ¡Ã©Ã­Ã³Ãº\s -]/;
 	return numcheck.test(keychar);
}


/**
 * Compara dos fechas, si son iguales devuelve 0
 * 1 si la primer fecha es mayor
 * -1 si la primer fecha es menor
 * @param {Date} dateOne
 * @param {Date} dateTwo
 */
function compareToDates(dateOne, dateTwo){
	var res = dateOne.getTime() - dateTwo.getTime();
	if(0 == res){
		return 0;
	}else if(0 > res){
		return -1;
	}else if(0 < res){
		return 1;
	}
}

function popUpSearchSolicitud(){
	var txtCodeSearch = $("#txtCodeSearch");
	var buttons = [{text: "Aceptar", click: function() { searchSolicitud(); }}, 
				   {text: "Cancelar", click: function() { $(this).dialog("close"); }}]
	
	if(txtCodeSearch.val() === null ||  $.trim(txtCodeSearch.val()).length <= 0){
		alertPane("<span align='center'>Es necesario especificar el <b>c&oacute;digo de la solicitud</b>.</span>", null, null, "txtCodeSearch");
		return;
	}
	
	var message = $("#dialog-search-solicitud").html();
	message = message.replace("cmbFechaDiaSolicitud", "cmbFechaDiaSolicitudAlert")
					 .replace("cmbFechaMesSolicitud", "cmbFechaMesSolicitudAlert")
					 .replace("cmbFechaAnioSolicitud", "cmbFechaAnioSolicitudAlert");
	alertPane(message, null, buttons, null);
}

function searchSolicitud(){
	var txtCodeSearch = $("#txtCodeSearch");
	var cmbFechaDiaSolicitud = $("#cmbFechaDiaSolicitudAlert");
	var cmbFechaMesSolicitud = $("#cmbFechaMesSolicitudAlert");
	var cmbFechaAnioSolicitud = $("#cmbFechaAnioSolicitudAlert");	
	
	if(txtCodeSearch.val() === null ||  $.trim(txtCodeSearch.val()).length <= 0){
		alertPane("<span align='center'>Es necesario especificar el <b>c&oacute;digo de la solicitud</b>.</span>", null, null, "txtCodeSearch");
		return;
	}
	
	if(cmbFechaDiaSolicitud.val() === null ||  cmbFechaDiaSolicitud.val() === "-1"){
		alertPane("Favor de elegir una opci&oacute;n para <b>Fecha de nacimiento: D&iacute;a</b>", null, null, "cmbFechaDiaSolicitud");
		return;
	}
	if(cmbFechaMesSolicitud.val() === null ||  cmbFechaMesSolicitud.val() === "-1"){
		alertPane("Favor de elegir una opci&oacute;n para <b>Fecha de nacimiento: Mes</b>", null, null, "cmbFechaMesSolicitud");
		return;
	}
	if(cmbFechaAnioSolicitud.val() === null ||  cmbFechaAnioSolicitud.val() === "-1"){
		alertPane("Favor de elegir una opci&oacute;n para <b>Fecha de nacimiento: A&ntilde;o</b>", null, null, "cmbFechaAnioSolicitud");
		return;
	}
	if(!validateDate(cmbFechaDiaSolicitud.val() + "/" + cmbFechaMesSolicitud.val() + "/" + cmbFechaAnioSolicitud.val())){
		alertPane("Favor de capturar una <b>Fecha de Nacimiento</b> v&aacute;lida", null, null, "cmbFechaDiaSolicitud");
		return;
	}
	
	//seteamos la info a los inputs del sumbit
	$("#codigo").val(txtCodeSearch.val());
	$("#fecha").val(cmbFechaDiaSolicitud.val() + "/" + cmbFechaMesSolicitud.val() + "/" + cmbFechaAnioSolicitud.val());
	
	$("#frmSearchSolicitud").submit();
}

function alertPane(mensaje, titulo, botones, focus){

	var tituloModal = (titulo != null) ? titulo : 'Solicitud en l&iacute;nea - INVEX';
	$('#modal-message-title').html('Solicitud en l&iacute;nea - INVEX');
	
	if(typeof botones === "undefined" || null === botones){
		$('#modal-message-footer').html('<button type="button" class="btn btn-default" data-dismiss="modal">Aceptar</button>');
	}else{		
		$('#modal-message-footer').html(botones);
	}
	if(!$('#mmodal-message').is(':visible')) {
		$('#modal-message-content').html(mensaje);
		$('#modal-message').modal('toggle');
		
	}
	
	

	if(focus != null && focus != "undefined"){
		$("#" + focus).focus();
	}
	
		
	/*
	var $myDialog = $("#dialog-message");		
	$myDialog.dialog({ modal: true });	
	$myDialog.dialog({ width: 450});
	$myDialog.dialog({ height: 180});
	$myDialog.dialog({ position: 'center' });
	$myDialog.dialog({ title: null === titulo || "undefined" === typeof titulo ? "Solicitud en l&iacute;nea - INVEX" : titulo });
	$myDialog.html(null === mensaje || "undefined" === typeof mensaje ? "" : mensaje);
	if(focus != null && focus != "undefined"){
		$myDialog.dialog({close: function(){$("#" + focus).focus();}});
	}
	
	if(typeof botones === "undefined" || null === botones){
		$myDialog.dialog( "option", "buttons", [{text: "Aceptar", click: function() {$(this).dialog("destroy");  }}]);
	}else{		
		$myDialog.dialog( "option", "buttons", botones);
	}
	*/
}

function alertPaneSimpleResize(mensaje, titulo, pWidth, pHeight){/*Funciona para Internet Explorer*/	
	
	var tituloModal = (titulo != null) ? titulo : 'Solicitud en l&iacute;nea - INVEX';
	$('#modal-message-title').html('Solicitud en l&iacute;nea - INVEX');
	$('#modal-message-content').html(mensaje);
	$('#modal-message').modal('toggle');
	$('#modal-message-footer').html('');
	//alert("antes del click");
	//$('#modal-message-content').addClass(mensaje);
	//alert("despuÃ©s del click");
	//document.getElementById('modal-message-content').innerHTML = mensaje;
	/*
	var $myDialog = $("#dialog-messageIE");
	
	$myDialog.dialog({ modal: true });	
	$myDialog.dialog({ width: pWidth});
	$myDialog.dialog({ height: pHeight});
	$myDialog.dialog({ position: 'center' });
	$myDialog.dialog({ title: "Solicitud en l&iacute;nea - INVEX"});
	$myDialog.html(mensaje);
	*/	
}

function onlyAlphabetics(id){
	var text = $("#" + id);
	text.keypress(function (e) {
		keypress = (document.all) ? e.keyCode : e.which; 
	 	keychar = String.fromCharCode(keypress);
	 	if (keypress == 8 || keypress == 0 || keypress == 9) {
	 		return true;
	 	}
	 	numcheck = /[a-zA-ZÃ±Ã‘ÃÃ‰ÃÃ“ÃšÃ¡Ã©Ã­Ã³Ãº\s\t]/;
	 	return numcheck.test(keychar);
	});
	
	// text.live("cut copy paste",function(e) {e.preventDefault();});	
}

function onlyAlphaNumeric(id){
	var text = $("#" + id);
	text.keypress(function (e) {
		keypress = (document.all) ? e.keyCode : e.which; 
	 	keychar = String.fromCharCode(keypress);
	 	if (keypress == 8 || keypress == 0 || keypress == 9) {
	 		return true;
	 	}
	 	numcheck = /[a-zA-Z0-9Ã±Ã‘ÃÃ‰ÃÃ“ÃšÃ¡Ã©Ã­Ã³Ãº\s\t]/;
	 	return numcheck.test(keychar);
	});
	
	// text.live("cut copy paste",function(e) {e.preventDefault();});	
}

function validateDateFuture(fecha){
	var splitedString = fecha.split("/");
	var anio = splitedString[2];
	var mes = splitedString[1];
	var dia = splitedString[0];
	var currentYear = new Date().getFullYear();
	
	if(isNaN(anio) || anio.length < 4 || parseFloat(anio) < 1900){   
        return false  
    }
    if(isNaN(mes) || parseFloat(mes) < 1 || parseFloat(mes) > 12){  
        return false  
    }  
    if(isNaN(dia) || parseInt(dia, 10) < 1 || parseInt(dia, 10) > 31){  
        return false  
    }  
    if(mes == 4 || mes == 6 || mes == 9 || mes == 11 || mes == 2){  
        if ((mes == 2 && anio % 4 != 0 && dia > 28) || (mes == 2 && anio % 4 == 0 && dia > 29) || dia > 30) {  
            return false  
        }  
    } 	
	return true;
}

function validateDate(fecha){
	var splitedString = fecha.split("/");
	var anio = splitedString[2];
	var mes = splitedString[1];
	var dia = splitedString[0];
	var currentYear = new Date().getFullYear();
	
	if(isNaN(anio) || anio.length < 4 || parseFloat(anio) < 1900 || parseFloat(anio) > parseFloat(currentYear)){   
        return false  
    }
    if(isNaN(mes) || parseFloat(mes) < 1 || parseFloat(mes) > 12){  
        return false  
    }  
    if(isNaN(dia) || parseInt(dia, 10) < 1 || parseInt(dia, 10) > 31){  
        return false  
    }  
    if(mes == 4 || mes == 6 || mes == 9 || mes == 11 || mes == 2){  
        if ((mes == 2 && anio % 4 != 0 && dia > 28) || (mes == 2 && anio % 4 == 0 && dia > 29) || dia > 30) {  
            return false  
        }  
    } 	
	return true;
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

function onlyNaturalNumbers(id){
	var text = $("#" + id);
	text.keyup(function () {this.value = this.value.replace(/[^0-9]/g,'');});
	// text.live("cut copy paste",function(e) {e.preventDefault();});
}


function onlyRealNumbers(id){
	var text = $("#" + id);
	text.keyup(function () {this.value = this.value.replace(/[^0-9\.]/g,'');});
	// text.live("cut copy paste",function(e) {e.preventDefault();});
}

function onlyRealNumbersWhitOutDot(id){
	var text = $("#" + id);
	text.keyup(function () {this.value = this.value.replace(/[^0-9\,]/g,'');});
	// text.live("cut copy paste",function(e) {e.preventDefault();});
}

function closeSession(contextPath){
	alert("El tiempo de la sesi\u00F3n ha expirado.");
	window.location = contextPath;
}

function toUpperCase(obj){
	obj.value = obj.value.toUpperCase();
	//obj.val(obj.val().toUpperCase());	
}

function toLowerCase(obj){
	obj.value = obj.value.toLowerCase();
}

function expireSession(context, c, css){
	window.location.href=context + '/index.html?c=' + c+'&css='+css;
}

function removeSpecialCharacters(obj){
	obj.value = obj.value.replace(/[\n\r\t\v\f]/g,'');
}

function removeAccents(obj){
	var val = obj.value.toUpperCase();
	val = val.replace(/[ÃÃ€Ã‚Ã„]/g,'A');
	val = val.replace(/[Ã‰ÃˆÃŠÃ‹]/g,'E');
	val = val.replace(/[ÃÃŒÃŽÃ]/g,'I');
	val = val.replace(/[Ã“Ã’Ã”Ã–]/g,'O');
	val = val.replace(/[ÃšÃ™Ã›Ãœ]/g,'U');
	
	obj.value = val;
}

var cleanStr = (function() {
	  var from = "ÃƒÃ€ÃÃ„Ã‚ÃˆÃ‰Ã‹ÃŠÃŒÃÃÃŽÃ’Ã“Ã–Ã”Ã™ÃšÃœÃ›Ã£Ã Ã¡Ã¤Ã¢Ã¨Ã©Ã«ÃªÃ¬Ã­Ã¯Ã®Ã²Ã³Ã¶Ã´Ã¹ÃºÃ¼Ã»Ã‘Ã±Ã‡Ã§",
	      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
	      mapping = {};
	 
	  for(var i = 0, j = from.length; i < j; i++ )
	      mapping[ from.charAt( i ) ] = to.charAt( i );
	 
	  return function( str ) {
	      var ret = [];
	      for( var i = 0, j = str.length; i < j; i++ ) {
	          var c = str.charAt( i );
	          if( mapping.hasOwnProperty( str.charAt( i ) ) )
	              ret.push( mapping[ c ] );
	          else
	              ret.push( c );
	      }
	      return ret.join( '' );
	  };	 
})();

function googleAnalist(css){

	css = $.trim(css.toUpperCase());
	if(css == "STYLE-MANCHESTER.MIN.CSS"){
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			  ga('create', 'UA-42348662-2', 'invextarjetas.com.mx');
			  ga('send', 'pageview');
	}else if(css == "STYLE-VOLARIS.MIN.CSS" || css == "STYLE-VOLARIS-NEGRA.MIN.CSS"){
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		 	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		 	ga('create', 'UA-42348662-3', 'invextarjetas.com.mx');
		 	ga('send', 'pageview');
	}
	
}

function formatMilesSeparator(input){
	var number = new String(input.value.replace(/\,/g,""));
	var result = '';
	while( number.length > 3 ){
		result = ',' + number.substr(number.length - 3) + result;
		number = number.substring(0, number.length - 3);
	}
	result = number + result;
	input.value = result;
}

function JustAllNumber(e,valorIngresado){
	keypress = (document.all) ? e.keyCode : e.which; // 2
 	keychar = String.fromCharCode(keypress);
 	if (keypress == 8 || keypress == 0) {
 		return true;
 	}     	
 	
 	if (keychar == "-" && Trim(valorIngresado) == "")
	{ 	
		return true;
	}
 	
 	numcheck = /[0-9.]/;
 	
 	if(numcheck.test(keychar)==false)
 	{
 		return false;
 	}
 	
 	puntoCheck = /[.]/;
 	if(keychar=='.' && puntoCheck.test(valorIngresado))
 	{
 		return false;
 	}  	
 	return true;
}

function quitaNumerosCarcateresEspecialesArroba(cadena,caja){
	cadena=cadena.replace(/Ã/g,'A');
	cadena=cadena.replace(/Ã‰/g,'E');
	cadena=cadena.replace(/Ã/g,'I');
	cadena=cadena.replace(/Ã“/g,'O');
	cadena=cadena.replace(/Ãš/g,'U');
	cadena=cadena.replace(/Ã‘/g,'N');
	cadena=cadena.replace(/Ã„/g,'A');
	cadena=cadena.replace(/Ã‹/g,'E');
	cadena=cadena.replace(/Ã/g,'I');
	cadena=cadena.replace(/Ã–/g,'O');
	cadena=cadena.replace(/Ãœ/g,'U');	
	
	cadena=cadena.replace(/Ã¡/g,'a');
	cadena=cadena.replace(/Ã©/g,'e');
	cadena=cadena.replace(/Ã­/g,'i');
	cadena=cadena.replace(/Ã³/g,'o');
	cadena=cadena.replace(/Ãº/g,'u');
	cadena=cadena.replace(/Ã±/g,'n');
	cadena=cadena.replace(/Ã¤/g,'a');
	cadena=cadena.replace(/Ã«/g,'e');
	cadena=cadena.replace(/Ã¯/g,'i');
	cadena=cadena.replace(/Ã¶/g,'o');
	cadena=cadena.replace(/Ã¼/g,'u');
	
	cadena=cadena.replace('^','');
	cadena=cadena.replace('Â°','');
	cadena=cadena.replace('|','');
	cadena=cadena.replace('Â¡','');
	cadena=cadena.replace('!','');
	cadena=cadena.replace('"','');
	cadena=cadena.replace('#','');
	cadena=cadena.replace('$','');
	cadena=cadena.replace('%','');
	cadena=cadena.replace('&','');
	cadena=cadena.replace('/','');
	cadena=cadena.replace('(','');
	cadena=cadena.replace(')','');
	cadena=cadena.replace('=','');
	cadena=cadena.replace('Â¡','');
	cadena=cadena.replace('Â¿','');
	cadena=cadena.replace('?','');
	cadena=cadena.replace('\\','');
	cadena=cadena.replace('â€™','');
	cadena=cadena.replace('Â´','');
	cadena=cadena.replace('Â¨','');
	cadena=cadena.replace('*','');
	cadena=cadena.replace('+','');
	cadena=cadena.replace('~','');
	cadena=cadena.replace('[','');
	cadena=cadena.replace(']','');
	cadena=cadena.replace('{','');
	cadena=cadena.replace('}','');
	cadena=cadena.replace('^','');
	cadena=cadena.replace('`','');
	cadena=cadena.replace(':','');
	cadena=cadena.replace(';','');
	cadena=cadena.replace(',','');
	cadena=cadena.replace('Â¬','');
	cadena=cadena.replace('Â´','');
	
	cadena=cadena.replace('<','');
	cadena=cadena.replace('>','');
	cadena=cadena.replace('Â½','');
	
	
	document.getElementById(caja).value=cadena;
	
}


function quitaNumerosCarcateresEspecialesPorcentaje(cadena,caja){
	cadena=cadena.replace(/Ã/g,'A');
	cadena=cadena.replace(/Ã‰/g,'E');
	cadena=cadena.replace(/Ã/g,'I');
	cadena=cadena.replace(/Ã“/g,'O');
	cadena=cadena.replace(/Ãš/g,'U');
	cadena=cadena.replace(/Ã‘/g,'N');
	cadena=cadena.replace(/Ã„/g,'A');
	cadena=cadena.replace(/Ã‹/g,'E');
	cadena=cadena.replace(/Ã/g,'I');
	cadena=cadena.replace(/Ã–/g,'O');
	cadena=cadena.replace(/Ãœ/g,'U');	
	
	cadena=cadena.replace(/Ã¡/g,'a');
	cadena=cadena.replace(/Ã©/g,'e');
	cadena=cadena.replace(/Ã­/g,'i');
	cadena=cadena.replace(/Ã³/g,'o');
	cadena=cadena.replace(/Ãº/g,'u');
	cadena=cadena.replace(/Ã±/g,'n');
	cadena=cadena.replace(/Ã¤/g,'a');
	cadena=cadena.replace(/Ã«/g,'e');
	cadena=cadena.replace(/Ã¯/g,'i');
	cadena=cadena.replace(/Ã¶/g,'o');
	cadena=cadena.replace(/Ã¼/g,'u');
	
	cadena=cadena.replace('^','');
	cadena=cadena.replace('Â°','');
	cadena=cadena.replace('|','');
	cadena=cadena.replace('Â¡','');
	cadena=cadena.replace('!','');
	cadena=cadena.replace('"','');
	cadena=cadena.replace('#','');
	cadena=cadena.replace('$','');
	cadena=cadena.replace('%','');
	cadena=cadena.replace('&','');
	cadena=cadena.replace('/','');
	cadena=cadena.replace('(','');
	cadena=cadena.replace(')','');
	cadena=cadena.replace('=','');
	cadena=cadena.replace('Â¡','');
	cadena=cadena.replace('Â¿','');
	cadena=cadena.replace('?','');
	cadena=cadena.replace('\\','');
	cadena=cadena.replace('â€™','');
	cadena=cadena.replace('Â´','');
	cadena=cadena.replace('Â¨','');
	cadena=cadena.replace('*','');
	cadena=cadena.replace('+','');
	cadena=cadena.replace('~','');
	cadena=cadena.replace('[','');
	cadena=cadena.replace(']','');
	cadena=cadena.replace('{','');
	cadena=cadena.replace('}','');
	cadena=cadena.replace('^','');
	cadena=cadena.replace('`','');
	cadena=cadena.replace(':','');
	cadena=cadena.replace(';','');
	cadena=cadena.replace(',','');
	cadena=cadena.replace('Â¬','');
	cadena=cadena.replace('Â´','');
	
	cadena=cadena.replace('<','');
	cadena=cadena.replace('>','');
	cadena=cadena.replace('@','');
	cadena=cadena.replace('Â½','');
	
	
	document.getElementById(caja).value=cadena;
	
}

function validateRegex(regex,campo){
	if(regex.test(campo.value)){
		return true;
	}else{
		return false;	
	}		
}

function validateSpecialCharacters(obj) { 
	obj.value = Trim(obj.value.replace(/[\n\r\t\v\f]/g,'')); 
} 

function validateOnlySpaceAndLetters(obj){ 
			if(!validateRegex(/^[aA-zZ\\ssÃ¡Ã©Ã­Ã³ÃºÃÃ‰ÃÃ“ÃšÃ‘Ã±]*$/,obj)){ 
				alertPane('Este campo acepta &Uacute;nicamente Letras', null, null, obj.id);
				return;
			}
}

function nuevoAdjunto(){
	
}
