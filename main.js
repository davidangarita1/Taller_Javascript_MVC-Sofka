// Esta funcion es la configuracion del juego
(function () {
	self.Board = function (width, height) {
		this.width = width;
		this.height = height;
		this.playing = false;
		this.game_over = false;
		this.bars = [];
		this.ball = null;
		this.playing = false;
	}

	self.Board.prototype = {
		get elements() {
			var elements = this.bars.map(function (bar) { return bar; });
			elements.push(this.ball);
			return elements;
		}
	}
})();

// Esta funcion se encarga de crear la pelota
(function () {
	self.Ball = function (x, y, radius, board) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speed_y = 0;
		this.speed_x = 3;
		this.board = board;
		this.direction = 1;

		board.ball = this;
		this.kind = "circle";
	}
	self.Ball.prototype = {
		move: function () {
			this.x += (this.speed_x * this.direction);
			this.y += (this.speed_y);
		}
	}
})();

// Esta funcion se encarga de definir las medidas del canvas
(function () {
	self.Bar = function (x, y, width, height, board) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.board = board;
		this.board.bars.push(this); // Se agrega la barra al tablero
		this.kind = 'rectangle'; // Se define el tipo de elemento
		this.speed = 10; // Se define la velocidad de la barra
	}

	self.Bar.prototype = {
		down: function () {
			this.y += this.speed;
		},
		up: function () {
			this.y -= this.speed;
		},
		toString: function () {
			return "x: " + this.x + " y: " + this.y;
		}
	}
})();

// Esta funcion se encarga de dibujar el tablero
(function () {
	self.BoardView = function (canvas, board) {
		this.canvas = canvas;
		this.canvas.width = board.width;
		this.canvas.height = board.height;
		this.board = board; // Se asigna el tablero
		this.ctx = this.canvas.getContext('2d'); // Obtiene el contexto del canvas
	}

	self.BoardView.prototype = {

		clean: function () {
			this.ctx.clearRect(0, 0, this.board.width, this.board.height);
		},
		draw: function () {
			for (var i = this.board.elements.length - 1; i >= 0; i--) { // Se recorre el elemento para dibujarlo
				var el = this.board.elements[i];

				draw(this.ctx, el);
			}
		},
		play: function () {
			if (!this.board.playing) {
				this.clean(); // Se limpia el canvas
				this.draw(); // Se dibuja el tablero
				this.board.ball.move(); // Se mueve la pelota
			}
		}
	}

	// Se encarga de dibujar el element elegido
	function draw(ctx, element) {
		switch (element.kind) {
			case 'rectangle':
				ctx.fillRect(element.x, element.y, element.width, element.height);
				break;
			case 'circle':
				ctx.beginPath();
				ctx.arc(element.x, element.y, element.radius, 0, 7);
				ctx.fill();
				ctx.closePath();
				break;
		}
	}
})();

var board = new Board(800, 400); // Se crea el tablero con las dimensiones del canvas
// x, y, width, height
var bar = new Bar(0, 150, 20, 100, board); // Se crea la barra1
var bar_2 = new Bar(780, 150, 20, 100, board); // Se crea la barra2
var canvas = document.getElementById('canvas'); // Se obtiene el canvas desde el DOM
var board_view = new BoardView(canvas, board); // Se crea el tablero
var ball = new Ball(350, 100, 10, board); // Se crea la pelota

document.addEventListener("keydown", function (ev) {
	if (ev.keyCode == 38) {
		ev.preventDefault();
		if (bar.y >= 10) {
			bar.up(); // Se mueve la barra hacia arriba
		}
	}
	else if (ev.keyCode == 40) {
		ev.preventDefault();
		if (bar.y <= 290) {
			bar.down(); // Se mueve la barra hacia abajo
		}
	}
	else if (ev.keyCode == 87) {
		//W
		ev.preventDefault();
		if (bar_2.y >= 10) {
			bar_2.up(); // Se mueve la segunda barra hacia arriba
		}

	}
	else if (ev.keyCode == 83) {
		//S
		ev.preventDefault();
		if (bar_2.y <= 290) {
			bar_2.down(); // Se mueve la segunda barra hacia abajo
		}
	} else if (ev.keyCode == 32) {
		ev.preventDefault();
		board.playing = !board.playing;
	}
});

// self.addEventListener('load', main); // Esta funcion se encarga de escuchar la carga de la pagina
board_view.draw(); // Se dibuja el tablero por primera vez
window.requestAnimationFrame(controller); // Se llama a la funcion main cada vez que se refresca la pantalla
setTimeout(function () {
	ball.direction = -1;
}, 4000);

// Esta funcion se encarga de inicializar el juego
function controller() {
	board_view.play();
	window.requestAnimationFrame(controller);
}