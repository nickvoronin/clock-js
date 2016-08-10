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

function countInnerListItems(node) {
  // возвращает количество вложенных элементов li в полученной ноде
  return node.querySelectorAll("li").length ;
}

function appendAmount(node) {
  // для всех вложенных элментов в полученную ноду
  for (let innerNode of node.childNodes) {
	  // рекурсивно вызовем для нее функцию
	  appendAmount(innerNode);
	  // если у ноды есть потомки и она не является списком
	  if (innerNode.hasChildNodes() && innerNode.tagName !== "UL") {
		  const amount = countInnerListItems(innerNode);
		  // допишем в ноду количество вложенных элементов, если они есть
		  if (amount !== 0) {
			  innerNode.firstChild.nodeValue += amount ? `[${amount}]` : "";
		  }
	  }
  }
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
appendAmount(tree);
container.appendChild(tree); // создаёт
