Template.WidgetHoverCard.helpers({
    cardOpen: function(){
        // if there are settings, that means the card must be visible
        return Session.get('partup.hover-card.settings') ? true : false;
    },
    settings: function(){
        // get hovercard settings
        var settings = Session.get('partup.hover-card.settings');
        if(!settings) return {};

        // check if it's below the middle of the screen
        var positionTop = (100 / settings.windowHeight * settings.y) > 50 ? true : false;

        // calculate top and left styling
        return {
            top: function(){
                if(positionTop){
                    var bottom = settings.windowHeight - settings.y;
                    return 'bottom:' + bottom + 'px;';
                } else {
                    var top = settings.y + settings.height;
                    return 'top:' + top + 'px;';
                }
            },
            left: function(){
                var left = settings.x + (settings.width / 2);
                return 'left:' + left + 'px;';
            },
            positionTop: positionTop
        }
    },
    data: function(){
        return Session.get('partup.hover-card.data');
    }
})