import $ from 'jquery'
import generateBoardDOM from './utils/generateBoardDOM.js'
import populate from './utils/populate.js'
import plantMines from './utils/plantMines.js'
import openGridEvent from './utils/openGridEvent.js'
import gameoverEvent from './utils/gameOverEvent.js'
import bombPositions from './utils/bombPositions.js'

let gameStarting = false,
    boardDOM = null,
	  boardData = [] // contains the grid's dom and its related mines.

const Board = (initDom, options, timer) => {
  const { width, bombNum = 10 } = options

  // Append Timer
  initDom.appendChild(timer.render())
	boardDOM = generateBoardDOM()
  boardData = populate(boardDOM, width)
  // Bind click event, determine:
  // 1. Right click - open
  // 2. Left click  - flag
  // 3. Click both
  // use "mouse-down" event instead of click.
  const positionMap = plantMines(bombNum, boardData)
  bombPositions.save(positionMap)

  // bind boardDOM to gameover event
  $(boardDOM).on('gameover', gameoverEvent)
  $(boardDOM).on('mousedown',  evt => openGridEvent({
    evt,
    gameStarting,
    boardData,
    boardDOM,
    bombNum,
    timer,
  }))

  return {
    render: () => boardDOM
  }
}

export default Board
