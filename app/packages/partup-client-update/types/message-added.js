var md = require('markdown-it')({ breaks: true, html: false});
var emoji = require('markdown-it-emoji');
md.use(emoji);

  Template.update_partups_message_added.helpers({
    messageContent: function () {
        var self = this;
        var rawNewValue = self.type_data.new_value;
        return Partup.helpers.mentions.decode(md.render(rawNewValue));
    },

    hasNoComments: function() {
        if (this.comments) {
            return this.comments.length <= 0;
        } else {
            return true;
        }
    },
    editMessagePopupId: function() {
        return 'edit-message-' + this._id;
    }
  });
