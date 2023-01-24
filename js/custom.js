
//$.getScript("jquery-3.6.0.min.js");


$(document).ready(function() {
  /*var btn_aceptarUbicacion = document.getElementById("btn_aceptarUbicacion");
  //var nombre_datos = document.getElementById("nombre_datos");
  btn_aceptarUbicacion.onclick = function(e){
    //var valor_nombre_datos = $(nombre_datos).val();
  }*/
});

function cambiarEstado() {
  var valEstado = $('#selectEstado').val();
  // GET FORM INPUT
  var data_Estados = new FormData();
  data_Estados.append("valEstado", valEstado);
  // AJAX
  var xhr_dataEstados = new XMLHttpRequest();
  xhr_dataEstados.open("POST", "js/get_municipios.php", true);
  xhr_dataEstados.onload = function () {
    if (this.status == 200) {
      var res_listaMunicipios = JSON.parse(this.response);
      if (res_listaMunicipios.status == true) {
        setTimeout(function () {
          document.getElementById("municipioe").innerHTML = res_listaMunicipios["listaMunicipios"];
          //alert("VALOR Municipio: " + valMunicipio );
        }, 200);
      } else {
        alert("ERROR DE CARGA DE DATOS");
      }
    } else {
      alert("ERROR AL CARGAR ARCHIVO PHP, VALOR " + valEstado );
    }
  };
  xhr_dataEstados.send(data_Estados);



	/*
  var selectEstado = document.getElementById("btn_guardarDatos");
  var valEstado = $(selectEstado).val();
  alert("Inicio de funcion");
  var form_datas = {
      is_ajax: 1,
      estado: valEstado
  };

  $.ajax({
    type: "POST",
    dataType: "JSON",
    url: "js/get_municipios.php",
    data: form_datas
    //success: function(response){alert(data);}
    //beforeSend:function(){}
  }).done(function(data) {
    $.each(data, function(index, val) {
      if (val == 0) {
        alert("No se ha llamado el archivo.");
      } else if (val == 1) {
        alert("Archivo llamado correctamente.");
      }
    });
  },"json");
    */

}


//https://maps.googleapis.com/maps/api/geocode/json?key=YOUR_API_KEY&components=postal_code:97403

function validarSesion() {
  var cliente = document.forms["iniciarsesionclientes"]["clienteSelect"].value;
  var email = document.forms["iniciarsesionclientes"]["usuarioCliente"].value;
  var email_t = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var pass = document.forms["iniciarsesionclientes"]["passwCliente"].value;
  var pass_t = /(?=.*\d)(?=.*[a-z0-9])(?=.*[A-Z0-9]).{6,18}/;
  //var passwrepetir = document.forms["mensajedecontacto"]["passwrepetir"].value;
  //var nombre = document.forms["mensajedecontacto"]["quenombre"].value;
  //var comentarios = document.forms["mensajedecontacto"]["quecomentarios"].value;
  //var apellidop = document.forms["mensajedecontacto"]["paternoUsuario"].value;
  //var apellidom = document.forms["mensajedecontacto"]["maternoUsuario"].value;
  //var estado = document.forms["mensajedecontacto"]["queestado"].value;
  //var estado = document.getElementsByName("estado")[0].value;
  //var empresa = document.forms["mensajedecontacto"]["empresa"].value;
  //var telefono = document.forms["mensajedecontacto"]["telefono"].value;
  //var palabra_v = /^[A-Za-z]{2,}$/;
  //var tel_v = /^[0-9]{8,10}$/;
  //var palabra_v = /^[A-Za-z]{2,}$/;

  if (cliente == 0) {
    alert('Debes seleccionar el cliente.');
    var error = true;
  } else {
  }
  if (email == "" || !email_t.test(email)) {
    //$(".registroEmail").addClass("inputError");
    alert('Debes ingresar tu correo electrónico 1.');
    var error = true;
  } else {
    //$(".registroEmail").removeClass("inputError");
  }
  if (pass == "" || !pass_t.test(pass)) {
    //$(".registroEmail").addClass("inputError");
    alert('Debes ingresar tu contraseña 1.');
    var error = true;
  } else {
    //$(".registroEmail").removeClass("inputError");
  }

  if (error == true) {
    return false;
  } else {
    return true;
    //alert('Tu mensaje de contacto ha sido enviado.');
  }
}

function validarSesionchilen() {
  var email = document.forms["iniciarsesionchilen"]["usuarioSesionchilen"].value;
  var email_t = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  var pass = document.forms["iniciarsesionchilen"]["passwSesionchilen"].value;
  var pass_t = /(?=.*\d)(?=.*[a-z0-9])(?=.*[A-Z0-9]).{6,18}/;
  //var passwrepetir = document.forms["mensajedecontacto"]["passwrepetir"].value;
  //var nombre = document.forms["mensajedecontacto"]["quenombre"].value;
  //var comentarios = document.forms["mensajedecontacto"]["quecomentarios"].value;
  //var apellidop = document.forms["mensajedecontacto"]["paternoUsuario"].value;
  //var apellidom = document.forms["mensajedecontacto"]["maternoUsuario"].value;
  //var estado = document.forms["mensajedecontacto"]["queestado"].value;
  //var estado = document.getElementsByName("estado")[0].value;
  //var empresa = document.forms["mensajedecontacto"]["empresa"].value;
  //var telefono = document.forms["mensajedecontacto"]["telefono"].value;
  //var palabra_v = /^[A-Za-z]{2,}$/;
  //var tel_v = /^[0-9]{8,10}$/;
  //var palabra_v = /^[A-Za-z]{2,}$/;
  if (email == "" || !email_t.test(email)) {
    //$(".registroEmail").addClass("inputError");
    alert('Debes ingresar tu correo electrónico 2.');
    var error = true;
  } else {
    //$(".registroEmail").removeClass("inputError");
  }

  if (pass == "" || !pass_t.test(pass)) {
    //$(".registroEmail").addClass("inputError");
    alert('Debes ingresar tu contraseña 2.');
    var error = true;
  } else {
    //$(".registroEmail").removeClass("inputError");
  }

  if (error == true) {
    return false;
  } else {
    return true;
    //alert('Tu mensaje de contacto ha sido enviado.');
  }
}





