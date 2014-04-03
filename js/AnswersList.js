/**
 * Create a new 'AnswersList'.
 *
 * @return {AnswersList} for chaining
 * @api public
 */
function AnswersList() {
	this.list = undefined;
	this.container = undefined;

	this.displayed = false;
	this.disappearing = false;

	this.nextMoveTo = 0;
	this.marginToMove = 250;
	this.currentlyDisplayedAnswers = 0;

	this.answersPrefix = "&#5125; ";

	this.currentAnswers = [];

	return this;
}

/**
 * Change the answers' prefix.
 *
 * @return {AnswersList} for chaining
 * @api public
 */
AnswersList.prototype.setAnswersPrefix = function(prefix) {
	this.answersPrefix = prefix;

	return this;
};

/**
 * Reset the position.
 *
 * @return {AnswersList} for chaining
 * @api public
 */
AnswersList.prototype.resetPosition = function() {
	this.nextMoveTo = 0;
	this.marginToMove = 230;
	this.container.style.marginTop = this.marginToMove + "px";

	return this;
};

/**
 * Get the answers' prefix.
 *
 * @return {String} answersPrefix
 * @api public
 */
AnswersList.prototype.getAnswersPrefix = function() {
	return this.answersPrefix;
};

/**
 * Append the given answers to the list.
 *
 * @param {Array/Object} answers
 * @return {AnswersList} for chaining
 * @api public
 */
AnswersList.prototype.appendAnswers = function(answers) {
	for(var answer in answers) {
		this.appendAnswer(answers[answer], "ans-" + this.currentAnswers.length);
	}

	return this;
};

/**
 * Append the given answer to the list.
 *
 * @param {Object} answer
 * @param {String} itemId
 * @return {AnswersList} for chaining
 * @api public
 */
AnswersList.prototype.appendAnswer = function(answer, itemId) {
	var li = document.createElement("li");
	li.id = itemId;
	li.appendChild(this.createAnswerItem(answer));

	this.list.appendChild(li);

	this.currentAnswers.push({element: li, duration: answer.duration});

	return this;
};

/**
 * Create the HTML representation of the given answer.
 *
 * @param {Object} answer
 * @return {HTMLElement} btn
 * @api public
 */
AnswersList.prototype.createAnswerItem = function(answer) {
	var btn = document.createElement("button");
	btn.className = answer.className;
	btn.innerHTML = this.answersPrefix + answer.value;
	btn.setAttribute("onclick", answer.action);

	return btn;
};

/**
 * Format the given answer to the displayed answer's format.
 *
 * @param {String} answer
 * @return {String} the given formatted answer
 * @api public
 */
AnswersList.prototype.formatAnswer = function(answer) {
	return this.answersPrefix + answer;
};

/**
 * Display all of the answers.
 *
 * @param {String} itemId
 * @param {Number} duration
 * @return {AnswersList} for chaining
 * @api public
 */
AnswersList.prototype.displayAnswerItems = function() {
	if(!this.displayed) {
		this.displayed = true;

		if(this.nextMoveTo > 0) {
			this.move();
		}

		for(var answer in this.currentAnswers) {
			this.displayAnswerItem(this.currentAnswers[answer]);
		}
	}

	return this;
};

/**
 * Display the specified answer.
 *
 * @param {Object} item
 * @return {AnswersList} for chaining
 * @api private
 */
AnswersList.prototype.displayAnswerItem = function(item) {
	++this.currentlyDisplayedAnswers;
	move('#' + item.element.id).duration('0s').set('opacity', 0).x(-100).end();
	move('#' + item.element.id).duration(item.duration + 's').set('opacity', 1).ease('in').x(0).end();

	return this;
};

/**
 * Make the answers disappear.
 *
 * @return {AnswersList} for chaining
 * @api public
 */
AnswersList.prototype.disappearAnswerItems = function() {
	if(!this.disappearing) {
		this.disappearing = true;
		
		for(var answer in this.currentAnswers) {
			this.disappearAnswerItem(this.currentAnswers[answer]);
		}
	}

	return this;
};

/**
 * Make the given answer disappear.
 *
 * @param {Object} item
 * @return {AnswersList} for chaining
 * @api private
 */
AnswersList.prototype.disappearAnswerItem = function(item) {
	var self = this;
	move('#' + item.element.id).duration(item.duration + 's').set('opacity', 0).ease('in').x(100).end(function() {
		if(--self.currentlyDisplayedAnswers === 0) {
			self.clearAnswers();
			self.displayed = false;
			self.disappearing = false;
		}
	});

	return this;
};

/**
 * Clear the answers list.
 *
 * @return {AnswersList} for chaining
 * @api public
 */
AnswersList.prototype.clearAnswers = function() {
	while(this.list.childNodes.length > 0) {
		this.list.removeChild(this.list.childNodes[0]);
	}

	this.currentAnswers = [];

	return this;
};

/**
 * Set the nexy move position.
 *
 * @param {Integer} position
 * @return {AnswersList} for chaining
 * @api public
 */
AnswersList.prototype.setNextMoveTo = function(position) {
	this.nextMoveTo = position;

	return this;
};

/**
 * Move the AnswersList's container.
 *
 * @param {Integer} position
 * @return {AnswersList} for chaining
 * @api public
 */
AnswersList.prototype.move = function() {
	this.container.style.marginTop = (this.marginToMove += this.nextMoveTo) + "px";
	this.nextMoveTo = 0;

	return this;
};

/**
 * Retrieve the AnswersList's container.
 *
 * @return {HTMLElement} container
 * @api public
 */
 AnswersList.prototype.getContainer = function() {
 	return this.container;
 }

/**
 * Initialize all AnswersList's elements and DOM.
 *
 * @return {AnswersList} AnswersList's container
 * @api public
 */
AnswersList.prototype.initialize = function() {
	this.container = document.createElement("div");
	this.container.id = "AnswersListContainer";

		this.list = document.createElement("ul");
		this.list.id = "AnswersList";

	this.container.appendChild(this.list);

	return this;
};