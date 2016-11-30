Partup.client.columnsLayout = {
    getAmountOfColumnsThatFitInElement: function(selector, minWidth) {
        var element = $(selector)[0];
        var offsetWidth = element ? element.offsetWidth : 0;
        var layoutWidth = Math.min(window.innerWidth, offsetWidth);
        return Math.max(Math.min(Math.floor(layoutWidth / minWidth), 4), 1);
    }
};
