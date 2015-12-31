/*************************************************************/
/* modal on rendered */
/*************************************************************/
Template.modal.onRendered(function() {
    var $body = $('body');
    $body.removeClass('pu-state-currentlayout-app');
    $body.addClass('pu-state-currentlayout-modal');
});

/*************************************************************/
/* modal helpers */
/*************************************************************/
Template.modal.helpers({
    focusLayerEnabled: function() {
        return Partup.client.focuslayer.state.get();
    },
    scrollToAndFocusErrorField() {
      Meteor.setTimeout(function () {
        try {
          var $invalid = $('.pu-state-invalid:first');
          var $label = $invalid.parent().find('.pu-label');
          var $progresspager = $('.pu-progresspager');
          var offsetTop = ($progresspager) ? -($progresspager.outerHeight() + 30) : 0;
          $(window).scrollTo($label, 100, {
            offset: { top: offsetTop }
          });
          $input = $invalid.find('input:visible, textarea:visible').first();
          $input.get(0).focus();
        } catch(e) {}
      }, 0);
    }
});

/*************************************************************/
/* modal events */
/*************************************************************/
Template.modal.events({
    'click [data-focuslayer]': function() {
        Partup.client.focuslayer.disable();
    }
});
