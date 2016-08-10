/**
 * По адресу http://learn.javascript.ru/task/find-elements/table.html находится документ с таблицей и формой.
 * Найдите (получите в переменную) в нём:
 */

// 1. Все элементы label внутри таблицы. Должно быть 3 элемента.
console.log(document.getElementById("age-table").getElementsByTagName("label"));

// 2. Первую ячейку таблицы (со словом "Возраст").
console.log(document.getElementById("age-table").firstChild);

// 3. Вторую форму в документе.
console.log(document.getElementsByTagName("form")[1]);

// 4. Форму с именем search, без использования её позиции в документе.
// console.log(document.getElementsByName("search"));
console.log( document.querySelector('form[name="search"]'));

// 5. Элемент input в форме с именем search. Если их несколько, то нужен первый.
console.log( document.querySelector("form input:first-child") );

// 6. Элемент с именем info[0], без точного знания его позиции в документе.
console.log( document.getElementsByName("info[0]")[0]);

// 7. Элемент с именем info[0], внутри формы с именем search-person.
console.log( document.querySelector('form[name="search-person"] [name="info[0]"] '));
