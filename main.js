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
			elements.push(ball);
			return elements;
		}
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
})();

window.addEventListener('load', main); // Esta funcion se encarga de escuchar la carga de la pagina

// Esta funcion se encarga de inicializar el juego
function main(){
	var board = new Board(800, 400); // Se crea el tablero con las dimensiones del canvas
	var canvas = document.getElementById('canvas'); // Se obtiene el canvas desde el DOM
	var board_view = new BoardView(canvas, board);
}