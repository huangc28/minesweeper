import $ from 'jquery'
import Grid from '../Grid.js'

/**
 * The board is always going to be a square.
 *
 * @param {object} boardDOM
 * @param {number} width
 * @param {number} height
 * @param {func} cb
 */
const populate = (boardDOM, width = 10) => {
  const boardData = []

  for(let i = 1; i <= width; i++) { // populate horizontally.
    boardData[i] = []
    for(let j = 1; j <= width; j++) { // populate vertically.
      boardData[i][j] = new Grid(`${i}-${j}`)
      $(boardDOM).append(boardData[i][j].render())
    }
    $(boardDOM).append("<div class='clear'></div>")
  }

  return boardData
}

export default populate
