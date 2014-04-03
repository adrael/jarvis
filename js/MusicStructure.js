// TODO - Trier les questions avec des diagnostics finaux.
// TODO - Lors de la sélection de la catégorie, ne poser que des questions qui concernent la catégorie ciblée.

var MusicStructure = [
	{
		id: 101,
		question: "Quel type de format de musique souhaitez-vous écouter ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 102,
		question: "Avez-vous déjà réussi à écouter une piste ayant le format ciblé sur le système ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 103,
		question: "Les drivers pour le format ciblé sont-ils installés ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 104,
		question: "Les drivers pour le format ciblé sont-ils à jour ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 105,
		question: "Avez-vous vérifié la présence de haut-parleurs sur le système ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 106,
		question: "Avez-vous contrôlé le volume ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 107,
		question: "Avez-vous déjà entendu le moindre son sur le système ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 108,
		question: "Avez-vous vérifié l’existence du fichier sur le système ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 109,
		question: "Avez-vous vérifié la protection du fichier ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 110,
		question: "Êtes-vous sûr que le fichier sélectionné correspond aux critères de filtrage de bonne musique mis en place par J.A.R.V.I.S ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 111,
		question: "Le fichier que vous essayez d’écouter est-il situé sur le présent système (et non sur un système externe) ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 112,
		question: "Etes-vous sûr d’avoir accès au réseau pour recevoir les données ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 113,
		question: "Etes-vous sûr d’avoir les droits nécessaires pour accéder au fichier ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 114,
		question: "Avez-vous vérifié le statut de la dernière synchronisation avec le serveur de musique de J.A.R.V.I.S ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 115,
		question: "Avez-vous vérifié la connexion satellite ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 116,
		question: "Avez-vous contrôlé la présence de l’antenne radio ?",
		answers: ["y", "n"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 117,
		question: "Avez-vous contrôlé le bon fonctionnement de l’antenne radio ?",
		answers: ["y", "n"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 118,
		question: "Le fichier provient-il d’une source douteuse ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 119,
		question: "Le fichier a t-il subi des erreurs durant un précédent traitement ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 120,
		question: "Avez-vous contrôlé la présence d’un micro sur le système ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 121,
		question: "Avez-vous contrôlé le bon fonctionnement du micro ?",
		answers: ["y", "n"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 122,
		question: "Votre langue est-elle configurée pour être interprétée par le système de reconnaissance vocale ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 123,
		question: "Avez-vous déjà réussi à exécuter des commandes vocales sur le système auparavant ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 124,
		question: "Prononcez-vous les commandes vocales correspondantes ?",
		answers: ["y", "n"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 125,
		question: "Avez-vous un problème de prononciation ?",
		answers: ["y", "n"],
		label: "",
		causedBy: [],
		category: "music"
	},

	{
		id: 126,
		question: "Avez-vous tenté de modifier d’une quelconque façon le fichier ?",
		answers: ["y", "n"],
		label: "",
		causedBy: [],
		category: "music"
	}
];