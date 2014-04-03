function RuleBase() {
	this.rules = [];
}

RuleBase.prototype.addRule = function(factId, ruleAccess) {
	if(!this.hasRule(factId, ruleAccess)) {
		this.rules.push(new Rule(factId, ruleAccess));
	}
	return this.getRules(factId);
};

RuleBase.prototype.getAllRules = function() {
	return this.rules;
};

RuleBase.prototype.getRules = function(factId) {
	var rules = [];
	for(index in this.rules) {
		var rule = this.rules[index];
		if(rule.getFactId() === factId) {
			rules.push(rule);
		}
	}
	return rules;
};

RuleBase.prototype.hasRule = function(factId, ruleAccess) {
	for(index in this.rules) {
		if(this.rules[index].getFactId() === factId && this.matchRulesAccessors(this.rules[index].getAccessors(), ruleAccess)) {
			return true;
		}
	}
	return false;
};

RuleBase.prototype.matchRulesAccessors = function(rule1, rule2) {
	if(rule1.length !== rule2.length) {
		return false;
	}

	var checker = [];
	for(index in rule1) {
		if(!this.isIn(rule1[index], checker)) {
			checker.push(rule1[index]);
		}

		if(!this.isIn(rule2[index], checker)) {
			checker.push(rule2[index]);
		}
	}

	if(checker.length === rule1.length) {
		return true;
	}
	return false;
};

RuleBase.prototype.isIn = function(arg, array) {
	for(index in array) {
		if(array[index] === arg) {
			return true;
		}
	}
	return false;
};

RuleBase.prototype.getPrimaryGoals = function() {
	var primaryGoals = [];
	var rules = this.rules;
	for(ruleIndex in rules) {
		var rule = rules[ruleIndex];
		if(!this.isInitialFact(rule.getFactId())) {
			primaryGoals.push(rule.getFactId());
		}
	}
	return primaryGoals;
};

RuleBase.prototype.isInitialFact = function(factId) {
	for(ruleIndex in this.rules) {
		var rule = this.rules[ruleIndex];
		var premises = rule.getAccessors();
		for(var premiseIndex in premises) {
			var premise = premises[premiseIndex];
			if(premise === factId) {
				return true;
			}
		}
	}
	return false;
};

RuleBase.prototype.initialPremises = function(goalID, result) {
	if(result == undefined) result = [];

	for(index in result) {
		if(result[index] == goalID) {
			return;
		}
	}

	var rules = this.getRules(goalID);
	if(rules.length == 0) {
		result.push(goalID);
	} else {
		for(ruleIndex in rules) {
			var rule = rules[ruleIndex];
			var premises = rule.getAccessors();
			for(premiseIndex in premises) {
				var premise = premises[premiseIndex];
				this.initialPremises(premise, result);
			}
		}
	}

	return result;
};