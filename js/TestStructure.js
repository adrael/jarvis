var TestStructure = [
	{
		id: 101,
		question: "M'aimes-tu ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},
	{
		id: 102,
		question: "Veux-tu m'épouser ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},
	{
		id: 103,
		question: "",
		answers: ["y", "n", "i"],
		label: "Tu veux un enfant !",
		causedBy: [101, 102],
		category: "music"
	},
	{
		id: 104,
		question: "",
		answers: ["y", "n", "i"],
		label: "Tu n'es qu'une salope !",
		causedBy: [101],
		category: "music"
	},
	{
		id: 105,
		question: "",
		answers: ["y", "n", "i"],
		label: "WTF dude ?!",
		causedBy: [102],
		category: "music"
	}



	,
	{
		id: 106,
		question: "Ours ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},
	{
		id: 107,
		question: "Brun ?",
		answers: ["y", "n", "i"],
		label: "",
		causedBy: [],
		category: "music"
	},
	{
		id: 108,
		question: "",
		answers: ["y", "n", "i"],
		label: "Ours Brun !",
		causedBy: [106, 107],
		category: "music"
	}
];