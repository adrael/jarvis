/**
 * Creates a new 'Jarvis'.
 * @api public
 */
var Jarvis = (function() {

	'use strict';

	/**
	 * Jarvis' main container.
	 */
	var container = undefined,

	/**
	 * Jarvis' loading screen.
	 */
		loadingScreen = undefined,

	/**
	 * Jarvis' diagnostic tool.
	 */
	 	imads = undefined,

	/**
	 * Jarvis' screen state logger.
	 */
	 	screenState = undefined,

	/**
	 * Jarvis' IHM.
	 */
	 	ihm = undefined,

	/**
	 * Jarvis' Structures to be loaded.
	 */
	 	structures = [],

	/**
	 * Jarvis' default configuration object.
	 */
		configuration = {
			debug: false
		};

	/**
	 * For debug purposes only.
	 *
	 * @param {Printable value} output
	 * @api private
	 */
	function debug(output) {
		if(configuration.debug) {
			console.log(output);
		}
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
	function extend(a, b) {
		debug("Jarvis.extend");

		for(var i in b) {
			a[i] = b[i];
		}

		return a;
	}

	/**
	 * Initialize all Jarvis' elements and DOM.
	 *
	 * @param {Object} options
	 * @return {Jarvis} for chaining
	 * @api public
	 */
	function initialize(options) {
		extend(configuration, options);
		debug("Jarvis.initialize");

		structures = [TestStructure];

		container = document.createElement("div");
		container.id = "jarvis";
		document.body.appendChild(container);

		loadingScreen = new LoadingScreen();
		loadingScreen.initialize("Jarvis.switchScreen();", "Jarvis.toggleFullScreen();");
		container.appendChild(loadingScreen.getContainer());

		ihm = new IHM();
		ihm.initialize("Jarvis.transmitSelectedAnswer");
		container.appendChild(ihm.getContainer());

		screenState = "loading";

		var interval = setInterval(function() {
	 		if(loadingScreen.hasFinished()) {
	 			
	 			if(screenState === "loading") {
	 				switchScreen();
	 			}

	 			clearInterval(interval);
	 		}
	 	}, 100);

		prepareDOM();

		return this;
	}

	/**
	 * Bind all new elements in the DOM.
	 *
	 * @return {Jarvis} for chaining
	 * @api private
	 */
	function prepareDOM() {
		debug("Jarvis.prepareDOM");

		loadingScreen.popupElement().offsetWidth;

		return this;
	}

	/**
	 * Switch between LoadingScreen and I.M.A.D.S' screen.
	 *
	 * @return {Jarvis} for chaining
	 * @api public
	 */
	function switchScreen() {
		debug("Jarvis.switchScreen");

		window.player.play((Math.round(Math.random() * 100) > 50 ? 'hi' : 'entrance'));

		screenState = "switched";

		loadingScreen.disappear();

		var interval = setInterval(function() {
			if(loadingScreen.isComplete()) {
				
				container.removeChild(loadingScreen.getContainer());

				ihm.start();

				screenState = "diagnostic";

				clearInterval(interval);
			}
 		}, 100);

		return this;
	}

	/**
	 * Compute the total length of Jarvis' structures.
	 *
	 * @return {Integer} length
	 * @api private
	 */
	function getTotalStructuresLength() {
		var length = 0;
		for(var index in structures) {
			for(var property in structures[index]) {
				++length;
			}
		}

		return length;
	}

	/**
	 * Start Jarvis.
	 *
	 * @return {Jarvis} for chaining
	 * @api public
	 */
	function start() {
		debug("Jarvis.start");

		loadingScreen.progressBar().setMaximumValue(getTotalStructuresLength());

		loadingScreen.bounce(function() {
				loadStructures();
		}).startCircles();

		return this;
	}

	/**
	 * Load structures' data into Jarvis' memory.
	 *
	 * @return {Jarvis} for chaining
	 * @api private
	 */
	function loadStructures() {
		debug("Jarvis.load");

		for(var index in structures) {
			for(var property in structures[index]) {
				ihm.loadData(structures[index][property]);
				if(screenState !== "diagnostic") {
					loadingScreen.progressBar().progress();
				}
			}
		}

		return this;
	}

	/**
	 * Transmit the selected answer to the IHM for further analysis.
	 *
	 * @param {String} answer
	 * @return {Jarvis} for chaining
	 * @api public
	 */
	function transmitSelectedAnswer(answer) {
		ihm.processAnswer(answer);

		return this;
	}

	/**
	 * Transmit the the start over signal to the iHM.
	 *
	 * @return {Jarvis} for chaining
	 * @api public
	 */
	function startOver() {
		ihm.startOver();
		loadStructures();

		return this;
	}

	/**
	 * Toggle the full screen.
	 *
	 * @return {Jarvis} for chaining
	 * @api public
	 */
	function toggleFullScreen() {
		if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
			if (document.documentElement.requestFullScreen) {
			  document.documentElement.requestFullScreen();
			} else if (document.documentElement.mozRequestFullScreen) {
			  document.documentElement.mozRequestFullScreen();
			} else if (document.documentElement.webkitRequestFullScreen) {
			  document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			}
		} else {
			if (document.cancelFullScreen) {
			  document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
			  document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
			  document.webkitCancelFullScreen();
			}
		}

		return this;
	}

	/**
	 * Jarvis' public API.
	 */
	return {
		start: start,
		startOver: startOver,
		initialize: initialize,
		switchScreen: switchScreen,
		toggleFullScreen: toggleFullScreen,
		transmitSelectedAnswer: transmitSelectedAnswer
	};

})();