/**
 * Create a new 'Engine'.
 *
 * @return {Engine} for chaining
 * @api public
 */
function Engine() {
	this.factBase = undefined;
	this.ruleBase = undefined;

	this.currentEvaluatedFact = null;

	return this;
}

/**
 * Retrieve the current evaluated fact ID.
 *
 * @return {Integer} currentEvaluatedFact
 * @api public
 */
Engine.prototype.getCurrentEvaluatedFact = function() {
	return this.currentEvaluatedFact;
};

/**
 * Retrieve the answers for the given fact ID.
 *
 * @param {Integer} factId
 * @return {Array} the possible answers
 * @api public
 */
Engine.prototype.getAnswersFor = function(factId) {
	return this.factBase.getFact(factId).getAnswers();
};

/**
 * Retrieve all the initial facts.
 *
 * @return {Array} initialFacts
 * @api public
 */
Engine.prototype.getAllInitialFacts = function() {
	var initialFacts = [];
	var facts = this.factBase.getFacts();
	for(var index in facts) {
		var factId = facts[index].getId();
		if(this.ruleBase.getRules(factId).length === 0) {
			initialFacts.push(this.factBase.getFact(factId));
		}
	}

	return initialFacts;
};

/**
 * Retrieve all the terminal facts.
 *
 * @return {Array} terminalFacts
 * @api public
 */
Engine.prototype.getAllTerminalFacts = function() {
	var terminalFacts = [];
	var facts = this.factBase.getFacts();
	var rules = this.ruleBase.getAllRules();
	for(var index in facts) {
		var factId = facts[index].getId();
		var isInAccessor = false;
		for(var index2 in rules) {
			if(this.ruleBase.isIn(factId, rules[index2])) {
				isInAccessor = true;
				break;
			}
		}

		if(!isInAccessor) {
			terminalFacts.push(this.factBase.getFact(factId));
		}
	}

	return terminalFacts;
};

/**
 * Add the given fact to the base.
 *
 * @param {Fact} fact
 * @return {Engine} for chaining
 * @api public
 */
Engine.prototype.addFact = function(fact) {
	this.factBase.addFact(fact);

	return this;
};

/**
 * Add the given rule to the base.
 *
 * @param {Fact} fact
 * @param {Array} ruleAccess
 * @return {Engine} for chaining
 * @api public
 */
Engine.prototype.addRule = function(fact, ruleAccess) {
	this.addFact(fact);
	this.ruleBase.addRule(fact.getId(), ruleAccess);

	return this;
};

/**
 * Set the given fact validity to the given validity.
 *
 * @param {Integer} id
 * @param {boolean} validity
 * @return {Engine} for chaining
 * @api public
 */
Engine.prototype.setFactValidity = function(id, validity) {
	this.factBase.setFactValidity(id, validity);

	return this;
};

Engine.prototype.inferMixed = function(category) {
	this.inferForward(category);
	return this.inferBackward(category);
};

/**
 * Infer forward to update the rules.
 *
 * @return {Array} The inferred facts
 * @api public
 */
Engine.prototype.inferForward = function(category) {
	var inferedFacts = [];
	var finished = false;
	while(!finished) {
		finished = true;
		var rules = this.ruleBase.getAllRules();
		for(ruleIndex in rules) {
			var rule = rules[ruleIndex];
			if(this.factBase.getFact(rule.getFactId()).getCategory() === category && !this.factBase.isFactValid(rule.getFactId()) && rule.isValid(this.factBase)) {
				this.factBase.setFactValidity(rule.getFactId(), true);
				inferedFacts.push(rule.getFactId());

				finished = false;
			}
		}
	}

	return inferedFacts;
};

/**
 * Infer backward to look for a question to ask.
 *
 * @return {int} The ID of the next question to ask.
 * @api public
 */
Engine.prototype.inferBackward = function(category) {
	var primaryGoals = this.ruleBase.getPrimaryGoals();
	for(var goalIndex in primaryGoals) {
		var goalID = primaryGoals[goalIndex];
		var initialPremises = this.ruleBase.initialPremises(goalID);
		for(var premiseIndex in initialPremises) {
			var premiseID = initialPremises[premiseIndex];
			if(this.factBase.getFact(premiseID).getCategory() === category && this.factBase.isFactValidToAsk(premiseID)) {
				this.factBase.getFact(premiseID).setAsked(true);
				return premiseID;
			}
		}
	}

	return null;
};

Engine.prototype.triggerNewQuestion = function(category) {
	var answer = {diagnostic: false};
	var factId = this.inferMixed(category);

	if(!factId) {
		answer.diagnostic = true;

		var diags = this.getValidDiagnostics();
		for(i in diags) {
			if(!diags[i].isAsked()) {
				factId = diags[i].getId();
				diags[i].setAsked(true);
				break;
			}
		}
	}

	this.currentEvaluatedFact = factId;

	if(answer.diagnostic) {
		answer.label = (factId ? this.factBase.getFact(factId).getLabel() : "Vous allez très bien milord !");
	} else {
		answer.label = (factId ? this.factBase.getFact(factId).getQuestion() : "Vous allez très bien milord !");
	}

	return answer;
};

Engine.prototype.getValidDiagnostics = function() {
	var diags = [];

	var rules = this.ruleBase.getAllRules();

	for(index in rules) {
		var rule = rules[index];
		var fact = this.factBase.getFact(rule.getFactId());
		if(fact.isDiagnostic()) {
			var valid = true;
			var accessors = rule.getAccessors();
			for(j in accessors) {
				if(!this.factBase.isFactValid(accessors[j])) {
					valid = false;
					break;
				}
			}

			if(valid) {
				diags.push(fact);
			}
		}
	}

	return diags;
};

/**
 * Load the given data to the base.
 *
 * @param {Object} data
 * @return {Engine} for chaining
 * @api public
 */
Engine.prototype.loadData = function(data) {
	var fact = new Fact(data.id);
	fact.setQuestion(data.question);
	fact.setAnswers(data.answers);
	fact.setLabel(data.label);
	fact.setCategory(data.category);

	if(data.label !== '' && data.question === '') {
		fact.setDiagnostic(true);
	}

	if(data.causedBy.length === 0) {
		this.addFact(fact);
	} else {
		this.addRule(fact, data.causedBy);
	}

	return this;
};

/**
 * Initialize all Engine's elements.
 *
 * @return {Engine} for chaining
 * @api public
 */
Engine.prototype.initialize = function() {
	this.factBase = new FactBase();
	this.ruleBase = new RuleBase();

	return this;
};