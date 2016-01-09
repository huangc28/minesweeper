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

requirejs(['grid', 'board', 'timer'], function(Grid, Board, Timer) {
	var bDom = document.getElementById('ms-container');
	var board = new Board(bDom, {
		width: 10,
		height: 10
	}, (new Timer()).draw());

	// $('#ms-container').append(timer.render());
	$('#ms-container').append(board.render());
	
});