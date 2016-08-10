"use strict";
// Метод Element.matches(css) в некоторых старых браузерах поддерживается под старым именем matchesSelector
// или с префиксами, то есть: webkitMatchesSelector (старый Chrome, Safari), mozMatchesSelector (старый Firefox)
// или Elementent.prototype.msMatchesSelector (старый IE).

// Создайте полифилл, который гарантирует стандартный синтаксис Element.matches(css) для всех браузеров.
;(function () {
  if (Element.matches === undefined) {
    if (Element.matchesSelector) {
      Element.matches = Element.matchesSelector;
    } else if (Element.mozMatchesSelector) {
      Element.matches = Element.mozMatchesSelector;
    } else if (Element.prototype.msMatchesSelector) {
      Element.matches = Element.prototype.msMatchesSelector;
    }
  }
})();