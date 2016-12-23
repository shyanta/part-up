var d = Debug('services:network_popularity_calculator');

/**
 @namespace Partup server network popularity calculator service
 @name Partup.server.services.network_popularity_calculator
 @memberof Partup.server.services
 */
Partup.server.services.network_popularity_calculator = {

    calculateNetworkPopularityScore: function(networkId) {
        var network = Networks.findOneOrFail(networkId);

        // score based on how many activity is in the network
        var activityScore = this._calculateActivityBasedScore(network);
        var activityScoreWeight = 0.3;

        // TODO:
        // add average popularity of active partups
        // add chat recency

        // score based on chat volume in the past 3 months
        var chatScore = this._calculateChatBasedScore(network);
        var chatScoreWeight = 0.2;

        // score based on total partups in network
        var partupScore = this._calculatePartupBasedScore(network);
        var partupScoreWeight = 0.2;

        // score based on total partners of partups in network
        var partnerScore = this._calculatePartnerBasedScore(network);
        var partnerScoreWeight = 0.1;

        // score based on total supporters of partups in network
        var supporterScore = this._calculateSupporterBasedScore(network);
        var supporterScoreWeight = 0.1;

        // score based on total members of network
        var memberScore = this._calculateMemberBasedScore(network);
        var memberScoreWeight = 0.1;

        var score = (activityScore * activityScoreWeight) +
            (chatScore * chatScoreWeight) +
            (partupScore * partupScoreWeight) +
            (partnerScore * partnerScoreWeight) +
            (supporterScore * supporterScoreWeight) +
            (memberScore * memberScoreWeight);

        return Math.floor(score);
    },

    _calculateActivityBasedScore: function(network) {
        var stats = network.stats || {};
        var count = stats.activity_count || 0;

        if (count > 150) count = 150; // Set limit

        return count / 1.5; // Results in max score of 100%
    },

    _calculateChatBasedScore: function(network) {
        var chatId = network.chat_id;

        if (!chatId) return 0;

        var count = ChatMessages.find({
            'chat_id': chatId,
            'created_at': {
                $gt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 90) // the past month
            }
        }).count();

        if (count > 100) count = 250; // Set limit

        return count / 2.5; // Results in max score of 100%
    },

    _calculatePartupBasedScore: function(network) {
        var stats = network.stats || {};
        var count = stats.partup_count || 0;

        return count > 100 ? 100 : count; // Results in max score of 100%
    },

    _calculatePartnerBasedScore: function(network) {
        var stats = network.stats || {};
        var count = stats.partner_count || 0;

        if (count > 150) count = 150; // Set limit

        return count / 1.5; // Results in max score of 100%
    },

    _calculateSupporterBasedScore: function(network) {
        var stats = network.stats || {};
        var count = stats.supporter_count || 0;

        if (count > 150) count = 150; // Set limit

        return count / 1.5; // Results in max score of 100%
    },

    _calculateMemberBasedScore: function(network) {
        var stats = network.stats || {};
        var count = stats.upper_count || 0;

        if (count > 150) count = 150; // Set limit

        return count / 1.5; // Results in max score of 100%
    }
};
