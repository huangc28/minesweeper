/**
 * Check if it meets the winning condition.
 *
 *	1. Number of flags equals to the number of mines
 *  2. bombs position are all marked by flags.
 */
const win = (flagCount, bombs, bombPositions) => {
	const bombsAllMarked = true

	// if one of the position is not marked, set the flag to false;
	for(let position in bombPositions) {
		if(!position) {
			bombsAllMarked = false
			break
		}
	}
	// console.log('flag count:', this._flagCount);
	// console.log('bombs count:', this._bombs);
	return (flagCount === bombs && bombsAllMarked) || false
}

export default win
