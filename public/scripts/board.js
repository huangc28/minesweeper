define(['jquery', 'grid'], function($, Grid){
	/**
	 * TODO: 
	 * 	1. Change private member to:
	 *		var = _generateBoardDom = function() { ... };
	 *  2. Trigger start timer.
	 *
	 */
	function Board(initDom, options, timer) {
	 	this._w = options.width,
		this._h = options.height;
		this.gameStarting = false;
		this._initDom = initDom,
		this._boardDom = null,
		this._baseGrid  = null,
		this._boardData = [], // contains the grid's dom and its related mines. 
		this._bombs = 10;
		this._bombPositions = {};
		this._flagCount = 0;
		this._timer = timer;

		_generateBoardDom.call(this);
		_appendTimer.call(this);
		_populate.call(this);
		_plantMines.call(this);

		function _generateBoardDom() {
			var el = document.createElement("div");
			el.className = 'board';
			this._boardDom = el;
			$(this._boardDom).on('gameover', $.proxy(_gameover, this));
		};

		/**
		 * Append timer DOM.
		 */
		function _appendTimer() {
			this._initDom.appendChild(this._timer.render());
		}

		/**
		 * Check if it meets the winning condition.
		 *
		 *	1. Number of flags equals to the number of mines
		 *  2. bombs position are all marked by flags.
		 */
		function _isGameover() {
			var _bombsAllMarked = true;
			
			// if one of the position is not marked, set the flag to false;
			for(var position in this._bombPositions) {
				if(!position) {
					_bombsAllMarked = false;
					break;
				}
			}
			console.log('flag count:', this._flagCount);
			console.log('bombs count:', this._bombs);
			return (this._flagCount === this._bombs && _bombsAllMarked) || false;
		}

		function _gameover(evt, status) {
			var _board = evt.target
			if(status === 'win') {
				// stop the timer
				this._timer.trigger('timer:stop');
				// this.gameStarting = false;
				this._timer.unbindAll();
				alert('you have won the game');
			} 
			if(status === 'lose') {
				// stop the timer
				this._timer.trigger('timer:stop');
				// this.gameStarting = false;
				this._timer.unbindAll();
			}
		};

		/**
		 * Randomly generate bombs. Record all the position into a hash.
		 * 	1. Assign bomb.
		 *  2. Record position of the bomb into a hash. Example:
		 *  	{
		 *			'2-3': false ---> position is not being marked by flag.
		 *			'4-4': true  ---> position is being marked by flag.
		 *		}
		 *
		 */
		function _plantMines() {
			for(var i=0; i<this._bombs; i++) {
				var xcord = Math.floor((Math.random() * 10) + 1);
				var ycord = Math.floor((Math.random() * 10) + 1);
				if(!this._boardData[ycord][xcord].isBomb()) {
					this._boardData[ycord][xcord].setBomb(true);
					this._bombPositions[String(xcord + '-' +ycord)] = false;
				} else {
					i--;
				}
			}
		};

		function _populate() {
			var container = $(this._initDom),
			w = this._w,
			h = this._h;
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
		 *    	- if 1 of the 8 grids is a bomb, stop traversing, open itself
		 *    	- if none them are bombs, keep on traversing to open.
		 * 2. If the game first started 
		 */
		function _catchClickEvt(evt) {

			// if(!this.gameStarting) {
			// 	this.gameStarting = true;
				this._timer.trigger('timer:start');
			// }

			// should extract to other object.
			var mouseBtn = {
				right: 2,
				left: 0
			};
			var _cords = _parseCords(evt.toElement.id);
			var _self = this;

			// Right click.
			if(!this._boardData[_cords.y][_cords.x].isOpen() && evt.button == mouseBtn.right) {
				(this._boardData[_cords.y][_cords.x].toggleFlag()) ? this._flagCount++ : this._flagCount--;
				// mark bomb position
				if(this._bombPositions.hasOwnProperty(evt.toElement.id)) {
					this._bombPositions[evt.toElement.id] = true;
				}				
			// Left click.
			} else if(evt.button == mouseBtn.left) {
				if(!this._boardData[_cords.y][_cords.x].isOpen()) {
					this._boardData[_cords.y][_cords.x].setOpen(true);
					// if click on bomb, then we end the game, reveal all bombs.
					if(this._boardData[_cords.y][_cords.x].isBomb()) {
						// reveal all bombs
						revealBombs.call(this);
						$(this._boardDom).trigger('gameover', ['lose']);
					} else {
						// add class 
						$(this._boardData[_cords.y][_cords.x].render()).addClass('save-zone');
						_traverseToOpen(this._boardData[_cords.y][_cords.x], this._boardData);	
					}					
				}
			}

			if(_isGameover.call(this)) {
				$(this._boardDom).trigger('gameover', ['win']);
			}
		};

		/**
		 * Detect if the game qualifies winning condition
		 *
		 * 	1. Number of bombs equals to number of flags.
		 *  2. If bomb position has all been marked.
		 *
		 */
		function _win() {
			console.log(this);
		};

		/**
		 * Reveal all bombs of the board.
		 */
		function revealBombs() {
			this._boardData.forEach(function(row) {
				row.forEach(function(grid) {
					if(grid.isBomb()) {
						grid.reveal();
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
					grid.setOpen(true);
					_traverseToOpen(grid, _boardData);
				});
			}
		}
	}

	Board.prototype.render = function() {
		return this._boardDom;
	}

	return Board;
})