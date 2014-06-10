var structure = {
	music: {
		questions: [
			{id: "q00", label: "Le système est-il allumé ?", value: null},			
			{id: "q01", label: "Avez-vous vérifié la présence de haut-parleurs sur le système ?", value: null},
			{id: "q02", label: "Avez-vous vérifié que le volume n'est pas à 0 ou sur mute ?", value: null},
			{id: "q03", label: "Avez-vous déjà entendu le moindre son sur le système ?", value: null},
			{id: "q04", label: "Le format de musique que vous souhaitez écouter est-il reconnu sur le système ?", value: null},
			{id: "q05", label: "Avez-vous déjà réussi à écouter une piste ayant le format ciblé sur le système ?", value: null},
			{id: "q06", label: "Les drivers pour le format ciblé sont-ils installés ?", value: null},
			{id: "q07", label: "Les drivers pour le format ciblé sont-ils à jour ?", value: null},
			{id: "q09", label: "Avez-vous vérifié l’existence du fichier sur le système ?", value: null},
			{id: "q10", label: "Avez-vous vérifié la protection du fichier ?", value: null},
			{id: "q11", label: "Etes-vous sûr d’avoir les droits nécessaires pour accéder au fichier ?", value: null},
			{id: "q12", label: "Le fichier que vous essayez d’écouter est-il situé sur le présent système (et non sur un système externe) ?", value: null},
			{id: "q13", label: "Avez-vous vérifié la connexion satellite ?", value: null},
			{id: "q14", label: "Le fichier provient-il d’une source douteuse ?", value: null},
			{id: "q15", label: "Le fichier a t-il subi des erreurs durant un précédent traitement ?", value: null},
			{id: "q16", label: "Avez-vous tenté de modifier d’une quelconque façon le fichier ?", value: null},
			{id: "q17", label: "Avez-vous contrôlé la présence d’un micro sur le système ?", value: null},
			{id: "q18", label: "Avez-vous contrôlé le bon fonctionnement du micro ?", value: null},
			{id: "q19", label: "Votre langue est-elle configurée pour être interprétée par le système de reconnaissance vocale ?", value: null},
			{id: "q20", label: "Avez-vous déjà réussi à exécuter des commandes vocales sur le système auparavant ?", value: null},
			{id: "q21", label: "Prononcez-vous les commandes vocales correspondantes ?", value: null},
			{id: "q22", label: "Avez-vous un problème de prononciation ?", value: null}
		],

		diagnostics: [
			{id: "d01", label: "Allumez le système et recommencer.", validFor: ["!q00"], isFinal: true},
			{id: "d02", label: "Des enceintes sont nécéssaires afin de pouvoir écouter de la musique.", validFor: ["!q01"], isFinal: true},
			{id: "d03", label: "Afin d'entendre la musique, le volume doit être supérieur à 0, ou unmute.", validFor: ["!q02"], isFinal: true},
			{id: "d06", label: "Veuillez installer les drivers nécessaires à la reconnaissance du format du fichier.", validFor: ["!q03", "!q06"], isFinal: true},
			{id: "d07", label: "Veuillez mettre à jour les drivers nécessaires à la reconnaissance du format du fichier.", validFor: ["q03", "!q07"], isFinal: true},
			{id: "d04", label: "Veuillez installer les drivers nécessaires à la reconnaissance du format du fichier.", validFor: ["!q04"], isFinal: true},
			{id: "d05", label: "Les drivers peuvent-être corrompus. Veuillez les réinstaller et réessayer.", validFor: ["q04", "!q05",], isFinal: true},
			{id: "d08", label: "Le fichier que vous souhaitez écouter n'existe pas !", validFor: ["!q09"], isFinal: true},
			{id: "d09", label: "Il se peut que le fichier soit protégé en lecture. Merci de vérifier puis de réessayer.", validFor: ["q09", "!q10"], isFinal: true},
			{id: "d10", label: "Il se peut que vous n'ayez pas les droits nécessaires à la lecture du fichier.", validFor: ["q09", "q10", "!q11"], isFinal: true},
			{id: "d11", label: "La connexion peut être brouillée.", validFor: ["!q12", "!q13"], isFinal: true},
			{id: "d12", label: "L'antivirus de J.A.R.V.I.S peut être la réponse à votre problème.", validFor: ["!q12", "q13", "q14"], isFinal: true},
			{id: "d13", label: "Le fichier peut être corrompu dû a une erreur de traitement. Veuillez le regénérer.", validFor: ["q15"], isFinal: true},
			{id: "d14", label: "Le fichier peut être corrompu dû a une erreur de traitement. Veuillez annuler vos modifications.", validFor: ["q16"], isFinal: true},
			{id: "d15", label: "Pas de micro, pas de commandes. Pas de commandes, pas de musique ! C.Q.F.D.", validFor: ["!q17"], isFinal: true},
			{id: "d16", label: "Il suffit d'un peu de poussière pour obstruer l'écoute et ne pas lancer les actions demandées.", validFor: ["q17", "!q18"], isFinal: true},
			{id: "d17", label: "How do you want me to understand you if you don't understand me?", validFor: ["q17", "q18", "!q19"], isFinal: true},
			{id: "d18", label: "Et voilà !", validFor: ["q17", "q18", "q19", "!q20", "!q21"], isFinal: true},
			{id: "d19", label: "Essayer encore et encore, c'est la clé de la réussite...", validFor: ["q17", "q18", "q19", "q20", "q21", "q22"], isFinal: true},
			{id: "d20", label: "Après tout, la musique, à quoi ça sert ? ;)", validFor: ["q17", "q18", "q19", "q20", "q21", "!q22"], isFinal: true}
		]
	}
};