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
It will make the element create copy of it multiple items. Let's say you have one element having one input field inside it that needs to be copied multiple items.
```html
	<div class="amsify-ajax-item">
		<input type="text"/>
		<a href="#" class="amsify-ajax-item-add">Add</a>
	</div>
```
This will make this element copy itself multiple times. As you can see add event is associated with class **.amsify-ajax-item-add**, it will make the element copy and append next to it. The appended element will have delete event with class **.amsify-ajax-item-remove**. If you want you can change these add/remove event selectors in initialization.</br>
These are the options you can pass to initialization.</br>
```js
$('.amsify-ajax-item').amsifyDynamicItems({
	itemAddClass   	: '.item-class2-add',
	itemRemoveClass : '.item-class2-remove',
	type 		: 'bootstrap',
	afterAdd 	: function() {
		alert('config: After Add');
	},
	afterDelete	: function() {
		alert('config: After Delete');
	},
});
```
**itemAddClass** and **itemRemoveClass** are add/remove event selectors.<br/>
**type** can be **bootstrap** if you are using bootstrap css framework.<br/>
**afterAdd** and **afterDelete** are the callback functions you can pass.<br/>

## Items List
```js
  $('.amsify-add-element').amsifyItemsList();
```
It will add the item to the list of items, when pressed enter on input.</br>
Let's say you have div element which is having multiple items and the last item containing inputs, Whenever you enter data in those inputs and press enter, it will add the item to the list with inputs provided.
```html
	<div class="amsify-ajax-list">
		<div class="amsify-ajax-list-item"><span>1</span><span>Amsify</span></div>
		<div class="amsify-ajax-list-last">
			<input type="text" name="id" class="add-element"/>
			<input type="text" name="name" class="add-element"/>
		</div>
	</div>	
```
Note these things, list container having class **amsify-ajax-list** and item having class **amsify-ajax-list-item** and last item having class **amsify-ajax-list-last**. Last item inputs submit will make the item add next to all items before last item.<br/>
But item needs to be set in option to define which value needs to be print on which position.
```js
$('.add-element').amsifyItemsList({
	listItemHTML : '<div class="amsify-ajax-list-item"><span>{id}</span><span>{name}</span></div>'
});
```
**listItemHTML** define what html needs to be append after input submit. Note that this html having two variables within curly brace. These names print the values which comes from inputs having these same attribute names.

## Form Search
```js
  $('form').amsifyLoadData();
```
This will make the from submit load data in defined selector section.
```html
	<form data-action="http://site.com/search">
		<input type="text" name="search"/>
		<input type="submit"/>
	</form>
	<div class="amsify-ajax-load-container">
	</div>
```
Whenever form is submitted data ajax request will send to the action url set in **data-action** attribute and data will be loaded to the container. If you wish you can put the section body loader outside of container.
```html
	<div class="section-body-loader fill-background"></div>
	<div class="amsify-ajax-load-container">
	</div>
```
## Suggestions
```js
  $('.amsify-ajax-suggestion').amsifySuggestData();
```
This will get suggestions through ajax call on keyup of given selector. Below is the example
```html
	<form data-action="http://site.com/search">
		<input type="text" name="search" class="amsify-ajax-suggestion"/>
		<input type="submit"/>
	</form>
```
Response can be either array of suggestions or html. If you can wish to send suggestions array, json response should
```js
	{
		status : 'success',
		suggestions : ['word', 'keyword', 'key']
	}
```
If you want you can directly send html as ul li items as response but one more value with name **html** needs to be passed as true
```js
	{
		status : 'success',
		suggestions : '<li>word</li><li>keyword</li><li>key</li>',
		html : true
	}
```
## onChange
```js
  $('.amsify-ajax-change').amsifyOnChange();
```
It will simply create on change event to the selector and call ajax and load content to other selector. Below is the example
```html
	<select amsify-ajax-action="http://site.com/change" amsify-ajax-change="#subcategory" class="amsify-ajax-change">
		<option value="">Select</option>
		<option value="1">First</option>
		<option value="2">Second</option>
		<option value="3">Third</option>
	</select>
				
	<select class="form-control" id="subcategory">
	</select>
```
As you can see on change **amsify-ajax-action** attribute value url will be called through ajax and data will be loaded to the selector which is set in **amsify-ajax-change** attribute.
