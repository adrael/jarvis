function IHM () {
	this.container = undefined;
	this.question = undefined;

	this.currentCategory = "music";

	this.engine = null;
}

IHM.prototype.initialize = function() {
	this.container = document.querySelector("div.container");
	this.question = document.querySelector("div.container span.question");

	this.engine = new Engine();
	this.run();
};

IHM.prototype.eval = function(answer) {
	this.engine.eval(answer);
	this.run();
};

IHM.prototype.run = function() {
	var interaction = this.engine.process(this.currentCategory);

	if(interaction.type === "question") {
		this.question.innerHTML = interaction.label;
		this.question.className = "";
	} else {
		this.question.innerHTML = interaction.label;
		this.question.className = "bold";

		document.querySelector(".oui").style.display = "none";
		document.querySelector(".non").style.display = "none";

		document.querySelector(".again").style.display = "initial";
		document.querySelector(".continue").style.display = "initial";
	}
};

IHM.prototype.startOver = function() {
	location.reload();
};