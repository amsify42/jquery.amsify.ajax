(function($) {

    $.fn.amsifyAjax = function(options) {

        // merging default settings with custom
        var settings = $.extend({
            type                : 'bootstrap'
        }, options);

        /**
         * initialization begins from here
         * @type {Object}
         */
        var AmsifyAjax = function () {
          
        };


        AmsifyAjax.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} form
             * @param  {object} settings
             */
            _init               : function(table, settings) {
                var _self     = this;
                this._table   = table;
                this.setTableColumns();
            },

           
        };
        
        /**
         * Initializing each instance of selector
         * @return {object}
         */
        return this.each(function() {
            (new AmsifyAjax)._init(this, settings);
        });

    };

}(jQuery));