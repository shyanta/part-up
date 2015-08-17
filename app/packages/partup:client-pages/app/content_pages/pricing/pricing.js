Template.app_pricing.helpers({
    shrinkHeader: function() {
        return Partup.client.scroll.pos.get() > 40;
    },
    products: function() {
        return {
            upper: function(){
                return {
                    name: 'Upper',
                    summary: 'For everyone that wants to start woking together and make their dreams work.',
                    price: 'Free',
                    price_info: '(always)',
                    features: [
                        {
                            name: 'Private part-ups',
                            value: 'No'
                        }
                    ],
                    type: 'individual'
                };
            },
            premium_upper: function() {
                return {
                    name: 'Premium upper',
                    summary: 'For everyone that wants to support Part-up and also be able to create private part-ups.',
                    price: '€ 4',
                    price_info: 'per month',
                    features: [
                        {
                            name: 'Private part-ups',
                            value: 'Yes'
                        }
                    ],
                    type: 'individual'
                };
            },
            social_impact: function() {
                return {
                    name: 'Social impact',
                    summary: 'Communities that steal out heart can get a part-up tribe for free',
                    price: 'Free',
                    price_info: '(always)',
                    features: [
                        {
                            name: 'Tribes',
                            value: '1'
                        }, {
                            name: 'Support',
                            value: 'Forum'
                        }
                    ],
                    type: 'network'
                };
            },
            small: function() {
                return {
                    name: 'Small',
                    summary: 'For small communities taht want to brand and manage their activities.',
                    price: '€ 499',
                    price_info: 'per year',
                    features: [
                        {
                            name: 'Tribes',
                            value: '1'
                        }, {
                            name: 'Support',
                            value: 'Forum'
                        }
                    ],
                    type: 'network'
                };
            },
            medium: function() {
                return {
                    name: 'Medium',
                    summary: 'For established organizations that want to manage a flexible workforce.',
                    price: '€ 7500',
                    price_info: 'per year',
                    features: [
                        {
                            name: 'Tribes',
                            value: '10'
                        }, {
                            name: 'Support',
                            value: '+ Chat/ticket'
                        }
                    ],
                    type: 'network'
                };
            },
            large: function() {
                return {
                    name: 'Large',
                    summary: 'For large enterprises that want to build a networked organization.',
                    price: 'Contact us',
                    price_info: '',
                    features: [
                        {
                            name: 'Tribes',
                            value: '25 (or more)'
                        }, {
                            name: 'Support',
                            value: '+ Telephone'
                        }
                    ],
                    type: 'network'
                };
            }
        }
    }
});
