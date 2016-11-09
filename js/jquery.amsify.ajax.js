 // Amsify42 Ajax 1.0.0
 // http://www.amsify42.com
 (function(AmsifyAjax, $, undefined) {

    //Private Property
    var initialize            = false;
    var base_url              = window.location.protocol+'//'+window.location.host;
    var _token                = $('meta[name="_token"]').attr('content');

    var defaultToggleSelector = '.amsify-ajax-toggle'
    var defaultToggleClass    = ['', ''];
    var defaultToggleHTML     = ['', ''];
    

    //Public Property
    AmsifyAjax.base_url       = base_url;

    AmsifyAjax.Ajax = function() {
        AmsifyAjax.Ajax.prototype.set = function(config) {
              if(config !== undefined) {
                console.info(config);
              } else {
                  AmsifyAjax.setToggle();
              }
        };
    };
   

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
        var ID                = $(this).data('id');
        var toggleValue       = $(this).data('val');
        var targetMethod      = $(this).data('method');

        if($(this).data('class') !== undefined) {
          toggleClass   = $(this).data('class').split(':');
        }

        if($(this).data('html') !== undefined) {
          toggleHTML    = $(this).data('html').split(':');
        }

        console.info(toggleValue, toggleClass);
        if(toggleValue == 0) {
           $(this).removeClass(toggleClass[1]).addClass(toggleClass[0]).data('val', 1).empty().html(toggleHTML[0]);  
        } else {
           $(this).removeClass(toggleClass[0]).addClass(toggleClass[1]).data('val', 0).empty().html(toggleHTML[1]);              
        }

        //ajax
        $.ajax({
            type    : "POST",
            url     : AmsifyAjax.base_url+'/'+targetMethod,
            data    : { id : ID , val : toggleValue, _token : _token},
            success : function (data) {
              console.info('Success', data);
            },
            error   : function (data) {
              console.info('Error', data);
            } 
          });
        });

    };





  // Setting Configuations
  function setConfig(config) {
    if(config !== undefined) {
        if(config.toggleSelector !== undefined) {
          defaultToggleSelector = config.toggleSelector;
        }
        if(config.toggleClass !== undefined) {
          defaultToggleClass = config.toggleClass;
        }
        if(config.toggleHTML !== undefined) {
          defaultToggleHTML = config.toggleHTML;
        }
      }
  };


}(window.AmsifyAjax = window.AmsifyAjax || {}, jQuery));   
