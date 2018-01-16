/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = (selector, callback) => {
  const queue = [];
  if (callback !== undefined && document.readyState !== 'complete') {
    queue.push(callback);
  }
  else if (callback !== undefined && document.readyState === 'complete') {
    callback();
  }

  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      queue.forEach( (callback) => callback());
    }
  };

  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection(selector);
  }
  else if (typeof selector === 'string') {
    let nodelist = Array.from(document.querySelectorAll(selector));
    return new DOMNodeCollection(nodelist);
  }
  function foo () {console.log('foo');}
};

$l.extend = function(target, ...objs){
  objs.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      target[key] = obj[key];
    });
  });
};

$l.ajax = function(options = {}){
  const defaults = {
    success: () => {},
    error: () => {},
    url: window.location.href,
    method: 'get',
    data: {},
    dataType: 'jsonp',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  $l.extend(defaults, options);

  const xhr = new XMLHttpRequest();

  xhr.open(defaults.method, 'http://api.openweathermap.org/data/2.5/weather' +
  	'?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b');

  xhr.onload = () => {
    console.log(xhr.response);
  };
  xhr.onerror = () => {
    console.log(xhr.response);
  };

  xhr.send(defaults);
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);