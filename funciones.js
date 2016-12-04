function doValidarLoginLDAP() {
	var login = $('#login').val();
	var er_Letras = /^[a-z0-9]*$/;
	var espacios = false;
	var cont = 0;

	if (login.length > 20) {
		$("#validacionLogin").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/no.png" alt="No ok" width="45" height="30" BORDER="0">El login no puede exceder los 20 caracteres.');
		$("#validacionLogin").show('slow');
		return false;
	}else{
		while (!espacios && (cont < login.length)) {
			if (login.charAt(cont) == " ")
				espacios = true;
			cont++;
		}
		if (espacios) {
			$("#validacionLogin").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/no.png" alt="No ok" width="45" height="30" BORDER="0">El login no puede contener espacios en blanco.');
			$("#validacionLogin").show('slow');
			return false;
		}else{
			if (!er_Letras.test(login)) {
				$("#validacionLogin").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/no.png" alt="No ok" width="45" height="30" BORDER="0">El login solo puede contener letras minusculas y números.');
				$("#validacionLogin").show('slow');
				return false;
			}else{
				if (login.length > 0) {
					$.ajax({
						type: "POST",
						url: "/GestionCuentasUsuariosPUJ/gestionCuentaUsuario/buscarLoginLDAPString",
						data: "login=" + login,
						success: function(data){
							if (data == "Este login ya se esta utilizando.") {
								$("#validacionLogin").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/no.png" alt="No ok" width="45" height="30" BORDER="0">Este login ya se esta utilizando.');
								$("#validacionLogin").show('slow');
							}else if (data == "Este login puede ser utilizado.") {
								$("#validacionLogin").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/ok.png" alt="ok" width="45" height="30" BORDER="0">Este login puede ser utilizado.');
								$("#validacionLogin").show('slow');
							}
						},
						error: function(data){
//							$("#validacionLogin").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/no.png" alt="ok" width="45" height="30" BORDER="0">' + data);
//							$("#validacionLogin").show('slow');
						}
					});
					return true;
				}else {
					$("#validacionLogin").hide();
					return false;
				}
			}
		}
	}
}

function doValidarLoginLDAPADM() {
	var login = $('#login').val();
	var er_Letras = /^[A-Za-z0-9_.]*$/;
	var espacios = false;
	var cont = 0;

	if (login.length > 20) {
		$("#validacionLogin").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/no.png" alt="No ok" width="45" height="30" BORDER="0">El login no puede exceder los 20 caracteres.');
		$("#validacionLogin").show('slow');
		return false;
	}else{
		while (!espacios && (cont < login.length)) {
			if (login.charAt(cont) == " ")
				espacios = true;
			cont++;
		}
		if (espacios) {
			$("#validacionLogin").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/no.png" alt="No ok" width="45" height="30" BORDER="0">El login no puede contener espacios en blanco.');
			$("#validacionLogin").show('slow');
			return false;
		}else{
			if (!er_Letras.test(login)) {
				$("#validacionLogin").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/no.png" alt="No ok" width="45" height="30" BORDER="0">El login solo puede contener letras minusculas y números.');
				$("#validacionLogin").show('slow');
				return false;
			}else{
				if (login.length > 0) {
					$.ajax({
						type: "POST",
						url: "/GestionCuentasUsuariosPUJ/gestionCuentaUsuario/buscarLoginLDAPString",
						data: "login=" + login,
						success: function(data){
							if (data == "Este login ya se esta utilizando.") {
								$("#validacionLogin").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/no.png" alt="No ok" width="45" height="30" BORDER="0">Este login ya se esta utilizando.');
								$("#validacionLogin").show('slow');
							}else if (data == "Este login puede ser utilizado.") {
								$("#validacionLogin").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/ok.png" alt="ok" width="45" height="30" BORDER="0">Este login puede ser utilizado.');
								$("#validacionLogin").show('slow');
							}
						},
						error: function(data){
//							$("#validacionLogin").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/no.png" alt="ok" width="45" height="30" BORDER="0">' + data);
//							$("#validacionLogin").show('slow');
						}
					});
					return true;
				}else {
					$("#validacionLogin").hide();
					return false;
				}
			}
		}
	}
}

function doValidarComplejidad()
{
	var p1 = document.getElementById("password").value;
	seguridad = seguridad_clave(p1);
	if (seguridad > 60) {
		$("#divSeguridad").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/ok.png" width="45" height="30" BORDER="0"> ' + seguridad + "% de seguridad.");
		return true;
	}else{
		$("#divSeguridad").html('<img src="/GestionCuentasUsuariosPUJ/resources/images/no.png" width="45" height="30" BORDER="0"> ' + seguridad + "% de seguridad.");
		return false;
	}

}

function doValidarClave() {
	var p1 = document.getElementById("password").value;
	var p2 = document.getElementById("confPassword").value;

	var login = $('#login').val();
	var nombre = $('#nombre').val().toLowerCase();
	var apellido = $('#apellido').val().toLowerCase();
	var snombrecompleto = (nombre + ' ' + apellido).split(" ");

	var er_Numeros =  /^[0-9]*$/;
	//var er_Letras = /^[a-zA-ZñÑ]*$/;
	var er_Letras_Minusculas = /^[a-z]*$/;
	var er_Letras_Mayusculas = /^[A-Z]*$/;
	var er_NumerosyLetras = /^[a-zA-Z0-9]*$/;

	var espacios = false;
	var tieneNumeros = false;
	var tieneMayuscula = false;
	var tieneMinuscula = false;
	var cont = 0;
	var seguridad = 0;

	if (p1.length == 0 || p2.length == 0) {
		bootbox.alert("Las Contrase\u00F1as no pueden quedar vacias.");
		return false;
	}else{
		if (p1 != p2) {
			bootbox.alert("Las Contrase\u00F1as deben de coincidir");
			return false;
		}else{
			if (p1.length < 8) {
				bootbox.alert("La Contrase\u00F1a debe tener m\u00E1s de 8 caract\u00E9res.");
				return false;
			}else{


				for (var i = 0; i < snombrecompleto.length; i++){
					if (snombrecompleto[i].length != 0 && snombrecompleto[i] != " " && p1.toLowerCase().indexOf(snombrecompleto[i].toLowerCase()) != -1) {
						bootbox.alert("La Contrase\u00F1a no puede contener su Nombre y/o Apellidos .");
						return false;
					}
				}
				if (p1.toLowerCase().indexOf(login.toLowerCase()) != -1) {
					bootbox.alert("La Contrase\u00F1a no puede contener el Id del Usuario.");
					return false;
				}else{
					while (!espacios && (cont < p1.length)) {
						if (p1.charAt(cont) == " ")
							espacios = true;
						cont++;
					}
					if (espacios) {
						bootbox.alert ("La Contrase\u00F1a no puede contener espacios en blanco");
						return false;
					}else{
						if (!er_NumerosyLetras.test(p1)) {
							bootbox.alert ("La Contrase\u00F1a solo puede contener n�meros y letras.");
							return false;
						}else{
							cont = 0;
							while (!tieneNumeros && (cont < p1.length)) {
								if (er_Numeros.test(p1.charAt(cont))){
									tieneNumeros = true;
								}
								cont++;
							}
							if (!tieneNumeros) {
								bootbox.alert ("La Contrase\u00F1a debe contener N\u00FAmeros");
								return false;
							}else{
								cont = 0;
								while (!tieneMayuscula && (cont < p1.length)) {
									if (er_Letras_Mayusculas.test(p1.charAt(cont))){
										tieneMayuscula = true;
									}
									cont++;
								}
								if (!tieneMayuscula) {
									bootbox.alert ("La Contrase\u00F1a debe contener May\u00FAsculas");
									return false;
								}else{
									cont = 0;
									while (!tieneMinuscula && (cont < p1.length)) {
										if (er_Letras_Minusculas.test(p1.charAt(cont))){
											tieneMinuscula = true;
										}
										cont++;
									}
									if (!tieneMinuscula) {
										bootbox.alert ("La Contrase\u00F1a debe contener Min\u00FAsculas");
										return false;
									}else{
										return true;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

function doValidarEmailExterno() {

	if(document.getElementById("emailExterno")==null)
		return true;




	var valor = document.getElementById("emailExterno").value;
	var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;



	if (valor.length > 0) {
		if(re.exec(valor)){
			if(valor.toUpperCase().split('@')[1].indexOf("PUJ.EDU.CO")>-1 || valor.toUpperCase().split('@')[1].indexOf("JAVERIANACALI.EDU.CO")>-1){
				bootbox.alert("El Email Externo ( " + valor + " ) no puede ser @PUJ.EDU.CO ó @JAVERIANACALI.EDU.CO");
				document.getElementById("emailExterno").value = "";
				return false;
			}
			else
			{
				return true;
			}


		}else{
			bootbox.alert("El Email Externo ( " + valor + " ) no es correcta.");
			document.getElementById("emailExterno").value = "";
			return false;
		}
	}else{
		bootbox.alert("El Email Externo no puede estar vac\u00EDo.");
		return false;
	}
}

function validarDatos(){
	if (doValidarLoginLDAP()){
		if (doValidarClave()) {
			if (doValidarEmailExterno()) {
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}else{
		return false;
	}
}

function validarDatosAdm(){
	if (doValidarLoginLDAPADM()){
		if (doValidarEmailExterno()) {
			return true;
			}
	}else{
		return false;
	}
}

function validarFormaCrear(){
	if (validarDatos()){
		$('#frmCrearUsuario').submit();
		return true;
	}else{
		bootbox.alert('Error al validar los datos del formulario.');
		return false;
	}
}

function validarDatosFormaValidar(){
	var login = $('#login').val();
	var p1 = document.getElementById("password").value;

	if (login.length == 0) {
		bootbox.alert("El Login no puede estar vac\u00EDo.");
		return false;
	}else if (p1.length == 0) {
		bootbox.alert("la contrase\u00F1a no puede estar vac\u00EDa.");
		return false;
	}else{
		$('#frmValidarUsuario').submit();
	}
}

function validarDatosFormaModificar(){
	if (doValidarClave()) {
		if (doValidarEmailExterno()) {
			return true;
			}
		else
			return false;
	}else{
		return false;
	}
}

function validarFormaModificar(){
	if (validarDatosFormaModificar()){
		$('#frmModificarUsuario').submit();
	}
}

var numeros="0123456789";
var letras="abcdefghyjklmnñopqrstuvwxyz";
var letras_mayusculas="ABCDEFGHYJKLMNÑOPQRSTUVWXYZ";

function tiene_numeros(texto){
	for(var i = 0; i < texto.length; i++){
		if (numeros.indexOf(texto.charAt(i),0)!=-1){
			return 1;
		}
	}
	return 0;
}

function tiene_letras(texto){
	texto = texto.toLowerCase();
	for(var i = 0; i < texto.length; i++){
		if (letras.indexOf(texto.charAt(i),0)!=-1){
			return 1;
		}
	}
	return 0;
}

function tiene_minusculas(texto){
	for(var i = 0; i < texto.length; i++){
		if (letras.indexOf(texto.charAt(i),0)!=-1){
			return 1;
		}
	}
	return 0;
}

function tiene_mayusculas(texto){
	for(var i = 0; i < texto.length; i++){
		if (letras_mayusculas.indexOf(texto.charAt(i),0)!=-1){
			return 1;
		}
	}
	return 0;
}

function seguridad_clave(clave){
	/*Criterios del Nivel de Seguridad:

	 *.Tiene letras y números: +30%
	 *.Tiene mayúsculas y minúsculas: +30%
	 *.Tiene entre 4 y 5 caracteres: +10%
	 *.Tiene entre 6 y 8 caracteres: +30%
	 *.Tiene más de 8 caracteres: +40%

	 */

	var seguridad = 0;
	if (clave.length!=0){
		if (tiene_numeros(clave) && tiene_letras(clave)){
			seguridad += 30;
		}
		if (tiene_minusculas(clave) && tiene_mayusculas(clave)){
			seguridad += 30;
		}
		if (clave.length >= 4 && clave.length <= 5){
			seguridad += 10;
		}else{
			if (clave.length >= 6 && clave.length <= 8){
				seguridad += 30;
			}else{
				if (clave.length > 8){
					seguridad += 40;
				}
			}
		}
	}
	return seguridad;
}

function muestra_seguridad_clave(clave, formulario){
	seguridad = seguridad_clave(clave);
	formulario.seguridad.value = seguridad + "% de seguridad.";
}

function permite(elEvento, permitidos) {
	// Variables que definen los caracteres permitidos
	var numeros = "0123456789";
	var caracteres = " abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
	var numeros_caracteres = numeros + caracteres;
	var teclas_especiales = [8, 37, 39, 46];
	// 8 = BackSpace, 46 = Supr, 37 = flecha izquierda, 39 = flecha derecha

	// Seleccionar los caracteres a partir del parámetro de la función
	switch(permitidos) {
		case 'num':
			permitidos = numeros;
			break;
		case 'car':
			permitidos = caracteres;
			break;
		case 'num_car':
			permitidos = numeros_caracteres;
			break;
	}

	// Obtener la tecla pulsada
	var evento = elEvento || window.event;
	var codigoCaracter = evento.charCode || evento.keyCode;
	var caracter = String.fromCharCode(codigoCaracter);

	// Comprobar si la tecla pulsada es alguna de las teclas especiales (teclas de borrado y flechas horizontales)
	var tecla_especial = false;
	for(var i in teclas_especiales) {
		if(codigoCaracter == teclas_especiales[i]) {
			tecla_especial = true;
			break;
		}
	}

	// Comprobar si la tecla pulsada se encuentra en los caracteres permitidos o si es una tecla especial
	return permitidos.indexOf(caracter) != -1 || tecla_especial;
}

function noEspacios() {
	var er = new RegExp(/\s/);
	var login = $('#login').val();
	if(er.test(login)){
		bootbox.alert('El Login no puede tener espacios');
		return false;
	}
		return true;
}
