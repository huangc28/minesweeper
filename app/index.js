import $ from 'jquery'
import Board from './Board.js'
import Timer from './Timer.js'

const timer = new Timer()
const board = Board(document.getElementById('ms-container'), {
  width: 10, // pick the size
}, timer.draw())

$('#ms-container').append(board.render())
