Meteor.startup(function() {
    $.support.placeholder = false;
    var test = document.createElement('input');
    if ('placeholder' in test) {
        $.support.placeholder = true;
    } else {
        $(function() {
            var active = document.activeElement;
            $('form').delegate(':text', 'focus', function () {
                var _placeholder = $(this).attr('placeholder'),
                    _val = $(this).val();
                if (_placeholder != '' && _val == _placeholder) {
                    $(this).val('').removeClass('hasPlaceholder');
                }
            }).delegate(':text', 'blur', function () {
                var _placeholder = $(this).attr('placeholder'),
                    _val = $(this).val();
                // No need to test for values specific to a particular jQuery version
                // undefined and an empty string both are falsy
                if (!_placeholder && ( _val == '' || _val == _placeholder)) {
                    $(this).val(_placeholder).addClass('hasPlaceholder');
                }
            }).submit(function () {
                $(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
            });
            $(':text').blur();
            $(active).focus();
        });
    }
});
