Amsify Jquery Ajax
------------------

This folder having three different plugin files

1. [Toggle](#toggle)
2. [OnChange](#onchange)
3. [List Items](#list-items)

## Toggle
This is for toggling content and class of elements along with calling ajax.
<br/>
Let's say you have element to toggle its classes **btn-success, btn-danger** and content **Active, Inactive**
```html
	<a href="#" class="active" data-id="1" data-val="1"></a>
```
This will make all the elements with class **.active** onclick toggle class **btn-success, btn-danger**, content **Active, Inactive** along with calling ajax to the action with data set in data-id and data-val
```js
	$('.active').amsifyToggle({
		toggleClass: ['btn-success', 'btn-danger'],
		toggleHTML: ['Active', 'Inactive'],
		action: 'http://site.com/toggle'
	});
```
Since the default value of **data-val** is **1**, it will convert this anchor tag to this
```html
	<a href="#" class="active btn-success" data-id="1" data-val="1">Active</a>
```
On click this anchor tag, it will be toggled to this
```html
	<a href="#" class="active btn-red" data-id="1" data-val="0">Inactive</a>
```

You can also set toggle class, html and ajax action in attributes like this
```html
	<a 	href="#" class="active"
		data-class="btn-success:btn-danger"
		data-html="Active:Inactive"
		data-id="1"
		data-val="1"
		data-ajax="http://site.com/toggle">
	</a>
```
**Note:** Attributes **data-class** and **data-html** are separated by colon **:**

## OnChange
This is for simply loading html into element on change of selection input
```html
	<select id="country">
		<option value="">Select Country</option>
		<option value="1">India</option>
		<option value="2">Afghanistan</option>
		<option value="3">Iran</option>
	</select>
	<!-- This is where data to be loaded -->
	<select id="city">
		<option value="">Select City</option>
	</select>
```
This initialization will make the selection load the html in *#cities* selector
```js
$('#country').amsifyOnChange({
	targetField: '#city',
	action : 'http://site.com/action.php',
});
```

## List Items
This is for cloning and prepending the form into the list. Let's say we have one section with form like this
```html
	<div id="list">
		<div class="item">
			<input type="text" name="name"/>
			<input type="text" name="email"/>
			<a href="#" class="add-item">Add</a>
			<a href="#" class="remove-item">Remove</a>	
		</div>
	</div>
```

```js
	$('#list').amsifyListItems({
		add: 'http://site.com/add.php',
		edit: 'http://site.com/edit.php',
		delete: 'http://site.com/delete.php',
	});
```
Initializing list items will prepend the copy of item on click **.add-item** along with calling ajax to the add action with input data.
**.remove-item** will remove the item by passing item-id to delete action.

**Note:** Make sure to send item id back in ajax response something like this
```js
	{
		status: true,
		message: 'Item added',
		id: 23
	}
```
 and it will set to **item-id** attribute of each item.
 ```html
	<div id="list">
		<!-- New item added here -->
		<div class="item" item-id="23">
			<input type="text" name="name" value="Name1"/>
			<input type="text" name="email" value="Email1"/>
			<a href="#" class="remove-item">Remove</a>	
		</div>
		<!-- Default item which will not be deleted -->
		<div class="item">
			<input type="text" name="name"/>
			<input type="text" name="email"/>
			<a href="#" class="add-item">Add</a>
		</div>
	</div>
```