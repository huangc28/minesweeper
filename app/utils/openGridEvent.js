import $ from 'jquery'
import flag from '../flag.js'
import parseCords from './parseCords.js'
import revealBombs from './revealBombs.js'
import traverseToOpen from './traverseToOpen.js'

/**
 * 1. Traverse the 8 direction of the specific location.
 *    	- if 1 of the 8 grids is a bomb, stop traversing, open itself
 *    	- if none them are bombs, keep on traversing to open.
 * 2. If the game first started
 */
const catchClickEvt = ({
  evt,
  gameStarting,
  boardData,
  boardDOM,
  bombs,
  bombPositions,
  timer,
}) => {

  if(!gameStarting) {
    gameStarting = true
    timer.trigger('timer:start')
  }

  // should extract to other object.
  const mouseBtn = {
    right: 2,
    left: 0
  }

  const cords = parseCords(evt.toElement.id)
  // Right click.
  if(!boardData[cords.y][cords.x].isOpen() && evt.button === mouseBtn.right) {
  	(boardData[cords.y][cords.x].toggleFlag()) ? flag.increase() : flag.reduct()
    // mark bomb position
    if(bombPositions.hasOwnProperty(evt.toElement.id)) {
    	bombPositions[evt.toElement.id] = true;
    }
  } else if(evt.button === mouseBtn.left) { // Left click.
  	if(!boardData[cords.y][cords.x].isOpen()) {
  		boardData[cords.y][cords.x].setOpen(true);
  		// if click on bomb, then we end the game, reveal all bombs.
  		if(boardData[cords.y][cords.x].isBomb()) {
        // reveal all bombs
        revealBombs(boardData)
  			$(boardDom).trigger('gameover', ['lose', timer]);
  		} else {
  			// add class
  			$(boardData[cords.y][cords.x].render()).addClass('save-zone')
  			traverseToOpen(boardData[cords.y][cords.x], boardData, boardDOM, bombPositions, bombs)
  		}
  	}
  }
}

export default catchClickEvt
