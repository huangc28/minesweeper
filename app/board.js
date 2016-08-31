import $ from 'jquery'
import generateBoardDOM from './utils/generateBoardDOM.js'
import populate from './utils/populate.js'
import plantMines from './utils/plantMines.js'
import openGridEvent from './utils/openGridEvent.js'

let gameStarting = false,
    boardDOM = null,
	  boardData = [], // contains the grid's dom and its related mines.
	  bombs = 10,
    bombPositions = {},

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
  bombPositions = plantMines(bombs, boardData)

  // bind boardDOM to gameover event
  $(boardDOM).on('gameover', evt => gameover)
  $(boardDOM).on('mousedown',  evt => openGridEvent({
    evt,
    gameStarting,
    boardData,
    boardDOM,
    bombs,
    bombPositions,
    timer,
  }))

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
