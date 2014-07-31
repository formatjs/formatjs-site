var vanillaExample = {
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
        numBooks : 50
    },
    now: new Date(),
    init: function(){
        this.setup();
        this.bind();
    },
    setup: function(){
        var trans = APP.translations,
            switcher = document.querySelectorAll("#switcher select")[0];
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
    render: function(obj, shouldAnimate){
        var chosenLocale = document.querySelectorAll("#switcher select")[0].value,
            msg = new IntlMessageFormat(APP.translations[chosenLocale].USER_HAS_BOOKS_DENOTED,chosenLocale),
            msg2 = new IntlMessageFormat(APP.translations[chosenLocale].USER_WILL_SELL_DENOTED,chosenLocale, this.intlFormat),
            out = msg.format({
                firstName: obj.user.firstName,
                lastName: obj.user.lastName,
                numBooks: obj.user.numBooks
            }),
            out2 = msg2.format({
                firstName: obj.user.firstName,
                numBooks: obj.user.numBooks,
                price: obj.user.numBooks*25,
                dateBooks: obj.now
            }),

            numBooksInput = document.querySelector('#numBooksInput'),
            msgDiv = document.querySelector('.splash-example-message'),
            self = this,

            _show = function () {
                //remove existing event listener if the element exists (2nd render onwards)
                if (numBooksInput) {
                    numBooksInput.removeEventListener('change', self._handleInputEvent.bind(self));
                }

                //change the content.
                msgDiv.innerHTML = '<span>' + out + '<br>' + out2 + '</span>';
                //show the div.
                msgDiv.className += ' show';

                //set up new event listener
                self._bindInput();
            };

        if (msgDiv.children.length) {
            msgDiv.className = msgDiv.className.replace('show', '');
            if (shouldAnimate) {
                setTimeout(_show, 900);
            }
            else {
                _show();
            }

        }

        else {
            _show();
        }

    },
    bind: function(){
        var switcher = document.querySelectorAll("#switcher select")[0],
            about    = document.querySelector('#aboutBtn'),
            self = this;
        switcher.addEventListener("change", function(){
            self.render(self, true)
        });
        about.addEventListener("click", self._handleAboutClick);

        this._bindInput();

    },

    //This input box is destroyed and recreated whenever the content is updated.
    _bindInput: function () {
        var numBooksInput = document.querySelector('#numBooksInput'),
        self = this;

        numBooksInput.addEventListener("change", self._handleInputEvent.bind(self));
    },

    _handleInputEvent: function (e) {
        this.user.numBooks = parseInt(e.target.value, 10);
        this.render(this, false);
    },

    _handleAboutClick: function (e) {
        e.preventDefault();

        var isOpen = false,
            container = document.querySelector('.splash-about'),
            source,
            template,
            html;

        //If is-open class name does not exist...
        if (e.target.className.indexOf('is-open') === -1) {
            //It was closed, and now it is open.
            e.target.className = e.target.className + ' is-open';
            isOpen = true;
            e.target.innerHTML = 'Close';
            source    = document.querySelector('#about-template').innerHTML,
            template  = Handlebars.compile(source),
            html      = template({
                code: APP.intl.messages.USER_HAS_BOOKS + '\n' + APP.intl.messages.USER_WILL_SELL
            });
            container.innerHTML = html;
            return;
        }

        //if is-open clasname does exist...
        else {
            //It was already open, so close it.
            e.target.className = e.target.className.replace('is-open', '');
            e.target.innerHTML = 'About';
            container.innerHTML = '';
            return;
        }
    }
};


