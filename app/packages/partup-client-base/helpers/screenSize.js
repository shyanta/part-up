var mobile = 320;
var phablet = 500;
var tablet = 768;
var desktop = 992;

Template.registerHelper('screenSize', function(sizeName) {
    var size = Partup.client.screen.size.get('width');
    var name = 'mobile';
    if (size >= tablet && size < desktop) {
        name = 'tablet';
    } else if (size >= desktop) {
        name = 'desktop';
    }

    return sizeName === name;
});

Template.registerHelper('screenSizeIsMaximumWidth', function(sizeName) {
    var size = Partup.client.screen.size.get('width');

    if (sizeName === 'desktop' && size <= desktop) return true;
    if (sizeName === 'tablet' && size <= tablet) return true;
    if (sizeName === 'phablet' && size <= phablet) return true;
    if (sizeName === 'mobile' && size <= mobile) return true;

    return false;
});

Template.registerHelper('screenSizeIsMinimalWidth', function(sizeName) {
    var size = Partup.client.screen.size.get('width');

    if (sizeName === 'mobile' && size >= mobile) return true;
    if (sizeName === 'phablet' && size >= phablet) return true;
    if (sizeName === 'tablet' && size >= tablet) return true;
    if (sizeName === 'desktop' && size >= desktop) return true;

    return false;
});
