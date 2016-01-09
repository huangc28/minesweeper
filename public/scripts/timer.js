define(['jquery'], function($) {
	function Timer() {
		this._dom = null;
		this._counterDom = null;
		this._timerInterval
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

		// registering events
		for(event in this.events) {
			$(this._dom).on(event, $.proxy(this.events[event], _self));
		}
	};

	var _stopTimer = function() {
		console.log('stop timer');
	}

	var _startTimer = function() {
		console.log('start timer');
		this.timerInterval = setInterval(function(timer) {
			_updateTimer();
		}, 100)
	};

	var 

	Timer.prototype.trigger = function(evt) {
		if(this.events[evt]) {
			$(this._dom).trigger(evt);
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

	return Timer;
});