
function SpriteCanvas (options) {

	// This
	var that = this;

	// Frames
	if(options.framesPath) {
		this.frames = [];
		loadFrames(options.framesPath);
	} else {
		this.frames = options.frames;
	}
	this.frameIndex = 0;

	// Dimensiones
	this.width  = options.width;
	this.height = options.height;

	// Canvas y context
	if(options.canvas) {
		this.canvas = options.canvas;
	} else {
		this.canvas = document.createElement("canvas");
	}
	this.canvas.width  = options.width;
	this.canvas.height = options.height;
	this.context = this.canvas.getContext("2d");

	// Animacion
	var isPlaying = false;
	this.fps = options.fps;
	var now, then, interval, delta;

	function loadFrames (framesPath) {

		// Leemos el directorio
		var files = require("fs").readdirSync(framesPath);

		// Ordenamos los frames
		frames = new Array(files.length);
		files.sort();

		// Cargamos los frames
		for (var i = 0; i < files.length; i++) {

			// Creamos la imagen
			var img = new Image();
			img.src = "../" + framesPath + "/" + files[i];
			$(img).css({
				width: "100px",
				height: "100px"
			});

			// Guardamos el frame
			that.frames[i] = {
				image    : img,
				frameNum : i
			};
		}
	}

	function render () {

		// Obtenemos la imagen
		var image = that.frames[that.frameIndex].image;

		// Limpiamos y dibujamos en el canvas
		that.context.clearRect(0, 0, that.width, that.height);
		that.context.drawImage(image, 0, 0, that.width, that.height);
	}

	function update () {
		that.frameIndex = (that.frameIndex + 1) % that.frames.length;

		if(options.afterUpdate) {
			options.afterUpdate.call(that, that.frameIndex, that.frames[that.frameIndex]);
		}
	}

	function loop () {
		if(isPlaying) {

			// Solicitamos frame de animacion
			requestAnimationFrame(loop);

			// Actualizamos la fecha
			now = Date.now();
			delta = now - then;

			// Frame
			if (delta > interval) {

				// Actualizamos el tiempo
				then = now - (delta % interval);

				// Update and Render
				update();
				render();
			}
		}
	}

	this.play = function () {
		isPlaying = true;

		// Datos del tiempo
		then = Date.now();
		interval = 1000 / this.fps;

		loop();
	};

	this.stop = function () {
		isPlaying = false;
		that.frameIndex = 0;
	}
}