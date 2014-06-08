/**
 * Create a new 'IHM'.
 *
 * @return {IHM} for chaining
 * @api public
 */
function IHM() {
	this.magicBar = undefined;
	this.container = undefined;
	this.answersList = undefined;
	this.diagnosticTool = undefined;
	this.backgroundFader = undefined;
	this.probableDiagnostic = undefined;
	this.probableDiagnosticText = undefined;
	this.probableDiagnosticStartOver = undefined;

	this.engine = undefined;

	this.diagnosticResult = null;

	this.currentCategory = undefined;

	this.processNewLine = "%";
	this.processDiagnosticTool = "#";
	this.processDisplayFactAnswers = "/";
	this.processDiagnosticCategories = "@";
	this.processDisplayPossibleDiagnostic = "~";

	this.diagnosticAnswers = {};
	this.diagnosticCategories = {};

	return this;
};

/**
 * Retrieve the IHM's container.
 *
 * @return {HTMLElement} container
 * @api public
 */
IHM.prototype.getContainer = function() {
	return this.container;
};

/**
 * Display a new random diagnostic.
 *
 * @return {IHM} for chaining
 * @api public
 */
IHM.prototype.displayDiagnosticTool = function() {
	this.magicBar.pause();
	this.diagnosticTool.showNewDiagnostic();

	var self = this;
	var interval = setInterval(function() {
		if(self.diagnosticTool.hasFinished()) {
			clearInterval(interval);
			self.magicBar.resume();
			if(self.diagnosticResult) {
				self.magicBar.addInstantly(self.diagnosticResult);
				self.magicBar.add(self.processNewLine);
				self.diagnosticResult = null;
			}
		}
	}, 20);

	return this;
};

/**
 * Display the diagnostic categories.
 *
 * @return {IHM} for chaining
 * @api public
 */
IHM.prototype.displayDiagnosticCategories = function() {
	this.answersList.appendAnswers(this.diagnosticCategories);
	this.answersList.displayAnswerItems();

	return this;
};

/**
 * Display the given answers.
 *
 * @return {IHM} for chaining
 * @api public
 */
IHM.prototype.displayFactAnswers = function(answers) {
	var possibleAnswers = [];
	for(var index in answers) {
		possibleAnswers.push(this.diagnosticAnswers[answers[index]]);
	}

	this.answersList.appendAnswers(possibleAnswers);
	this.answersList.displayAnswerItems();

	return this;
};

/**
 * Transmit a message to the MagicBar.
 *
 * @return {IHM} for chaining
 * @api public
 */
IHM.prototype.tellMagicBarToSay = function(something) {
	this.magicBar.say(something);

	return this;
};

/**
 * Start the IHM.
 *
 * @return {IHM} for chaining
 * @api public
 */
IHM.prototype.start = function() {
	this.tellMagicBarToSay("Bonjour ! Je suis l'Iron Man Armor Diagnostic System." + this.processNewLine +
					  	   "Mais vous pouvez m'appeller I.M.A.D.S." + this.processNewLine +
					  	   "Sur quel sujet puis-je vous venir en aide ?" + this.processDiagnosticCategories);

	return this;
};

/**
 * Process the answer selected by the user.
 *
 * @param {String} answer
 * @return {IHM} for chaining
 * @api public
 */
IHM.prototype.processAnswer = function(answer) {
	this.answersList.disappearAnswerItems();

	var answerValue = this.getAnswerValue(answer);
	var formattedAnswer = this.answersList.formatAnswer(answerValue);
	var finalAnswer = "&nbsp;&nbsp;" + formattedAnswer;
	this.magicBar.addInstantly(finalAnswer);
	this.magicBar.add(this.processNewLine);

	if(answer === "y" || answer === "n" || answer === "i") {

		var validity = (answer === "y" ? true : false);

		if(answer === "i") {
			validity = (Math.round(Math.random() * 100) > 50 ? true : false);

			if(validity) {
				window.player.play('test');
			} else {
				window.player.play(Math.round(Math.random() * 100) > 50 ? 'classified' : 'actual');
			}
			
			this.tellMagicBarToSay("Lancement des tests ..." + this.processDiagnosticTool);

			var randomAnswerValue = this.getAnswerValue(validity ? 'y' : 'n');
			var randomFormattedAnswer = this.answersList.formatAnswer(randomAnswerValue);
			var randomFinalAnswer = "&nbsp;&nbsp;" + randomFormattedAnswer;

			this.diagnosticResult = randomFinalAnswer;
		} else {
			var rand = Math.round(Math.random() * 100);
			var file = (rand > 90 ? null : (rand > 75 ? 'no' : (rand > 50 ? 'indeed' : (rand > 25 ? 'why' : 'dontdothat'))));
			if(file) {
				window.player.play(file);
			}
		}

		this.engine.setFactValidity(this.engine.getCurrentEvaluatedFact(), validity);
	} else {
		this.currentCategory = answer;
	}

	var question = this.engine.triggerNewQuestion(this.currentCategory);
	if(question.diagnostic) {
		window.player.play((Math.round(Math.random() * 100) > 50 ? 'call' : 'diagnostic'));
		this.displayDiagnostic(question.label);
	} else {
		this.tellMagicBarToSay(question.label + this.processDisplayFactAnswers);
	}

	return this;
};

/**
 * Pre-display the diagnostic.
 *
 * @param {String} diagnostic
 * @return {IHM} for chaining
 * @api public
 */
IHM.prototype.displayDiagnostic = function(diagnostic) {
	this.tellMagicBarToSay('Diagnostic probable:' + this.processDisplayPossibleDiagnostic);
	
	this.probableDiagnosticText.innerHTML = diagnostic;

	return this;
};

/**
 * Display the diagnostic.
 *
 * @return {IHM} for chaining
 * @api public
 */
IHM.prototype.displayPossibleDiagnostic = function() {
	this.probableDiagnostic.style.visibility = 'visible';

	return this;
};

/**
 * Restart the diagnostic from scratch.
 *
 * @return {IHM} for chaining
 * @api public
 */
IHM.prototype.startOver = function() {
	this.engine = new Engine().initialize();
	this.answersList.setNextMoveTo(0);
	this.probableDiagnostic.style.visibility = 'hidden';
	this.magicBar.clean();
	this.answersList.resetPosition();
	this.tellMagicBarToSay("Sur quel sujet puis-je vous venir en aide ?" + this.processDiagnosticCategories);

	return this;
};

/**
 * Get the given answer's value.
 *
 * @param {String} answer id
 * @return {String} the answer's value
 * @api public
 */
IHM.prototype.getAnswerValue = function(answer) {
	var objects = [this.diagnosticCategories, this.diagnosticAnswers];

	for(var index in objects) {
		for(var property in objects[index]) {
			if(property === answer) {
				return objects[index][property].value;
			}
		}
	}
	return "Not found: " + answer;
};

/**
 * Transmit data to Engine.
 *
 * @return {IHM} for chaining
 * @api public
 */
IHM.prototype.loadData = function(data) {
	this.engine.loadData(data);

	return this;
};

/**
 * Initialize all IHM's elements and DOM.
 *
 * @param {String} selectedAnswerAccess
 * @return {IHM} for chaining
 * @api public
 */
IHM.prototype.initialize = function(selectedAnswerAccess) {
	this.engine = new Engine().initialize();

	this.container = document.createElement("div");
	this.container.id= "IHMContainer";

		this.magicBar = new MagicBar();
		this.magicBar.initialize();

	this.container.appendChild(this.magicBar.getContainer());

		this.answersList = new AnswersList();
		this.answersList.initialize();

	this.container.appendChild(this.answersList.getContainer());

		this.diagnosticTool = new DiagnosticTool();
		this.diagnosticTool.initialize();

	this.container.appendChild(this.diagnosticTool.getContainer());

		this.probableDiagnostic = document.createElement("div");
		this.probableDiagnostic.id = "ProbableDiagnostic";

			this.probableDiagnosticText = document.createElement("div");
			this.probableDiagnosticText.id = "ProbableDiagnosticText";

			this.probableDiagnosticStartOver = document.createElement('button');
			this.probableDiagnosticStartOver.className = "btn btn-warning btn-lg top30";
			this.probableDiagnosticStartOver.innerHTML = "Recommencer";
			this.probableDiagnosticStartOver.setAttribute("onclick", "Jarvis.startOver();");

		this.probableDiagnostic.appendChild(this.probableDiagnosticText);
		this.probableDiagnostic.appendChild(this.probableDiagnosticStartOver);

	this.container.appendChild(this.probableDiagnostic);

		this.backgroundFader = document.createElement("div");
		this.backgroundFader.id = "IHMBackgroundFader";

	this.container.appendChild(this.backgroundFader);

	this.diagnosticCategories = {
		 music: {value: "Le système musical",     className: "btn btn-link", duration: 0.5,  action: selectedAnswerAccess + "('music');"},
		 power: {value: "Le système energétique", className: "btn btn-link", duration: 0.75, action: selectedAnswerAccess + "('power');"},
		weapon: {value: "Le système d'armement",  className: "btn btn-link", duration: 1,    action: selectedAnswerAccess + "('weapon');"},
		flight: {value: "Le système de vol",      className: "btn btn-link", duration: 1.25, action: selectedAnswerAccess + "('flight');"}
	};

	this.diagnosticAnswers = {
		y: {value: "Oui", 			 className: "btn btn-link", duration: 0.5, 	action: selectedAnswerAccess + "('y');"},
		n: {value: "Non", 			 className: "btn btn-link", duration: 0.75, action: selectedAnswerAccess + "('n');"},
		i: {value: "Je ne sais pas", className: "btn btn-link", duration: 1, 	action: selectedAnswerAccess + "('i');"}
	};

	var self = this;
	this.magicBar.addProcess(this.processNewLine, function() {
		if(self.magicBar.newLine()) {
			self.answersList.setNextMoveTo(self.magicBar.getFullHeight());
		}
	});

	this.magicBar.addProcess(this.processDiagnosticTool, function() {
		self.displayDiagnosticTool();
	});

	this.magicBar.addProcess(this.processDisplayFactAnswers, function() {
		self.displayFactAnswers(self.engine.getAnswersFor(self.engine.getCurrentEvaluatedFact()));
	});

	this.magicBar.addProcess(this.processDiagnosticCategories, function() {
		self.displayDiagnosticCategories();
	});

	this.magicBar.addProcess(this.processDisplayPossibleDiagnostic, function() {
		self.displayPossibleDiagnostic();
	});

	return this;
};