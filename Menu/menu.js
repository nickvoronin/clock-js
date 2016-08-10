class Menu {
  constructor(elt) {
    this.menu = elt;
    this.items = elt.querySelectorAll("*");
    this.menu.addEventListener("click", this.toggle(event));
  }

  toggle(event) {
    Array.prototype.forEach.call( this.items, function(item, items) {
              // if (item.closest("menu")) {
              //   item.classList.toggle("open");
              // }

      var closestTitle = event.target.closest('.menu sweets-menu');
        if (closestTitle && elem.contains(closestTitle)) {
        elem.classList.toggle('open');
      }
    });
  }

  deleteItem() {

  }
}

let menu = new Menu(document.querySelector(".sweets-menu"));
menu.toggle();

function Menu(options) {
  var elem = options.elem;

  elem.onmousedown = function() {
    return false;
  }

  elem.onclick = function(event) {
    if (event.target.closest('.title')) {
      elem.classList.toggle('open');
    }
  };

}