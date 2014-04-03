
function MagicInterface(instanceName) {
	this.instanceName = instanceName;

	this.magicBarInstance = undefined;
	this.jarvisInstance = undefined;

	this.finalDiagnosticDiv = undefined;
	this.categoriesDiv = undefined;
	this.categoriesList = undefined;
	this.diagnostics = undefined;
	this.diagnosticsArea = undefined;

	this.RETURN = "%";
	this.CATGRY = "@";

	this.categories = {
						class: "btn btn-link",
						before: "&#5125; ",
						list: ["flight", "music", "weapon", "power"],
						 music: {text: "Le système musical", action: null},
						 power: {text: "Le système energétique", action: null},
						weapon: {text: "Le système d'armement", action: null},
						flight: {text: "Le système de vol", action: null}
					  };

	this.answers = {
					before: "&#5125; ",
					class: "btn btn-link",
					list: ["y", "n", "i"],
					y: {text: "Oui", action: null},
					n: {text: "Non", action: null},
					i: {text: "Je ne sais pas", action: null}
				   };
}

MagicInterface.prototype.setMagicBarInstance = function(mbi) {
	this.magicBarInstance = mbi;
};

MagicInterface.prototype.setJarvisInstance = function(ji) {
	this.jarvisInstance = ji;
};

MagicInterface.prototype.getTextFormatted = function(object, value) {
	return object.before + object[value].text;
};

MagicInterface.prototype.clearCategories = function() {
	var count = 0;
	for(var i = 0; i < this.categoriesList.childNodes.length; ++i) {
		count = (i / 4) + 1;
		move('#cat-li-' + i).duration(count + 's').set('opacity', 0).x(100).end();
	}

	var self = this;
	move('#categories').duration(count + 's').end(function() {
		while(self.categoriesList.childNodes.length > 0) {
			self.categoriesList.removeChild(self.categoriesList.childNodes[0]);
		}
	});
};

MagicInterface.prototype.newLine = function(instantly) {
	this.magicBarInstance.newLine(instantly);
};

MagicInterface.prototype.addInstantly = function(phrase) {
	this.magicBarInstance.addInstantly(phrase);
};

MagicInterface.prototype.createAnswerItem = function(itemClass, html, actionOnClick) {
	var btn = document.createElement("button");
	btn.className = itemClass;
	btn.innerHTML = html;
	btn.setAttribute("onclick", actionOnClick);
	return btn;
};

MagicInterface.prototype.appendAnswerItem = function(item, id) {
	var li = document.createElement("li");
	li.id = id;
	li.appendChild(item);
	this.categoriesList.appendChild(li);
};

MagicInterface.prototype.moveAnswerItem = function(itemId, duration) {
	move(itemId).duration('0s').set('opacity', 0).x(-100).end();
	move(itemId).duration(duration + 's').set('opacity', 1).ease('in').x(0).end();
};

MagicInterface.prototype.displayPossibleAnswers = function(object, possibleAnswers) {
	this.clearCategories();
	var length = (possibleAnswers ? possibleAnswers.length : object.list.length);
	for(var i = 0; i < length; ++i) {
		var item = this.createAnswerItem(object.class,
										 this.getTextFormatted(object, object.list[i]),
										 this.instanceName + ".select('" + object.list[i] + "');");

		this.appendAnswerItem(item, "cat-li-" + i);
		this.moveAnswerItem("#cat-li-" + i, (i / 4) + 1);
	}
};

MagicInterface.prototype.startOver = function() {
	this.clearCategories();
	var item = this.createAnswerItem(this.categories.class, this.categories.before + " Relancer le diagnostic", "window.location.reload();");
	this.appendAnswerItem(item, "startOver");
	this.moveAnswerItem("#startOver", 1);
};

MagicInterface.prototype.displayDiagnostic = function(found, label) {
	var finalDiag = document.getElementById('finalDiagnostic');
	finalDiag.className = "diag-" + found;
	finalDiag.innerHTML = (found ? "Diagnostic : " : "Erreur : ") + label;
	finalDiag.style.display = "initial";
	move("#finalDiagnostic").duration("0s").set("opacity", 0).then(move("#finalDiagnostic").duration("2s").set("opacity", 1).end()).end();
};

MagicInterface.prototype.select = function(arg) {
	this.clearCategories();
	var time = this.magicBarInstance.getNewLineDelay();
	if(arg === "y" || arg === "n" || arg === "i") {
		this.addInstantly("&nbsp;&nbsp;" + this.getTextFormatted(this.answers, arg));
		time = this.jarvisInstance.receiveAnswerToQuestion(arg, time);
	}

	else {
		this.addInstantly("&nbsp;&nbsp;" + this.getTextFormatted(this.categories, arg));
		this.jarvisInstance.setCurrentCategory(arg);
	}

	var self = this;
	setTimeout(function() {
		self.magicBarInstance.newLine();
		self.jarvisInstance.triggerQuestion(100);
	}, time);
};

MagicInterface.prototype.insertAfter = function(referenceNode, newNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

MagicInterface.prototype.say = function(phrase) {
	this.magicBarInstance.say(phrase);
};

MagicInterface.prototype.process = function(argument, processFunction) {
	this.magicBarInstance.process(argument, processFunction);
};

MagicInterface.prototype.removeProcess = function(arg) {
	this.magicBarInstance.removeProcess(arg);
};

MagicInterface.prototype.getDiagnostics = function() {
	return this.diagnostics;
};

MagicInterface.prototype.getDiagnosticsArea = function() {
	return this.diagnosticsArea;
};

MagicInterface.prototype.init = function() {
	this.diagnostics = document.getElementById("diagnostics");

	this.diagnosticsArea = document.createElement("div");
	this.diagnosticsArea.className = "screen";

	this.diagnostics.appendChild(this.diagnosticsArea);

	this.categoriesDiv = document.createElement("div");
	this.categoriesDiv.id = "categories";
	this.categoriesDiv.className = "categories";

	this.categoriesList = document.createElement("ul");
	this.categoriesList.id = "categoriesList";

	this.categoriesDiv.appendChild(this.categoriesList);


	this.finalDiagnosticDiv = document.createElement("div");
	this.finalDiagnosticDiv.id = "finalDiagnostic";
	
	this.insertAfter(document.getElementById("magicbar"), this.finalDiagnosticDiv);
	this.insertAfter(this.finalDiagnosticDiv, this.categoriesDiv);


	var self = this;
	this.magicBarInstance.init();

	this.magicBarInstance.process(this.RETURN, function(){
		self.magicBarInstance.newLine();
	});

	this.magicBarInstance.process(this.CATGRY, function(){
		self.displayPossibleAnswers(self.categories);

		//self.displayDiagnostic(true, "Allumer le système.");
		//self.startOver();
	});

	this.say("Bonjour ! Mon nom est I.M.A.D.S." + this.RETURN + "Sur quel sujet puis-je vous venir en aide ?" + this.CATGRY);
}