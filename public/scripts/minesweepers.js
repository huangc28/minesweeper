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
	console.log('something is awesome');
	var bDom = document.getElementById('ms-container');
	// console.log(Board);
	var board = new Board(bDom, {
		width: 10,
		height: 10
	});
	$("#ms-container").append(board.render());
});