# Amsify Jquery Ajax Plugin

This plugin has some functions which are useful to when we have to append text and call ajax.

#### Requires
1. **jquery.js** library
2. **jquery.amsify.helper.js** file which is there in my **jquery.amsify.helper** repository with all its css and image files.
3. **jquery-ui.js** (in case you are using items list function)


### These are the following initializations you can do with this plugin
1. Toggle
2. Multiple Items
3. Items List
4. Form Search
5. Suggestions
6. onChange

## Toggle
```js
  $('.amsify-ajax-toggle').amsifyToggle();
```
This will make the element toggle the class and content based on boolean value it has. Let's you have two classes  **.red** and **.green** and the content you want to toggle is **YES** and **NO**. 
```html
  <a class="red amsify-ajax-toggle"
     data-id="786"
     data-val="1" 
     data-method="http://site.com/call-ajax"
     data-class="green:red"
     data-html="YES:NO">YES</a> 
```
On click, the content **data-class** and **data-html** attributes having will be toggled in this element. As you can see both these attributes having value separated by colon to be toggled. On every click it will call ajax method to the url defined in **data-method** attribute with form data placed in **data-id** and **data-val**.
<br/>
You can define callback function after toggle event is done. You can do it by two ways.
1. By putting callback function in element attribute
```html
  <a class="red amsify-ajax-toggle"
     data-id="786"
     data-val="1" 
     data-method="http://site.com/call-ajax"
     data-class="green:red"
     data-html="YES:NO"
     after-toggle="callback()"
      >YES</a> 
```
```js
  function callback() {
    alert();
  }
```

2. By defining it in initialization itself
```js
  $('.amsify-ajax-toggle').amsifyToggle({
			afterToggle : function() {
				alert();
			}
		});
```
## Multiple Items
```js
  $('.amsify-ajax-item').amsifyDynamicItems();
```

## Items List
```js
  $('.amsify-add-element').amsifyItemsList();
```

## Form Search
```js
  $('form').amsifyLoadData();
```

## Suggestions
```js
  $('.amsify-ajax-suggestion').amsifySuggestData();
```

## onChange
```js
  $('.amsify-ajax-change').amsifyOnChange();
```
