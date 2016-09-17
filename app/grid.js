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

grid.prototype.setIsBomb = function(hasBomb) {
	this._isBomb = hasBomb
}

grid.prototype.reveal = function() {
	const bombEle = $(this._el)
	if(bombEle) {
		$(bombEle).addClass('bomb')
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
