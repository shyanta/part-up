Partup.client.url = {
    stripWWW: function(url) {
        return url.replace(/^www\./gi, '');
    },
    stripHTTP: function(url) {
        return url.replace(/^.*?:\/\//gi, '');
    },
    capitalizeFirstLetter: function(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getCleanUrl: function(url) {
        return this.capitalizeFirstLetter(this.stripWWW(this.stripHTTP(url)));
    },
    addHTTP: function(url) {
        if (!/~^(?:f|ht)tps?:i/.test(url)) {
            url = 'http://' + url;
        }
        return url;
    }
};

Template.registerHelper('partupHTTP', function(url) {
    console.log(Partup.client.url.addHTTP(url))
    return Partup.client.url.addHTTP(url);
});

Template.registerHelper('partupCleanUrl', function(url) {
    console.log(url)
    console.log(Partup.client.url.getCleanUrl(url))
    return Partup.client.url.getCleanUrl(url);
});
