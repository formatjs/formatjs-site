'use strict';

var travelExample = {
    user: {
        firstName  : 'Tilo',
        lastName   : 'Mitra',
        travelDate : new Date(),
        price      : 465.00
    },

    setup: function () {
        var trans = APP.translations,
            switcher = document.querySelectorAll('#switcher select')[0];

        //add the necessary translations to the switcher
        for(var key in trans){
            if(trans.hasOwnProperty(key)){
                var opt = document.createElement('option');
                opt.setAttribute('value', key);
                opt.textContent = key;
                switcher.appendChild(opt);
            }
        }

         HandlebarsHelperIntl.registerWith(Handlebars);
    },

    bind: function(){
        var switcher = document.querySelectorAll('#switcher select')[0],
        self = this;
        switcher.addEventListener('change', function(){self.render(self)});
    },

    render: function() {
        var source   = APP.examples.hbs.travel,
            template = Handlebars.compile(source),
            locale   = document.querySelectorAll('#switcher select')[0].value,
            html     = template({user: this.user}, {
                data: {
                    intl:{
                        formats: APP.intl.formats,
                        locale: locale,
                        messages: APP.translations[locale]
                    }
                }
            });

        document.getElementById('travel-example').innerHTML = html;
    },

    init: function(){
        this.setup();
        this.bind();
        this.render();
    }
}
