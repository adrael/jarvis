function FactBase() {
	this.facts = [];
}

FactBase.prototype.addFact = function(fact) {
	if(!this.hasFact(fact.getId())) {
		this.facts.push(fact);
	}
};

FactBase.prototype.getFact = function(id) {
	for(index in this.facts) {
		var fact = this.facts[index];
		if(fact.getId() === id) {
			return fact;
		}
	}
	return null;
};

FactBase.prototype.getFacts = function() {
	return this.facts;
};

FactBase.prototype.hasFact = function(id) {
	return (this.getFact(id) !== null);
};

FactBase.prototype.setFactValidity = function(id, validity) {
	var fact = this.getFact(id);
	if(fact) {
		fact.setValidity(validity);
	}
};

FactBase.prototype.isFactValid = function(id) {
	var fact = this.getFact(id);
	if(fact) {
		return fact.isValid();
	}
	return null;
};

FactBase.prototype.isFactValidToAsk = function(id) {
	var fact = this.getFact(id);
	if(fact) {
		if(!fact.isAsked()) {
			return true;
		}
	}

	return null;
};