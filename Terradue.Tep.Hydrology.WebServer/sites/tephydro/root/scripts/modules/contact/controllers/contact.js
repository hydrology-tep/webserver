
define([
    'jquery',
    'can',
    'utils/baseControl',
    'config',
    'utils/helpers',
    'modules/contact/models/contact',
    'moment',
    'messenger'
], function($, can, BaseControl, Config, Helpers, ContactModel){
    
    var ContactControl = BaseControl({
        defaults: { fade: 'slow' },
    }, {
        
        index: function(){
            this.data = new can.Observe({ success: false });
            this.element.html(can.view("modules/contact/views/contact.html", this.data));
        },

        '.submitForm click': function(el){
            var inputs = Helpers.retrieveDataFromForm(el.closest('form'));
            var self = this;

            ContactModel.sendSupportEmail(inputs['name'], inputs['email'], inputs['organisation'],inputs['comment'], inputs['g-recaptcha-response']).then(function(){
                self.data.attr('success',true);
            }).fail(function(xhr){
                Messenger().post({
                    message: 'Your request was not sent. Please retry later.', 
                    type: 'error',
                    showCloseButton: true,
                    hideAfter: 6,
                });
            });
            return false;
        }
        
    });
    
    return new ContactControl(Config.mainContainer, {});
    
});
