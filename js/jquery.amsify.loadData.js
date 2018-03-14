(function($) {

    $.fn.AmsifyLoadData = function(options) {

        // merging default settings with custom
        var settings = $.extend({
            type          : 'bootstrap',
            
        }, options);

        /**
         * initialization begins from here
         * @type {Object}
         */
        var AmsifyLoadData = function() {
            
        };


        AmsifyLoadData.prototype = {
            /**
             * Executing all the required settings
             * @param  {selector} form
             * @param  {object} settings
             */
            _init               : function(form, settings) {
                this.setLoadData(form);
            },

            setLoadData         : function(form) {
              var _self = this;
              // Stop Form Submission
              $(form).submit(function(e){e.preventDefault();});

                var inputs  = $(this).find(':input');
                var fields  = [];
                var action  = $(this).attr('data-action');
                var submit  = '';

                $.each(inputs, function(key, input){
                    fields.push($(input).attr('name'));
                });
                
                // If submit button does not exist
                if(submit == '') {
                  // Make Fields unique
                  fields = AmsifyHelper.distinctArray(fields);
                  $.each(fields, function(index, name){
                     $(document).on('change', AmsifyHelper.fieldByName(name), function(){
                        _self.callAjax(form, loadContainer, loadMore, loaderPath, 'load', config);
                     });
                  });
                } 
                // If submit button exist
                else {
                  $(document).on('click', submit, function(){
                      AmsifyHelper.setDefaultSortIcon(ajaxSortClass, type);
                      _self.callAjax(form, loadContainer, loadMore, loaderPath, 'load', config);
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

                    _self.callAjax(form, loadContainer, this, loaderPath, 'append', config);
                });

                // Setting Ajax on scroll if load more is not paginated
                if(!$(loadMore).hasClass('amsify-ajax-paginate')) {
                  _self.setOnScrollAjax(loadContainer, loadMore);
                }
            },

            setOnScrollAjax     : function(loadContainer, loadMore) {
              $(loadContainer).on('scroll mousewheel DOMMouseScroll', function(e){
                  if($(loadMore).length && !$(loadMore).hasClass('loading-state')) {
                    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                      $(loadMore).click();
                    }
                  }
              });
            },


            callAjax      : function() {
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
            },
            
           
        };
        
        /**
         * Initializing each instance of selector
         * @return {object}
         */
        return this.each(function() {
            (new AmsifyLoadData)._init(this, settings);
        });

    };

}(jQuery));