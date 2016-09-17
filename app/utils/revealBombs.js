/**
 * Reveal all bombs of the board.
 *
 * @param {array} boardData
 */
const revealBombs = boardData => {
	boardData.forEach(row => {
		row.forEach(grid => {
			if (grid.isBomb()) grid.reveal()
		})
	})
}

export default revealBombs
