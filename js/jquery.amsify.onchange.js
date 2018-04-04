(function($) {

    $.fn.amsifyOnChange = function(options) {

        // merging default settings with custom
        var settings = $.extend({
            targetField   : '',
            extraParams   : {},
            loaderPath    : '',
            action        : '',
            beforeChange  : {},
            afterChange   : {},
        }, options);

        /**
         * Initialization begins from here
         * @type {Object}
         */
        var AmsifyOnChange = function() {
            this.loaderPath     = 'images/loader-small.gif';
            this.loaderClass    = '.on-change-loader';
            this.callbackBefore = {
                name : 'beforeChange',
                attr : 'before-change'
            };
            this.callbackAfter  = {
                name : 'afterChange',
                attr : 'after-change'
            };
        };


        AmsifyOnChange.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} form
             * @param  {object} settings
             */
            _init               : function(selector, settings) {
                this.setOnChange(selector);
            },

            setOnChange         : function(selector) {
              var _self = this;
              $(selector).on('change', function(){
                AmsifyHelper.callback(settings, _self.callbackBefore.name, this, _self.callbackBefore.attr);
                if($.trim($(this).val()) != '') {
                  _self.callAjaxForChange(this);
                }
              });
            },

            callAjaxForChange   : function(selector) {
              var _self       = this;
              var params      = { value : $(selector).val()};
              var ajaxConfig  = {};
              var loaderPath  = this.loaderPath;
              var params      = $.extend({}, params, settings.extraParams);
              if(settings.loaderPath) {
                loaderPath    = settings.loaderPath;
              }

              ajaxConfig['beforeSend'] = function(){
                  if($(settings.targetField).prev(_self.loaderClass).length) {
                    $(_self.loaderClass).show();
                  } else {
                    $(settings.targetField).before('<img class="'+_self.loaderClass.substring(1)+'" src="'+AmsifyHelper.getActionURL(loaderPath)+'"/>')
                  }
              };

              ajaxConfig['afterSuccess'] = function(data){
                  $(settings.targetField).html(data['html']);
              };

              ajaxConfig['complete'] = function(){
                  $(_self.loaderClass).hide();
                  AmsifyHelper.callback(settings, _self.callbackAfter.name, field, _self.callbackAfter.attr);
              };

              AmsifyHelper.callAjax(settings.action, params, ajaxConfig);
            }
           
        };
        
        /**
         * Initializing each instance of selector
         * @return {object}
         */
        return this.each(function() {
            (new AmsifyOnChange)._init(this, settings);
        });

    };

}(jQuery));