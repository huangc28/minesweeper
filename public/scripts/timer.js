define(['jquery'], function($) {
	function Timer() {
		this._dom = null;
		this._counterDom = null;
		this._timerInterval;
		this.events = {
			'timer:start': _startTimer,
			'timer:stop': _stopTimer
		}

		return this;
	};

	var _draw = function() {
		var _self = this;
		this._dom = document.createElement('div');
		this._dom.className = 'ms-timer';
		var textNode = document.createElement('span');
		this._counterDom = document.createElement('span');
		textNode.innerHTML = 'Game Timer: ';
		this._counterDom.innerHTML = '0';
		this._dom.appendChild(textNode);
		this._dom.appendChild(this._counterDom);

		// console.log($(this._dom).data('events'));
		// registering events
		for(event in this.events) {
			$(this._dom).on(event, $.proxy(this.events[event], _self));
		}
	};

	var _stopTimer = function(evt, timer) {
		clearTimeout(timer.timerInterval);
	}

	var _startTimer = function(evt, timer) {
		console.log('timer start');
		timer.counter = 0;
		timer.timerInterval = null;
		timer.timerInterval = setInterval(function() {
			var _count = timer.counter++;
			_updateTimer.call(timer, _count);
		}, 1000)
	};

	var _updateTimer = function(count) {
		this._counterDom.innerHTML = '';
		this._counterDom.innerHTML = String(count);
	};

	Timer.prototype.trigger = function(evt) {
		var _self = this;
		if(this.events[evt]) {
			$(this._dom).trigger(evt, [_self]);
		} else {
			console.log('no such event');
		}
	}

	/**
	 * Drawing timer DOM.
	 */
	Timer.prototype.draw = function() {		
		// create timer dom
		_draw.call(this);
		return this;
	};

	Timer.prototype.render = function() {
		return this._dom;
	};

	Timer.prototype.unbindAll = function() {
		for(event in this.events) {
			if($._data(this._dom, 'events')[event]) {
				$(this._dom).unbind(event);	
			}
		}
	};

	Timer.prototype.counter = 0;

	Timer.prototype.timerInterval = null;

	return Timer;
});