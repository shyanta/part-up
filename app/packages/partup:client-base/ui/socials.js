Partup.ui.socials = {

    /**
     * Generate a link to share a URL on Facebook
     *
     * @memberOf partup.ui
     * @param {String} URL to be shared
     */
    generateFacebookShareUrl: function (urlToShare) {
        var appId = Meteor.settings.public.facebookAppId;
        var domain = Meteor.absoluteUrl();

        return 'https://www.facebook.com/v2.0/dialog/share?app_id=' + appId + '&display=popup&href=' + urlToShare + '&redirect_uri=' + domain + '/close';
    },

    /**
     * Generate a link to share a URL on Twitter
     *
     * @memberOf partup.ui
     * @param {String} Message to be shared
     */
    generateTwitterShareUrl: function (messageToShare, urlToShare) {
        return 'http://twitter.com/share?text=' + messageToShare + ' ' + urlToShare + '&url=' + urlToShare;
    },

    /**
     * Generate a link to share a URL on LinkedIn
     *
     * @memberOf partup.ui
     * @param {String} URL to be shared
     */
    generateLinkedInShareUrl: function (urlToShare) {
        return 'https://www.linkedin.com/shareArticle?mini=true&url=' + urlToShare;
    }

};

