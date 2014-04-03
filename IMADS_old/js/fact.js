function Fact(id) {
	this.id = id;
	this.label = undefined;
	this.validity = false;
	this.question = undefined;
	this.answers = undefined;
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

Fact.prototype.getValidity = function() {
	return this.validity;
};

Fact.prototype.isValid = function() {
	return this.validity === true;
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