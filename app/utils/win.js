/**
 * Check if it meets the winning condition.
 *
 *	1. Number of flags equals to the number of mines
 *  2. bombs position are all marked by flags.
 */
const win = (flagCount, bombs, bombPositions) => {

	const allBombAreSetFlag = Object.keys(bombPositions).every(
		position => bombPositions[position]
	)

	return (flagCount === bombs && allBombAreSetFlag) || false
}

export default win
