// Tamano de pantalla  FINAL w x h  1920 x 1080
// Tamaño de prueba 393 x 700


SCREEN_DIM = [1920, 1080];
H = 600;
//W = 281
SCREEN_DIM_TEST = [H * (SCREEN_DIM[0] / SCREEN_DIM[1]), H];

factores = [SCREEN_DIM_TEST[0] / SCREEN_DIM[0], SCREEN_DIM_TEST[1] / SCREEN_DIM[1]];



debugging = true;

user_img_url = "";
user_name = "";
user_id = "";
first_user_scanned = false;
second_user_scaned = false;
waitingSecond = false;

usuarios_anteriores = ["user1", "user2", "user3", "user4", "user5"];


function cleanData(data){
	id_pulsera = data.replace("\u0002", "").replace("\r", "").replace("\u0003","");
	return id_pulsera;
};

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


function toP(pixeles, cual){
	switch(cual){
		// Width
		case 0:
			return (pixeles / SCREEN_DIM[0]) * 100;
			break;
		// Height
		case 1:
			return (pixeles / SCREEN_DIM[1]) * 100;
			break;
	}

}
function appManager(screensIds){

	this.currentEye = 1;
	this.currentScreen;
	this.init = function(){
		this.setupApp();
		this.currentScreen = screensIds[0];
		this.waitUser();
		tah = this;
		
	}

	this.setupApp = function(){


		windowW = $(window).width();
		windowH = $(window).height();

		console.log("winW " + windowW + " winH " + windowH);
		//$('.screen').width(windowW);
		//$('.screen').height(windowH);



		//$('#icono-rfid > img').width((116 * factores[0]) + 'px');
		//$('#icono-rfid > img').height((108 * factores[1]) + 'px');

		// CONCEPTO
		// overlay
		/*
		$('#instruccion').width((684 * factores[0]) + 'px');
		$('#instruccion').height((338 * factores[1]) + 'px');
		// Boton continuar
		$('#loading-img').width((169 * factores[0]) + 'px');
		$('#loading-img').height((60 * factores[1]) + 'px');

		// PANTALLA ELIGE OJO

		// Ciruclos de usuarios 608px x 608px en 1920 x 1080
		// 608 / 1920 = 0.31

		//$('#face1').width((windowW * 0.31) + 'px');
		//$('#face1').height((windowW * 0.31) + 'px');

		$('#face1').width((608 * factores[0]) + 'px');
		$('#face1').height((608 * factores[1]) + 'px');


		$('#face2').width((608 * factores[0]) + 'px');
		$('#face2').height((608 * factores[1]) + 'px');		

		//$('#face2').width(toP(608 * factores[0], 0) + '%');
		//$('#face2').height(toP(608 * factores[1], 1) + '%');		


		// SIGNO MAS

		$('#plus-img > img').width((90 * factores[0]) + 'px');
		$('#plus-img > img').height((90 * factores[1]) + 'px');


		// Boton terminar esquina
		$('.terminar-esquina').width((60 * factores[0]) + 'px');
		$('.terminar-esquina').height((60 * factores[1]) + 'px');

		// escanea amigo
		$('#scan-rfid').width((76 * factores[0]) + 'px');
		$('#scan-rfid').height((70 * factores[1]) + 'px');



		// Caritas laterales 76px x 80px en 1920 x 1080

		$('.cara-lateral').width((windowW * 0.039) + 'px');
		$('.cara-lateral').height((windowW * 0.041) + 'px');

		$("#ojoizq-wrap").css("width", $("#ojo-izq").height());
		$("#ojoizq-wrap").css("height", $("#ojo-izq").height());
		$("#ojoder-wrap").css("width", $("#ojo-izq").height());
		$("#ojoder-wrap").css("height", $("#ojo-izq").height());


		// linea de separacion 'barrita'
		$('#barrita').width((76 * factores[0]) + 'px');
		$('#barrita').height((2 * factores[1]) + 'px');

		// boton continuar 169 x 60 en pantalla final
		// escala w 0.08 h 0.05
		$('#boton1 > img').width((169 * factores[0]) + 'px');
		$('#boton1 > img').height((60 * factores[1]) + 'px');		


		// PANTALLA PARA TOMAR FOTO


		$('#inst3').width((595 * factores[0]) + 'px');
		$('#inst3').height((98 * factores[1]) + 'px');
		// Video para tomar la foto

		$("#video").css("width", (608 * factores[0]) + 'px');
		$("#video").css("height", (608 * factores[1]) + 'px');
		
		$("#videocam").css("width", (608 * factores[0]) + 'px');
		$("#videocam").css("height",(608 * factores[1]) + 'px');
		
		$("#videocanvas").css("width", (608 * factores[0]) + 'px');
		$("#videocanvas").css("height", (608 * factores[1]) + 'px');
		
		//SIlueta

		$('#silueta').width((608 * factores[0]) + 'px');
		$('#silueta').height((608 * factores[1]) + 'px');


		$('#camara-img > img').width((106 * factores[0]) + 'px');
		$('#camara-img > img').height((98 * factores[1]) + 'px');


		// CONTADOR
		$('#contador').width((349 * factores[0]) + 'px');
		$('#contador').height((65 * factores[1]) + 'px');

		

		$('#sliderr').width((652 * factores[0]) + 'px');

		// Barra para hacer zoom

		$('#barra').width((652 * factores[0]) + 'px');
		$('#barra').height((21 * factores[1]) + 'px');

		$('#bar').width((38 * factores[0]) + 'px');
		$('#bar').height((38 * factores[1]) + 'px');

		// Canvas Dos iris

		$("#mix-eye").attr('width', (608 * factores[0]) + 'px');
		$("#mix-eye").attr('height', (608 * factores[1]) + 'px');

		
		$('#terminar').width((169 * factores[0]) + 'px');
		$('#terminar').height((60 * factores[1]) + 'px');


*/


		
		screensIds.forEach(
			function(e){
				if(e !== "s-inicial"){
					$("#" + e).css("display", "none");
					//$("#" + e).css("opacity", "0");
				}
			}
		);

	};

	this.waitUser = function(){
		that = this;
		$("#icono-rfid > img").click(function(){
			$(this).off('click');
			that.begin(that);
		});
		a = setInterval(function(){
			if(first_user_scanned){
				//first_user_scanned = false;
				that.begin(that);
				clearInterval(a);
			}
		}, 200);
	};

	this.begin = function(context){
		
		this.currentScreen = 's-concepto';

		that = this;

		$("#" + screensIds[0]).fadeOut( function(){

			//$('#s-elige').fadeIn();

			//Ocultamos primera pantalla
			
			//$(this).css("opacity",0);
			//$(this).css("display", "none");
			
			//Cargamos datos a la segunda pantalla

			$("#face1 > img").attr("src",user_img_url);
			$("#cara1 > h3").text("Hola " + user_name);

			console.log("AAAAA  ");

			//Mostramos segunda pantalla

			//Primero display ya que opcacidad es 0
			$("#" + screensIds[1]).fadeIn(function(){
				$('.blur-background').fadeIn();
				$("#concepto").fadeIn(function(){
					$('#loading-img').click(function(){

						that.currentScreen = 's-elige';

						$('.blur-background').fadeOut();
						$('#loading-img').off('click');
						$(this).attr('src', '../assets/continuar-ws2_169_60.png');
						
						$('#concepto').fadeOut(function(){
							$('#s-elige').fadeIn(function(){
								that.waitSelection();
							});
						});
						
					});

				});
			});

			
		});
	};

	this.waitSelection = function(){
		var an;

		waitScan = false;
		userSelected = false;
		user_ojo_url = '';
		$(".seleccionable").click(function(){
			userSelected = true;
			waitScan = false;	


			second_user_scaned = false;
			//$("#boton1").text("continuar");
			$("#face2 > img").attr("src", $(this).attr("src"));
			$("#cara2 > span").text($(this).parent().attr("id"));

			user_ojo_url = $(this).attr('src');

			//Mostramos la foto en grande y el boton
			// de continuar
			console.log("click al " + $(this).parent().attr("id"));
			$("#boton1").css("opacity","0");
			$("#boton1").css("display","block");
			$("#boton1").animate({opacity: 1}, 500);

		});

		$("#invita-amigo").click(function(){
			//Desaparecemos boton de continuar si esta
			
			$("#boton1").animate({opacity: 0}, 300, function(){
				$("#boton1").css("display", "none")
			});

			waitScan = true;
			userSelected = false;

			waitingSecond = true;
			second_user_scaned = false;

			console.log("Quiero invitar a un amigo");
			$("#face2 > img").attr("src","../assets/amigo-parecidos_608_608.png");
			$("#cara2 > span").text("Invita a un amigo");

			var an = setInterval(function(){
				console.log("x");
				if(waitScan === false){
					clearInterval(an);
				}

				if(second_user_scaned){
					console.log("usuario 2 escaneado");
					// Actualizamos datos con el usuario escaneado
					$("#face2 > img").attr("src",user_img_url);
					$("#cara2 > h3").text(user_name);

					//AParecemos boton
					$("#boton1").css("opacity","0");
					$("#boton1").css("display","block");
					$("#boton1").animate({opacity: 1}, 500);
					
					waitingSecond = false;
					clearInterval(an);
				}
			}, 200);
		});

		$("#boton1 > img").click(function(){
			// Debo desactivar los clicks
			// #boton1
			// .seleccionable
			// #invita-amigo

			$("#boton1 > img").off("click");
			$(".seleccionable").off("click");
			$("#invita-amigo").off("click");
			
			$(this).attr('src', '../assets/continuar-ws2_169_60.png');
			if(userSelected){

				$('#s-elige').fadeOut(function(){
					$('#s-coloca').fadeIn(function(){
						that.takePictures(1, user_ojo_url);
					});
				});

				/*
				$("#s-elige").animate({opacity: 0}, 300, function(){
					$("#s-elige").css("display","none");
					
					$("#s-coloca").css("opacity","0");
					$("#s-coloca").css("display", "block");

					$("#s-coloca").animate({opacity: 1}, 300, function(){
						
						


					});
				});
*/
				
			}

			if(second_user_scaned){
				
				$('#s-elige').fadeOut(function(){
					$('#s-coloca').fadeIn(function(){
						that.takePictures(2, '');
						$("#boton1").off("click");
						$(".seleccionable").off("click");
						$("#invita-amigo").off("click");
					});
				});
				
				/*
				$("#s-elige").animate({opacity: 0}, 300, function(){
					$("#s-elige").css("display","none");

					$("#s-coloca").css("opacity","0");
					$("#s-coloca").css("display", "block");

					$("#s-coloca").animate({opacity: 1}, 300, function(){
						
						that.takePictures(2, '');

						$("#boton1").off("click");
						$(".seleccionable").off("click");
						$("#invita-amigo").off("click");
					});
				});
				*/
			}
		});
	};

	/*
	PAra la pantalla de TOMAR FOTOS
	Regresa un arreglo con la url de la foto del ojo

	*/
	this.takePictures = function(n, user_ojo_url){
		

		$('#cam').fadeIn();

		this.currentScreen = 's-coloca';
		that = this;
		fotosCorrectas = 0;
		fotos = [];
		
		
		var video = document.getElementById('videocam');
		videoObj = { "video": true };
		errBack = function(error) {
			console.log("Video capture error: ", error.code); 
		};


		navigator.getUserMedia  = navigator.getUserMedia ||
		                          navigator.webkitGetUserMedia ||
		                          navigator.mozGetUserMedia ||
		                          navigator.msGetUserMedia;

		var localStream;
		if(navigator.getUserMedia) {
			var webcam  = navigator.getUserMedia(videoObj, function(stream){
				video.src = window.URL.createObjectURL(stream);
				localStream = stream;
			}, errBack);
		}
		
/*
		if(debugging){
							canvas = document.getElementById('videocanvas');
							context = canvas.getContext('2d');
							var tracker = new tracking.ObjectTracker(['eye']);
							
							//numOjos = 0;

							tracker.setInitialScale(4);
							tracker.setStepSize(2);
							tracker.setEdgesDensity(0.1);
							//tracking.track('#img-canvas', tracker, { camera: true });
							tracking.track('#videocam', tracker);
							  
							tracker.on('track', function(event) {

							    if(event.data.length > 0){
							    	//numOjos = event.data.length;
								    context.clearRect(0, 0, canvas.width, canvas.height);

								    event.data.forEach(function(rect) {
								      context.strokeStyle = '#a64ceb';
								      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
								      //context.font = '11px Helvetica';
								      //context.fillStyle = "#fff";
								      //context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
								      //context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
								    });
								}
								
					    	});
					    }*/



		var foto_handler = function(){
			$('#cam').off('click');
			// Efecto boton apretado
			$(this).attr('src','../assets/camara-ws2_106_98.png');
			
			// Aparecemos contador
			$('#cam').fadeOut(function(){
				$('#contador').attr('src','../assets/2camara-ws_349_65.png');
				$('#contador').fadeIn();
			});
			
			$("#arriba").animate({opacity: 0}, 300);
			
			var canvas = document.getElementById("videocanvas");
			var context = canvas.getContext("2d");

			var t = 2;
			var b = setInterval(function(){
				if(t <= 0){

					clearInterval(b);
					console.log(t <= 0);
					$("#videocam").animate({opacity : 0}, 300, function(){
						
						//$("#videocanvas").css("width",$("#videocam").width() + "px");
						//$("#videocanvas").css("height",$("#videocam").height() + "px");
						$("#videocam").css("display","none");
						w = $("#videocanvas").width();
						h = $("#videocanvas").height();
						
						context.drawImage(video, 0, 0, canvas.width , canvas.height);
						$("#videocanvas").css("opacity","0");
						$("#videocanvas").css("display","block");
						$("#videocanvas").animate({opacity:1},300);
						var dataURL = canvas.toDataURL("image/png");


					    document.getElementById('img-canvas').src = dataURL;


					    //Reconocer ojos
					    
					    detectaOjos("img-canvas", function(data){
					    	if(data.length == 0){
					    		console.log("no se detectaron ojos!");
					    		
					    		
					    		
					    		// Anotamos el error

					    		$('#inst3').width((627 * factores[0]) + 'px');
					    		$('#inst3').height((98 * factores[1]) + 'px');
					    		$('#inst3').attr('src', '../assets/instrucción-parecidos4.3_627_98.png');


					    		$("#arriba").animate({opacity:1},200);

					    		// Mostramos la camara de nuevo y ocultamos canvas e img

					    		// Mostramos boton de camara de nuevo

					    		

					    		$('#contador').fadeOut(function(){
					    			$('#cam').width((106 * factores[0]) + 'px');
						    		$('#cam').height((98 * factores[1]) + 'px');
						    		$('#cam').attr('src', '../assets/camara-ws1_106_98.png')
						    		
						    		// aprecemos boton de camara y activamos clicks
						    		$('#cam').fadeIn(function(){
						    			$('#cam').on('click', foto_handler);
						    		});

						    		$("#videocam").css("display","block");
						    		$("#videocam").css("opacity",1);
						    		$("#videocanvas").css("display","none");
						    		$("#img-canvas").css("opacity",0);
					    		});

					    		

					    	} else {

					    		fotosCorrectas++;


					    		// Actualizamos imagen 

					    		
					    		$("#arriba").animate({opacity:1},200);

					    		eyeRect = data[0];
					    		console.log("Se detectaron "+ data.length + " ojos!");

					    		// En este punto en el elemento CANVAS
					    		// tengo el snapshot de la cara
					    		// Entonces solo debo dibujar el cuadro del ojo
					    		ancho = eyeRect.width + 20;
					    		alto = eyeRect.height + 20;

					    		var imgData = context.getImageData(eyeRect.x, eyeRect.y, ancho, alto);
					    		
					    		console.log(imgData);
					    		console.log(imgData.data);
					    		console.log(imgData.data.length);
					    		
					    		var fs = require('fs')
					    		PNG = require('pngjs').PNG;

								var png = new PNG({
								    width: ancho,
								    height: alto,
								    filterType: -1
								});
								
								
								for(i = 0; i < ancho; i++){
									for(j = 0; j < alto; j++){
										 var idx = (png.width * i + j) << 2;
										 png.data[idx] = imgData.data[idx];
										 png.data[idx + 1] = imgData.data[idx + 1];
										 png.data[idx + 2] = imgData.data[idx + 2];
										 png.data[idx + 3] = imgData.data[idx + 3];
									}
								}
								//Save to a file 
								png.pack().pipe(fs.createWriteStream('ojo_usuario_' + fotosCorrectas + '.png'))

					    		var newCanvas = $("<canvas>")
								    .attr("width", imgData.width)
								    .attr("height", imgData.height)[0];
					    		context.clearRect(0, 0, canvas.width, canvas.height);
					    		//context.putImageData(imgData, 100, 100);

					    		//new thumbnailer(canvas, document.getElementById('img-canvas'), 200, 5);
					    		newCanvas.getContext("2d").putImageData(imgData, 0, 0);
					    		
					    		
					    		context.scale(canvas.width / imgData.width, canvas.height / imgData.height);

								context.drawImage(newCanvas, 0, 0);

								//fotos.push(canvas.toDataURL());
								fotos.push('../ojo_usuario_' + fotosCorrectas + '.png');
								
								$("#user" +that.currentEye + " > img").attr("src",canvas.toDataURL());
								
								that.currentEye++;
								if(that.currentEye == 6){
									that.currentEye = 1;
								}

								if(fotosCorrectas < n){

									$('#inst3').width((803 * factores[0]) + 'px');
									$('#inst3').height((98 * factores[1]) + 'px');
									$('#inst3').attr('src', '../assets/instrucción-parecidos4.1_803_98.png');
									
									// Mostramos el nombre del otro usuario
									// y ponemos todo listo para la otra foto, incluyendo scale

									$('#cam').on('click', foto_handler);

									setTimeout(function(){
										$("#videocanvas").animate({opacity:0},2000, function(){
											$("#arriba").animate({opacity:1},200);
											$("#videocam").css("display","block");
											$("#videocam").animate({opacity:1},200);
										});
									}, 2000);
									
									context.scale(1/(canvas.width / imgData.width), 1/(canvas.height / imgData.height));

					    		} else {
									
									$("#cam").off("click");					    			

									if(n == 1){
										$('#inst3').width((736 * factores[0]) + 'px');
										$('#inst3').height((98 * factores[1]) + 'px');
										$('#inst3').attr('src', '../assets/instrucción-parecidos4.2_736_98.png');
										// Solo tomamos una foto
										fotos[1] = user_ojo_url;
									} 			    		

					    			// Todas las fotos tomadas entonces
					    			// cambiamos de SCREEN
					    			

					    			// Quitamos la silueta
					    			$('#silueta').fadeOut();
					    			


					    			// Preparamos para el boton de continuar
					    			$('#continuar1').width((169 * factores[0]) + 'px');
					    			$('#continuar1').height((60 * factores[1]) + 'px');
					    			$('#continuar1').attr('src','../assets/continuar-ws1_169_60.png');
					    			
					    			// Quitamos el cotador
					    			$('#contador').fadeOut(function(){
						    			$('#continuar1').fadeIn(function(){
						    				$(this).click(function(){
						    					$(this).attr('src', '../assets/continuar-ws2_169_60.png');
						    					$(this).off('click');


						    					// Paramos la camara
									    		video.pause();
												video.src = "";
						    					localStream.stop();

						    					$('#s-coloca').fadeOut(function(){

						    						// Colocamos ojos en los canvas. Ya tengo las dataURL
									    		
									    				
									    				var canvasIzq = document.getElementById("canvas-izq");
									    				var ctxI = canvasIzq.getContext('2d');
									    				var canvasDer = document.getElementById("canvas-der");
									    				var ctxD = canvasDer.getContext('2d');
									    				var im1 = new Image;
									    				var im2 = new Image;
									    				im1.src = fotos[0];
									    				im2.src = fotos[1];

									    				ctxI.drawImage(im1,0,0,canvasIzq.width,canvasIzq.height);
									    				ctxD.drawImage(im2,0,0,canvasDer.width,canvasDer.height);

						    						$('#s-zoom').fadeIn(function(){
					    								

									    				

									    				$("ojoizq-wrap > img").css("display","none");
									    				$("ojoder-wrap > img").css("display","none");

									    					
									    					

									    					that.mainInteraction(fotos, canvasIzq, canvasDer);
									    				
									    			
						    					});
						    				});
						    			});
					    			});
});

					    			/*
					    			setTimeout(function(){
					    				$("#s-coloca").animate({opacity:0},2000,function(){
						    				$("#s-coloca").css("display","none");

						    				// Colocamos ojos en los canvas. Ya tengo las dataURL
						    		
						    				
						    				var canvasIzq = document.getElementById("canvas-izq");
						    				var ctxI = canvasIzq.getContext('2d');
						    				var canvasDer = document.getElementById("canvas-der");
						    				var ctxD = canvasDer.getContext('2d');
						    				var im1 = new Image;
						    				var im2 = new Image;
						    				im1.src = fotos[0];
						    				im2.src = fotos[1];

						    				ctxI.drawImage(im1,0,0,canvasIzq.width,canvasIzq.height);
						    				ctxD.drawImage(im2,0,0,canvasDer.width,canvasDer.height);

						    				$("ojoizq-wrap > img").css("display","none");
						    				$("ojoder-wrap > img").css("display","none");

						    				console.log("alto " + $("#ojo-der").height());

						    				$("#s-zoom").css("opacity","0");
						    				$("#s-zoom").css("display","block");
						    				$("#s-zoom").animate({opacity:1},2000, function(){
						    					
						    					// Paramos la camara
						    					video.pause();
						    					video.src = "";
						    					localStream.stop();

						    					that.mainInteraction(fotos, canvasIzq, canvasDer);
						    				});

						    			});
					    			}, 3000);*/
								
					    			
					    		} // else	
					    	}
					    });
					   
					   clearInterval(b);
					}); 
					
					
				}
				$('#contador').attr('src','../assets/' + t + 'camara-ws_349_65.png');
				console.log('contador! ' + t);
				t--;
				

			}, 1000); // SetInterval
		}
		$("#cam").click(foto_handler); // Click

	}
	/* Interaccion final. Zoom a las imagenes.
	* ctxI es el contexto del canvas izquierdo
	* ctxD es el contexto del canvas derecho
	*/
	this.mainInteraction = function(fotos, canvasI, canvasD){
	

	this.currentScreen = 's-zoom';

	var pos_cero = $('#barra').offset().left;


	$("#canvas-izq").attr("width", $("#ojoizq-wrap").width());
	$("#canvas-izq").attr("height", $("#ojoizq-wrap").height());

	$("#canvas-der").attr("width", $("#ojoder-wrap").width());
	$("#canvas-der").attr("height", $("#ojoder-wrap").height());

	var im1 = new Image;
	im1.src = fotos[0];//'http://phrogz.net/tmp/gkhead.jpg';

	var im2 = new Image;
	im2.src = fotos[1];

	putReady(canvasI, im1);
	putReady(canvasD, im2);

/*
	var barra = document.getElementById("bar");
	var dragging = false;
	var f1 = function(evt){
		dragging = true;
	};
	var f2 = function(evt){
		dragging = false;
	};
	var f3 = function(evt){
		offset = $('#barra').offset();
		if(dragging){
			if(evt.x - offset.left < newX){
				zoom(canvasI,im1,-1);
				zoom2(canvasD,im2,-1);
			}
			if(evt.x - offset.left > newX){
				zoom(canvasI,im1,1);
				zoom2(canvasD,im2,1);

			}

			newX = evt.x - offset.left;
			$('#bar').css('left', ($('#bar').css('left') + newX) + 'px');
		}
	};

	barra.addEventListener("mousedown", f1);
	barra.addEventListener("mouseup", f2);
	newX = 0;
	barra.addEventListener("mousemove", f3);


	that = this;
*/
var primera = true;
var value = 0;
interact('.slider')                   // target the matches of that selector
  .origin('self')                     // (0, 0) will be the element's top-left
  .restrict({drag: 'self'})           // keep the drag within the element
  .inertia(true)                      // start inertial movement if thrown
  .draggable({                        // make the element fire drag events
    max: Infinity                     // allow drags on multiple elements
  })
  .on('dragmove', function (event) {  // call this function on every move

  	if(primera){
  		primera = false;
  		$('#inst5').width((784 * factores[0]) + 'px');
  		$('#inst5').height((98 * factores[1]) + 'px');
  		$('#inst5').attr('src', '../assets/intrucción-parecidos1_784_98.png');
  		$('#inst5').fadeIn()
  		$('#terminar').fadeIn(function(){
  			$(this).click(function(){
  				$(this).attr('src', '../assets/terminar-ws2_169_60.png');
  				$(this).off('click');
  			});
  		});
  	}
    var sliderWidth = interact.getElementRect(event.target.parentNode).width;
        //value = event.pageX / sliderWidth;
        if((event.pageX / sliderWidth) > value){
        	zoom(canvasI,im1,1);
			zoom2(canvasD,im2,1);
        }
        if((event.pageX / sliderWidth) < value){
        	zoom(canvasI,im1,-1);
			zoom2(canvasD,im2,-1);
        }
        value = event.pageX / sliderWidth;

    event.target.style.paddingLeft = (value * 100) + '%';
    //event.target.setAttribute('data-value', value.toFixed(2));
  });

interact.maxInteractions(Infinity);   // Allow multiple interactions
	// Boton de t4rminar
	
	$("#terminar").click(function(){
		console.log("click en terminar");
		
		//barra.removeEventListener('mousedown', f1);
		//barra.removeEventListener('mouseup', f2);
		//barra.removeEventListener('mousemove',f3);
		$('#terminar').off('click');

		that.terminaApp();
	});

	}

	this.terminaApp = function(){
		this.currentScreen = 's-final';
		console.log("terminando app");
		this.uneOjos();
		that = this;
		$("#s-zoom").animate({opacity:0}, 200, function(){
			$("#s-zoom").css("display","none");
			$("#s-final").css("opacity","1");
			$("#s-final").fadeIn(1000, function(){
				var time = 3;
				var a = setInterval(function(){
					if(time == 0){
						// Reiniciar variables de control de usuarios
						that.reiniciaApp();						
						clearInterval(a);
					}
					time--;
				}, 1000);
			});
		});
	}
	this.reiniciaApp = function(){
		user_img_url = "";
		user_name = "";
		user_id = "";
		first_user_scanned = false;
		second_user_scaned = false;
		waitingSecond = false;

		//Actualizacion de textos en las pantallas

		$("#face2 > img").attr('src', '');
		$('#cara2 > h3').text('');

		$('#texto-arriba > h2').text('Coloca tu cara en la silueta apara fotografiar tu ojo tocando la cámara');
		$('#estado > h2').text('Esperando :)');

		$('#videocam').css('display', 'block');
		$('#videocam').css('opacity', '1');

		$("#s-final").fadeOut();
		//$('#s-inicial').css('display','block');
		//$('#s-inicial').animate({opacity:1}, 400);
		$('#s-inicial').fadeIn(function(){
			console.log("EN LA INICIAL");
		});
		that.waitUser();
	}
	this.uneOjos = function(){
		canvas = document.getElementById('mix-eye');
		ctx = canvas.getContext('2d');
		console.log('une ojos!');
		app_path = '~/Desktop/HotPixel/parecidos_ojos/app/';//document.URL.replace('views/index.html', '');
		script_path = app_path + 'js/eye_tracker.py';
		ojos_urls = [app_path + 'eye2.jpg', app_path + 'eye3.jpg'];
		console.log(canvas.width + " <--------");
		comando_iris = "python " + script_path + ' ' + ojos_urls[0] + " 40 " + ojos_urls[1] + " 20 " + canvas.width;
		//comando_iris = "python eye_tracker.py " + ojos_urls[0] + " 40 " + ojos_urls[1] + " 20 " + canvas.width;
		var exec = require('child_process').exec;
		
		var child = exec( comando_iris, 
		function(error, stdout, stderr){
			console.log(error);
			console.log(stderr);
			acomodaIris(canvas);
			console.log(stdout);

		});	
	}
}

function acomodaIris(canvas){
	ctx = canvas.getContext('2d');

	iris_izq = new Image();
	iris_izq.src = '../iris_izq.png';
	iris_izq.onload = function(){
		ctx.drawImage(iris_izq, 0, 0);
	};

	iris_der = new Image();
	iris_der.src = '../iris_der.png';
	iris_der.onload = function(){
		ctx.drawImage(iris_der, canvas.width / 2, 0);
	}
	

}

function putReady(canvas, gkhead){

	
	gkhead.width = canvas.width;
	gkhead.height = canvas.height;

	console.log("gkhead w " + gkhead.width);
	console.log("gkhead h " + gkhead.height);

	var ctx = canvas.getContext('2d');
	trackTransforms(ctx);
	redraw(canvas, gkhead);
		
		var lastX=canvas.width/2, lastY=canvas.height/2;
		var dragStart,dragged;
		canvas.addEventListener('mousedown',function(evt){
			document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
			lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
			lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
			dragStart = ctx.transformedPoint(lastX,lastY);
			dragged = false;
		},false);
		canvas.addEventListener('mousemove',function(evt){
			lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
			lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
			dragged = true;
			if (dragStart){
				var pt = ctx.transformedPoint(lastX,lastY);
				ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
				redraw(canvas, gkhead);
			}
		},false);
		canvas.addEventListener('mouseup',function(evt){
			dragStart = null;
			//if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
		},false);

		var scaleFactor = 1.1;
		var zoom = function(clicks){
			var pt = ctx.transformedPoint(lastX,lastY);
			ctx.translate(pt.x,pt.y);
			var factor = Math.pow(scaleFactor,clicks);
			ctx.scale(factor,factor);
			ctx.translate(-pt.x,-pt.y);
			redraw(canvas, gkhead);
		}

		var handleScroll = function(evt){
			var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
			if (delta) zoom(delta);
			return evt.preventDefault() && false;
		};
		canvas.addEventListener('DOMMouseScroll',handleScroll,false);
		canvas.addEventListener('mousewheel',handleScroll,false);
}
function zoom(canvas, gkhead, delta){

	console.log("offsetleft canvas " + canvas.offsetLeft);
	var ctx = canvas.getContext("2d");
	var pt = ctx.transformedPoint(canvas.offsetLeft + (canvas.width / 2), canvas.offsetTop + (canvas.height / 2));
	ctx.translate( pt.x, pt.y);
	var factor = Math.pow(1.01,delta);
	ctx.scale(factor,factor);
	ctx.translate(-pt.x,-pt.y);
	//ctx.translate(-(canvas.offsetLeft + (canvas.width / 2)) , -(canvas.offsetTop + (canvas.height / 2)));
	redraw(canvas, gkhead);
}
function zoom2(canvas, gkhead, delta){

	console.log("offsetleft canvas der" + canvas.offsetLeft);
	var ctx = canvas.getContext("2d");
	var pt = ctx.transformedPoint(/*canvas.offsetLeft - 500 +  */(canvas.width / 2), canvas.offsetTop + (canvas.height / 2));
	ctx.translate( pt.x, pt.y);
	var factor = Math.pow(1.01,delta);
	ctx.scale(factor,factor);
	ctx.translate(-pt.x,-pt.y);
	//ctx.translate(-(canvas.offsetLeft + (canvas.width / 2)) , -(canvas.offsetTop + (canvas.height / 2)));
	redraw(canvas, gkhead);
}
function redraw(canvas, gkhead){
			ctx = canvas.getContext('2d');
			// Clear the entire canvas
			//var p1 = ctx.transformedPoint(0,0);
			//var p2 = ctx.transformedPoint(canvas.width,canvas.height);
			//ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

			// Alternatively:
			 ctx.save();
			 ctx.setTransform(1,0,0,1,0,0);
			 ctx.clearRect(0,0,canvas.width,canvas.height);
			 ctx.restore();

			ctx.drawImage(gkhead, 0, 0, canvas.width, canvas.height);
		
			
		}
	

// Adds ctx.getTransform() - returns an SVGMatrix
// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
function trackTransforms(ctx){
		var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
		var xform = svg.createSVGMatrix();
		ctx.getTransform = function(){ return xform; };
		
		var savedTransforms = [];
		var save = ctx.save;
		ctx.save = function(){
			savedTransforms.push(xform.translate(0,0));
			return save.call(ctx);
		};
		var restore = ctx.restore;
		ctx.restore = function(){
			xform = savedTransforms.pop();
			return restore.call(ctx);
		};

		var scale = ctx.scale;
		ctx.scale = function(sx,sy){
			xform = xform.scaleNonUniform(sx,sy);
			return scale.call(ctx,sx,sy);
		};
		var rotate = ctx.rotate;
		ctx.rotate = function(radians){
			xform = xform.rotate(radians*180/Math.PI);
			return rotate.call(ctx,radians);
		};
		var translate = ctx.translate;
		ctx.translate = function(dx,dy){
			xform = xform.translate(dx,dy);
			return translate.call(ctx,dx,dy);
		};
		var transform = ctx.transform;
		ctx.transform = function(a,b,c,d,e,f){
			var m2 = svg.createSVGMatrix();
			m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
			xform = xform.multiply(m2);
			return transform.call(ctx,a,b,c,d,e,f);
		};
		var setTransform = ctx.setTransform;
		ctx.setTransform = function(a,b,c,d,e,f){
			xform.a = a;
			xform.b = b;
			xform.c = c;
			xform.d = d;
			xform.e = e;
			xform.f = f;
			return setTransform.call(ctx,a,b,c,d,e,f);
		};
		var pt  = svg.createSVGPoint();
		ctx.transformedPoint = function(x,y){
			pt.x=x; pt.y=y;
			return pt.matrixTransform(xform.inverse());
	}
}


function detectaOjos(imgId, handler) {
	
	var canvas = document.getElementById("videocanvas");
	var context = canvas.getContext("2d");
	var tracker = new tracking.ObjectTracker(['eye']);
	
	numOjos = 0;

	tracker.setInitialScale(4);
	tracker.setStepSize(2);
	tracker.setEdgesDensity(0.1);
	//tracking.track('#img-canvas', tracker, { camera: true });
	tracking.track('#' + imgId, tracker);
	  
	tracker.on('track', function(event) {

		handler(event.data);
   
  });
}

function getWH(parentId ,widthPercent, heightPercent){
	if(typeof(widthPercent) !== 'undefined' && typeof(heightPercent) !== 'undefined'){
		console.log("Con ambos no funciono!");
		return;
	}
	if(typeof(widthPercent) !== 'undefined'){
		console.log("Respecto a Width!");
			// queremos crear un cuadro que ocupe 25% del ancho
		lado = widthPercent; //.25

		w = parseFloat($("#" + parentId).width());
		h = parseFloat($("#" + parentId).height());

		r = w - h;
	
		if(r == 0){
			nlado = w * lado * 0.01;
		}
		if(r > 0){ // w > h
			nlado = w * lado * 0.01;
			if(nlado > h){
				console.log("no alcanza lo alto!");
				return;
			}
		}
		if(r < 0){ //w < h
			nlado = w * lado * 0.01;
		}
	}
	if(typeof(heightPercent) !== 'undefined'){
		console.log("Respecto a height!");
		lado = heightPercent; //.25

		w = parseFloat($("#" + parentId).width());
		h = parseFloat($("#" + parentId).height());

		r = w - h;
	
		if(r == 0){
			nlado = h * lado * 0.01;
		}
		if(r > 0){ // w > h
			nlado = h * lado * 0.01;
		}
		if(r < 0){ //w < h
			nlado = h * lado * 0.01;
			if(nlado > w){
				console.log("no alcanza lo ancho!");
				return;
			} 
		}
	}
	return nlado;
}


// Te devuelve las medidas en porcentaje!

function getWH2(parentId ,widthPercent, heightPercent){
	if(typeof(widthPercent) !== 'undefined' && typeof(heightPercent) !== 'undefined'){
		console.log("Con ambos no funciono!");
		return;
	}
	if(typeof(widthPercent) !== 'undefined'){
		console.log("Respecto a Width!");
			// queremos crear un cuadro que ocupe 25% del ancho
		lado = widthPercent; //.25

		// ancho y alto en pixeles!

		w = parseFloat($("#" + parentId).width());
		h = parseFloat($("#" + parentId).height());

		r = w - h;
		// Mismo ancho y alto
		if(r == 0){

			return lado;

		}
		if(r > 0){ // w > h
			// Ancho en pixeles
			nlado = w * lado * 0.01;
			if(nlado > h){
				console.log("no alcanza lo alto!");
				return;
			} else {
				return (nlado / h) * 100;
			}
		}
		if(r < 0){ //w < h
			nlado = w * lado * 0.01;
			return (nlado / h) * 100;
		}
	}
	if(typeof(heightPercent) !== 'undefined'){
		console.log("Respecto a height!");
		lado = heightPercent; //.25

		w = parseFloat($("#" + parentId).width());
		h = parseFloat($("#" + parentId).height());

		r = w - h;
	
		if(r == 0){
			// alto en pixeles
			nlado = h * lado * 0.01;
		}
		if(r > 0){ // w > h
			//alto en pixeles
			nlado = h * lado * 0.01;
		}
		if(r < 0){ //w < h
			//alto en pixeles
			nlado = h * lado * 0.01;
			if(nlado > w){
				console.log("no alcanza lo ancho!");
				return;
			} 
		}
	}
	return (nlado / w) * 100;
}



function cargaCaras(){
	usersDivs = [];
	usuarios_anteriores.forEach(function(e){
		usersDivs.push("<div id=" + e + " class='cara-lateral'></div>");
	});
	numUsers = usuarios_anteriores.length;

	img = "../img/faces/face";
	// Agregamos los divs

	for(i = 0; i < numUsers; i++){
		$("#wrapper").append(usersDivs[i]);
	}
	// Agregamos los <img>
	i = 0;
	usuarios_anteriores.forEach(function(e){
		$("#" + e).append("<img src='" + img + i + ".jpg' class='circular2 seleccionable'>");
		i++;
	});

}

screensIds = ["s-inicial","s-elige","s-coloca","s-zoom","s-final"];

function muestraSolo(idScreen){
	$("#" + idScreen).css("display", "block");

	screensIds.forEach(function(e){
		if(e !== idScreen){
			$("#" + e).css("display", "none");
		}
	});
}

















$(document).ready(
	function(){


		// PANTALLAS
		// screensIds = ["s-inicial",'s-concepto', 's-sigues', 's-seguro',"s-elige","s-coloca","s-zoom","s-final"];
		console.log(getWH2("lista-usuarios",10,undefined));


		console.log("HOLA JEAN PIERRE!");
		console.log($("#ojo-izq").width() + " " + $("#ojo-der").height());
		
		$("#ojoizq-wrap").css("width", $("#ojo-izq").height());
		$("#ojoizq-wrap").css("height", $("#ojo-izq").height());
		$("#ojoder-wrap").css("width", $("#ojo-izq").height());
		$("#ojoder-wrap").css("height", $("#ojo-izq").height());
		cargaCaras();

		$(".animsition").animsition({
			  inClass: "rotate-in",
			  outClass: "rotate-out"
			});

		appM = new appManager(screensIds);
		appM.init();

	
		var d = new Date();
		var ultima_vez = d.getTime();

		// Cambiar el evento a mousemove
		document.addEventListener('mousedown', function(){
			ultima_vez = d.getTime();
			console.log("ultima vez " + ultima_vez);
		});

					spriteTimer = new SpriteCanvas({
			            framesPath : "assets/timer",
			            canvas     : document.getElementById("timer1"),
			            width      : 320 * factores[0],
			            height     : 320 * factores[1],
			            fps        : 12
			        });


		var checker = setInterval(function(){
			d = new Date();
			if((d.getTime() - ultima_vez) > 2000000 && appM.currentScreen != 's-inicial' && appM.currentScreen != 's-final' && appM.currentScreen != 's-sigues'){
				anterior = appM.currentScreen;
				appM.currentScreen = 's-sigues';

				$('#black-background').fadeIn(function(){

					$('#timer-container').fadeIn();


					spriteTimer.play();

					t = 10;
					var espera = setInterval(function(){
						if(t == 0){
							$(anterior).fadeOut();
							appM.reiniciaApp();
							clearInterval(espera);
						}
						t--;
					}, 1000);

					$('#timer-container').click(function(){
						clearInterval(espera);
						$(this).fadeOut();
						spriteTimer.stop();
						appM.currentScreen = anterior;
						$('#black-background').fadeOut();
						$(this).off('click');
					});						
				});
			}
		}, 100);




		//alto = $("#video").height();

		//ancho = (alto / $("#lodemas").width()) * 100;
		//$("#video").css("width", ancho + "%");
		//appM.takePictures(3);
		//muestraSolo("s-zoom");
		


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
									requestUserData(cleanData(dataRecieved));	
								}
							);
							// Lo inicializamos
							serialport.init();
						}
					}
				);
			}
		);

		console.log(process.versions['node-webkit']);
	}
);