define(['jquery'], function($) {
	"use strict";
	function Grid(options) {
		this._el = null;
		this.x = null;
		this.y = null;
		this._isBomb = false;
		this._isOpen = false;
		this._options = options;
		_generateDom.call(this);

 		function _generateDom() {
 			var el = document.createElement('div'),
 				_cords = this._options.id.split('-');
 			el.className = 'grid';
 			el.id = this._options.id;
 			this.y = parseInt(_cords[0]);
 			this.x = parseInt(_cords[1]);
 			this._el = el;
 		}
	};

	Grid.prototype.isBomb = function() {
		return this._isBomb;
	};

	Grid.prototype.setBomb = function(bomb) {
		this._isBomb = bomb;
	};

	Grid.prototype.setOpen = function(isOpen) {
		this._isOpen = isOpen;
	};

	Grid.prototype.isOpen = function() {
		return this._isOpen;
	};

	Grid.prototype.getCoordinate = function() {
		return {x: this.x, y: this.y}
	}

	Grid.prototype.render = function() {
		return this._el;
	};

	return Grid;
});