var structure = {
	music: {
		questions: [
			{id: "1", label: "Le système est-il allumé ?", value: null},
			{id: "2", label: "Un café ?", 				   value: null},
			{id: "3", label: "Un thé ?", 				   value: null}
		],

		diagnostics: [
			{label: "Allumez le système et recommencer.", 	  			validFor: ["!1"], 		asked: false},
			{label: "Tafiole ! Le thé c'est pour les PD :D",  			validFor: ["3"], 		asked: false},
			{label: "Va chercher un kawa et fout moi la paix bordel !", validFor: ["2"], 		asked: false},
			{label: "Tu veux de l'eau !", 					  			validFor: ["!2", "!3"], asked: false},
		]
	}
};