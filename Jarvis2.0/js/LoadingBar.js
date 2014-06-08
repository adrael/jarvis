
/**
 * Creates a new 'LoadingBar'.
 * @return {LoadingBar} for chaining
 * @api public
 */
 function LoadingBar() {
 	this.container = undefined;
 	this.progressBar = undefined;

 	this.currentCount = 0;

 	this.configuration = {
 		running: false,
 		queue: [],
 		actualWidth: 0,
 		ratio: 0,
 		iterationCount: 0
 	};

 	return this;
}

/**
 * Extend object a with the properties of object b.
 * If there's a conflict, object b takes precedence.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} the extended object
 * @api private
 */
LoadingBar.prototype.extend = function(a, b) {
	for(var i in b) {
		a[i] = b[i];
	}

	return a;
}

/**
 * Increase the loading bar value by ratio.
 *
 * @return {LoadingBar} for chaining
 * @api public
 */
LoadingBar.prototype.progress = function() {
	this.progressBar.style.width = (this.configuration.actualWidth += this.configuration.ratio) + "px";
	++this.currentCount;
	
	return this;
};

/**
 * Set the new ratio in the LoadingBar's configuration.
 *
 * @return {LoadingBar} for chaining
 * @api private
 */
LoadingBar.prototype.applyRatio = function() {
	this.configuration.ratio = Math.round((this.configuration.width / this.configuration.iterationCount) * 100) / 100;

	return this;
};

/**
 * Define the maximum value for LoadingBar.
 *
 * @param {Integer} iterationCount
 * @return {LoadingBar} for chaining
 * @api public
 */
LoadingBar.prototype.setMaximumValue = function(iterationCount) {
	this.configuration.iterationCount = iterationCount;
	this.applyRatio();

	return this;
};

/**
 * Check if the progress is complete.
 *
 * @return {Boolean} showing the progress state
 * @api public
 */
LoadingBar.prototype.complete = function() {
	if(this.currentCount >= this.configuration.iterationCount) {
		return true;
	}

	return false;
};

/**
 * Initialize all LoadingBar' elements and DOM.
 *
 * @param {Object} options
 * @return {HTMLElement} LoadingBar's container
 * @api public
 */
LoadingBar.prototype.initialize = function(options) {
	this.extend(this.configuration, options);

	this.container = document.createElement("div");
	this.container.id = options.id;
	this.container.className = options.className;
	this.container.style.width = options.width + "px";

		this.progressBar = document.createElement("div");
		this.progressBar.id = "LoadingBarProgressBar";
		this.progressBar.className = "progress-bar";
		this.progressBar.setAttribute("role", "progressbar");

	this.container.appendChild(this.progressBar);

	return this.container;
}