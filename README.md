# wisDOM

wisDOM is a lightweight JavaScript library and supports some of jQuery's most important features, including:
- Making AJAX requests
- Handling events
- Traversing and manipulating the DOM

# Demo

<b><a href="http://www.katsiu.com/wisDOM-Todo-List/">wisDOM To-Do List Demo</a></b>


wisDOM To-Do List is a single page web application created for demoing the wisDOM library, inspired by jQuery. This app allows users to create a to-do list while also removing these items from the list once completed.

<img src="https://s3.us-east-2.amazonaws.com/app-academy-portfolio/Screen+Shot+2018-01-17+at+12.47.11+AM.png" width="900">


## wisDOM Methods

### DOM Manipulation and Traversal
#### `addClass()`
- Adds the specified class(es) to each `HTMLElement` in the `DOMNodeCollection`
#### `append()`
- Insert content, specified by the parameter, to the end of each element in the `DOMNodeCollection`
#### `attr()`
- Takes in either one or two arguments, an `attributeName` and a `new_attr`. Gets or sets an attribute of the first element in the `DOMNodeCollection`
#### `children()`
- Get the children of each element in the `DOMNodeCollection`
#### `empty()`
- Removes the innerHTML of all `HTMLElements` in the `DOMNodeCollection`
#### `find()`
- Get the descendants of each element in the `DOMNodeCollection`, specified by the parameter
#### `html()`
- Get the HTML contents of the first element in the `DOMNodeCollection`
#### `parent()`
- Get the parent of each element in the `DOMNodeCollection`
#### `removeClass()`
- Remove a single class, multiple classes, or all classes from each element in the `DOMNodeCollection`
#### `remove()`
- Remove the set of matched elements of the `DOMNodeCollection` from the DOM
#### `toggleClass()`
- Add or remove one or more classes from each element in the `DOMNodeCollection`
### Event Handlers
#### `off()`
- Removes an event listener
#### `on()`
- Adds an event listener

