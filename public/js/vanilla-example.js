var VanillaExample = {
    intlFormat:{
        number: {
            USD: {
                style   : 'currency',
                currency: 'USD'
            },
            EUR: {
                style   : 'currency',
                currency: 'EUR'
            }
        }
    },
    user: {
        firstName: 'Tilo',
        lastName : 'Mitra',
        numBooks : 2000
    },
    now: new Date(),
    init: function(){
        this.setup();
        this.bind();
    },
    setup: function(){
        var trans = APP.translations,
            switcher = document.querySelectorAll(".switcher select")[0];
            //console.log(switcher);
        for(var key in trans){
            if(trans.hasOwnProperty(key)){
                //console.log(key + " -> " + trans[key]);
                var opt = document.createElement("option");
                opt.setAttribute("value", key);
                opt.textContent = key;
                switcher.appendChild(opt);
            }
        }
        this.render(this);
    },
    render: function(obj){
        var chosenLocale = document.querySelectorAll(".switcher select")[0].value,
            msg = new IntlMessageFormat(APP.translations[chosenLocale].USER_HAS_BOOKS,chosenLocale),
            msg2 = new IntlMessageFormat(APP.translations[chosenLocale].USER_WILL_SELL,chosenLocale, this.intlFormat),
            out = msg.format({
                firstName: obj.user.firstName,
                lastName: obj.user.lastName,
                numBooks: obj.user.numBooks
            }),
            out2 = msg2.format({
                firstName: obj.user.firstName,
                numBooks: 10,
                price: 1000,
                dateBooks: this.now
            });

        document.getElementsByClassName("message")[0].innerText = out + out2;

    },
    bind: function(){
        var switcher = document.querySelectorAll(".switcher select")[0],
        self = this;
        switcher.addEventListener("change", function(){self.render(self)});
    }

}


