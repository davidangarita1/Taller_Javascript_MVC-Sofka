// Esta funcion es la configuracion del juego
(function(){
	self.Board = function(width, height){
		this.width = width;
		this.height = height;
		this.playing = false;
		this.game_over = false;
		this.bars = [];
		this.ball = null;
	}

	self.Board.prototype = {
		get elements(){
			var elements = this.bars;
			elements.push(this.ball);
			return elements;
		}
	}
})();

// Esta funcion se encarga de definir las medidas del canvas
(function(){
	self.Bar = function(x, y, width, height, board){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.board = board;
		this.board.bars.push(this); // Se agrega la barra al tablero
		this.kind = 'rectangle'; // Se define el tipo de elemento
	}

	self.Bar.prototype = {
		down: function(){ },
		up: function(){ } 
	}
})();

// Esta funcion se encarga de dibujar el tablero
(function(){
	self.BoardView = function(canvas,board){
		this.canvas = canvas;
		this.canvas.width = board.width;
		this.canvas.height = board.height;
		this.board = board; // Se asigna el tablero
		this.ctx = this.canvas.getContext('2d'); // Obtiene el contexto del canvas
	}

	self.BoardView.prototype = {
		draw: function(){
			for (var i = this.board.elements.length -1; i >= 0; i--) { // Se recorre el elemento para dibujarlo
				var el = this.board.elements[i];
				
				draw(this.ctx, el);
			}
		}
	}

	// Se encarga de dibujar el element elegido
	function draw(ctx, element){
		if(element !== null && element.hasOwnProperty('kind')){
			switch(element.kind){
				case 'rectangle':
					ctx.fillRect(element.x, element.y, element.width, element.height);
					break;
			}
		}
		
	}
})();

window.addEventListener('load', main); // Esta funcion se encarga de escuchar la carga de la pagina

// Esta funcion se encarga de inicializar el juego
function main(){
	var board = new Board(800, 400); // Se crea el tablero con las dimensiones del canvas
					// x, y, width, height
	var bar = new Bar(0, 150, 20, 100, board); // Se crea la barra1
	var bar = new Bar(780, 150, 20, 100, board); // Se crea la barra2
	var canvas = document.getElementById('canvas'); // Se obtiene el canvas desde el DOM
	var board_view = new BoardView(canvas, board);
	board_view.draw();
}