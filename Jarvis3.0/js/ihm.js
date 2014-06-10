function IHM () {
	this.container = undefined;
	this.question = undefined;

	this.currentCategory = "music";

	this.engine = null;
}

IHM.prototype.initialize = function() {
	this.container = document.querySelector("div.container");
	this.question = document.querySelector("div.container div.question");
	this.past = document.querySelector('div.container div.past');

	this.engine = new Engine();
	this.run();
};

IHM.prototype.eval = function(answer) {
	this.past.innerHTML += '<br><span><i>- ' + this.question.innerHTML + '</i> <span class="label label-' + (answer === 1 ? 'success' : 'danger') + '">' + (answer === 1 ? 'Oui' : 'Non') + '</span></span><br>';
	this.engine.eval(answer);
	this.run();
};

IHM.prototype.continue = function() {
	document.querySelector(".again").style.display = "none";
	document.querySelector(".continue").style.display = "none";
	
	document.querySelector(".oui").style.display = "initial";
	document.querySelector(".non").style.display = "initial";

	this.run();
};

IHM.prototype.run = function() {
	var interaction = this.engine.process(this.currentCategory);

	if(interaction.type === "question") {
		this.question.innerHTML = interaction.label;
		this.question.className = this.question.className.replace('question', '');
	} else {
		this.question.innerHTML = 'Diagnostic : ' + interaction.label;
		this.question.className += " bold well-" + (interaction.error ? "danger" : "success");

		document.querySelector(".oui").style.display = "none";
		document.querySelector(".non").style.display = "none";

		document.querySelector(".again").style.display = "initial";
		if(!interaction.isFinal) {
			document.querySelector(".continue").style.display = "initial";
		}
	}
};

IHM.prototype.startOver = function() {
	location.reload();
};