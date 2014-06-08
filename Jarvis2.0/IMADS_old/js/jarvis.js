function Jarvis() {
	this.factBase = new FactBase();
	this.ruleBase = new RuleBase();
	this.dataBase = new DataBase();

	this.magicInstance = undefined;
	this.currentFactEvaluated = undefined;
	this.currentCategory = undefined;

	this.line = undefined;
	this.setCodeLines();

	this.diag = {
		maxDiags: 0,
		start: 0,
		end: 0,
		count: 0
	};
}

Jarvis.prototype.setMagicInterfaceInstance = function(mii) {
	this.magicInstance = mii;
};

Jarvis.prototype.addFact = function(fact) {
	this.factBase.addFact(fact);
};

Jarvis.prototype.addRule = function(fact, ruleAccess) {
	this.addFact(fact);
	this.ruleBase.addRule(fact.getId(), ruleAccess);
};

Jarvis.prototype.setFactValidity = function(id, validity) {
	this.factBase.setFactValidity(id, validity);
};

Jarvis.prototype.inferForward = function() {
	// jarvis.inferForward();
	// return something showing ...
};

Jarvis.prototype.inferBackward = function() {
	var terminalFacts = this.getAllTerminalFacts();
	for(index in terminalFacts) {
		var rules = this.ruleBase.getRules(terminalFacts[index].getId());
		for(index2 in rules) {
			var ruleAccessors = rules[index2].getAccessors();
			lookInAccessors(ruleAccessors);
		}
	}
};

Jarvis.prototype.lookInAccessors = function(ruleAccessors) {
	for(index3 in ruleAccessors) {
		var factId = ruleAccessors[index3];
		if(!this.factBase.isFactValid(factId)) {
			if(this.isInitialFact(factId)) {
				// POSER UNE QUETSION
				this.triggerQuestion(factId);
			} else {
				this.lookInAccessors(this.ruleBase.getRules(factId));
			}
		}

		if(true/*la regle est valide*/) {
			// je l'applique
		}
	}
};

Jarvis.prototype.isInitialFact = function(factId) {
	var initialFacts = this.getAllInitialFacts();
	for(index in initialFacts) {
		if(initialFacts[index].getId() === factId) {
			return true;
		}
	}
	return false;
};

Jarvis.prototype.updateDatabase = function(dataSource) {
	this.dataBase.updateWith(dataSource, this);
};

Jarvis.prototype.setCurrentCategory = function(category) {
	this.currentCategory = category;
};

Jarvis.prototype.receiveAnswerToQuestion = function(answer, currentDisplayTime) {
	var time = currentDisplayTime;
	var valid = (answer === "y" ? true : false);

	if(answer === "i") {
		valid = Math.floor(Math.random() * 100) > 50 ? true : false;
		this.magicInstance.newLine(true);
		this.magicInstance.say("Lancement des test ...");
		var coef = this.processTests();
		var self = this;
		setTimeout(function() {
			self.magicInstance.addInstantly("&nbsp;&nbsp;" + self.magicInstance.getTextFormatted(self.magicInstance.answers, (valid ? "y" : "n")));
		}, time * coef);
		time *= coef + 1;;
	}

	this.factBase.setFactValidity(this.currentFactEvaluated, valid);
	return time;
};

Jarvis.prototype.processTests = function() {
	this.runDiagnostic(Math.floor(Math.random() * 18) + ".jpg");
	return 6;
};

Jarvis.prototype.triggerQuestion = function(factId) {
	var fact = this.factBase.getFact(factId);
	var self = this;
	this.magicInstance.process("/", function() {
		self.magicInstance.displayPossibleAnswers(self.magicInstance.answers, fact.getAnswers());
		self.magicInstance.removeProcess("/");
	});
	this.magicInstance.say(fact.getQuestion() + "/");
	this.currentFactEvaluated = fact;
};

Jarvis.prototype.getAllTerminalFacts = function() {
	var terminalFacts = [];
	var facts = this.factBase.getFacts();
	var rules = this.ruleBase.getAllRules();
	for(index in facts) {
		var factId = facts[index].getId();
		var isInAccessor = false;
		for(index2 in rules) {
			if(this.ruleBase.isIn(factId, rules[index2])) {
				isInAccessor = true;
				break;
			}
		}

		if(!isInAccessor) {
			terminalFacts.push(this.factBase.getFact(factId));
		}
	}

	return terminalFacts;
};

Jarvis.prototype.getAllInitialFacts = function() {
	var initialFacts = [];
	var facts = this.factBase.getFacts();
	for(index in facts) {
		var factId = facts[index].getId();
		if(this.ruleBase.getRules(factId).length === 0) {
			initialFacts.push(this.factBase.getFact(factId));
		}
	}
	return initialFacts;
};

Jarvis.prototype.runDiagnostic = function(wallpaper) {
	this.diag.maxDiags = 33;
	this.diag.start = 0;
	this.diag.end = this.line.length;
	this.diag.count = 0;

  	move('.fadeBg').set('opacity', 1).set("visibility", "initial").duration('0.6s').end();

	move('#diagnostics').set("background", "url(../img/diagnostics/final/" + wallpaper + ") no-repeat 0 0 fixed").end();
	move('#diagnostics').duration('0s').scale(0).end();
	move('#diagnostics').duration('0.6s').set('visibility', "initial").scale(1).end();

	var self = this;
	var screen = this.magicInstance.getDiagnosticsArea();
	var interval = setInterval(function() {
		var span = document.createElement("span");
		span.innerHTML = self.getScreenText(self.line[self.diag.start]);
		screen.appendChild(span);

		if(++self.diag.start === self.diag.end) {
			clearInterval(interval);

			move('#diagnostics').duration('0.6s').set('visibility', "hidden").scale(0).end();
  			move('.fadeBg').set('opacity', 0).set("visibility", "hidden").duration('0.6s').end();

			while(screen.childNodes.length > 0) {
				screen.removeChild(screen.childNodes[0]);
			}
		}

		if(++self.diag.count > self.diag.maxDiags) {
			screen.removeChild(screen.childNodes[0]);
			--self.diag.count;
		}

	}, 0);
};

Jarvis.prototype.getScreenText = function(line) {
	var text = "";

	for(index in line) {
		text += line[index] === " " ? "&nbsp" : line[index] === '\n' ? "<br>" : line[index];
	}

	return text;
};

Jarvis.prototype.setCodeLines = function() {
	this.line = [
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
		'\n',
		'int b64( int opt, char *infilename, char *outfilename, int linesize )\n',
		'{\n',
		'    FILE *infile;\n',
		'    int retcode = B64_FILE_ERROR;\n',
		'    if( !infilename ) {\n',
		'        infile = stdin;\n',
		'    }\n',
		'    else {\n',
		'        infile = fopen( infilename, "rb" );\n',
		'    }\n',
		'    if( !infile ) {\n',
		'        perror( infilename );\n',
		'    }\n',
		'    else {\n',
		'        FILE *outfile;\n',
		'        if( !outfilename ) {\n',
		'            outfile = stdout;\n',
		'        }\n',
		'        else {\n',
		'            outfile = fopen( outfilename, "wb" );\n',
		'        }\n',
		'        if( !outfile ) {\n',
		'            perror( outfilename );\n',
		'        }\n',
		'        else {\n',
		'            if( opt == "e" ) {\n',
		'                encode( infile, outfile, linesize );\n',
		'            }\n',
		'            else {\n',
		'                decode( infile, outfile );\n',
		'            }\n',
		'            if (ferror( infile ) || ferror( outfile )) {\n',
		'                retcode = B64_FILE_IO_ERROR;\n',
		'            }\n',
		'            else {\n',
		'                 retcode = 0;\n',
		'            }\n',
		'            if( outfile != stdout ) {\n',
		'                if( fclose( outfile ) != 0 ) {\n',
		'                    perror( b64_message( B64_ERROR_OUT_CLOSE ) );\n',
		'                    retcode = B64_FILE_IO_ERROR;\n',
		'                }\n',
		'            }\n',
		'        }\n',
		'        if( infile != stdin ) {\n',
		'            fclose( infile );\n',
		'        }\n',
		'    }\n',
		'    return( retcode );\n',
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
};