// Tamano de pantalla  FINAL w x h  1920 x 1080
// Tamaño de prueba 393 x 700


SCREEN_DIM = [1920, 1080];
//H = 600;
H = 1080;

SCREEN_DIM_TEST = [H * (SCREEN_DIM[0] / SCREEN_DIM[1]), H];

factores = [SCREEN_DIM_TEST[0] / SCREEN_DIM[0], SCREEN_DIM_TEST[1] / SCREEN_DIM[1]];



debugging = true;

user_img_url = "";
user_name = "";
user_id = "";
first_user_scanned = false;
second_user_scaned = false;
waitingSecond = false;

first_user_name = '';
first_user_foto = '';

second_user_name = '';
second_user_foto = '';




can_izq = document.getElementById('canvas-izq');
can_der = document.getElementById('canvas-der');

/*


======================================================================================================================================================================================
======================================================================================================================================================================================
*/

tiempo_espera = 40000000; //4000 segundos


esperaFinal = 20 //15 segundos
/*
======================================================================================================================================================================================
======================================================================================================================================================================================
*/


show_concepto = false;

usuarios_anteriores = ['Juan','Andres','Pedrito','Marcela','Osiris'];

currentScreen = '';
currentEye = 1;

screensIds = ["s-inicial","s-elige","s-coloca","s-zoom","s-final"];


var mensaje_error = 'Salió mal la foto, ¿podrías repetirla?'; 
var mensaje_toma = 'Toca la cámara para fotografiar tu ojo.';

//var spriteTimer;
// Para el stream de video
var video;
var localStream;

var anterior = '';
var camId = '';




function setupApp(){

	// PREPARAMOS LA CAMARA PARA EVITAR RETRASOS

	// En este elemento <video> vamos a mostrar stream de webcam

		cargaCaras();

		windowW = $(window).width();
		windowH = $(window).height();





	var anchoReloj = windowW *.23;
    var altoReloj = windowW *.23;


    reloj = $('#timer1');
	reloj.width(anchoReloj);
    reloj.height(altoReloj);
    reloj.TimeCircles({ time: { Days: { show: false }, Hours: { show: false }, Minutes: { show: false } }});
    

		console.log("winW " + windowW + " winH " + windowH);


	ojitos = new SpriteCanvas({
    	framesPath : "assets_finales/ojitos_sprite",
	    canvas     : document.getElementById("personaje-animado"),
	    width      : $(window).width(),
	    height     : $(window).height(),
	    fps        : 30
    });

	ojitos.play();


	var zin = 0;
	var titulo_zindex = setInterval(function(){
		$('#titulo').css('z-index',zin);
		if(zin == 0){
			zin = 1;
		} else {
			zin = 0;
		}
	}, 500);





		$('#face1').width((windowW * 0.316) + 'px');
		$('#face1').height((windowW * 0.316) + 'px');


		$('#face2').width((windowW * 0.316) + 'px');
		$('#face2').height((windowW * 0.316) + 'px');


		// alto en % ($('#face2').height() / windowH) * 100;

		// Acomodar caras justo a la mitad
		// top (100 - (alto de cara  en porcentaje con respecto a alto))/2
		$('#caras').css('top', ((100 - (($('#face2').height() / windowH) * 100)) / 2) + '%');
		$('#video').css('top', ((100 - (($('#face2').height() / windowH) * 100)) / 2) + '%');


		
		// Caritas laterales 96px x 90px en 1920 x 1080
		
		$('.cara-lateral').width((windowW * 0.046) + 'px');
		$('.cara-lateral').height((windowW * 0.046) + 'px');

		$('.marco').width((windowW * 0.046) + 'px');
		$('.marco').height((windowW * 0.046) + 'px');

		$('#scan-rfid').width((windowW * 0.046) + 'px');
		$('#scan-rfid').height((windowW * 0.046) + 'px');



		$('#ojoizq-wrap').css('top', ((100 - (($('#face2').height() / windowH) * 100)) / 2) + '%');
		$('#ojoder-wrap').css('top', ((100 - (($('#face2').height() / windowH) * 100)) / 2) + '%');

		$('#ojoizq-wrap').width((windowW * 0.316) + 'px');
		$('#ojoizq-wrap').height((windowW * 0.316) + 'px');
		$('#ojoder-wrap').width((windowW * 0.316) + 'px');
		$('#ojoder-wrap').height((windowW * 0.316) + 'px');

/*
		$('#canvas-izq').width((windowW * 0.316) + 'px');
		$('#canvas-izq').height((windowW * 0.316) + 'px');
		$('#canvas-der').width((windowW * 0.316) + 'px');
		$('#canvas-der').height((windowW * 0.316) + 'px');*/

		$('#ojo').width((windowW * 0.316) + 'px');
		$('#ojo').height((windowW * 0.316) + 'px');



		// PANTALLA PARA TOMAR FOTO


		// Video para tomar la foto



		$('#video').width((windowW * 0.316) + 'px');
		$('#video').height((windowW * 0.316) + 'px');

		$("#videocam").width((windowW * 0.316) + 'px');
		$("#videocam").height((windowW * 0.316) + 'px');
		
		$("#videocanvas").width((windowW * 0.316) + 'px');
		$("#videocanvas").height((windowW * 0.316) + 'px');
		
		
		//obtener porcetjae de alto de contador respecto a windowH


		console.log('contadoor ' + $('#contador').height());

		console.log(100 * ($('#contador').height() / windowH));

		console.log(100 - (100 * ($('#contador').height() / windowH)));

		$('#contador').css('top', (100 - (100 * ($('#contador').height() / windowH))) + '%');
		// Canvas Dos iris

		$("#mix-eye").width((windowW * 0.316) + 'px');
		$("#mix-eye").height((windowW * 0.316) + 'px');
		
		screensIds.forEach(
			function(e){
				$("#" + e).css("display", "none");
			}
		);
}


/*

Cada pantala debe tener una funcion que maneje la interaacion de esa pantalla
CADA PANTALLA:
	@ efecto de entrada
	@ manejar funcionalidad
	@ efecto de salida

	+ Efecto de entrada (inTransition)
		@ entrada de los elementos

	+ Efecto de salida (outTransition)
		@ hace los efectos de salida y deja todo listo para los efectos de inTransition.

	+ La funcion escargada de brindar funcionalidad se ejecuta una vez que todos los elementos estan
		en su lugar, es decir, debe ser llamada dentro de inTransition.
	+ La funcion encargada de brindar funcionalidad en algun momento debe llamar a outTransition

*/
function cargaCaras(){

	usersIds = ['1', '2', '3', '4','5'];
	usersDivs = [];
	usersIds.forEach(function(e){
		usersDivs.push("<div id=" + e + " class='cara-lateral'></div>");
	});
	numUsers = usuarios_anteriores.length;

	img = "../usuarios_anteriores/ojo_usuario_";
	// Agregamos los divs

	for(i = 0; i < numUsers; i++){
		$("#wrapper").append(usersDivs[i]);
	}
	// Agregamos los <img>
	i = 1;
	usersIds.forEach(function(e){
		$("#" + e).append("<img src='../assets_finales/marco.png' class='marco seleccionable'>");
		$("#" + e).append("<img src='" + img + i + ".png' class='circular2'>");
		i++;
	});

}

function inTransition(pantalla, funcionalidad){
	switch(pantalla){
		case 's-inicial':
			currentScreen = 's-inicial';
			$('#s-inicial').show();
			$('#titulo').fadeIn(1500, function(){
				$('.icono-rfid').fadeIn();
				funcionalidad();

			});

			
			break;

		case 's-elige':
			currentScreen = 's-elige';
			
			$("#face1 > img").attr("src", first_user_foto);
			$(".nom1 > span").text("¡Hola, " + first_user_name + '!');


			$('#s-elige').fadeIn();


			// Primero aparecen ciruclos
			$('#caras').fadeIn(1000, function(){
				$('#flechita').fadeIn(500);
				$('#invita-amigo').fadeIn(800);
				// Lista de usuarios
				$('#lista-usuarios').fadeIn(800, function(){			
					$('.terminar-esquina').fadeIn(800, function(){
					
						setTimeout(function(){
							funcionalidad();
						}, 100)
					});
					
				});

			});

			break;

		case 's-zoom':
			currentScreen = 's-zoom';
			$('#s-zoom').fadeIn();
			$('.nombres').fadeIn(500);
			$('#ojos').fadeIn(400, function(){
				$('#slider').fadeIn(400);
				$('#barra').fadeIn(400, function(){
					$('#inst4').fadeIn();
					$('#manita').fadeIn(200, function(){
						animacion_manita(funcionalidad);
					});
					
				})
			});
			//$('#s-zoom').fadeIn(1000, function(){
				
			//});
			break;

		case 's-final':
			currentScreen = 's-final';
			$('#s-final').fadeIn();
			$('#texto-final').fadeIn(function(){
				$('#ojo').fadeIn(function(){
					funcionalidad();
				});
			})
			break;

		case 'concepto':
			show_concepto = true;
			$('.blur-background').fadeIn(function(){
				$("#concepto").fadeIn(function(){
					funcionalidad();
				});
			});
			break;

		case 'sigues-ahi':
			currentScreen = 'sigues-ahi';
			$('#black-background').fadeIn(function(){
				$('#sigues-ahi').fadeIn();
				$('#timer1').fadeIn(function(){
					$('#sigues-ahi > span').fadeIn(function(){
						funcionalidad();
					});
				});
			});
			break;

		case 'salir':
			currentScreen = 'salir';
			$('#black-background2').fadeIn(function(){
				$('#salir').fadeIn(function(){
					funcionalidad();
				});
			});
			break;
	}

}


	
function animacion_manita(callback){
	var origen = $("#manita").css('left');
	var origen_s = $('#slider').css('left');
	console.log('origen manita ' + origen);
	console.log('origen slider ' + origen_s);
	

	var ancho = $('#barra').width();
	$('#manita').animate({left: (parseFloat(origen) + parseFloat(ancho)) + 'px'}, 1500, function(){
		$('#manita').animate({left: parseFloat(origen) + 'px'}, 1500, function(){
			$('#manita').fadeOut();
		});
	});

	
	$('#slider').animate({left: (parseFloat(origen_s) + parseFloat(ancho)) + 'px'}, 1500, function(){
		$('#slider').animate({left: parseFloat(origen_s) + 'px'}, 1500, function(){
			callback();
		});
	})

}

function outTransition(pantalla, funcion){
	anterior = pantalla;
	switch(pantalla){
		case 's-inicial':
			$('#s-inicial').fadeOut(1500, function(){
				restoreScreen('s-inicial')
				funcion();
			});
			
			break;

		case 's-elige':
			$('#s-elige').fadeOut(1000, function(){
				restoreScreen('s-elige');
				funcion();		
			});
			break;

		case 's-zoom':
			$('#s-zoom').fadeOut(1000, function(){
				restoreScreen('s-zoom');
				funcion();		
			});
			break;

		case 's-final':
			$('#s-final').fadeOut(1000, function(){
				restoreScreen('s-final');
				funcion();		
			});
			break;

		case 'concepto':
			show_concepto = false;
			$('#concepto').fadeOut(1000);
			$('.blur-background').fadeOut(1000, function(){
				restoreScreen('concepto');
				currentScreen = 's-elige';
				funcion();
			});
			

			break;

		case 'sigues-ahi':
			$('#sigues-ahi').fadeOut(300, function(){
				$('#black-background').fadeOut(200, function(){
					restoreScreen('sigues-ahi');
					funcion();
				});
			});
			break;

		case 'salir':
			
			$('#salir').fadeOut(200, function(){
				$('#black-background2 ').fadeOut(200, function(){
					restoreScreen('salir');
					funcion();
				});
			});
			break;
	}
}

function restoreScreen(pantalla){
	switch(pantalla){
		case 's-inicial':
			$('#titulo').css('display', 'none');
			$('.icono-rfid').css('display', 'none');
			break;

		case 's-elige':
			$("#boton1").css('display','none');
			$('#boton1 > img').attr('src', '../assets_finales/continuar1.png');

			$('#face2 > img').attr('src', '../assets_finales/elige-parecidos_608_608.png');
			// Primero aparecen ciruclos
			$('#caras').hide();

			$('#flechita').hide();

			// Lista de usuarios
			$('#lista-usuarios').hide();

			// boton de rfid
			$('#invita-amigo').hide();

			//$('.terminar-esquina').hide();
			break;

		case 's-zoom':
			$('#inst5').css('display','none');
			$('#barra').css('display','none');
			$('#toca_terminar').hide();
			$('#terminar').attr('src', '../assets_finales/terminar1.png');
			$('.terminar-esquina').css('display','none');
			$('#slider').css('left', ($(window).width() * 0.305) + 'px');
			//can_izq.getContext('2d').restore();
			//can_der.getContext('2d').restore();
			$('#canvas-izq').css('-webkit-transform', 'scale(1,1)');
			$('#canvas-der').css('-webkit-transform', 'scale(1,1)');
			break;

		case 's-final':

			$('#reiniciar').attr('src','../assets_finales/reiniciar1.png');		
			break;

		case 'concepto':
			$('#continuar_1').attr('src', '../assets_finales/continuar_ov1.png');
			break;

		case 'sigues-ahi':
			break;

		case 'salir':
			$("#si").attr('src','../assets_finales/si1.png');
			$("#no").attr('src','../assets_finales/no1.png');
			break;
	}
}


/*
Funcion para S-INICIAL
Para manejar la entrada del usuario
*/


var primer_usuario = true;

function waitUser(){
var a;
	console.log("funcion waitUser");
	$(".icono-rfid > img").click(function(){
		clearInterval(a);
		console.log("yaaa");
		$(this).off('click');
		first_user_scanned = true;
		first_user_name = 'Fernanda';
		first_user_foto = '../img/faces/face.jpg';
		//usuarios_anteriores[currentEye - 1] = first_user_name;
		outTransition('s-inicial', function(){
			inTransition('s-elige', segunda);
		});
	});

	a = setInterval(function(){
		if(first_user_scanned){
			first_user_name = user_name;
			first_user_foto = user_img_url;
			//usuarios_anteriores[currentEye - 1] = user_name;
			console.log('here');
			clearInterval(a);
			//first_user_scanned = false;
			outTransition('s-inicial', function(){
				inTransition('s-elige', segunda);
			});
			
		}
	}, 200);
}

/*

 Brinda funcionalidad a la pantalla de elegir foto

*/

function segunda(){

	console.log('segunda!');
	// Debemos aparecer la ventana de concepto

	ya = false;
	inTransition('concepto', function(){
		$('#continuar_1').click(function(){
			if(ya == true){
				return;
			}
			ya = true;


			$(this).off('click');
			$(this).attr('src', '../assets_finales/continuar_ov2.png');


			//Cambiamos el saludo por el puro nombre
			setTimeout(function(){
				$('.nom1 > span').fadeOut(200, function(){
					$(this).text(first_user_name);
					$(this).fadeIn(200);
				})
			}, 1000);

			outTransition('concepto', function(){

				waitSelection();
			});
						
		});
	});

}


/*

Brinda funcionalidad a la pantalla para ELEGIR FOTO

*/
function waitSelection(){

	console.log("waiting selection!");


	var an;

		waitScan = false;
		userSelected = false;
		ojo_elegido = '';

		// Click en alguna cara

		$(".seleccionable").click(function(){

			userSelected = true;
			waitScan = false;	
			second_user_scaned = false;

			// Desaparecemos flecha
			$('#flechita').fadeOut();

			// Mostramos la foto en grande
			$("#face2 > img").attr("src", $(this).next().attr("src"));

			// La metemos de una vez al canvas

			/*
			canvasD = document.getElementById('canvas-der');
			canvasD.getContext('2d').drawImage(document.getElementById('ojo2'), 0,0, canvasD.width, canvasD.height);

			console.log("dibuje imagen en canvas der");
			*/
			// Mostramos el texto
			// Este nombre como lo obtengo

			console.log('click a ' + (parseInt($(this).parent().attr("id")) - 1));
			$(".nom2 > span").text(usuarios_anteriores[parseInt($(this).parent().attr("id")) - 1]);

			// Aparezco boton
			$('#boton1').fadeIn(400);

			// Obtengo src de la imagen para ZOOM
			ojo_elegido = $(this).next().attr('src');


		});

		$("#invita-amigo").click(function(){
			
			waitScan = true;
			userSelected = false;
			waitingSecond = true;
			second_user_scaned = false;

			// Desparece flechita
			$('#flechita').fadeOut();
			
			//Desaparecemos boton de continuar si esta
			$('#boton1').fadeOut(400);

			// Actualizamos texto arriba de cara 2
			$('.nom2 > span').text('Pasa aquí en brazalete de tu amigo');
			
			// Actualizmos imagen ciruclo grande 2
			$("#face2 > img").attr("src","../assets_finales/amigo-parecidos_608_608.png");
			
			// Esperamos el escaneo
			var an = setInterval(function(){
				console.log('esperando scan de segundo');
				if(waitScan === false){
					clearInterval(an);
				}

				if(second_user_scaned){
					waitingSecond = false;

					second_user_name = user_name;
					second_user_foto = user_img_url;

					// Actualizamos datos con el usuario escaneado

					// Imagen

					$("#face2 > img").attr("src", second_user_foto);
					
					// Nombre
					$(".nom2 > span").text(second_user_name);

					//Aparecemos boton
					$("#boton1").fadeIn();
					
					
					clearInterval(an);
				}
			}, 200);
		});

		$("#boton1 > img").click(function(){
			$("#boton1 > img").attr('src', '../assets_finales/continuar2.png');
			// Debo desactivar los clicks
			// #boton1
			// .seleccionable
			// #invita-amigo

			$("#boton1 > img").off("click");
			$(".seleccionable").off("click");
			$("#invita-amigo").off("click");
			
			
			if(userSelected){

				outTransition('s-elige', function(){
					inTransition('s-zoom', function(){
						//takePictures(1, ojo_elegido);
					});
				});
			
			}

			if(second_user_scaned){
				outTransition('s-elige', function(){
					inTransition('s-zoom', function(){
						$("#boton1").off("click");
						$(".seleccionable").off("click");
						$("#invita-amigo").off("click");
						//takePictures(2, '');
					});
				});
				
			}
		});
}



var cI;
var cD;
var imI;
var imD;

function mainInteraction(fotos, canvasI, canvasD){
	console.log("listo para zoom!");
	console.log(fotos[0]);
	console.log(fotos[1]);

/*
	$("#canvas-izq").attr("width", $("#ojoizq-wrap").width());
	$("#canvas-izq").attr("height", $("#ojoizq-wrap").height());

	$("#canvas-der").attr("width", $("#ojoder-wrap").width());
	$("#canvas-der").attr("height", $("#ojoder-wrap").height());
*/
	var im1 = new Image;
	im1.src = fotos[0];//'http://phrogz.net/tmp/gkhead.jpg';

	var im2 = new Image;
	im2.src = fotos[1];

	//putReady(canvasI, im1);
	//putReady(canvasD, im2);


	cI = canvasI;
	cD = canvasD;
	imI = im1;
	imD = im2;

	var primera = true;

	escuchaDrag('slider');

	// Boton de t4rminar
	
	$("#terminar").click(function(){
		//cI.getContext('2d').restore();
		//cD.getContext('2d').restore();
		$(this).attr('src', '../assets_finales/terminar2.png');
		console.log("click en terminar");

		$('#terminar').off('click');

		terminaApp();
	});	
}


var sl_inicial;
var sl_final;
var sl_x;
var sl_y;
var dragging = false;

var total;

// Esta var va desde 0 a total
var pos_anterior = 0;

var acumulador = 1;

function escuchaDrag(id){
	/*
	document.getElementById(id).addEventListener('mousestart', tStart);
	document.getElementById(id).addEventListener('mousemove', tMove);
	document.getElementById(id).addEventListener('mouseend', tEnd);
	*/
	
	setInterval(function(){
		console.log($('#slider').css('left') + $('#slider').css('top'));
	},100);
	
	sl_inicial = parseFloat($('#slider').css('left'));
	sl_final = sl_inicial + parseFloat($('#barra').width());
	total = sl_final - sl_inicial;
	
	document.getElementById(id).addEventListener('dragstart', tDragStart, false);
	document.getElementById(id).addEventListener('drag', tDrag, false);
	document.getElementById(id).addEventListener('dragend', tDragEnd, false);
}

function tDragStart(e){
	dragging = true;
	e.dataTransfer.effectAllowed = "move";
	e.dataTransfer.dropEffect = 'move';

 	var crt = this.cloneNode(true);
    crt.style.backgroundColor = "red";
    crt.style.visibility = "hidden";
    e.dataTransfer.setDragImage(crt, 0, 0);
}


var primer_drag = true;

function tDrag(e){
	console.log("drag x  " + e.clientX  + ' Y ' + e.clientY );

	if(dragging){

		if(primer_drag){
			primer_drag = false;
			$('#terminar').fadeIn();
			$('#toca_terminar').fadeIn();

			setTimeout(function(){
				$('#inst4').fadeOut();
			}, 2000);
		}
		if(sl_inicial <= e.clientX  && e.clientX <= sl_final){
			$('#slider').css('left', e.clientX + 'px');
			console.log("aquii   " + (e.clientX - sl_inicial));
			

			// Primero mapear e.clientX a [0,1]

			valor_m = (e.clientX - sl_inicial) / (sl_final - sl_inicial);
			//doZoom(valor_m);

	

		} 
		if(e.clientX < sl_inicial){
			$('#slider').css('left', sl_inicial + 'px');
		}
		if(e.clientX > sl_final){
			$('#slider').css('left', sl_final + 'px');	
		}
	}
}
function tDragEnd(e){
console.log(e.dataTransfer.dropEffect + '   JJJJJJEAAN!');
	if(dragging){
		dragging = false;
		if(sl_inicial <= e.clientX  && e.clientX <= sl_final){
			$('#slider').css('left', e.clientX + 'px');
		} 
		if(e.clientX < sl_inicial){
			$('#slider').css('left', sl_inicial + 'px');
		}
		if(e.clientX > sl_final){
			$('#slider').css('left', sl_final + 'px');	
		}
	}
}

function tStart(e){
	console.log(e);
}
function tMove(e){
	console.log(e);
}
function tEnd(e){
	console.log(e);
}



/*
CAMBIOS AQUI
======================================================================================================================================================================================
======================================================================================================================================================================================
======================================================================================================================================================================================
======================================================================================================================================================================================
*/
function terminaApp(){
	console.log('termina App!');

		console.log("terminando app");
		//uneOjos();

		outTransition('s-zoom', function(){
			inTransition('s-final', function(){
				



				var t = esperaFinal;
				var a = setInterval(function(){
					if(t == 0){
						// Reiniciar variables de control de usuarios
						reiniciaApp();
						outTransition('s-final', function(){
							inTransition('s-inicial', function(){
								waitUser();
							})
						});						
						clearInterval(a);
					}
					t--;
				}, 1000);
				$('#reiniciar').click(function(){
					$(this).attr('src','../assets_finales/reiniciar2.png');
					$(this).off('click');
					reiniciaApp();
					outTransition('s-final', function(){
						inTransition('s-inicial', function(){
							waitUser();
						})
					});		
					clearInterval(a);
				});
			});
		});

}

function reiniciaApp(){
	user_img_url = "";
	user_name = "";
	user_id = "";
	first_user_scanned = false;
	second_user_scaned = false;
	waitingSecond = false;
	anterior = '';

	$('.nom1 > span').text('');
	$('.nom2 > span').text('');


		
}






function recorreFotos(){
	for(var user = 5; user > 1; user--){
		cara_anterior = $("#" + (user - 1) + " :first").next().attr("src");
		$('#' + user + ' :first').next().attr('src', cara_anterior);
		//$("#" + (user - 1) + " :first").next().attr("src"),canvas.toDataURL());//'../usuarios_anteriores/ojo_usuario_' + currentEye + '.png');
	}

}


function cleanData(data){
	id_pulsera = data.replace("\u0002", "").replace("\r", "").replace("\u0003","");
	return id_pulsera;
};


/*
function requestUserData(id_pulsera){
	$.getJSON('http://artehum.com.mx/hot/datos.php', { get_param: 'value' }, function(data) {
			$.each(data, function(index, element) {
				if (element.idpul === id_pulsera) {
	    			
	    			if(first_user_scanned && waitingSecond){
	    				second_user_scaned = true;
	    			}		
					// AQUI HACES LO NECESARIO CON TUS DATOS
	    			user_img_url = element.foto;
	    			user_name = element.nombre;
	    			user_id = element.id;
	    			console.log("id: " + user_id + " nombre: " + user_name + " url_foto: " + user_img_url);
	   				first_user_scanned = true;
	   				console.log("regrsé user!");

	   				//return [element.id, element.nombre, element.foto];

	   				}
				});
			});
};
*/
function requestUserData(id_pulsera){
         $.getJSON('http://artehum.com.mx/hot/usuario.php?rfid='+id_pulsera, { get_param: 'value' }, function(data) {
                 $.each(data, function(index, element) {
                     
	    				if(first_user_scanned && waitingSecond){
		    				second_user_scaned = true;
		    			}		
						// AQUI HACES LO NECESARIO CON TUS DATOS
		    			user_img_url = element.foto;
		    			user_name = element.nombre;
		    			user_id = element.id;
		    			console.log("id: " + user_id + " nombre: " + user_name + " url_foto: " + user_img_url);
		   				first_user_scanned = true;
		   				console.log("regrsé user!");
                         // AQUI HACES LO NECESARIO CON TUS DATOS
/*
                         user_img_url = element.foto;
                         user_name = element.nombre;
                         user_id = element.id;
                         rfid = id_pulsera;*/

                         /*
                         if(user_id == null){
                           $('#noUsuario').fadeIn().delay(3000).fadeOut();
                         }else{
                            $('#titulo').fadeOut();
                            $('#rfid').fadeOut();
                            $('#inicio').fadeIn();
                            $('#userData').fadeIn();
                            $('#userScreen').fadeIn();
                            $('#saludo').append(' ' + user_name + '!');
                            $('#foto').attr('src',user_img_url);
                            serialPort.close();

                         }*/

                         console.log(id_pulsera)
                         console.log("id: " + user_id + " nombre: " + user_name + " url_foto: " + user_img_url + "rfid" + rfid);
                         first_user_scanned = true;
                         console.log("Vientos usuario!");

                            //return [element.id, element.nombre, element.foto];

                            
                     });
                 });
     };


function checkLastInteraction(){
	var d = new Date();
	var ultima_vez = d.getTime();

	// Cambiar el evento a mousemove
	document.addEventListener('mousedown', function(){
		ultima_vez = d.getTime();
		console.log("ultima vez " + ultima_vez);
	});

	var checker = setInterval(
		function(){
			d = new Date();
			if((d.getTime() - ultima_vez) > tiempo_espera && currentScreen != 's-inicial' && currentScreen != 's-final' && currentScreen != 'sigues-ahi'){
				anterior = currentScreen;

				

				console.log(currentScreen + ' aaa');
				// Entra la pantalla de sigues ahi
				
				inTransition('sigues-ahi', function(){
					esperaInteraccion(anterior);
				});

			}
		}
	, 100);

}

/*
	El usuario no ha tocado pantalla y la pantalla actual es sigues-ahi
	Necesito saber cual era la pantalla anterior
*/
function esperaInteraccion(anterior){


    //spriteTimer.play();

    reloj.TimeCircles().start();

    t = 9;
	var espera = setInterval(function(){
		if(t == 0){
			reloj.TimeCircles().stop();
			clearInterval(espera);
			console.log(anterior + '    aaant');
			if(show_concepto){
					console.log("anterior concepto!!");
					outTransition('concepto', function(){});
					//outTransition('s-elige', function(){});
			}
			outTransition('sigues-ahi', function(){});
			$('.terminar-esquina').fadeOut();
			outTransition(anterior, function(){
				reiniciaApp();
				inTransition('s-inicial', waitUser);
			});
			
		}
		t--;
	}, 970);

	$('#sigues-ahi').click(function(){
		clearInterval(espera);
		
		//spriteTimer.stop();
		outTransition('sigues-ahi', function(){
			currentScreen = anterior;
		})
		$(this).off('click');
	});	
}

function checkLogout(){
	
	$('#logout').click(function(){
		pantalla_anterior = currentScreen;
		$(this).attr('src', '../assets_finales/salida2.png');
		console.log('click salir anterior ' + pantalla_anterior);
		inTransition('salir', function(){
			$('#si').click(function(){
				$(this).off('click');
				$('#logout').fadeOut();
				$("#logout").attr('src', '../assets_finales/salida1.png');
				$(this).attr('src','../assets_finales/si2.png');
				outTransition('salir', function(){});
				/*
				if(pantalla_anterior === 's-zoom'){
					can_izq.getContext('2d').restore();
					can_der.getContext('2d').restore();
				}*/
				if(show_concepto){
					console.log("anterior concepto!!");
					outTransition('concepto', function(){});
					//outTransition('s-elige', function(){});
				}
				outTransition(pantalla_anterior, function(){
					reiniciaApp();

					inTransition('s-inicial', waitUser);
				});
			});
			$('#no').click(function(){
				$(this).off('click');
				$("#logout").attr('src', '../assets_finales/salida1.png');
				$(this).attr('src','../assets_finales/no2.png');
				outTransition('salir', function(){
					currentScreen = pantalla_anterior;
				});
			});
		});
	});

}

$(document).ready(function(){
	/*
	for(module in global.require.cache){
    	if(global.require.cache.hasOwnProperty(module)){
        	delete global.require.cache[module];
    	}
	}
location.reload()
*/
	setupApp();
	inTransition('s-inicial', waitUser);
	checkLastInteraction();
	checkLogout();
	

		$(window).on('resize', function(){
      var win = $(this); //this = window
      $('#face1').width((win.width() * 0.316) + 'px');
      $('#face1').height((win.width() * 0.316) + 'px');
      $('#face2').width((win.width() * 0.316) + 'px');
      $('#face2').height((win.width() * 0.316) + 'px');

      $('.cara-lateral').width((win.width() * 0.046) + 'px');
      $('.cara-lateral').height((win.width() * 0.046) + 'px');

      $('.marco').width((win.width() * 0.046) + 'px');
      $('.marco').height((win.width() * 0.046) + 'px');

      $('#scan-rfid').width((win.width() * 0.046) + 'px');
	$('#scan-rfid').height((win.width() * 0.046) + 'px');


});

			// Primero obtenemos la lista de puertos de la computadora
		// ejecutando el comando ls /dev/tty.* 
		var exec = require('child_process').exec;
		var child = exec("ls /dev/tty.*", 
			function(error, stdout, stderr){
				datos = stdout.split("\n");

				// Para cada puerto hacemos una busqueda de
				// aquellos que contengan la cadena "usb"
				// Esto podría cambiarse por un 'filter' para que no
				// inicialice puertos de más.
				datos.forEach(
					function(puertoS){
						if(puertoS.indexOf("usb") > -1){
							// creamos objeto puerto
							serialport = new serialPort(puertoS, 
								
								// Función manejadora de los
								// datos leidos del puerto serial.

								function(dataRecieved){
									if(!first_user_scanned){
										requestUserData(cleanData(dataRecieved));
									}
									if(first_user_scanned && waitingSecond){
										requestUserData(cleanData(dataRecieved));
									}	
								}
							);
							// Lo inicializamos
							serialport.init();
						}
					}
				);
			}
		);

/*
var aa = setInterval(function(){
	console.log("anteriooor "+ anterior);
	console.log("currentScreen " + currentScreen);
}, 1000);

*/

});
