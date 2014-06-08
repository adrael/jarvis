var TestStructure = [
	{
		id: 101,
		question: "Avez-vous des enceintes ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},
	{
		id: 102,
		question: "Le volume est-il supérieur à zéro ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},
	{
		id: 103,
		question: "Pouvez-vous entendre un quelconque son provenir des enceintes ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},





	{
		id: 152,
		question: "",
		answers: ["y", "n", "i"],
		label: "Il faut augmenter le volume ou unmute pour entendre un son.",
		causedBy: [101],
		category: "music"
	},
	{
		id: 150,
		question: "",
		answers: ["y", "n", "i"],
		label: "Tout fonctionne parfaitement !",
		causedBy: [101, 102, 103],
		category: "music"
	},
	{
		id: 151,
		question: "",
		answers: ["y", "n", "i"],
		label: "Il vous faut des enceintes pour écouter de la musique !",
		causedBy: [],
		category: "music"
	},
];