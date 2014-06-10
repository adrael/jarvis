function Engine () {
	this.currentCategory = undefined;
	this.currentQuestion = undefined;

	this.processStructure();
}

Engine.prototype.isDiagnostic = function(id, category) {
	var diagnostics = structure[category ? category : this.currentCategory].diagnostics;
	for(var i in diagnostics) {
		if(diagnostics[i].id === id || '!' + diagnostics[i].id === id) {
			return true;
		}
	}

	return false;
};

Engine.prototype.extend = function(src, target, exclude) {
	var valid = true;
	for(var i in src) {
		valid = true;

		for(var j in exclude) {
			if(src[i] === exclude[j]) {
				valid = false;
				break;
			}
		}
		
		if(valid) {
			target.push(src[i]);
		}
	}

	return target;
};

Engine.prototype.getPromisesFor = function(diagnosticId, category) {
	var diagnostics = structure[category ? category : this.currentCategory].diagnostics;
	for(var i in diagnostics) {
		if(diagnostics[i].id === diagnosticId) {
			return diagnostics[i].validFor;
		} else if('!' + diagnostics[i].id === diagnosticId) {
			var newValidFor = [];
			for(var j in diagnostics[i].validFor) {
				if(diagnostics[i].validFor[j][0] === '!') {
					newValidFor.push(diagnostics[i].validFor[j].replace('!', ''));
				} else {
					newValidFor.push('!' + diagnostics[i].validFor[j]);
				}
			}

			return newValidFor;
		}
	}

	return [];
};

Engine.prototype.processStructure = function() {
	var notSafe = true;

	while(notSafe) {
		notSafe = false;
		for(var i in structure) {
			var diagnostics = structure[i].diagnostics;

			for(var j in diagnostics) {
				var diagnostic = diagnostics[j];
				var validFor = diagnostic.validFor;

				for(var k in validFor) {
					var id = validFor[k];

					if(this.isDiagnostic(id, i)) {
						diagnostic.validFor = this.extend(validFor, [], [id]).concat(this.getPromisesFor(id, i));
						notSafe = true;
					}
				}
			}
		}
	}
};

Engine.prototype.infer = function() {
	var diagnostics = structure[this.currentCategory].diagnostics;
	var result = {type: undefined, label: undefined};

	for(var i in diagnostics) {
		var diagnostic = diagnostics[i];
		if(!diagnostic.asked) {
			var validFor = diagnostic.validFor;
			var questions = this.getQuestions(validFor);
			var valid = true;

			for(var j in validFor) {
				var id = validFor[j];

				for(var k in questions) {
					var question = questions[k];

					if(valid && (question.id === id || "!" + question.id === id)) {

						if(valid && question.value === null) {
							result.type = "question";
							result.label = question.label;
							this.currentQuestion = question.id;
							return result;
						} else if((id[0] === "!" && question.value === 1) || (id[0] !== "!" && question.value === 2)) {
							valid = false;
							break;
						}
					}
				}
			}

			if(valid) {
				result.type = "diagnostic";
				result.label = diagnostic.label;
				result.isFinal = diagnostic.isFinal ? true : false;
				diagnostic.asked = true;
				return result;
			}
		}
	}

	result.type = "diagnostic";
	result.label = 'Aucun diagnostic trouvé... Problem exists between keyboard and chair, you know...';
	result.isFinal = true;
	result.error = true;

	return  result;
};

Engine.prototype.process = function(category) {
	this.currentCategory = category;

	return this.infer();
};

Engine.prototype.eval = function(answer) {
	var questions = structure[this.currentCategory].questions;
	for(var i in questions) {
		if(questions[i].id === this.currentQuestion) {
			questions[i].value = answer;
			break;
		}
	}
};

Engine.prototype.getQuestions = function(ids) {
	var questions = structure[this.currentCategory].questions;
	var result = [];
	for(var i in ids) {
		for(var j in questions) {
			if(questions[j].id === ids[i] || "!" + questions[j].id === ids[i]) {
				result.push(questions[j]);
				break;
			}
		}
	}

	return result;
};