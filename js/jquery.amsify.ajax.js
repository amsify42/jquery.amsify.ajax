 // Amsify42 Ajax 1.0.0
 // http://www.amsify42.com
 (function(AmsifyAjax, $, undefined) {

    //Private Property
    var defaultType               = '';
    var defaultToggleSelector     = '.amsify-ajax-toggle'
    var defaultToggleClass        = ['btn-success', 'btn-danger'];
    var defaultToggleHTML         = ['<span class="fa fa-check"></span>', '<span class="fa fa-times"></span>'];

    var defaultChangeField        = '.amsify-ajax-change';
    var defaultChangeResultField  = '.amsify-ajax-change-result';

    var defaultLoadForm           = '.amsify-ajax-load-form';
    var defaultLoadSubmit         = '.amsify-ajax-load-submit';
    var defaultLoadContainer      = '.amsify-ajax-load-container';
    var defaultLoadMore           = '.amsify-ajax-load-more';
    var defaultLoaderPath         = 'images/loader.gif';


    var defaultSuggestField       = '.amsify-ajax-suggestion';
    var defaultSuggestAction      = 'search.php';
    var suggestionsContainer      = '.amsify-ajax-suggestions-container';


    var defaultItemClass          = '.amsify-ajax-item';
    var defaultItemAddClass       = '.amsify-ajax-item-add';
    var defaultItemRemoveClass    = '.amsify-ajax-item-remove';
   

    //Public Methods
    AmsifyAjax.init = function(config) {
      setConfig(config); 
      var defaultAjax = new AmsifyAjax.Ajax;
          defaultAjax.set();
    };


    AmsifyAjax.set = function(config) {
        var newAjax = new AmsifyAjax.Ajax();
            newAjax.set(config);
    };



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


    AmsifyAjax.setOnChange  = function(config) {

      var changeField       = defaultChangeField;
      var changeResultField = defaultChangeResultField;

      if(config !== undefined) {
        if(config.changeField !== undefined) {
          changeField = config.changeField;
        }
        if(config.changeResultField !== undefined) {
          changeResultField = config.changeResultField;
        }
      }

      $(document).on('change', changeField, function(){
          AmsifyHelper.callback(config, 'beforeChange', this, 'after-change');
          if($.trim($(this).val()) != '') {
            AmsifyAjax.callAjaxForChange(this, changeResultField, config);
          }
      });

    };



    AmsifyAjax.callAjaxForChange = function(field, loadContainer, config) {

      var ajaxFormParams = {
          type        : "GET",
          url         : AmsifyHelper.getActionURL($(field).attr('data-action'))+'/'+$(field).val()
      };

      ajaxFormParams['beforeSend'] = function() {
          $(loadContainer).after('<img class="on-change-loader" src="'+AmsifyHelper.getActionURL(loaderPath)+'"/>')
      };

      ajaxFormParams['success'] = function(data) {
          $(loadContainer).html(data['html']);
          if(data['status'] !== undefined) {
            if(data['status'] == 'error') {
              AmsifyHelper.showFlash(data['message'], 'error');
            } 
          }
      };

      ajaxFormParams['error'] = function (data) {
          console.info('Error', data);
          AmsifyHelper.showFlash('Something went wrong', 'error');
      };

      ajaxFormParams['complete'] = function() {
          AmsifyHelper.callback(config, 'afterChange', field, 'after-change');
      };

      $.ajax(ajaxFormParams);
    };


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
            $html = $item.clone().insertAfter(itemClass+':last');
            $html.find(itemAddClass)
                 .removeClass(itemAddClass.substring(1))
                 .addClass(itemRemoveClass.substring(1))
                 .html(iconButton(type));
            $html.find('input').val('');     
          }
          AmsifyHelper.callback(config, 'afterAdd', this, 'after-add');
      });

      $(document).on('click', itemRemoveClass, function(){
          $item = $(this).closest(itemClass);
          if($item.length) {
            $item.remove();
          }
          AmsifyHelper.callback(config, 'afterDelete', this, 'after-delete');
      });


    };

    function iconButton(type) {
      if(type == 'bootstrap') {
        return '<span class="fa fa-times"></span>';
      } 
      else {
        return '<b>X</b>';
      }
    };



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
            var value = $(suggestion).find('a').text();
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
            clearTimeout (timer);
            timer = setTimeout( function() { callback.call(elem, e); }, ms);
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
          $(suggestField).attr('data-value', $(this).find('a').text());
          $(suggestField).val($(this).find('a').text());
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



    AmsifyAjax.callAjaxForSuggestions = function(field, targetMethod, config) {
      $.ajax({
          type        : "POST",
          url         : AmsifyHelper.getActionURL(targetMethod),
          data        : { term : $(field).val(), _token : AmsifyHelper.getToken()},
          beforeSend  : function() {
          },
          success     : function(data) {
            displaySuggestions(data['suggestions'], suggestionsContainer, field);
            if(data['status'] !== undefined) {
              if(data['status'] == 'error') {
                AmsifyHelper.showFlash(data['message'], 'error');
              } 
            }
          },
          error       : function (data) {
            console.info('Error', data);
            AmsifyHelper.showFlash('Something went wrong', 'error');
          },
          complete    : function() {
            $(field).removeClass('amsify-wait');
            AmsifyHelper.callback(config, 'afterSuggestions');
          }
      });
    };



    function displaySuggestions(list, suggestionsContainer, field) {

      var listHTML = createListHTML(list);
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


    function createListHTML(list, type) {

      if(type !== undefined) {
        if(type == 'html') {
          return html;
        }
      }

      var html = '';
      if(list.length > 0) {
        $.each(list, function(index, item){
            html += '<li><a href="#">'+item+'</li>';
        });
      }
      return html;
    }



    AmsifyAjax.setLoadData  = function(config) {

      var loadForm       = defaultLoadForm;
      var loadSubmit     = defaultLoadSubmit;
      var loadContainer  = defaultLoadContainer;
      var loadMore       = defaultLoadMore;
      var loaderPath     = defaultLoaderPath;


      if(config !== undefined) {
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
      }


      $(loadForm).each(function(index, form){

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
             $(document).on('focusout', AmsifyHelper.fieldByName(name), function(){
                AmsifyAjax.callAjax(form, loadContainer, loadMore, loaderPath, 'load', config);
             });
          });
        } 
        // If submit button exist
        else {
          $(document).on('click', submit, function(){
              AmsifyAjax.callAjax(form, loadContainer, loadMore, loaderPath, 'load', config);
          });
        }

        // Set Load More Click Function
        $(document).on('click', loadMore, function(){
            $(this).addClass('loading-state');
            AmsifyAjax.callAjax(form, loadContainer, this, loaderPath, 'append', config);
        });


        // Setting Ajax on scroll
        AmsifyAjax.setOnScrollAjax(loadContainer, loadMore);

      });

    };


    AmsifyAjax.setOnScrollAjax = function(loadContainer, loadMore) {
      $(loadContainer).on('scroll mousewheel DOMMouseScroll', function(e){
          if($(loadMore).length && !$(loadMore).hasClass('loading-state')) {
            if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
              console.info('down');
              $(loadMore).click();
            }
          }
      });
    };


    AmsifyAjax.callAjax = function(form, loadContainer, loadMore, loaderPath, type, config) {

      var ajaxFormParams = {
          type        : "POST",
          url         : AmsifyHelper.getActionURL($(form).attr('data-action')),
          data        : AmsifyHelper.getFormData($(form)),
          processData : false,
          cache       : false,
      };

      if(!AmsifyHelper.detectIE()) { ajaxFormParams['contentType'] = false; }  

      ajaxFormParams['beforeSend'] = function() {
          if(type == 'append') {
            $(loadMore).append('<img src="'+AmsifyHelper.getActionURL(loaderPath)+'"/>')
          } else {
            $('.section-body-loader').show();
          }
      };

      ajaxFormParams['success'] = function (data) {
          if(type == 'append') {
            $(loadMore).remove();
            $(loadContainer).append(data['html']);
          } else {
            $(loadContainer).html(data['html']);
          }
          if(data['status'] !== undefined) {
            if(data['status'] == 'error') {
              AmsifyHelper.showFlash(data['message'], 'error');
            } 
          }
      };

      ajaxFormParams['error'] = function (data) {
          console.info('Error', data);
          AmsifyHelper.showFlash('Something went wrong', 'error');
      };

      ajaxFormParams['complete'] = function() {
          AmsifyHelper.callback(config, 'afterLoad');
          $('.section-body-loader').hide();
      }

      $.ajax(ajaxFormParams);
    };


    AmsifyAjax.setToggle = function(config) {

        var toggleSelector    = defaultToggleSelector;
        var toggleClass       = defaultToggleClass;
        var toggleHTML        = defaultToggleHTML;

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

      $(document).on('click', toggleSelector, function(){
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

        //ajax
        $.ajax({
            type    : "POST",
            url     : AmsifyHelper.getActionURL(targetMethod),
            data    : { id : ID , val : toggleValue, _token : AmsifyHelper.getToken},
            success : function (data) {
              console.info('Success', data);
              if(data['status'] !== undefined) {
                if(data['status'] == 'error') {
                  AmsifyHelper.showFlash(data['message'], 'error');
                }
              }
            },
            error       : function (data) {
              console.info('Error', data);
              AmsifyHelper.showFlash('Something went wrong', 'error');
            },
            complete    : function() {
              AmsifyHelper.callback(config, 'afterToggle', $this, 'after-toggle');
            }
        });
      });
    };





  // Setting Configuations
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
      if(config.changeResultField !== undefined) {
        defaultChangeResultField = config.changeResultField;
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
