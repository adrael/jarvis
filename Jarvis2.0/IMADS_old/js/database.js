function DataBase() {

}

DataBase.prototype.updateWith = function(dataSource, dbReference) {
	for(index in dataSource) {
		var data = dataSource[index];
		var fact = new Fact(data.id);
		fact.setQuestion(data.question);
		fact.setAnswers(data.answers);
		fact.setLabel(data.label);

		if(data.causedBy.length === 0) {
			dbReference.addFact(fact);
		}

		else {
			dbReference.addRule(fact, data.causedBy);
		}
	}
};