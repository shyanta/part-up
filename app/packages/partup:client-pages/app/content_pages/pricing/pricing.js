var individualProducts = function(namespace) {
    return {
        name: __('pages-app-pricing-' + namespace + '-name'),
        summary: __('pages-app-pricing-' + namespace + '-summary'),
        price: __('pages-app-pricing-' + namespace + '-price'),
        price_info: __('pages-app-pricing-' + namespace + '-price-info'),
        features: [
            {
                name: __('pages-app-pricing-' + namespace + '-feature'),
                value: __('pages-app-pricing-' + namespace + '-feature-value')
            }
        ],
        type: 'individual'
    };
};

var tribeProducts = function(namespace) {
    return {
        name: __('pages-app-pricing-' + namespace + '-name'),
        summary: __('pages-app-pricing-' + namespace + '-summary'),
        price: __('pages-app-pricing-' + namespace + '-price'),
        price_info: __('pages-app-pricing-' + namespace + '-price-info'),
        features: [
            {
                name: __('pages-app-pricing-' + namespace + '-feature1'),
                value: __('pages-app-pricing-' + namespace + '-feature1-value')
            }, {
                name: __('pages-app-pricing-' + namespace + '-feature2'),
                value: __('pages-app-pricing-' + namespace + '-feature2-value')
            }
        ],
        type: 'network'
    };
};
Template.app_pricing.helpers({
    shrinkHeader: function() {
        return Partup.client.scroll.pos.get() > 40;
    },
    products: function() {
        return {
            upper: function() {//individuals-upper
                return individualProducts('individuals-upper');
            },
            premium_upper: function() { //individuals-premiumupper
                return individualProducts('individuals-premiumupper');
            },
            social_impact: function() {
                return tribeProducts('tribes-socialimpact');
            },
            small: function() {
                return tribeProducts('tribes-small');
            },
            medium: function() {
                return tribeProducts('tribes-medium');
            },
            large: function() {
                return tribeProducts('tribes-large');
            }
        }
    }
});
