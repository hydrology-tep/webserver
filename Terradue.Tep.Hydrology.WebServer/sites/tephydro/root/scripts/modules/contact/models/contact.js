
define(['can', 'config'], function(can, Config){
    
    return can.Model({
        
        sendSupportEmail: function(name, email, organisation, comment, captchaValue){
            return $.post('/'+Config.api+'/support/email', {
                name: name,
                email: email,
                organisation: organisation,
                comment: comment,
                captchaValue: captchaValue
            }, 'json');
        },

    }, {});
    
});

