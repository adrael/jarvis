/**
 * Create a new 'MagicBar'.
 *
 * @return {MagicBar} for chaining
 * @api public
 */
function MagicBar() {
	this.passedLines = 0;
	this.maxPassedLines = 6;
	this.newLineDelay = 500;
	this.characterAppearanceDelay = 75;
	
	this.caret = undefined;
	this.instance = undefined;
	this.container = undefined;
	this.oldQuotes = undefined;
	this.actualQuote = undefined;

	this.waiting = [];
	this.processor = [];
	this.oldLineChar = "- ";
	this.currentLineChar = "&#62; ";

	this.talkative = {
		paused: false,
		running: false,
		end: undefined,
		text: undefined,
		position: undefined,
		currentInterval: undefined
	};

	return this;
}

/**
 * Set the new line delay.
 *
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.setNewLineDelay = function(delay) {
	this.newLineDelay = delay;

	return this;
};

/**
 * Set the character appearance delay.
 *
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.setCharacterAppearanceDelay = function(delay) {
	this.characterAppearanceDelay = delay;

	return this;
};

/**
 * Get the new line delay.
 *
 * @return {Integer} newLineDelay
 * @api public
 */
MagicBar.prototype.getNewLineDelay = function() {
	return this.newLineDelay;
};

/**
 * Get the character appearance delay.
 *
 * @return {Integer} characterAppearanceDelay
 * @api public
 */
MagicBar.prototype.getCharacterAppearanceDelay = function() {
	return this.characterAppearanceDelay;
};

/**
 * Get the number of previously said sentences.
 *
 * @return {Integer} passedLines
 * @api public
 */
MagicBar.prototype.getPassedLines = function() {
	return this.passedLines;
};

/**
 * Process the given value and add it instantly if no processing has been found.
 *
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.add = function(value) {
	if(!this.evaluate(value)) {
		this.addInstantly(value);
	}

	return this;
};

/**
 * Add the given value without processing.
 *
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.addInstantly = function(value) {
	var spanValue = document.createElement("span");
	spanValue.innerHTML = value;

	this.actualQuote.insertBefore(spanValue, this.caret);
};

/**
 * Add the given phrase to the waiting array.
 *
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.waitToSay = function(phrase) {
	this.waiting.push(phrase);

	return this;
};

/**
 * Pause the spelling.
 *
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.pause = function() {
	this.talkative.paused = true;

	return this;
};

/**
 * Get the next thing to say.
 *
 * @return {String} nextToSay
 * @api public
 */
MagicBar.prototype.getNextToSay = function() {
	var nextToSay =  this.waiting[0];
	this.waiting = this.waiting.splice(1, 1);
	return nextToSay;
};

/**
 * Verify if something can be said.
 *
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.checkNextToSay = function() {
	if(!this.talkative.running && !this.talkative.paused && this.waiting.length > 0) {
		this.say(this.getNextToSay());
	}

	return this;
};

/**
 * Resume the spelling.
 *
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.resume = function() {
	this.talkative.paused = false;

	this.checkNextToSay();

	return this;
};

/**
 * Say the given phrase.
 *
 * @param {String} phrase
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.say = function(phrase) {
	if(this.talkative.running || this.talkative.paused) {
		return this.waitToSay(phrase);
	}

	this.talkative.position = 0;
	this.talkative.text = phrase;
	this.talkative.running = true;
	this.talkative.end = phrase.length;
	
	var self = this;
	this.talkative.currentInterval = setInterval(function() {
		if(!self.talkative.paused) {
			self.add(self.talkative.text[self.talkative.position]);

			if(++self.talkative.position === self.talkative.end) {
				self.talkative.running = false;
				clearInterval(self.talkative.currentInterval);

				if(!self.talkative.paused && self.waiting.length > 0) {
					self.newLine();
					self.say(self.getNextToSay());
				}
			}
		}

	}, this.characterAppearanceDelay);

	return this;
};

/**
 * Clear the actual sentence.
 *
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.clear = function() {
	while(this.actualQuote.childNodes.length > 0) {
		this.actualQuote.removeChild(this.actualQuote.childNodes[0]);
	}

	this.actualQuote.appendChild(this.caret);

	return this;
};

/**
 * Start over.
 *
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.clean = function() {
	while(this.actualQuote.childNodes.length > 0) {
		this.actualQuote.removeChild(this.actualQuote.childNodes[0]);
	}

	this.actualQuote.appendChild(this.caret);

	while(this.oldQuotes.childNodes.length > 0) {
		this.oldQuotes.removeChild(this.oldQuotes.childNodes[0]);
	}
	
	this.passedLines = 0;


	this.addInstantly(this.currentLineChar);

	return this;
};

/**
 * Get the actual value of MagicBar.
 *
 * @return {String} value
 * @api public
 */
MagicBar.prototype.getValue = function() {
	var value = "";
	var spans = document.querySelectorAll("#" + this.actualQuote.id + " span");

	for(var i = 1; i < spans.length; ++i) {
		value += spans[i].innerHTML;
	}

	return value;
};

/**
 * Create a new line.
 *
 * @param {boolean} instantly
 * @return {boolean} indicating if a new line has been added or an old one has been removed
 * @api public
 */
MagicBar.prototype.newLine = function(instantly) {
	var alreadyPaused = this.talkative.paused;
	this.talkative.paused = true;

	var self = this;
	setTimeout(function() {
		if(++self.passedLines === self.maxPassedLines) {
			self.oldQuotes.removeChild(self.oldQuotes.childNodes[0]); // The real line
			self.oldQuotes.removeChild(self.oldQuotes.childNodes[0]); // The <br> tag
			--self.passedLines;
		}

		var span = document.createElement("span");
		span.className = "oldQuote";
		span.innerHTML = self.oldLineChar + self.getValue();

		if(self.oldQuotes.childNodes.length > 0) {
			self.oldQuotes.appendChild(document.createElement("br"));
		}

		self.oldQuotes.appendChild(span);
		self.clear();
		self.addInstantly(self.currentLineChar);
		self.talkative.paused = (alreadyPaused ? true : false);

	}, (instantly ? 0 : this.newLineDelay));

	return (this.passedLines + 1 < this.maxPassedLines);
};

/**
 * Add a process action to the given argument.
 *
 * @param {Character} argument
 * @param {Function} processCallback
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.addProcess = function(argument, processCallback) {
	this.processor.push({argument: argument, processCallback: processCallback});

	return this;
};

/**
 * Remove the process action linked to the given argument.
 *
 * @param {Character} argument
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.removeProcess = function(argument) {
	for(var i = 0; i < this.processor.length; ++i) {
		if(this.processor[i].argument === argument) {
			this.processor = this.processor.slice(i, 1);
			break;
		}
	}

	return this;
};

/**
 * Evaluate the given argument and execute the process action linked to it.
 *
 * @param {Character} argument
 * @return {boolean} indicating an existing process
 * @api public
 */
MagicBar.prototype.evaluate = function(argument) {
	for(var i = 0; i < this.processor.length; ++i) {
		if(this.processor[i].argument === argument) {
			this.processor[i].processCallback.call(this);
			return true;
		}
	}

	return false;
};

/**
 * Retrieve the MagicBar's total height.
 *
 * @return {Integer} the total height
 * @api public
 */
MagicBar.prototype.getFullHeight = function() {
	return this.actualQuote.clientHeight;
};

/**
 * Retrieve the MagicBar's container.
 *
 * @return {HTMLElement} container
 * @api public
 */
MagicBar.prototype.getContainer = function() {
	return this.container;
};

/**
 * Initialize all MagicBar's elements and DOM.
 *
 * @return {MagicBar} for chaining
 * @api public
 */
MagicBar.prototype.initialize = function() {
	this.container = document.createElement("div");
	this.container.id = "MagicBarContainer";

		this.instance = document.createElement("div");
		this.instance.id = "MagicBar";

	this.container.appendChild(this.instance);

			this.oldQuotes = document.createElement("div");
			this.oldQuotes.id = "oldQuotes";

		this.instance.appendChild(this.oldQuotes);

			this.actualQuote = document.createElement("div");
			this.actualQuote.id = "actualQuote";

		this.instance.appendChild(this.actualQuote);

				this.caret = document.createElement("b");
				this.caret.className = "caret rectangle orange";
				this.caret.innerHTML = "&#8203;";

			this.actualQuote.appendChild(this.caret);

	this.addInstantly(this.currentLineChar);

	var self = this;
	setInterval(function() {
		self.checkNextToSay();
	}, this.newLineDelay);

	return this;
};