function Fact(id) {
	this.id = id;
	this.label = undefined;
	this.validity = false;
	this.question = undefined;
	this.answers = undefined;
	this.diagnostic = false;
	this.asked = false;
	this.category = undefined;
}

Fact.prototype.setId = function(id) {
	this.id = id;
};

Fact.prototype.getId = function() {
	return this.id;
};

Fact.prototype.setValidity = function(validity) {
	this.validity = validity;
};

Fact.prototype.isValid = function() {
	return this.validity;
};

Fact.prototype.setQuestion = function(question) {
	this.question = question;
};

Fact.prototype.getQuestion = function() {
	return this.question;
};

Fact.prototype.setLabel = function(label) {
	this.label = label;
};

Fact.prototype.getLabel = function() {
	return this.label;
};

Fact.prototype.setAnswers = function(answers) {
	this.answers = answers;
};

Fact.prototype.getAnswers = function() {
	return this.answers;
};

Fact.prototype.setDiagnostic = function(diagnostic) {
	this.diagnostic = diagnostic;
};

Fact.prototype.isDiagnostic = function() {
	return this.diagnostic;
};

Fact.prototype.setAsked = function(asked) {
	this.asked = asked;
};

Fact.prototype.isAsked = function() {
	return this.asked;
};

Fact.prototype.setCategory = function(category) {
	this.category = category;
};

Fact.prototype.getCategory= function() {
	return this.category;
};