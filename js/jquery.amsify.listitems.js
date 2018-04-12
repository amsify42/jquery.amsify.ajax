/**
 * Amsify Jquery List Items 2.0
 * http://www.amsify42.com
 */
(function($) {

    $.fn.amsifyListItems = function(options) {
        /**
         * Merging default settings with custom
         * @type {object}
         */
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
         * Initialization begins from here
         * @type {Object}
         */
        var AmsifyListItems = function() {
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
             */
            _init : function(list) {
              this.list       = list;
              this.formInputs = $(list).children().last().find(':input');
              AmsifyHelper.fixedCloneMethod();
              this.setEvents();
              this.prependLoader();
              this.setSort();
            },

            setEvents : function() {
              var _self = this;
              $(this.list).find(this.addItemClass).not(':last').hide();
              $(this.list).find(this.removeItemClass+':last').hide();
              $(this.list).find(this.addItemClass+':last').click(function(){
                  _self.addItem();
              });
              $(this.formInputs).on('keyup', function(e){
                var keyCode = (e.keyCode ? e.keyCode : e.which);
                if(keyCode == 13) {
                  _self.addItem();
                }
              });
              $(this.list).children().each(function(){
                  if($(this).attr(settings.itemAttr)) {
                    _self.setEditEvent($(this));
                  }
              });
              this.setRemoveEvent();
            },

            addItem : function() {
              var _self   = this;
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
                  _self.setSort();
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
              var _self = this;
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
              var _self = this;
              $(this.list).find(this.removeItemClass).click(function(e){
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
                var tag = $(this.list).children().first().prop('tagName');
                    tag = (tag)? tag : 'DIV';
                this.bodyLoader = $('<'+tag+' class="section-body-loader fill-background"></'+tag+'>').prependTo(this.list);
            },

            setSort : function() {
              if(settings.action.sort) {
                $(this.list).children().removeClass('unsort');
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
            (new AmsifyListItems)._init(this);
        });

    };

}(jQuery));