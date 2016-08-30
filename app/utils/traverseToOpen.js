import $ from 'jquery'

/**
 * @param {object} grid
 * @param {object} boardData
 */
const traverseToOpen = (grid, boardData) => {
  const { y, x } = grid.getCoordinate()
	const bombsInfo = []
  const targetCords = {}
  const whiteList = []

	targetCords.self = boardData[y][x]

	// left bound check
	targetCords.left = (typeof boardData[y][x-1] !== 'undefined') ? boardData[y][x-1] : ''

	// right bound check
	targetCords.right = (typeof boardData[y][x+1] !== 'undefined') ? boardData[y][x+1] : ''

	// upper bound check
	if(typeof boardData[y+1] != 'undefined') {
		targetCords.up = boardData[y+1][x]

		// left bound check.
		if(typeof boardData[y+1][x-1] != 'undefined') {
			targetCords.upLeft = boardData[y+1][x-1]
		}

		// right bound check.
		if(typeof boardData[y+1][y+1] != 'undefined') {
			targetCords.upRight = boardData[y+1][x+1]
		}
	}

	// lower bound check
	if(typeof boardData[y-1] != 'undefined') {
		targetCords.bottom = boardData[y-1][x]
		// check left bound
		if(typeof boardData[y-1][x-1] != 'undefined') {
			targetCords.bottomLeft = boardData[y-1][x-1]
		}

		// check right bound
		if(typeof boardData[y-1][x+1] != 'undefined') {
			targetCords.bottomRight = boardData[y-1][x+1]
		}
	}

	// traverse the surrounding of (x, y)
	// if bomb is detected, don't reveal the surrounding
	// if no bombs are detected, reavel all surroundings
	// detected upper
	for(let _cord in targetCords) {
		if(targetCords.hasOwnProperty(_cord) && targetCords[_cord] !== '' && typeof targetCords[_cord] !== 'undefined') {
			if(typeof targetCords[_cord] != '' && !targetCords[_cord].isOpen() && targetCords[_cord].isBomb()) {
				bombsInfo.push(targetCords[_cord])
			}
			if(typeof targetCords[_cord] != '' && !targetCords[_cord].isOpen() && !targetCords[_cord].isBomb()) {
				whiteList.push(targetCords[_cord])
			}
		}
	}

	// bombs exists
	if(bombsInfo.length > 0) {
		// calculate the distance between self and the bomb.
		$(targetCords.self.render()).html(bombsInfo.length)
	} else {
		// traverse 8 directions. plug them into _traverseToOpen function
		whiteList.forEach(grid => {
			grid.setOpen(true)
			traverseToOpen(grid, boardData)
		})
	}
}

export default traverseToOpen
