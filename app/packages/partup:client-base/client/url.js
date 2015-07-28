Partup.client.url = {
    stripWWW: function(url) {
        return url.replace('www.', '');
    },
    stripHTTP: function(url) {
        return url.replace(/.*?:\/\//g, '');
    },
    capitalizeFirstLetter: function(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getCleanUrl: function(url) {
        return this.capitalizeFirstLetter(this.stripWWW(this.stripHTTP(url)));
    }
};
