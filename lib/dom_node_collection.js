class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  calling(){
  }

  html(string) {
    if (string !== undefined) {
      this.nodes.forEach( (node) => {
        node.innerHTML = string;
      });
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.nodes.forEach( (node) => {
      node.innerHTML = "";
    });
  }

  append(argument) {
    this.nodes.forEach( (node) => {
      if (typeof argument === "string" ) {
        node.innerHTML += argument;
      }
    });
  }

  attr(attributeName, new_attr) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (!new_attr) {
        if (this.nodes[i].hasAttribute(attributeName)) {
          return this.nodes[i].getAttribute(attributeName);
        }
      } else {
        this.nodes[i].setAttribute(attributeName, new_attr);
      }
    }
  }

  addClass(className) {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].classList.add(className);
    }
  }

  toggleClass(toggleClass) {
    this.nodes.forEach(function(el) {
      el.classList.toggle(toggleClass);
    });
  }

  removeClass(className) {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].classList.remove(className);
    }
  }

  children() {
    const arr = [];
    for (var i = 0; i < this.nodes.length; i++) {
      arr.push(this.nodes[i].children);
    }
    return new DOMNodeCollection(arr);
  }

  parent() {
    const arr = [];
    for (var i = 0; i < this.nodes.length; i++) {
      arr.push(this.nodes[i].parentElement);
    }
    return new DOMNodeCollection(arr);
  }

  find(selector) {
    let arr = [];
    for (var i = 0; i < this.nodes.length; i++) {
      let tmp = this.nodes[i].querySelectorAll(selector);
      if (tmp.length) arr = arr.concat(Array.from(tmp));
    }
    return new DOMNodeCollection(arr);
  }

  remove() {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].remove();
    }
  }

  on(type, callback) {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].thing = callback;
      this.nodes[i].addEventListener(type, callback, false);
    }
  }

  off(type) {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].removeEventListener(type, this.nodes[i].thing, false);
    }
  }
}

module.exports = DOMNodeCollection;
