var TestStructure = [
	{
		id: 101,
		question: "Avez-vous de la fièvre ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},
	{
		id: 102,
		question: "Avez-vous la tête qui tourne ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},


	{
		id: 152,
		question: "",
		answers: ["y", "n", "i"],
		label: "Vous avez un rhume.",
		causedBy: [101, 102],
		category: "music"
	},
	{
		id: 150,
		question: "",
		answers: ["y", "n", "i"],
		label: "Ah, l'alcool, vous savez...",
		causedBy: [102],
		category: "music"
	}
];