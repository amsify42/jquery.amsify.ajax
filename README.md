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
