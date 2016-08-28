import $ from 'jquery'
import Board from './board.js'
import Timer from './timer.js'

const timer = new Timer()
const boardDom = document.getElementById('ms-container')

const board = new Board(boardDom, {
  width: 10,
  height: 10,
}, timer.draw())

// boardDom.appendChild(timer.render())
// console.log('render board', board.render())
// boardDom.appendChild(board.render())
// $('#ms-container').append(timer.render());
$('#ms-container').append(board.render());
