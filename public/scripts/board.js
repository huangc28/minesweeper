define(['jquery', 'grid'], function($, Grid){
	"use strict";
	function Board(initDom, options) {
	 	this._w = options.width,
		this._h = options.height;
		this._initDom = initDom,
		this._boardDom = null,
		this._baseGrid  = null,
		this._boardData = [], // contains the grid's dom and its related mines. 
		this._bombs = 10,
		this._bombCords = {},
		this._flagNum = 0;

		_generateBoardDom.call(this);
		_populate.call(this);
		_plantMines.call(this);
		// console.log(this._bombCords);
		// $(this._boardDom).on('gameover', _gameOver());

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
					this._bombCords[String(ycord) + '-' + String(xcord)] = false;
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
			// 1. Right click - open
			// 2. Left click  - flag
			// 3. Click both
			// use "mouse-down" event instead of click.
			$(this._boardDom).on('mousedown', $.proxy(_catchClickEvt, this));
		};

		/**
		 * 1. Traverse the 8 direction of the specific location.
		 *    	- if 1 of the 8 grids is a bomb, stop traversing, open itself.
		 *    	- if none them are bombs, open up.
		 * 2. Win condition:
		 * 		- traverse all bombs location is all set to "flag"
		 *      - traverse all non-bomb location, is all "opened"
		 */
		function _catchClickEvt(evt) {

			// should extract to other object.
			var mouseBtn = {
				right: 2,
				left: 0
			},
		 	_cords = _parseCords(evt.toElement.id);
			if(!this._boardData[_cords.y][_cords.x].isOpen() && evt.button == mouseBtn.right) {
				if(typeof this._bombCords[evt.toElement.id] != 'undefined') {
					this._bombCords[evt.toElement.id] = true;
				}

				if($(this._boardData[_cords.y][_cords.x].render()).hasClass('flag')) {
					$(this._boardData[_cords.y][_cords.x].render()).removeClass('flag');
					this._flagNum--;
				} else {
					$(this._boardData[_cords.y][_cords.x].render()).addClass('flag');
					this._flagNum++;
				}
			}
			else if(evt.button == mouseBtn.left) {
				if(!this._boardData[_cords.y][_cords.x].isOpen()) {
					if(this._boardData[_cords.y][_cords.x].isBomb()) {
						// reveal all bombs
						_revealBombs.call(this);
						console.log('game over');
					} else {
						this._boardData[_cords.y][_cords.x].setOpen(true);
						_traverseToOpen(this._boardData[_cords.y][_cords.x], this._boardData);
					}
				}
			}
			_detectWinning.call(this);
		};

		function _revealBombs() {
			this._boardData.forEach(function(row) {
				row.forEach(function(grid) {
					if(grid.isBomb()) {
						grid.revealBomb();
					} else {
						grid.setOpen(true);
					}
				});
			});
		}

		/**
		 * @param string idStr
		 * @return object
		 */
		function _parseCords(idStr) {
			if(typeof idStr == 'string') {
				var _tempCords = idStr.split("-");
			}
			return {y: parseInt(_tempCords[0]), x: parseInt(_tempCords[1])}
		}

		/**
		 * @param Grid grid
		 */
		function _traverseToOpen(grid, _boardData) {
			var _y = grid.getCoordinate().y,
				_x = grid.getCoordinate().x,
				_bombsInfo = [],
				_targetCords = {},
				_whiteList = [];

			_targetCords.self = _boardData[_y][_x];

			// left bound check
			_targetCords.left = (typeof _boardData[_y][_x-1] != 'undefined') ? _boardData[_y][_x-1] : '';
			
			// right bound check
			_targetCords.right = (typeof _boardData[_y][_x+1] != 'undefined') ? _boardData[_y][_x+1] : '';

			// upper bound check
			// console.log(typeof _boardData[_y+1]);
			if(typeof _boardData[_y+1] != 'undefined') {
				_targetCords.up = _boardData[_y+1][_x];

				// left bound check.
				if(typeof _boardData[_y+1][_x-1] != 'undefined') {
					_targetCords.upLeft = _boardData[_y+1][_x-1];
				}

				// right bound check.
				if(typeof _boardData[_y+1][_y+1] != 'undefined') {
					_targetCords.upRight = _boardData[_y+1][_x+1];
				}
			}

			// console.log(typeof _boardData[_y-1]);
			// lower bound check
			if(typeof _boardData[_y-1] != 'undefined') {
				_targetCords.bottom = _boardData[_y-1][_x];
				// check left bound
				if(typeof _boardData[_y-1][_x-1] != 'undefined') {
					_targetCords.bottomLeft = _boardData[_y-1][_x-1];
				}
				
				// check right bound
				if(typeof _boardData[_y-1][_x+1] != 'undefined') {
					_targetCords.bottomRight = _boardData[_y-1][_x+1];	
				}
			}

			// traverse the surrounding of (x, y)
			// if bomb is detected, don't reveal the surrounding
			// if no bombs are detected, reavel all surroundings
			// detected upper
			for(var _cord in _targetCords) {
				if(_targetCords.hasOwnProperty(_cord) && _targetCords[_cord] != '' && typeof _targetCords[_cord] != 'undefined') {
					if(typeof _targetCords[_cord] != '' && !_targetCords[_cord].isOpen() && _targetCords[_cord].isBomb()) {
						_bombsInfo.push(_targetCords[_cord]);
					}
					if(typeof _targetCords[_cord] != '' && !_targetCords[_cord].isOpen() && !_targetCords[_cord].isBomb()) {
						_whiteList.push(_targetCords[_cord]);
					}
				}
			}

			// bombs exists
			if(_bombsInfo.length > 0) {
				// calculate the distance between self and the bomb.
				$(_targetCords.self.render()).html(_bombsInfo.length);
			} else {
				// traverse 8 directions. plug them into _traverseToOpen function
				_whiteList.forEach(function(grid) {
					if(!grid.isFlag())
					{
						grid.setOpen(true);
						_traverseToOpen(grid, _boardData);
					}
				});
			}
		}

		function _detectWinning() {
			var win = true;
			for(var flagBombSet in this._bombCords) {
				if(this._bombCords.hasOwnProperty(flagBombSet)) {
					if(!flagBombSet) {
						win = false;
					}
				}
			}
			if(win && this._bombCords.length == this._flagNum) {
				console.log('win!');
			}
		}
	}

	Board.prototype.render = function() {
		return this._boardDom;
	}

	return Board;
})