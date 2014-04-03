
function MagicBar() {
	this.newLineDelay = 500;
	this.appearanceDelay = 75;
	
	this.oldQuotes = undefined;
	this.actualQuote = undefined;
	this.container = undefined;
	this.caret = undefined;

	this.processor = [];
	this.waiting = [];
	this.currentLineChar = "&#62; ";

	this.currentCategoriesPosition = 20;
	this.passedLines = 0;
	this.maxPassedLines = 6;

	this.talkative = {
		text: undefined,
		paused: false,
		running: false,
		position: undefined,
		end: undefined,
		currentInterval: undefined
	};
}

MagicBar.prototype.setNewLineDelay = function(delay) {
	this.newLineDelay = delay;
};

MagicBar.prototype.setAppearanceDelay = function(delay) {
	this.appearanceDelay = delay;
};

MagicBar.prototype.getNewLineDelay = function() {
	return this.newLineDelay;
};

MagicBar.prototype.getAppearanceDelay = function() {
	return this.appearanceDelay;
};

MagicBar.prototype.add = function(value) {
	if(!this.evaluate(value)) {
		this.addInstantly(value);
	}
};

MagicBar.prototype.addInstantly = function(value) {
	var spanValue = document.createElement("span");
	spanValue.innerHTML = value;

	this.actualQuote.insertBefore(spanValue, this.caret);
};

MagicBar.prototype.waitToSay = function(phrase) {
	var found = false;
	for(var i = 0; i < this.waiting.length; ++i) {
		if(this.waiting[i] === phrase) {
			found = true;
			break;
		}
	}

	if(!found) {
		this.waiting.push(phrase);
	}
};

MagicBar.prototype.say = function(phrase) {
	if(this.talkative.running) {
		this.waitToSay(phrase);
		return;
	}

	var self = this;
	this.talkative.text = phrase;
	this.talkative.position = 0;
	this.talkative.end = phrase.length;
	this.talkative.running = true;
	this.talkative.currentInterval = setInterval(function() {
		if(!self.talkative.paused) {
			self.add(self.talkative.text[self.talkative.position]);

			if(++self.talkative.position === self.talkative.end) {
				self.talkative.running = false;
				clearInterval(self.talkative.currentInterval);

				if(self.waiting.length > 0) {
					self.newLine();
					self.say(self.waiting[0]);
					self.waiting = self.waiting.splice(1, 1);
				}
			}
		}

	}, this.appearanceDelay);
};

MagicBar.prototype.clear = function() {
	while(this.actualQuote.childNodes.length > 0) {
		this.actualQuote.removeChild(this.actualQuote.childNodes[0]);
	}

	this.actualQuote.appendChild(this.caret);
};

MagicBar.prototype.getPassedLines = function() {
	return this.passedLines;
};

MagicBar.prototype.newLine = function(instantly) {
	this.talkative.paused = true;
	var self = this;
	setTimeout(function() {
		if(++self.passedLines === self.maxPassedLines) {
			self.oldQuotes.removeChild(self.oldQuotes.childNodes[0]);
			self.oldQuotes.removeChild(self.oldQuotes.childNodes[0]);
			--self.passedLines;
		} else {
			self.currentCategoriesPosition += self.getHeight() / 1.5;
		}

		var span = document.createElement("span");
		span.className = "oldQuote";
		span.innerHTML = "- " + self.getValue();

		if(self.oldQuotes.childNodes.length > 0) {
			self.oldQuotes.appendChild(document.createElement("br"));
		}

		self.oldQuotes.appendChild(span);
		self.clear();
		self.addInstantly(self.currentLineChar);
		self.talkative.paused = false;
		document.getElementById("categories").style.marginTop = self.currentCategoriesPosition + "px";
		document.getElementById("finalDiagnostic").style.marginTop = self.currentCategoriesPosition + 100 + "px";
	}, (instantly ? 0 : this.newLineDelay));
};

MagicBar.prototype.getHeight = function() {
	return document.getElementById("magicbar").clientHeight;
};

MagicBar.prototype.getValue = function() {
	var value = "";
	var spans = document.querySelectorAll("#actualQuote span");

	for(var i = 1; i < spans.length; ++i) {
		value += spans[i].innerHTML;
	}

	return value;
};

MagicBar.prototype.process = function(argument, processfunction) {
	this.processor.push({arg: argument, func: processfunction});
};

//hp1927l3t1
MagicBar.prototype.removeProcess = function(argument) {
	var index = null;
	for(var i = 0; i < this.processor.length; ++i) {
		if(this.processor[i].arg === argument) {
			index = i;
			break;
		}
	}
	this.processor = this.processor.slice(index, 1);
};

MagicBar.prototype.evaluate = function(argument) {
	for(var i = 0; i < this.processor.length; ++i) {
		if(this.processor[i].arg === argument) {
			this.processor[i].func.call(this);
			return true;
		}
	}
	return false;
};

MagicBar.prototype.init = function() {
	this.container = document.getElementById("magicbar");

	this.oldQuotes = document.createElement("div");
	this.oldQuotes.id = "oldQuotes";

	this.actualQuote = document.createElement("div");
	this.actualQuote.id = "actualQuote";

	this.container.appendChild(this.oldQuotes);
	this.container.appendChild(this.actualQuote);

	this.caret = document.createElement("b");
	this.caret.className = "caret rect orange";
	this.caret.innerHTML = "&#8203;";

	this.actualQuote.appendChild(this.caret);
	this.addInstantly(this.currentLineChar);
};