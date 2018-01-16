const DOMNodeCollection = require('./dom_node_collection');

window.$l = (selector, callback) => {
  const queue = [];
  if (callback !== undefined && document.readyState !== 'complete') {
    queue.push(callback);
  } else if (callback !== undefined && document.readyState === 'complete') {
    callback();
  }
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      queue.forEach( (callback) => callback());
    }
  };
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection(selector);
  } else if (typeof selector === 'string') {
    let nodelist = Array.from(document.querySelectorAll(selector));
    return new DOMNodeCollection(nodelist);
  }
  function foo () {console.log('foo');}
};