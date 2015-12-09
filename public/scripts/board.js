define(['jquery', 'grid'], function($, Grid){
	function Board(initDom, options) {
	 	this._w = options.width,
		this._h = options.height;
		this._initDom = initDom,
		this._boardDom = null,
		this._baseGrid  = null,
		this._boardData = [], // contains the grid's dom and its related mines. 
		this._bombs = 10;

		// console.log(_testFunction);
		_generateBoardDom.call(this);
		_populate.call(this);
		_plantMines.call(this);

		function _generateBoardDom() {
			var el = document.createElement("div");
			el.className = 'board';
			this._boardDom = el;
		};

		function _plantMines() {
			for(var i=0; i<this._bombs; i++) {
				var xcord = Math.floor((Math.random() * 10) + 1);
				var ycord = Math.floor((Math.random() * 10) + 1);
				if(!this._boardData[ycord][xcord].isBomb()) {
					this._boardData[ycord][xcord].setBomb(true);
				} else {
					i--;
				}
			}
		};

		function _populate() {
			var container = $(this._initDom),
			w = this._w,
			h = this._h;
			container.empty();
			// populate horizontally.
			for(var i=1; i<=h; i++) {
				this._boardData[i] = [];
				for(var j=1; j<=w; j++) {
					this._boardData[i][j] = new Grid({id: i + '-' + j});
					$(this._boardDom).append(this._boardData[i][j].render());

				}
				$(this._boardDom).append("<div class='clear'></div>");
			}

			// Bind click event, determine:
			// 1. Right click
			// 2. Left click
			$(this._boardDom).on('click', $.proxy(_catchClickEvt, this));
		};

		/**
		 * 1. Traverse the 8 direction of the specific location.
		 *    	- if 1 of the 8 grids is a bomb, stop traversing, open itself
		 *    	- if none them are bombs, open up
		 */
		function _catchClickEvt(evt) {
			var _cords = _parseCords(evt.toElement.id);
			_traverseToOpen(this._boardData[_cords.y][_cords.x], this._boardData);
		};

		/**
		 * @param string idStr
		 * @return object
		 */
		function _parseCords(idStr) {
			if(typeof idStr == 'string') {
				var _tempCords = idStr.split("-");
			}
			return {y: _tempCords[0], x: _tempCords[1]}
		}

		/**
		 * @param Grid grid
		 */
		function _traverseToOpen(grid, _boardData) {

			var _y = grid.getCoordinate().y,
				_x = grid.getCoordinate().x,
				_bombsInfo = [];

			var _targetCords = {
				up         : (typeof _boardData[_y+1][_x] != 'undefined') ? _boardData[_y+1][_x] : '',
				upRight    : (typeof _boardData[_y+1][_x+1] != 'undefined') ? _boardData[_y+1][_x+1] : '',
				upLeft     : (typeof _boardData[_y+1][_x-1] != 'undefined') ? _boardData[_y+1][_x-1] : '',
				left       : (typeof _boardData[_y][_x-1] != 'undefined') ? _boardData[_y][_x-1] : '',
				self       : (typeof _boardData[_y][_x] != 'undefined') ? _boardData[_y][_x] : '',
				right      : (typeof _boardData[_y][_x+1] != 'undefined') ? _boardData[_y][_x+1] : '',
				bottom     : (typeof _boardData[_y-1][_x] != 'undefined') ? _boardData[_y-1][_x] : '',
				bottomLeft : (typeof _boardData[_y-1][_x-1] != 'undefined') ? _boardData[_y-1][_x-1] : '',
				bottomRight: (typeof _boardData[_y-1][_x+1] != 'undefined') ? _boardData[_y-1][_x+1] : '',
			};

			// traverse the surrounding of (x, y)
			// if bomb is detected, don't reveal the surrounding
			// if no bombs are detected, reavel all surroundings
			// detected upper
			for(var _cord in _targetCords) {
				if(_targetCords.hasOwnProperty(_cord)) {
					if(typeof _targetCords[_cord] != '' /*&& !_targetCords[_cord].isOpen()*/ && _targetCords[_cord].isBomb()) {
						_bombsInfo.push(_targetCords[_cord]);
					}
				}
			}

			// bombs exists
			// if(_bombsInfo.length > 0) {
			// 	// calculate the distance between self and the bomb
			// 	_bombsInfo.forEach(_calculateDistance(ele, index));
			// } else {

			// }

			console.log(_bombsInfo);
		}

		function _calculateDistance() {

		}
	}


	Board.prototype.render = function() {
		return this._boardDom;
	}

	return Board;
})