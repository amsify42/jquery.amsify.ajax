(function($) {

    $.fn.amsifyList = function(options) {

        // merging default settings with custom
        var settings = $.extend({
            type          : 'bootstrap',
            
        }, options);

        /**
         * initialization begins from here
         * @type {Object}
         */
        var AmsifyList = function() {
            
        };


        AmsifyList.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} form
             * @param  {object} settings
             */
            _init  : function(list, settings) {
                this.setItemsList(list);
            },

            setItemsList : function(list) {
              $(listClassSel).each(function(index, listClass){ 
              $(listClass).find(listItemField).keyup(function(e){
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

                $(document).on('click', listItemRemove, function(e){
                    e.stopImmediatePropagation();
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
                  var values      = getValuesFromFields(fields, true);
                  AmsifyHelper.setDraggableSort(selector, ajaxMethod, 'item-id', values);
                };
              });  
            },
            
            itemHTMLValue : function(HTML, values, listItemClass) {
              var renderedHTML  =  HTML;
              $.each(values, function(index, value){
                var regex     = new RegExp('{'+index+'}', 'gi');
                renderedHTML  = renderedHTML.replace(regex, value);
              });
              return renderedHTML;
            },

            getValuesFromFields : function(fields, skipValidate) {
              var values  = {};
              var sendVal = true;
              $(fields).each(function(index, field){
                  if($(field).attr('name') && $(field).val() != '') {
                    values[$(field).attr('name')] = $(field).val();
                  } else {
                    if(skipValidate === undefined) {
                      sendVal = false;
                    }
                  }
              });
              if(sendVal) return values; else return false;
            },
           
        };
        
        /**
         * Initializing each instance of selector
         * @return {object}
         */
        return this.each(function() {
            (new AmsifyList)._init(this, settings);
        });

    };

}(jQuery));