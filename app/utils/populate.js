import $ from 'jquery'
import Grid from '../Grid.js'

/**
 * @param {object} boardDOM
 * @param {number} width
 * @param {number} height
 * @param {func} cb
 */
const populate = (boardDOM, width, height) => {
  const w = width
  const h = height
  const boardData = []

  for(let i = 1; i <= h; i++) { // populate horizontally.
    boardData[i] = []
    for(let j = 1; j <= w; j++) { // populate vertically.
      boardData[i][j] = new Grid(`${i}-${j}`)
      $(boardDOM).append(boardData[i][j].render())
    }
    $(boardDOM).append("<div class='clear'></div>")
  }

  return boardData
}

export default populate
