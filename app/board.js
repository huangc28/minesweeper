import $ from 'jquery'
import Grid from './Grid.js'
import generateBoardDOM from './utils/generateBoardDOM.js'
import populate from './utils/populate.js'
import plantMines from './utils/plantMines.js'
import openGridEvent from './utils/openGridEvent.js'

let _w,
    _h,
    gameStarting = false,
    initDom,
    boardDOM = null,
    _baseGrid  = null,
	  boardData = [], // contains the grid's dom and its related mines.
	  bombs = 10,
	  bombPositions = {},
	  flagCount = 0

/**
 * TODO:
 * 	1. Change private member to:
 *		var = _generateBoardDom = function() { ... };
 *  2. Trigger start timer.
 *
 */
const Board = (initDom, options, timer) => {
  const { width, height } = options
  // Append Timer
  initDom.appendChild(timer.render())
	boardDOM = generateBoardDOM()
  boardData = populate(boardDOM, width, height)
  // Bind click event, determine:
  // 1. Right click - open
  // 2. Left click  - flag
  // 3. Click both
  // use "mouse-down" event instead of click.
  bombPositions = plantMines(bombs, boardData, bombPositions)

  // bind boardDOM to gameover event
  $(boardDOM).on('gameover', evt => gameover)
  $(boardDOM).on('mousedown',  evt => openGridEvent({
    evt,
    gameStarting,
    boardData,
    boardDOM,
    bombs,
    bombPositions,
    flagCount,
    timer,
  }))

	/**
	 * Check if it meets the winning condition.
	 *
	 *	1. Number of flags equals to the number of mines
	 *  2. bombs position are all marked by flags.
	 */
	// function _isGameover() {
	// 	var _bombsAllMarked = true;
  //
	// 	// if one of the position is not marked, set the flag to false;
	// 	for(var position in this._bombPositions) {
	// 		if(!position) {
	// 			_bombsAllMarked = false;
	// 			break;
	// 		}
	// 	}
	// 	console.log('flag count:', this._flagCount);
	// 	console.log('bombs count:', this._bombs);
	// 	return (this._flagCount === this._bombs && _bombsAllMarked) || false;
	// }

// _isGameover.call(this)) {
// 			$(this._boardDom).trigger('gameover', ['win']);
// 		}
// 	};

	/**
	 * Detect if the game qualifies winning condition
	 *
	 * 	1. Number of bombs equals to number of flags.
	 *  2. If bomb position has all been marked.
	 *
	 */
	// function _win() {
	// 	console.log(this);
	// };

  return {
    render: () => boardDOM
  }
}

export default Board
