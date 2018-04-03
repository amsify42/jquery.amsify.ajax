(function($) {

    $.fn.amsifyListItems = function(options) {

        // merging default settings with custom
        var settings = $.extend({
            type        : 'bootstrap',
            action      : {
              add       : '',
              edit      : '',
              delete    : '',
              sort      : '',
            },
            itemAttr    : 'item-id',
            flash       : true,
        }, options);

        /**
         * Global variable for this object context
         */
        var _self;
        /**
         * Initialization begins from here
         * @type {Object}
         */
        var AmsifyListItems = function() {
            /**
             * Assigning this context to _self
             * @type {object}
             */
            _self                 = this;
            this.list             = null;
            this.formInputs       = null;
            this.bodyLoader       = null;
            this.addItemClass     = '.add-item';
            this.removeItemClass  = '.remove-item';
        };

        AmsifyListItems.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} list
             * @param  {object} settings
             */
            _init : function(list, settings) {
              this.list       = list;
              this.formInputs = $(list).find(':input');
              AmsifyHelper.fixedCloneMethod();
              this.setEvents();
              this.prependLoader();
              this.setSort();
            },

            setEvents : function() {
              $(this.list).find(this.removeItemClass+':last').hide();
              $(this.addItemClass).click(function(){
                  _self.addItem();
              });
              $(this.formInputs).on('keyup', function(e){
                var keyCode = (e.keyCode ? e.keyCode : e.which);
                if(keyCode == 13) {
                  _self.addItem();
                }
              });
            },

            addItem : function() {
              $lastItem   = $(this.list).children().last();
              $newItem    = $lastItem.clone().insertBefore($lastItem);
              $newItem.hide();
              $newItem.find(this.removeItemClass).show();
              $newItem.find(this.addItemClass).hide();
              var params      = this.getInputs();
              var ajaxConfig  = {
                beforeSend : function() {
                  $(_self.bodyLoader).show();
                },
                afterSuccess : function(data) {
                  $newItem.attr(settings.itemAttr, data.id);
                  $(_self.formInputs).first().focus();
                  _self.setRemoveEvent();
                  _self.setEditEvent($('['+settings.itemAttr+'="'+data.id+'"]'));
                },
                afterError : function() {
                  $newItem.remove();
                },
                complete : function() {
                  $(_self.bodyLoader).hide();
                  $newItem.slideDown();
                }
              };
              AmsifyHelper.callAjax(settings.action.add, params, ajaxConfig, 'POST', settings.flash);
            },

            setEditEvent : function($listItem) {
              $listItem.find(':input').on('keyup', function(e){
                var keyCode = (e.keyCode ? e.keyCode : e.which);
                if(keyCode == 13) {
                  var params      = _self.getInputs($(this).closest('['+settings.itemAttr+']').find(':input'));
                  params.id       = $listItem.attr(settings.itemAttr);
                  var ajaxConfig  = {
                    beforeSend : function() {
                      $(_self.bodyLoader).show();
                    },
                    complete : function() {
                      $(_self.bodyLoader).hide();
                    }
                  };
                  AmsifyHelper.callAjax(settings.action.edit, params, ajaxConfig, 'POST', settings.flash);
                }
              });
            },

            setRemoveEvent : function() {
              $(this.removeItemClass).click(function(e){
                  e.stopImmediatePropagation();
                  if(confirm('Are you sure, you want to remove?')) {
                    $listItem       = $(this).closest('['+settings.itemAttr+']');
                    var params      = { id: $(this).closest('['+settings.itemAttr+']').attr(settings.itemAttr) };
                    var ajaxConfig  = {
                      beforeSend : function() {
                        $(_self.bodyLoader).show();
                      },
                      afterSuccess : function(data) {
                        $listItem.slideUp();
                      },
                      complete : function() {
                        $(_self.bodyLoader).hide();
                      }
                    };
                    AmsifyHelper.callAjax(settings.action.delete, params, ajaxConfig, 'POST', settings.flash);
                  }
              });
            },

            getInputs : function(inputs) {
              var params  = {};
              $formInputs = (inputs)? $(inputs): $(this.formInputs);
              $formInputs.each(function(){
                  params  = $.extend({}, params, {
                    [$(this).attr('name')] : $(this).val()
                  });
                  if(!inputs) $(this).val('');
              });
              return params;
            },

            prependLoader : function() {
                $(this.list).css('position', 'relative');
                this.bodyLoader = $('<div class="section-body-loader fill-background"></div>').prependTo(this.list);
            },

            setSort : function() {
              if(settings.action.sort) {
                $(this.list).children().last().addClass('unsort');
                AmsifyHelper.setDraggableSort(this.list, settings.action.sort, settings.itemAttr, {}, {type: settings.type, flash: settings.flash});
              }
            },
           
        };
        
        /**
         * Initializing each instance of selector
         * @return {object}
         */
        return this.each(function() {
            (new AmsifyListItems)._init(this, settings);
        });

    };

}(jQuery));