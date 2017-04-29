 // Amsify42 Ajax 1.0.0
 // http://www.amsify42.com
 (function(AmsifyAjax, $, undefined) {
    /**
     * decide whether to fire event from document or directly from selector
     * @type {Boolean}
     */
    var defaultSetDOM             = true;
    /**
     * default type is null
     * @type {String}
     */
    var defaultType               = '';
    /**
     * default toggle selector
     * @type {String}
     */
    var defaultToggleSelector     = '.amsify-ajax-toggle';
    /**
     * array of toggle class
     * @type {Array}
     */
    var defaultToggleClass        = ['btn-success', 'btn-danger'];
    /**
     * array of toggle html
     * @type {Array}
     */
    var defaultToggleHTML         = ['<span class="fa fa-check"></span>', '<span class="fa fa-times"></span>'];
    /**
     * default change field
     * @type {String}
     */
    var defaultChangeField        = '.amsify-ajax-change';
    /**
     * default load form
     * @type {String}
     */
    var defaultLoadForm           = '.amsify-ajax-load-form';
    /**
     * default load submit
     * @type {String}
     */
    var defaultLoadSubmit         = '.amsify-ajax-load-submit';
    /**
     * default load submit
     * @type {String}
     */
    var defaultLoadContainer      = '.amsify-ajax-load-container';
    /**
     * default load more
     * @type {String}
     */
    var defaultLoadMore           = '.amsify-ajax-load-more';
    /**
     * default loader path
     * @type {String}
     */
    var defaultLoaderPath         = 'images/loader.gif';
    /**
     * default small loader path
     * @type {String}
     */
    var defaultSmallLoaderPath    = 'images/loader-small.gif';
    /**
     * default sort class
     * @type {String}
     */
    var defaultLoadSortClass      = '.amsify-ajax-sort';
    /**
     * default suggest field selector
     * @type {String}
     */
    var defaultSuggestField       = '.amsify-ajax-suggestion';
    /**
     * default search action
     * @type {String}
     */
    var defaultSuggestAction      = 'search.php';
    /**
     * default suggestion container
     * @type {String}
     */
    var suggestionsContainer      = '.amsify-ajax-suggestions-container';
    /**
     * default item class
     * @type {String}
     */
    var defaultItemClass          = '.amsify-ajax-item';
    /**
     * default item add selector
     * @type {String}
     */
    var defaultItemAddClass       = '.amsify-ajax-item-add';
    /**
     * default item remove selector
     * @type {String}
     */
    var defaultItemRemoveClass    = '.amsify-ajax-item-remove';

    /**
     * default list class
     * @type {String}
     */
    var defaultListClass          = '.amsify-ajax-list';
    /**
     * default list item selector
     * @type {String}
     */
    var defaultListItemClass      = '.amsify-ajax-list-item';
    /**
     * default list item field selector
     * @type {String}
     */
    var defaultListItemField      = '.amsify-ajax-list-field';
    /**
     * default list item append html
     * @type {String}
     */
    var defaultListItemHTML       = '';
    /**
     * default list item remove selector
     * @type {String}
     */
    var defaultListItemRemove     = '.amsify-ajax-list-remove';

    /**
     * Making method available through Jquery selector
     */
    $.fn.extend({
        /**
         * toggle method
         * @param {object}   config
         * @param {selector} toggleSelector
         */
        amsifyToggle       : function(config, toggleSelector) {
          var setDOM = defaultSetDOM;
          if(config !== undefined) {
            if(toggleSelector !== undefined) {
              config['toggleSelector']  = toggleSelector;
            } else {
              config['toggleSelector']  = this;
              setDOM                    = false;
            }
          } else {
            var config  = {toggleSelector: this};
            setDOM      = false;
          }
          AmsifyAjax.setToggle(config, setDOM);
        },
        /**
         * load method
         * @param {object}   config
         */
        amsifyLoadData     :  function(config) {
          if(config !== undefined) {
              config['loadForm']  = this;
          } else {
            var config = {loadForm: this};
          }
          AmsifyAjax.setLoadData(config);
        },
        /**
         * dynamic item method
         * @param {object}   config
         */
        amsifyDynamicItems : function(config) {
          if(config !== undefined) {
              config['itemClass']  = this;
          } else {
            var config = {itemClass: this};
          }
          AmsifyAjax.setDynamicItems(config);
        },
        /**
         * dynamic item method
         * @param {object}   config
         */
        amsifyItemsList : function(config) {
          if(config !== undefined) {
              config['listItemField']  = this;
          } else {
            var config = {listItemField: this};
          }
          AmsifyAjax.setItemsList(config);
        },
        /**
         * suggestion method
         * @param {object}   config
         */
        amsifySuggestData : function(config) {
          if(config !== undefined) {
              config['suggestField']  = this;
          } else {
            var config = {suggestField: this};
          }
          AmsifyAjax.setSuggestData(config);
        },
        /**
         * onChange method
         * @param {object}   config
         */
        amsifyOnChange : function(config) {
          if(config !== undefined) {
              config['changeField']  = this;
          } else {
            var config = {changeField: this};
          }
          AmsifyAjax.setOnChange(config);
        },

    });
   
    /**
     * init the plugin with all methods with global settings
     * @param  {object} config
     */
    AmsifyAjax.init = function(config) {
      setConfig(config); 
      var defaultAjax = new AmsifyAjax.Ajax;
          defaultAjax.set();
    };

    /**
     * start the plugin with all methods with each instance settings
     * @param  {object} config
     */
    AmsifyAjax.set = function(config) {
        var newAjax = new AmsifyAjax.Ajax();
            newAjax.set(config);
    };

    /**
     * This is like class which can be instantiated multiple times with each setting rules
     */
    AmsifyAjax.Ajax = function() {
        AmsifyAjax.Ajax.prototype.set = function(config) {
            if(config !== undefined) {
              AmsifyAjax.setToggle(config);
              AmsifyAjax.setOnChange(config);
              AmsifyAjax.setLoadData(config);
              AmsifyAjax.setSuggestData(config);
              AmsifyAjax.setDynamicItems(config);
            } else {
              AmsifyAjax.setToggle();
              AmsifyAjax.setOnChange();
              AmsifyAjax.setLoadData();
              AmsifyAjax.setSuggestData();
              AmsifyAjax.setDynamicItems();
            }
            AmsifyHelper.bodyLoaderIEfix();
        };
    };

/**
 * 
 ************ All toggle functionalities section ************
 *
 **/
    /**
     * set the toggle method
     * @param {object}  config
     * @param {boolean} fromDOM
     */
    AmsifyAjax.setToggle = function(config, setDOM) {

        var fromDOM           = defaultSetDOM;
        var toggleSelector    = defaultToggleSelector;
        var toggleClass       = defaultToggleClass;
        var toggleHTML        = defaultToggleHTML;

        if(setDOM !== undefined) {fromDOM = setDOM;}
        if(config !== undefined) {
            if(config.toggleSelector !== undefined) {
              toggleSelector = config.toggleSelector;
            }
            if(config.toggleClass !== undefined) {
              toggleClass = config.toggleClass;
            }
            if(config.toggleHTML !== undefined) {
              toggleHTML = config.toggleHTML;
            }
        }

        var callbackFunction = function(){
          var $this             = $(this);
          var ID                = $(this).data('id');
          var toggleValue       = $(this).data('val');
          var targetMethod      = $(this).data('method');

          if($(this).data('class') !== undefined) {
            toggleClass   = $(this).data('class').split(':');
          }

          if($(this).data('html') !== undefined) {
            toggleHTML    = $(this).data('html').split(':');
          }

          if(toggleValue == 0) {
             $(this).removeClass(toggleClass[1]).addClass(toggleClass[0]).data('val', 1).empty().html(toggleHTML[0]);  
          } else {
             $(this).removeClass(toggleClass[0]).addClass(toggleClass[1]).data('val', 0).empty().html(toggleHTML[1]);              
          }

          var ajaxConfig          = {};
          var params              = { id : ID , val : toggleValue, _token : AmsifyHelper.getToken()};
          ajaxConfig['complete']  = function() {
              AmsifyHelper.callback(config, 'afterToggle', $this, 'after-toggle');
          };
          AmsifyHelper.callAjax(targetMethod, params, ajaxConfig);

        };
        AmsifyHelper.setEvent(fromDOM, 'click', toggleSelector, callbackFunction);
    };


/**
 * 
 ************ All LoadData functionalities section ************
 *
 **/
    /**
     * set load data
     * @param {object} config
     */
    AmsifyAjax.setLoadData  = function(config) {

      var type           = defaultType;
      var loadForm       = defaultLoadForm;
      var loadSubmit     = defaultLoadSubmit;
      var loadContainer  = defaultLoadContainer;
      var loadMore       = defaultLoadMore;
      var loaderPath     = defaultLoaderPath;
      var ajaxSortClass  = defaultLoadSortClass;

      if(config !== undefined) {
        if(config.type !== undefined) {
          type = config.type;
        }
        if(config.loadForm !== undefined) {
          loadForm = config.loadForm;
        }
        if(config.loadSubmit !== undefined) {
          loadSubmit = config.loadSubmit;
        }
        if(config.loadContainer !== undefined) {
          loadContainer = config.loadContainer;
        }
        if(config.loadMore !== undefined) {
          loadMore = config.loadMore;
        }
        if(config.loaderPath !== undefined) {
          loaderPath = config.loaderPath;
        }
        if(config.ajaxSortClass !== undefined) {
          ajaxSortClass = config.ajaxSortClass;
        }
      }

      $(loadForm).each(function(index, form){
        // Stop Form Submission
        $(form).submit(function(e){e.preventDefault();});

        var inputs  = $(this).find(':input');
        var fields  = [];
        var action  = $(this).attr('data-action');
        var submit  = '';

        $.each(inputs, function(key, input){
            if(!$(input).hasClass(loadSubmit.substring(1))) {
              fields.push($(input).attr('name'));
            } else {
              submit = loadSubmit;
            }
        });
        
        // If submit button does not exist
        if(submit == '') {
          // Make Fields unique
          fields = AmsifyHelper.distinctArray(fields);
          $.each(fields, function(index, name){
             $(document).on('change', AmsifyHelper.fieldByName(name), function(){
                AmsifyAjax.callAjax(form, loadContainer, loadMore, loaderPath, 'load', config);
             });
          });
        } 
        // If submit button exist
        else {
          $(document).on('click', submit, function(){
              AmsifyHelper.setDefaultSortIcon(ajaxSortClass, type);
              AmsifyAjax.callAjax(form, loadContainer, loadMore, loaderPath, 'load', config);
          });
        }

        // If sort class exist
        if($(ajaxSortClass).length) {
          AmsifyHelper.setDefaultSortIcon(ajaxSortClass, type);
        }

        // Set Load More Click Function
        $(document).on('click', loadMore, function(e){
            e.preventDefault();
            $(this).addClass('loading-state');
            if($(this).hasClass(ajaxSortClass.substring(1))) {

              if(!$(this).hasClass('amsify-sort-active')) {
                  var rowHtml         = $(this).html();
                  var result          = AmsifyHelper.getSortIcon(rowHtml, type);
                  var basicSort       = result['basic'];
                  var insertHtml      = result['insertHtml'];
                  
                  if(!$(this).attr('data-page')) {
                    $(this).attr('data-page', '1');  
                  }

                  if(type == 'bootstrap') {
                    $(ajaxSortClass).find('.fa').remove();
                    $(this).find('.fa').remove();
                  } else {
                    $(ajaxSortClass).find('.sort-icon').remove();
                    $(this).find('.sort-icon').remove();           
                  }

                  $(ajaxSortClass).not(this).append(basicSort);
                  var sortType = 'asc';
                  if(result['sort_type'] == 'desc') {
                    sortType = 'desc';
                  }
                  $(this).attr('data-type', sortType);
                  $(this).append(insertHtml);
              }
            } else {
              AmsifyHelper.setDefaultSortIcon(ajaxSortClass, type);
            }

            AmsifyAjax.callAjax(form, loadContainer, this, loaderPath, 'append', config);
        });

        // Setting Ajax on scroll if load more is not paginated
        if(!$(loadMore).hasClass('amsify-ajax-paginate')) {
          AmsifyAjax.setOnScrollAjax(loadContainer, loadMore);
        }
      });
    };

    /**
     * set load data on scroll
     * @param {selector} loadContainer
     * @param {selector} loadMore
     */
    AmsifyAjax.setOnScrollAjax = function(loadContainer, loadMore) {
      $(loadContainer).on('scroll mousewheel DOMMouseScroll', function(e){
          if($(loadMore).length && !$(loadMore).hasClass('loading-state')) {
            if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
              $(loadMore).click();
            }
          }
      });
    };

    /**
     * call ajax
     * @param  {selector} form
     * @param  {selector} loadContainer
     * @param  {selector} loadMore
     * @param  {string}   loaderPath
     * @param  {string}   type
     * @param  {object}   config
     */
    AmsifyAjax.callAjax = function(form, loadContainer, loadMore, loaderPath, type, config) {
      var fullURL     = '';
      var ajaxConfig  = {};
      if($(loadMore).attr('href')) {
        fullURL = $(loadMore).attr('href');
      } else {
        var queryString = AmsifyHelper.getFormData($(form), true);
        var actionURL   = AmsifyHelper.getActionURL($(form).attr('data-action'));
        if($(loadMore).hasClass('amsify-ajax-paginate') && $(loadMore).attr('data-page')) {

             var ajaxSortClass = defaultLoadSortClass; 
             if(config.ajaxSortClass !== undefined) {
                ajaxSortClass = config.ajaxSortClass;
              }

            if(type == 'load' || $(form).attr('search-running') == '1' || $(loadMore).hasClass(ajaxSortClass.substring(1))) {
              
              if($(loadMore).attr('data-column')) {
                queryString = queryString+'&column='+$(loadMore).attr('data-column');
              }
              if($(loadMore).attr('data-type')) {
                queryString = queryString+'&type='+$(loadMore).attr('data-type'); 
              }
              queryString = queryString+'&page='+$(loadMore).attr('data-page');
            } else {
              queryString = 'page='+$(loadMore).attr('data-page');
            }
        }
        fullURL = actionURL+'?'+queryString;
      }

      ajaxConfig['beforeSend'] = function() {
          AmsifyHelper.showURL(fullURL);
          if(type == 'append' && !$(loadMore).hasClass('amsify-ajax-paginate')) {
            $(loadMore).append('<img src="'+AmsifyHelper.getActionURL(loaderPath)+'"/>')
          } else {
            $('.section-body-loader').show();
          }
      };

      ajaxConfig['afterSuccess'] = function(data) {
          if(type == 'append') {
            if(data['links'] !== undefined) {
              $('#pagination-area').html(data['links']);  
              $(loadContainer).html(data['html']);  
            } else {
              $(loadMore).remove();
              $(loadContainer).append(data['html']);  
            }
            
          } else {
            $(loadContainer).html(data['html']);  
            if(data['links'] !== undefined) {
              $('#pagination-area').html(data['links']);  
            }
          }
      };

      ajaxConfig['complete'] = function() {
          AmsifyHelper.callback(config, 'afterLoad');
          $('.section-body-loader').hide();
          $(loadMore).removeClass('loading-state');
          if(type == 'load' && $(loadMore).hasClass('amsify-ajax-paginate')) {
            $(form).attr('search-running', '1');
          } else {
            if($(form).attr('search-running') != '1') {
              $(form).attr('search-running', '0');
            }
          }
      };
      
      AmsifyHelper.callAjax(fullURL, {}, ajaxConfig, 'GET');

    };


/**
 * 
 ************ All onChange functionalities section ************
 *
 **/
    /**
     * set onchange event
     * @param {object} config
     */
    AmsifyAjax.setOnChange  = function(config) {
      var changeField = defaultChangeField;
      if(config !== undefined) {
        if(config.changeField !== undefined) {
          changeField = config.changeField;
        }
      }

      $(changeField).each(function(index, field){
        $(field).on('change', function(){
            AmsifyHelper.callback(config, 'beforeChange', this, 'after-change');
            if($.trim($(this).val()) != '') {
              AmsifyAjax.callAjaxForChange(this, config);
            }
        });
      });
    };

    /**
     * call ajax for on change event
     * @param  {selector} field
     * @param  {object}   config
     */
    AmsifyAjax.callAjaxForChange = function(field, config) {
      var ajaxAction  = $(field).attr('amsify-ajax-action');
      var params      = { value : $(field).val() , _token : AmsifyHelper.getToken()};
      var ajaxConfig  = {};
      var changeField = $(field).attr('amsify-ajax-change');
      var loaderPath  = defaultSmallLoaderPath;
      if(config !== undefined) {
        if(config.extraParams !== undefined) {
          params = $.extend({}, params, extraParams);
        }
        if(config.loaderPath !== undefined) {
          loaderPath = config.loaderPath;
        }
      }

      ajaxConfig['beforeSend'] = function(){
          $(changeField).before('<img class="on-change-loader" src="'+AmsifyHelper.getActionURL(loaderPath)+'"/>')
      };

      ajaxConfig['afterSuccess'] = function(data){
          $(changeField).html(data['html']);
      };

      ajaxConfig['complete'] = function(){
          $('.on-change-loader').hide();
          AmsifyHelper.callback(config, 'afterChange', field, 'after-change');
      };

      AmsifyHelper.callAjax(ajaxAction, params, ajaxConfig);
      
    };


/**
 * 
 ************ All dynamicItems functionalities section ************
 *
 **/
    /**
     * set dynamic item events
     * @param {object} config
     */
    AmsifyAjax.setDynamicItems  = function(config) {
      var type            = defaultType;
      var itemClass       = defaultItemClass;
      var itemAddClass    = defaultItemAddClass;
      var itemRemoveClass = defaultItemRemoveClass;
      if(config !== undefined) {
        if(config.type !== undefined) {
          type = config.type;
        }
        if(config.itemClass !== undefined) {
          itemClass = config.itemClass;
        }
        if(config.itemAddClass !== undefined) {
          itemAddClass = config.itemAddClass;
        }
        if(config.itemRemoveClass !== undefined) {
          itemRemoveClass = config.itemRemoveClass;
        }
      }

      $(document).on('click', itemAddClass, function(){
          if($(itemClass).attr('amsify-item-limit')) {
            var limit =  parseInt($(itemClass).attr('amsify-item-limit'));
            if($(itemClass).length >= limit) {
              var message = 'You can not add more than '+limit+' items';
              if($(itemClass).attr('amsify-limit-message')) {
                  message = $(itemClass).attr('amsify-limit-message');
              }
              var title = 'Message';
              if($(itemClass).attr('amsify-message-title')) {
                  title = $(itemClass).attr('amsify-message-title');
              }
              AmsifyModal.showMessage(message, type, title);
              return false;
            }
          }
          AmsifyHelper.callback(config, 'beforeAdd', this, 'before-add');
          $item = $(this).closest(itemClass);
          if($item.length) {
            if(typeof itemClass == 'object') {
              $html = $item.clone().insertAfter(itemClass).attr('amsify-close-item', '1');
            } else {
              $html = $item.clone().insertAfter(itemClass+':last');  
            }
            $html.find(itemAddClass)
                 .removeClass(itemAddClass.substring(1))
                 .addClass(itemRemoveClass.substring(1))
                 .html(iconButton(type));
            $html.find('input').val('');     
          }
          AmsifyHelper.callback(config, 'afterAdd', this, 'after-add');
      });

      $(document).on('click', itemRemoveClass, function(){
          if(typeof itemClass == 'object') {
            $(this).closest('[amsify-close-item=1]').remove();
          } else {
            $(this).closest(itemClass).remove();
          }
          AmsifyHelper.callback(config, 'afterDelete', this, 'after-delete');
      });
    };

    /**
     * remove button icon
     * @param  {string} type
     * @return {string}
     */
    function iconButton(type) {
      if(type == 'bootstrap') {
        return '<span class="fa fa-times"></span>';
      } 
      else {
        return '<b>X</b>';
      }
    };


/**
 * 
 ************ All ItemsList functionalities section ************
 *
 **/
    /**
     * set items list events
     * @param {object} config
     */
    AmsifyAjax.setItemsList  = function(config) {
      var type              = defaultType;
      var listClass         = defaultListClass;
      var listItemClass     = defaultListItemClass;
      var listItemField     = defaultListItemField;
      var listItemHTML      = defaultListItemHTML;
      var listItemRemove    = defaultListItemRemove;
      var ajaxAddAction     = '';
      var ajaxRemoveAction  = '';
      if(config !== undefined) {
        if(config.type !== undefined) {
          type = config.type;
        }
        if(config.listClass !== undefined) {
          listClass = config.listClass;
        }
        if(config.listItemClass !== undefined) {
          listItemClass = config.listItemClass;
        }
        if(config.listItemField !== undefined) {
          listItemField = config.listItemField;
        }
        if(config.listItemHTML !== undefined) {
          listItemHTML = config.listItemHTML;
        }
        if(config.listItemRemove !== undefined) {
          listItemRemove = config.listItemRemove;
        }
        if(config.ajaxAddAction !== undefined) {
          ajaxAddAction = config.ajaxAddAction;
        }
        if(config.ajaxRemoveAction !== undefined) {
          ajaxRemoveAction = config.ajaxRemoveAction;
        }
      }

      $(listItemField).keyup(function(e){
        if(e.which == 13) {
          var fields  = $(this).closest(listClass).find(listItemField);
          var values  = getValuesFromFields(fields);
          var HTML    = itemHTMLValue(listItemHTML, values, listItemClass);
          var htmlAfter;
          if($(this).closest('.amsify-ajax-list-last').length) {
            htmlAfter = $(HTML).insertBefore($(this).closest('.amsify-ajax-list-last'));
          } else {
            htmlAfter = $(HTML).appendTo($(this).closest(listClass));
          }            
          $(this).closest(listClass).find(listItemField).not("input[type='hidden']").val('');

          config['afterSuccess'] = function(data){
            $(htmlAfter).attr('item-id', data['item_id']);
            if(config.afterAdd && typeof config.afterAdd == "function") {
              config.afterAdd(htmlAfter, data);
            }
          };
          if(ajaxAddAction){
            AmsifyHelper.callAjax(ajaxAddAction, values, config);
          }
        }
      });

      $(document).on('click', listItemRemove, function(){
          var id      = $(this).closest(listItemClass).attr('item-id');
          var params  = {id: id};
          if(config.afterDelete && typeof config.afterDelete == "function") {
            config.afterDelete($item);
          }
          $(this).closest(listItemClass).remove();
          if(ajaxRemoveAction){
            AmsifyHelper.callAjax(ajaxRemoveAction, params, config);
          }
      });

      if($(listItemField).closest(listClass).is('[amsify-list-draggable]')) {
            var selector    = $(listItemField).closest(listClass);
            var ajaxMethod  = $(listItemField).closest(listClass).attr('amsify-list-draggable');
            var fields      = $(listItemField).closest(listClass).find(listItemField);
            var values      = getValuesFromFields(fields);
            AmsifyHelper.setDraggableSort(selector, ajaxMethod, 'item-id', values);
        };

    };

    /**
     * combine html with value
     * @param  {string} HTML
     * @param  {object} values
     * @return {string}
     */
    function itemHTMLValue(HTML, values, listItemClass) {
      var renderedHTML  =  HTML;
      $.each(values, function(index, value){
        var regex     = new RegExp('{'+index+'}', 'gi');
        renderedHTML  = renderedHTML.replace(regex, value);
      });
      return renderedHTML;
    };


    /**
     * get values from item inputs
     * @param  {object} fields
     * @return {object}
     */
    function getValuesFromFields(fields) {
      var values = {};
      $(fields).each(function(index, field){
          if($(field).attr('name')) {
            values[$(field).attr('name')] = $(field).val();
          }
      });
      return values;
    };

/**
 * 
 ************ All suggestions functionalities section ************
 *
 **/
    /**
     * set events for field suggestion data
     * @param {object} config
     */
    AmsifyAjax.setSuggestData  = function(config) {
      var suggestField  = defaultSuggestField;
      var suggestAction = defaultSuggestAction;
      if(config !== undefined) {
        if(config.suggestField !== undefined) {
          suggestField = config.suggestField;
        }
        if(config.suggestAction !== undefined) {
          suggestAction = config.suggestAction;
        }
      }

      var form = $(suggestField).parent().closest('form');
      $(document).on('submit', form, function(e){
        e.stopImmediatePropagation();
        var suggestions = $(this).find('ul.amsify-ajax-suggestions-container li');
        var display     = $(this).find('ul.amsify-ajax-suggestions-container').css('display');
        
        $(suggestions).each(function(index, suggestion){
          if($(suggestion).hasClass('active')) {
            var value = $(suggestion).find('a').attr('data-value');
            $(suggestField).attr('data-value', value);
            $(suggestField).val(value);
            $(suggestionsContainer).hide();
          }
        });

        if(display !== undefined && display == 'block') {
          e.preventDefault();
        }
      });

      $.fn.delayKeyup = function(callback, ms){
        return this.each(function() {
          var timer = 0, elem = this;
          $(this).keyup(function(e){
            clearTimeout(timer);
            timer = setTimeout(function(){ callback.call(elem, e); }, ms);
          });
        });
      };

      $(suggestField).delayKeyup(function(e){
          if($(this).attr('method-action')) {
            suggestAction = $(this).attr('method-action');
          }

          var saved   = $(this).attr('data-value');
          var wait    = $(this).hasClass('amsify-wait');
          var value   = $.trim($(this).val());
          var go      = false;

          if(saved === undefined || saved != value) {
              if(value != '') {
                go = true;
              }
          }

          if(!wait && go) {
             $(this).addClass('amsify-wait');
             $(this).attr('data-value', $(this).val());
             AmsifyAjax.callAjaxForSuggestions(this, suggestAction, config);
          }
      }, 500);

      $(document).on('keydown', suggestField, function(e) {
          var $suggestionsContainer = $(this).next(suggestionsContainer); 
          if($suggestionsContainer.length) {
            if(e.keyCode == 40 || e.keyCode == 38) {
              if(e.keyCode == 40) {    
                setFocusElement(this);
              }
              if(e.keyCode == 38) {
                setFocusElement(this, 'up');
              }
            }
          }
      });

      $(document).on('click', suggestionsContainer+' li', function(e){
          e.stopImmediatePropagation();
          $(suggestField).attr('data-value', $(this).find('a').attr('data-value'));
          $(suggestField).val($(this).find('a').attr('data-value'));
          $(suggestionsContainer).hide();
      });

      $(document).on({
          mouseenter: function () {
              $(suggestionsContainer+' li').removeClass('active');
              $(this).addClass('active');
          },
          mouseleave: function () {
              //stuff to do on mouse leave
          }
      }, suggestionsContainer+' li');
    };

    /**
     * set focus element for suggestions
     * @param {selector} field
     * @param {string}   direction
     */
    function setFocusElement(field, direction) {
        var suggestions = $(field).next(suggestionsContainer).find('li');
        var setActive   = false;

        if(direction !== undefined) {
          if(direction == 'up') {
            suggestions = suggestions.get().reverse();
          }
        }

        $(suggestions).each(function(index, suggestion){
          if(setActive) {
           $(suggestion).addClass('active'); 
            return false;
          }
          if($(suggestion).hasClass('active')) {
            if(index ==  suggestions.length - 1) {
              return false;   
            } else {
              $(suggestion).removeClass('active');
              setActive = true;
            }
          }
        });
    };

    /**
     * call ajax for suggestions
     * @param  {selector} field
     * @param  {string}   targetMethod
     * @param  {object}   config
     */
    AmsifyAjax.callAjaxForSuggestions = function(field, targetMethod, config) {

      var ajaxConfig  = {};
      var params      = { term : $(field).val(), _token : AmsifyHelper.getToken()};
      ajaxConfig['afterSuccess'] = function(data) {
        var htmlType = '';
        if(data['html'] === true) { htmlType = 'html'; }
        displaySuggestions(data['suggestions'], suggestionsContainer, field, htmlType);
      };
      ajaxConfig['complete'] = function() {
        $(field).removeClass('amsify-wait');
        AmsifyHelper.callback(config, 'afterSuggestions');
      };

      AmsifyHelper.callAjax(targetMethod, params, ajaxConfig);

    };

    /**
     * display suggestions
     * @param  {array}    list
     * @param  {selector} suggestionsContainer
     * @param  {selector} field
     */
    function displaySuggestions(list, suggestionsContainer, field, htmlType) {
      var listHTML = createListHTML(list, htmlType);
      if($(field).next(suggestionsContainer).length) {
        $(field).next(suggestionsContainer).html(listHTML).show();
      } else {
        if(AmsifyHelper.detectIE()) {
          $(field).parent().append('<ul tabindex="1" style="width:'+$(field).css('width')+';" class="'+suggestionsContainer.substring(1)+'"></ul>');
          $(suggestionsContainer).html(listHTML);
        } else {
          $(field).after('<ul tabindex="1" style="width:'+$(field).css('width')+';" class="'+suggestionsContainer.substring(1)+'">'+listHTML+'</ul>');
        }
      }

      var findActive  = false;
      $($(suggestionsContainer).find('li')).each(function(index, suggestion){
        if($(suggestion).hasClass('active')) {
          findActive = true;
        }
      });

      if(!findActive) {
        $(suggestionsContainer).find('li:first').addClass('active').focus();
      }
    };

    /**
     * create suggestions list html 
     * @param  {array}  list
     * @param  {string} type
     * @return {string}
     */
    function createListHTML(list, type) {
      if(type !== undefined) {
        if(type == 'html') {
          return html;
        }
      }
      var html = '';
      if(list.length > 0) {
        $.each(list, function(index, item){
            html += '<li><a href="#" data-value="'+item+'">'+item+'</li>';
        });
      }
      return html;
    };


/**
 * 
 ************ Configuration section ************
 *
 **/

    /**
     * set the global config based on options passed
     * @param {object} config
     */
    function setConfig(config) {
      if(config !== undefined) {
        if(config.type !== undefined) {
          defaultType = config.type;
        }

        if(config.toggleSelector !== undefined) {
          defaultToggleSelector = config.toggleSelector;
        }
        if(config.toggleClass !== undefined) {
          defaultToggleClass = config.toggleClass;
        }
        if(config.toggleHTML !== undefined) {
          defaultToggleHTML = config.toggleHTML;
        }


        if(config.changeField !== undefined) {
          defaultChangeField = config.changeField;
        }


        if(config.loadForm !== undefined) {
          defaultLoadForm = config.loadForm;
        }
        if(config.loadSubmit !== undefined) {
          defaultLoadSubmit = config.loadSubmit;
        }
        if(config.loadContainer !== undefined) {
          defaultLoadContainer = config.loadContainer;
        }
        if(config.loadMore !== undefined) {
          defaultLoadMore = config.loadMore;
        }
        if(config.loaderPath !== undefined) {
          defaultLoaderPath = config.loaderPath;
        }
        if(config.ajaxSortClass !== undefined) {
          defaultLoadSortClass = config.ajaxSortClass;
        }


        if(config.itemClass !== undefined) {
          defaultItemClass = config.itemClass;
        }
        if(config.itemAddClass !== undefined) {
          defaultItemAddClass = config.itemAddClass;
        }
        if(config.itemRemoveClass !== undefined) {
          defaultItemRemoveClass = config.itemRemoveClass;
        }
      }
    };

}(window.AmsifyAjax = window.AmsifyAjax || {}, jQuery));
