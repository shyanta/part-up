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
        if (!/^((http|https|ftp):\/\/)/.test(url)) {
            url = 'http://' + url;
        }
        return url;
    },
    getImageUrl: function(image, store) {
        if (mout.object.get(Meteor, 'settings.public.aws.bucket') == 'development') {
            // development image urls
            return ['/uploads/',
                store,
                '/images-',
                image._id,
                '-',
                image.copies[store].name
                ].join('');
        } else {
            // staging acceptance production aws image url
            return ['https://s3-',
                mout.object.get(Meteor, 'settings.public.aws.region'),
                '.amazonaws.com/',
                mout.object.get(Meteor, 'settings.public.aws.bucket'),
                '/',
                store,
                '/',
                image.copies[store].key
                ].join('');
        }
    }
};

Template.registerHelper('partupHTTP', function(url) {
    return Partup.client.url.addHTTP(url);
});

Template.registerHelper('partupCleanUrl', function(url) {
    return Partup.client.url.getCleanUrl(url);
});
