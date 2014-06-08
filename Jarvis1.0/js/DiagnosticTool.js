/**
 * Create a new 'DiagnosticTool'.
 *
 * @return {DiagnosticTool} for chaining
 * @api public
 */
function DiagnosticTool() {
	this.endAt = 0;
	this.startAt = 0;
	this.randomDisplayFactor = 5;
	this.countOfDisplayedLines = 0;
	this.maxDisplayedCodeLines = 26;

	this.codeLines = [];
	this.finished = true;
	this.readyState = true;

	this.container = undefined;
	this.screenCode = undefined;
	this.loadingDiagnostic = undefined;
	this.diagnosticBox = undefined;
	this.blurredBackgroundFader = undefined;

	return this;
}

/**
 * Show a new 'DiagnosticTool'.
 *
 * @return {DiagnosticTool} for chaining
 * @api public
 */
DiagnosticTool.prototype.showNewDiagnostic = function() {
	if(this.finished) {
		this.finished = false;

		this.loadingDiagnostic.innerHTML = "... LOADING DATA ...";

		move("#" + this.loadingDiagnostic.id).duration('0s').y(-200).set('opacity', 0).end();

		var wallpaper = Math.round(Math.random() * 18) + ".jpg";

		move('#' + this.blurredBackgroundFader.id).set('opacity', 1).set("visibility", "initial").duration('1s').end();

		move('#' + this.diagnosticBox.id).set("background", "url(img/diagnostics/final/" + wallpaper + ") no-repeat 0 0 fixed").end();

		move('#' + this.diagnosticBox.id).duration('0s').scale(0).end();

		var self = this;
		move('#' + this.diagnosticBox.id).duration('1s').set('opacity', 1).set('visibility', "initial").scale(1).end(function() {
			move('#' + self.loadingDiagnostic.id).duration('1s').set('opacity', 1).end(function() {
				move("#" + self.loadingDiagnostic.id).duration('1s').y(0).end(function() {
					self.startLoadingData();
				});
			});
		});
	}

	return this;
};

/**
 * Make the currently shown 'DiagnosticTool' to disappear.
 *
 * @return {DiagnosticTool} for chaining
 * @api public
 */
DiagnosticTool.prototype.disappear = function() {
	this.loadingDiagnostic.innerHTML = "DONE!";

	var self = this;
	move('#' + this.loadingDiagnostic.id).duration('1s').y(-200).end(function() {
		move('#' + self.diagnosticBox.id).duration('0.6s').set('visibility', "hidden").scale(0).end();
	
		move('#' + self.blurredBackgroundFader.id).set('opacity', 0).set("visibility", "hidden").duration('0.6s').end(function() {
			self.finished = true;
			self.clearData();
		});
	});

	return this;
};

/**
 * Start logging data into the Diagnostic box.
 *
 * @return {DiagnosticTool} for chaining
 * @api public
 */
DiagnosticTool.prototype.startLoadingData = function() {
	this.startAt = 0;
	this.countOfDisplayedLines = 0;
	this.endAt = this.codeLines.length;

	var self = this;
	var interval = setInterval(function() {
		
		if(self.readyState) {
			self.readyState = false;
			self.loadData(self.getFormattedCodeLine(self.codeLines[self.startAt]), Math.round(Math.random() * self.randomDisplayFactor));
			++self.startAt;
		}

		if(self.startAt === self.endAt) {
			clearInterval(interval);
			self.disappear();
		}

	}, 20);

	return this;
};

/**
 * Log data into the Diagnostic box.
 *
 * @param {String} data
 * @param {Integer} time
 * @return {DiagnosticTool} for chaining
 * @api private
 */
DiagnosticTool.prototype.loadData = function(data, time) {

	var self = this;
	setTimeout(function() {
		if(++self.countOfDisplayedLines > self.maxDisplayedCodeLines) {
			self.screenCode.removeChild(self.screenCode.childNodes[0]);
			--self.countOfDisplayedLines;
		}

		var span = document.createElement("span");
		span.innerHTML = data;
		self.screenCode.appendChild(span);

		self.readyState = true;
	}, time);

	return this;
};

/**
 * Clear the previously loaded data.
 *
 * @return {DiagnosticTool} for chaining
 * @api private
 */
DiagnosticTool.prototype.clearData = function() {
	if(this.finished) {
		while(this.screenCode.childNodes.length > 0) {
			this.screenCode.removeChild(this.screenCode.childNodes[0]);
		}

		this.countOfDisplayedLines = 0;
	}
	
	return this;
};

/**
 * Format the given line of code to display it properly.
 *
 * @param {String} line
 * @return {String} formatted line of code
 * @api private
 */
DiagnosticTool.prototype.getFormattedCodeLine = function(line) {
	var text = "";

	for(var index in line) {
		text += line[index] === " " ? "&nbsp" : line[index] === '\n' ? "<br>" : line[index];
	}

	return text;
};

/**
 * Indicate if the DiagnosticTool is actually running or not.
 *
 * @return {boolean} indicating the diagnostic state
 * @api public
 */
DiagnosticTool.prototype.hasFinished = function() {
	return this.finished;
};

/**
 * Retrieve the DiagnosticTool's container.
 *
 * @return {HTMLElement} container
 * @api public
 */
DiagnosticTool.prototype.getContainer = function() {
	return this.container;
};

/**
 * Initialize the DOM for a DiagnosticTool.
 *
 * @return {DiagnosticTool} for chaining
 * @api public
 */
DiagnosticTool.prototype.initialize = function() {
	this.container = document.createElement("div");
	this.container.id = "DiagnosticToolContainer";

		this.blurredBackgroundFader = document.createElement("div");
		this.blurredBackgroundFader.id = "blurredBackgroundFader";

	this.container.appendChild(this.blurredBackgroundFader);

		this.diagnosticBox = document.createElement("div");
		this.diagnosticBox.id = "diagnosticBox";

	this.container.appendChild(this.diagnosticBox);

			this.screenCode = document.createElement("div");
			this.screenCode.id = "screenCode";

		this.diagnosticBox.appendChild(this.screenCode);

			this.loadingDiagnostic = document.createElement("div");
			this.loadingDiagnostic.id = "loadingDiagnostic";

		this.diagnosticBox.appendChild(this.loadingDiagnostic);

	this.loadCodeData();

	return this;
};

/**
 * Load code lines to work with them later.
 *
 * @return {DiagnosticTool} for chaining
 * @api private
 */
DiagnosticTool.prototype.loadCodeData = function() {
	this.codeLines = [
		'void encode( FILE *infile, FILE *outfile, int linesize )\n',
		'{\n',
		'    unsigned char in[3], out[4];\n',
		'    int i, len, blocksout = 0;\n',
		'\n',
		'    while( !feof( infile ) ) {\n',
		'        len = 0;\n',
		'        for( i = 0; i < 3; i++ ) {\n',
		'            in[i] = (unsigned char) getc( infile );\n',
		'            if( !feof( infile ) ) {\n',
		'                len++;\n',
		'            }\n',
		'            else {\n',
		'                in[i] = 0;\n',
		'            }\n',
		'        }\n',
		'        if( len ) {\n',
		'            encodeblock( in, out, len );\n',
		'            for( i = 0; i < 4; i++ ) {\n',
		'                putc( out[i], outfile );\n',
		'            }\n',
		'            blocksout++;\n',
		'        }\n',
		'        if( blocksout >= (linesize/4) || feof( infile ) ) {\n',
		'            if( blocksout ) {\n',
		'                fprintf( outfile, "\r\n" );\n',
		'            }\n',
		'            blocksout = 0;\n',
		'        }\n',
		'    }\n',
		'}\n',
		'\n',
		'void decodeblock( unsigned char in[4], unsigned char out[3] )\n',
		'{   \n',
		'    out[ 0 ] = (unsigned char ) (in[0] << 2 | in[1] >> 4);\n',
		'    out[ 1 ] = (unsigned char ) (in[1] << 4 | in[2] >> 2);\n',
		'    out[ 2 ] = (unsigned char ) (((in[2] << 6) & 0xc0) | in[3]);\n',
		'}\n',
		'\n',
		'void decode( FILE *infile, FILE *outfile )\n',
		'{\n',
		'    unsigned char in[4], out[3], v;\n',
		'    int i, len;\n',
		'\n',
		'    while( !feof( infile ) ) {\n',
		'        for( len = 0, i = 0; i < 4 && !feof( infile ); i++ ) {\n',
		'            v = 0;\n',
		'            while( !feof( infile ) && v == 0 ) {\n',
		'                v = (unsigned char) getc( infile );\n',
		'                v = (unsigned char) ((v < 43 || v > 122) ? 0 : cd64[ v - 43 ]);\n',
		'                if( v ) {\n',
		'                    v = (unsigned char) ((v == "$"") ? 0 : v - 61);\n',
		'                }\n',
		'            }\n',
		'            if( !feof( infile ) ) {\n',
		'                len++;\n',
		'                if( v ) {\n',
		'                    in[ i ] = (unsigned char) (v - 1);\n',
		'                }\n',
		'            }\n',
		'            else {\n',
		'                in[i] = 0;\n',
		'            }\n',
		'        }\n',
		'        if( len ) {\n',
		'            decodeblock( in, out );\n',
		'            for( i = 0; i < len - 1; i++ ) {\n',
		'                putc( out[i], outfile );\n',
		'            }\n',
		'        }\n',
		'    }\n',
		'}\n',
		'\n\n',
		'int main( int argc, char **argv )\n',
		'{\n',
		'    int opt = 0;\n',
		'    int retcode = 0;\n',
		'    int linesize = B64_DEF_LINE_SIZE;\n',
		'    char *infilename = NULL, *outfilename = NULL;\n',
		'    while( THIS_OPT( argc, argv ) ) {\n',
		'        switch( THIS_OPT(argc, argv) ) {\n',
		'            case "l":\n',
		'                    linesize = atoi( &(argv[1][2]) );\n',
		'                    if( linesize < B64_MIN_LINE_SIZE ) {\n',
		'                        linesize = B64_MIN_LINE_SIZE;\n',
		'                        printf( "%s\\n", b64_message( B64_LINE_SIZE_TO_MIN ) );\n',
		'                    }\n',
		'                    break;\n',
		'            case "?":\n',
		'            case "h":\n',
		'                    opt = "h";\n',
		'                    break;\n',
		'            case "e":\n',
		'            case "d":\n',
		'                    opt = THIS_OPT(argc, argv);\n',
		'                    break;\n',
		'             default:\n',
		'                    opt = 0;\n',
		'                    break;\n',
		'        }\n',
		'        argv++;\n',
		'        argc--;\n',
		'    }\n',
		'    switch( opt ) {\n',
		'        case "e":\n',
		'        case "d":\n',
		'            infilename = argc > 1 ? argv[1] : NULL;\n',
		'            outfilename = argc > 2 ? argv[2] : NULL;\n',
		'            retcode = b64( opt, infilename, outfilename, linesize );\n',
		'            break;\n',
		'        case 0:\n',
		'            retcode = B64_SYNTAX_ERROR;\n',
		'        case "h":\n',
		'            showuse( opt );\n',
		'            break;\n',
		'    }\n',
		'    if( retcode ) {\n',
		'        printf( "%s\\n", b64_message( retcode ) );\n',
		'    }\n',
		'    return( retcode );\n',
		'}\n',
	];

	return this;
};