function Engine () {
	this.currentCategory = undefined;
	this.currentQuestion = undefined;
}

Engine.prototype.infer = function() {
	var diagnostics = structure[this.currentCategory].diagnostics;
	var result = {type: undefined, label: undefined};

	for(var i in diagnostics) {
		var validFor = diagnostics[i].validFor;
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
					}
				}
			}
		}

		if(valid) {
			result.type = "diagnostic";
			result.label = diagnostics[i].label;
			diagnostics[i].asked = true;
			return result;
		}
	}

	return null;
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