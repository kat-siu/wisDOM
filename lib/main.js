const DOMNodeCollection = require('./dom_node_collection');

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
