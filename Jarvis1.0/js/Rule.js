function Rule(id, ruleAccess) {
	this.factId = id;
	this.ruleAccess = ruleAccess;
}

Rule.prototype.getFactId = function() {
	return this.factId;
};

Rule.prototype.setFactId = function(id) {
	this.factId = id;
};

Rule.prototype.getAccessors = function() {
	return this.ruleAccess;
};

Rule.prototype.setAccessors = function(ruleAccess) {
	this.ruleAccess = ruleAccess;
};

Rule.prototype.isValid = function(factBase) {
	for(index in this.ruleAccess) {
		var premise = this.ruleAccess[index];
		if(!factBase.isFactValid(premise)) {
			return false;
		}
	}
	return true;
};