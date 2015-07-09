Template.registerHelper('socialUrl', function(type, path) {
    switch (type){
        case 'facebook':
            return 'https://www.facebook.com/' + path;
            break;
        case 'linkedin':
            return 'https://www.linkedin.com/' + path;
            break;
        case 'twitter':
            return 'https://www.twitter.com/' + path;
            break;
        case 'instagram':
            return 'https://www.instagram.com/' + path;
            break;
    }
});
