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
    }
};
