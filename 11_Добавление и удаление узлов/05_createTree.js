"use strict";
// Напишите функцию, которая создаёт вложенный список UL/LI (дерево) из объекта.

// Например:



function createTree	 (data = {}) {
	let tree = document.createElement("ul");

	for (const key in data) {
		let listItem = document.createElement("li");
		listItem.innerText = key;
		listItem.appendChild(createTree(data[key]));
		tree.appendChild(listItem);
	}

	return tree;
}


let data = {
	"Рыбы": {
		"Форель": {},
		"Щука": {}
	},
	"Деревья": {
		"Хвойные": {
			"Лиственница": {},
			"Ель": {}
		},
		"Цветковые": {
			"Берёза": {},
			"Тополь": {}
		}
	}
};

const container = document.getElementById("container");
const tree = createTree(data);
container.appendChild(tree); // создаёт
