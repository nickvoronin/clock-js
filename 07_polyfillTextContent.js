/**
 * Свойство textContent не поддерживается IE8. Однако, там есть свойство innerText.
 * Создаёте полифилл, который проверяет поддержку свойства textContent, и если её нет – создаёт его,
 * используя innerText. Получится, что в IE8 «новое» свойство textContent будет «псевдонимом» для innerText.
 * Хотя свойство innerText и работает по-иному, нежели textContent, но в некоторых ситуациях они могут
 * быть взаимозаменимы. Именно на них направлен полифилл.
*/
;(function () {
  if (Element.textContent === undefined) {
    Object.defineProperty(Element.prototype, "textContent", {
      get: function () {
        return this.innerHTML;
      },
      set: function (text) {
        this.innerHTML = text;
      }
    })
  }
})();