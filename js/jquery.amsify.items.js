(function($) {

    $.fn.amsifyItems = function(options) {

        // merging default settings with custom
        var settings = $.extend({
            type          : 'bootstrap',
            
        }, options);

        /**
         * initialization begins from here
         * @type {Object}
         */
        var AmsifyItems = function() {
            
        };


        AmsifyItems.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} form
             * @param  {object} settings
             */
            _init  : function(item, settings) {
                this.setDynamicItems(item);
            },

            setDynamicItems : function(item) {
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
            },

            iconButton : function() {
              if(type == 'bootstrap') {
                return '<span class="fa fa-times"></span>';
              } 
              else {
                return '<b>X</b>';
              }
            },
           
        };
        
        /**
         * Initializing each instance of selector
         * @return {object}
         */
        return this.each(function() {
            (new AmsifyItems)._init(this, settings);
        });

    };

}(jQuery));