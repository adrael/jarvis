/**
 * Create a new 'LoadingScreen'.
 *
 * @return {LoadingScreen} for chaining
 * @api public
 */
function LoadingScreen() {
	this.counter = 3;

	this.complete = false;
	this.readyState = false;
	this.disableCountDown = false;
	
	this.popup = undefined;
	this.container = undefined;
	this.popupTitle = undefined;
	this.loadingBar = undefined;
	this.popupButton = undefined;
	this.innerCircle = undefined;
	this.outerCircle = undefined;
	this.middleCircle = undefined;
	this.popupSubtitle = undefined;
	this.fullScreenButton = undefined;
	this.containerBackground = undefined;
	this.containerBackgroundFader = undefined;

	return this;
}

/**
 * Retrieve the LoadingBar instance.
 *
 * @return {LoadingBar} loadingBar
 * @api public
 */
LoadingScreen.prototype.progressBar = function() {
	return this.loadingBar;
};

/**
 * Retrieve the popup Element.
 *
 * @return {HTMLElement} popup
 * @api public
 */
LoadingScreen.prototype.popupElement = function() {
	return this.popup;
};

/**
 * Make the LoadingScreen disappear.
 *
 * @return {LoadingScreen} for chaining
 * @api public
 */
LoadingScreen.prototype.disappear = function() {
	this.disableCountDown = true;

	this.stopCircles();
	this.removeCircles();

	move('#' + this.popup.id).duration('1s').scale(.4).end();

	move('#' + this.containerBackground.id).duration('3s').scale(.8).end();

	move('#' + this.containerBackgroundFader.id).duration('3s').scale(.8).end();

	var self = this;
	move('#' + this.container.id).duration('3s').scale(.8).end(function() {
		move('#' + self.containerBackground.id).duration('2s').scale(.8).set('opacity', 0).y(-10000).end();
		move('#' + self.containerBackgroundFader.id).duration('2s').scale(.8).set('opacity', 0).y(-10000).end();
		move('#' + self.container.id).duration('2s').scale(.8).set('opacity', 0).y(-10000).end();
		move('#homeItem').duration('2s').scale(.8).y(-10000).end(function() {
			self.complete = true;
		});
		document.getElementById('imadsItem').className = "active";
	});

	return this;
};

/**
 * Finalize and close the LoadingScreen.
 *
 * @return {LoadingScreen} for chaining
 * @api public
 */
LoadingScreen.prototype.finalize = function() {
	this.popupButton.className = "btn btn-lg btn-success";
	this.popupButton.innerHTML = "Acc&eacute;der au syst&egrave;me (" + this.counter + ")";
	this.popupButton.removeAttribute("disabled");

	this.popupTitle.className = "cover-heading success-heading";
	this.popupTitle.innerHTML = "Chargement termin&eacute; !";

	this.popupSubtitle.innerHTML = "Vous pouvez d&eacute;sormais acc&eacute;der au syst&egrave;me de façon s&eacute;curis&eacute;e<br><br>";

	return this;
}

/**
 * Count down to switch page.
 *
 * @return {LoadingScreen} for chaining
 * @api public
 */
LoadingScreen.prototype.lauchCountDown = function() {
	var self = this;
	var interval = setInterval(function() {
	    if(--self.counter > 0 && !self.disableCountDown) {
	      self.popupButton.innerHTML = "Acc&eacute;der au syst&egrave;me (" + self.counter + ")";
	    }  else {
	    	self.popupButton.innerHTML = "Acc&eacute;der au syst&egrave;me";
			clearInterval(interval);
			self.readyState = true;
	    }
  	}, 990);

  	return this;
}

/**
 * Tell if the LoadingScreen has finished yet.
 *
 * @return {boolean} readyState
 * @api public
 */
LoadingScreen.prototype.hasFinished = function() {
	return this.readyState;
};

/**
 * Tell if the LoadingScreen is complete.
 *
 * @return {boolean} complete
 * @api public
 */
LoadingScreen.prototype.isComplete = function() {
	return this.complete;
};

/**
 * Make the popup window bounce.
 *
 * @param {Function} callback
 * @return {LoadingScreen} for chaining
 * @api public
 */
LoadingScreen.prototype.bounce = function(callback) {
	move('#' + this.popup.id).duration('1s').scale(0.2).then().duration('1s').scale(5).end(callback);

	return this;
};

/**
 * Shortcut to start all the LoadingScreen's circles.
 *
 * @return {LoadingScreen} for chaining
 * @api public
 */
LoadingScreen.prototype.startCircles = function() {

	this.runOrPauseCircle(this.innerCircle, "rotateLeft", true)
		.runOrPauseCircle(this.outerCircle, "rotateRight", true)
		.runOrPauseCircle(this.middleCircle, "scaleOnly", true);

	return this;
};

/**
 * Shortcut to remove all the LoadingScreen's circles.
 *
 * @return {LoadingScreen} for chaining
 * @api public
 */
LoadingScreen.prototype.removeCircles = function() {
	
	this.runOrPauseCircle(this.innerCircle, "rotateLeftBigger", false)
		.runOrPauseCircle(this.outerCircle, "rotateRightSmaller", false)
		.runOrPauseCircle(this.middleCircle, "scaleOnlyFade", false);

	return this;
};

/**
 * Play or pause the given circle's animation and affect a new class.
 *
 * @param {HTMLElement} circle
 * @param {String} className
 * @param {boolean} state
 * @return {LoadingScreen} for chaining
 * @api public
 */
LoadingScreen.prototype.runOrPauseCircle = function(circle, className, state) {
	
	circle.className = className;
	circle.style.cssText = this.vendorFree("animation-play-state: " + state ? "running" : "paused");

	return this;
};

/**
 * Shortcut to stop all the LoadingScreen's circles.
 *
 * @return {LoadingScreen} for chaining
 * @api public
 */
LoadingScreen.prototype.stopCircles = function() {

	this.stopCircle(this.innerCircle)
		.stopCircle(this.outerCircle)
		.stopCircle(this.middleCircle);

	return this;
};

/**
 * Stop the circle's animation and keep it where it stops.
 *
 * @param {HTMLElement} circle
 * @return {LoadingScreen} for chaining
 * @api public
 */
LoadingScreen.prototype.stopCircle = function(circle) {

	var originalWidth = circle.offsetWidth;
	var matrix = this.getMatrixOf(circle, 'transform');

	if(!matrix) {
		throw new Error("Cannot find matrix!");
	}

	this.runOrPauseCircle(circle, "noAnimation", false);

	var scaleValue = this.findBestScaleValue(matrix.replace("matrix(", "").replace(")", "").split(", "));

	var circleWidthAndHeight = Math.floor(originalWidth * scaleValue);
	var circlePositionning = Math.floor(-circleWidthAndHeight/2);

	circle.style.width = circleWidthAndHeight + "px";
	circle.style.height = circleWidthAndHeight + "px";

	circle.style.marginTop = circlePositionning + "px";
	circle.style.marginLeft = circlePositionning + "px";

	circle.offsetWidth;

	return this;
};

/**
 * Look for an average value of the given matrix's scales.
 *
 * @param {Array} matrix
 * @return {Number} average scale value
 * @api public
 */
LoadingScreen.prototype.findBestScaleValue = function(matrix) {
	var scaleValue = 0;
	var valueCount = 0;

	for(var i in matrix) {
		if(matrix[i] <= 0) {
			continue;
		} else {
			scaleValue += Math.floor(matrix[i] * 100) / 100;
			++valueCount;
		}
	}

	return (scaleValue / valueCount);
};

/**
 * Find the matrix of the element for the given CSS property.
 *
 * @param {HTMLElement} element
 * @param {String} property
 * @return {Matrix} the computed matrix
 * @api public
 */
LoadingScreen.prototype.getMatrixOf = function(element, property) {
	
	var vendors = ["", "-webkit-", "-moz-", "-ms-", "-o-"];
	var matrix = null;

	for(var i = 0; i < vendors.length && !matrix; ++i) {
		matrix = window.getComputedStyle(element, '').getPropertyValue(vendors[i] + property);
	}

	return matrix;
};

/**
 * Prefix the given CSS rule with vendor prefixes.
 *
 * @param {String} actualCSSRule
 * @return {String} the formatted CSS rule
 * @api public
 */
LoadingScreen.prototype.vendorFree = function(actualCSSRule) {
	var vendors = ["", "-webkit-", "-moz-", "-ms-", "-o-"];
	var finalCSSRule = "";

	for(var vendor in vendors) {
		finalCSSRule += vendors[vendor] + actualCSSRule + ";";
	}

	return finalCSSRule;
}

/**
 * Retrieve the LoadingScreen's container.
 *
 * @return {HTMLElement} container
 * @api public
 */
LoadingScreen.prototype.getContainer = function() {
	return this.container;
}

/**
 * Initialize all LoadingScreen' elements and DOM.
 *
 * @param {String} switchAccess
 * @return {LoadingScreen} for chaining
 * @api public
 */
LoadingScreen.prototype.initialize = function(switchAccess, fullScreenAccess) {
 	this.loadingBar = new LoadingBar();

 	this.container = document.createElement("div");
 	this.container.id = "loadingScreen";

	 	this.innerCircle = document.createElement("div");
		this.innerCircle.id = "innerCircle";

	this.container.appendChild(this.innerCircle);

		this.middleCircle = document.createElement("div");
		this.middleCircle.id = "middleCircle";

	this.container.appendChild(this.middleCircle);

		this.outerCircle = document.createElement("div");
		this.outerCircle.id = "outerCircle";

	this.container.appendChild(this.outerCircle);

		this.containerBackground = document.createElement("div");
	 	this.containerBackground.id = "loadingScreenBackground";

	this.container.appendChild(this.containerBackground);

		this.containerBackgroundFader = document.createElement("div");
	 	this.containerBackgroundFader.id = "loadingScreenBackgroundFader";

	this.container.appendChild(this.containerBackgroundFader);

 		this.popup = document.createElement("div");
 		this.popup.id = "loadingScreenPopup";

 			this.popupTitle = document.createElement("h1");
 			this.popupTitle.id = "loadingScreenPopupTitle";
 			this.popupTitle.className = "cover-heading warning-heading";
 			this.popupTitle.innerHTML = "Chargement des composants syst&egrave;me";
 		
 		this.popup.appendChild(this.popupTitle);

 			this.popupSubtitle = document.createElement("p");
 			this.popupSubtitle.id = "loadingScreenPopupSubtitle";
 			this.popupSubtitle.className = "lead";
 			this.popupSubtitle.innerHTML = "Veuillez patienter pendant que le syst&egrave;me charge<br>les donn&eacute;es de diagnostic";
 		
 		this.popup.appendChild(this.popupSubtitle);

 			var popupButtonContainer = document.createElement("p");
 			popupButtonContainer.id = "loadingScreenPopupButtonContainer";
 			popupButtonContainer.className = "lead";

 				this.popupButton = document.createElement("button");
 				this.popupButton.id = "loadingScreenPopupButton";
 				this.popupButton.className = "btn btn-lg btn-warning";
 				this.popupButton.disabled = "disabled";
 				this.popupButton.innerHTML = "Acc&eacute;der au syst&egrave;me";
 				this.popupButton.setAttribute("onclick", switchAccess);
 			
 			popupButtonContainer.appendChild(this.popupButton);

 				this.fullScreenButton = document.createElement("button");
 				this.fullScreenButton.id = "loadingScreenFullScreenButton";
 				this.fullScreenButton.className = "btn btn-lg btn-primary";
 				this.fullScreenButton.innerHTML = "Plein &eacute;cran";
 				this.fullScreenButton.setAttribute("onclick", fullScreenAccess);
 			
 			popupButtonContainer.appendChild(this.fullScreenButton);

 		this.popup.appendChild(popupButtonContainer);

 		this.popup.appendChild(
 			this.loadingBar.initialize({
		 		id: "loadingScreenPopupLoadingBar",
		 		className: "progress progress-striped active",
		 		width: 600
		 	})
 		);

 	this.container.appendChild(this.popup);

 	var self = this;
 	var interval = setInterval(function() {
 		if(self.loadingBar.complete()) {
 			self.finalize().lauchCountDown();
 			clearInterval(interval);
 		}
 	}, 100);

 	return this;
};