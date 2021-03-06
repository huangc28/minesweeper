const bombPositions = {}

/**
 * @param {number} bombs
 * @param {array} boardData
 * @param {object} bombPositions
 */
const plantMines = (bombs, boardData) => {
	for(let i = 0; i < bombs; i++) {
		const xcord = Math.floor((Math.random() * 10) + 1)
		const ycord = Math.floor((Math.random() * 10) + 1)
		if(!boardData[ycord][xcord].isBomb()) {
			boardData[ycord][xcord].setIsBomb(true)
			bombPositions[String(xcord + '-' + ycord)] = false
		} else { i-- }
	}
  return bombPositions
}

export default plantMines
