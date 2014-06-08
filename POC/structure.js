var structure = {
	music: {
		questions: [
			{id: "q1", label: "Le système est-il allumé ?", value: null},
			{id: "q2", label: "Des enceintes sont-elles branchées sur la machine ?",	value: null},
			{id: "q3", label: "Le volume est-il à zéro ou sur mute ?", value: null},
			{id: "q4", label: "Pouvez-vous entendre un quelconque son provenir des enceintes ?",	value: null}
		],

		diagnostics: [
			{id: "d1", label: "Allumez le système et recommencer.", validFor: ["!q1"], asked: false},
			{id: "d2", label: "Des enceintes sont nécéssaires afin de pouvoir écouter de la musique.", validFor: ["!q2"], asked: false},
			{id: "d3", label: "Afin d'entendre la musique, le volume doit être supérieur à 0, ou unmute.", validFor: ["q2", "q3"], asked: false},

			// Sans diagnostic en clé
			// {id: "d5", label: "Tout fonctionne parfaitement dans ce cas, chef !", validFor: ["q2", "!q3", "q4"], asked: false},
			// {id: "d6", label: "Peut-être faut-il lancer un fichier audio d'abord, va savoir...", validFor: ["q2", "!q3", "!q4"], asked: false},
			
			// Avec diagnostic en clé
			{id: "d4", label: "Nous sommes en bonne voie ;)", validFor: ["q2", "!q3"], asked: false},
			{id: "d5", label: "Tout fonctionne parfaitement dans ce cas, chef !", validFor: ["d4", "q4"], asked: false},
			{id: "d6", label: "Peut-être faut-il lancer un fichier audio d'abord, va savoir...", validFor: ["d4", "!q4"], asked: false}
		]
	}
};