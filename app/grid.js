'use strict'
import $ from 'jquery'

const generateDOM = id => {
	const ele = document.createElement('div')
	ele.className = 'grid'
	ele.id = id
	return ele
}

function grid(id) {
	const	cords = id.split('-')
	this.y = parseInt(cords[0])
	this.x = parseInt(cords[1])
	this._el = generateDOM(id)
	this._isBomb = false
	this._isOpen = false
	this._flag = false
}

grid.prototype.isBomb = function() {
	return this._isBomb
}

grid.prototype.setBomb = function(bomb) {
	$(this._el).append("<span class='bomb hidden'></span>")
	this._isBomb = bomb
}

grid.prototype.reveal = function() {
	var bombEle = $(this._el).find('.bomb')
	if(bombEle || bombEle !== '') {
		$(bombEle).removeClass('hidden')
	}
}

grid.prototype.setOpen = function(isOpen) {
	// reveal hidden bomb
	if(isOpen) {
		$(this._el).addClass('save-zone')
	}
	this._isOpen = isOpen
}

grid.prototype.toggleFlag = function() {
	if(this._flag) {
		$(this._el).removeClass('flag')
		return this._flag = false
	}
	$(this._el).addClass('flag')
	return this._flag = true
}

grid.prototype.isOpen = function() {
	return this._isOpen
}

grid.prototype.getCoordinate = function() {
	return { x: this.x, y: this.y }
}

grid.prototype.render = function() {
	return this._el
}

export default grid
