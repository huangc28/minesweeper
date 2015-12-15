requirejs.config({
	paths: {
		'jquery': '../components/jquery/dist/jquery'
	},
	shim: {
		jquery: {
			exports: 'jQuery'
		}
	}
});

requirejs(['grid', 'board'], function(Grid, Board) {
	var bDom = document.getElementById('ms-container');
	var board = new Board(bDom, {
		width: 10,
		height: 10
	});
	$("#ms-container").append(board.render());
});