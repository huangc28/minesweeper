import $ from 'jquery'
import flag from '../flag.js'
import parseCords from './parseCords.js'
import revealBombs from './revealBombs.js'
import traverseToOpen from './traverseToOpen.js'
import bombPositions from './bombPositions.js'

// should extract to other object.
const click = {
  right: 2,
  left: 0
}

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
  timer,
}) => {
  const bombMap = bombPositions.load()


  if(!gameStarting) {
    gameStarting = true
    timer.trigger('timer:start')
  }

  const cords = parseCords(evt.toElement.id)
  // Right click.
  if (!boardData[cords.y][cords.x].isOpen() && evt.button === click.right) {
  	(boardData[cords.y][cords.x].toggleFlag()) ? flag.increase() : flag.reduct()
    // mark bomb position
    if (bombMap.hasOwnProperty(evt.toElement.id)) {
    	bombMap[evt.toElement.id] = true;
    }
  } else if (evt.button === click.left) { // Left click.
  	if(!boardData[cords.y][cords.x].isOpen()) {
  		boardData[cords.y][cords.x].setOpen(true);
  		// if click on bomb, then we end the game, reveal all bombs.
  		if(boardData[cords.y][cords.x].isBomb()) {
        // reveal all bombs
        revealBombs(boardData)
  			$(boardDOM).trigger('gameover', ['lose', timer]);
  		} else {
  			// add class
  			$(boardData[cords.y][cords.x].render()).addClass('save-zone')
  			traverseToOpen(boardData[cords.y][cords.x], boardData, boardDOM, bombs)
  		}
  	}
  }
}

export default catchClickEvt
