/**
 * Amsify Jquery Toggle 2.0
 * http://www.amsify42.com
 */
(function($) {

    $.fn.amsifyToggle = function(options) {
        /**
         * Merging default settings with custom
         * @type {object}
         */
        var settings = $.extend({
            type          : 'bootstrap',
            toggleClass   : [],
            toggleHTML    : [],
            action        : 'toggle.php',
            flash         : false,
            afterToggle   : {},
        }, options);

        /**
         * Initialization begins from here
         * @type {Object}
         */
        var AmsifyToggle = function() {
            this.toggleClass = {
                bootstrap   : ['btn-success', 'btn-danger'],
                materialize : ['btn green', 'btn red'],
                amsify      : ['btn-green', 'btn-red'],
            };
            this.toggleHTML = {
                bootstrap   : ['<span class="fa fa-check"></span>', '<span class="fa fa-times"></span>'],
                materialize : ['<i class="material-icons">check</i>', '<i class="material-icons">close</i>'],
                amsify      : ['&#10004;', '&#10006;'],
            };
            this.callback   = {
                name : 'afterToggle',
                attr : 'after-toggle'
            };
        };

        AmsifyToggle.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} selector
             */
            _init : function(selector) {
                this.setDefault(selector);
                this.setToggleEvent(selector);
            },

            setDefault : function(selector) {
              var _self         = this;
              var toggleValue   = $(selector).attr('data-val');
              var toggleClass   = _self.getToggleClass(selector);
              var toggleHTML    = _self.getToggleHTML(selector);
              if(toggleValue == 0) {
                $(selector).removeClass(toggleClass[0]).addClass(toggleClass[1]).empty().html(toggleHTML[1]);
              } else {
                $(selector).removeClass(toggleClass[1]).addClass(toggleClass[0]).empty().html(toggleHTML[0]);
              }
            },

            setToggleEvent : function(selector) {
                var _self               = this;
                var callbackFunction    = function(){
                  var $this             = $(this);
                  var ID                = $(this).data('id');
                  var toggleValue       = $(this).attr('data-val');
                  var targetURL         = ($(this).data('ajax'))? $(this).data('ajax'): settings.action;
                  var toggleClass       = _self.getToggleClass(this);
                  var toggleHTML        = _self.getToggleHTML(this);

                  if(toggleValue == 0) {
                    toggleValue = 1;
                    $(this).removeClass(toggleClass[1]).addClass(toggleClass[0]).attr('data-val', 1).empty().html(toggleHTML[0]);  
                  } else {
                    toggleValue = 0;
                    $(this).removeClass(toggleClass[0]).addClass(toggleClass[1]).attr('data-val', 0).empty().html(toggleHTML[1]);              
                  }

                  var ajaxConfig          = {};
                  var params              = {id : ID , val : toggleValue};
                  ajaxConfig['complete']  = function() {
                      AmsifyHelper.callback(settings, _self.callback.name, $this, _self.callback.attr);
                  };
                  AmsifyHelper.callAjax(targetURL, params, ajaxConfig, 'POST', settings.flash);
                };
                $(selector).click(callbackFunction);
            },

            getToggleClass : function(selector) {
                if(settings.toggleClass.length > 1) {
                    return settings.toggleClass;
                } else if($(selector).data('class') !== undefined) {
                    return $(selector).data('class').split(':');
                } else {
                    return this.toggleClass[settings.type];
                }
            },

            getToggleHTML : function(selector) {
                if(settings.toggleHTML.length > 1) {
                    return settings.toggleHTML;
                } else if($(selector).data('html') !== undefined) {
                    return $(selector).data('html').split(':');
                } else {
                    return this.toggleHTML[settings.type];
                }
            },
            
        };
        
        /**
         * Initializing each instance of selector
         * @return {object}
         */
        return this.each(function() {
            (new AmsifyToggle)._init(this);
        });

    };

}(jQuery));