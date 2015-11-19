var d = Debug('services:partup_popularity_calculator');

/**
 @namespace Partup server partup popularity calculator service
 @name Partup.server.services.partup_popularity_calculator
 @memberof Partup.server.services
 */
Partup.server.services.partup_popularity_calculator = {

    calculatePartupPopularityScore: function(partupId) {
        var score = 0;
        var partup = Partups.findOneOrFail(partupId);

        var activityScore = this._calculateActivityBasedScore(partup);
        var activityScoreWeight = 0.5; // 50%
        d('Activity based partup popularity score is ' + (activityScore / activityScoreWeight));
        score += (activityScore / activityScoreWeight);

        var shareScore = this._calculateShareBasedScore(partup);
        var shareScoreWeight = 0.8; // 20%
        d('Share based partup popularity score is ' + (shareScore / shareScoreWeight));
        score += (shareScore / shareScoreWeight);

        var partnerScore = this._calculatePartnerBasedScore(partup);
        var partnerScoreWeight = 0.9; // 10%
        d('Partner based partup popularity score is ' + (partnerScore / partnerScoreWeight));
        score += (partnerScore / partnerScoreWeight);

        var supporterScore = this._calculateSupporterBasedScore(partup);
        var supporterScoreWeight = 0.9; // 10%
        d('Supporter based partup popularity score is ' + (supporterScore / supporterScoreWeight));
        score += (supporterScore / supporterScoreWeight);

        var viewScore = this._calculateViewBasedScore(partup);
        var viewScoreWeight = 0.9; // 10%
        d('View based partup popularity score is ' + (viewScore / viewScoreWeight));
        score += (viewScore / viewScoreWeight);
        console.log('score', score);
        //return Math.max(0, Math.min(100, score));
    },

    _calculateActivityBasedScore: function(partup) {
        var count = 0;
        var two_weeks = 1000 * 60 * 60 * 24 * 14;

        Updates.find({partup_id: partup._id}).forEach(function(update) {
            var updated_at = new Date(partup.updated_at);
            if (updated_at > two_weeks) return; // Don't count the updates that are older than 2 weeks
            count += update.comments_count + 1; // The additional 1 is for the update itself
        });
        return count;
    },

    _calculateShareBasedScore: function(partup) {
        var count = 0;
        if (!partup.shared_count) return count;
        partup.shared_count.forEach(function(medium) {
            count += medium;
        });
        return count;
    },

    _calculatePartnerBasedScore: function(partup) {
        var partners = partup.uppers || [];
        return partners.length > 15 ? 15 : partners.length;
    },

    _calculateSupporterBasedScore: function(partup) {
        var supporters = partup.supporters || [];
        return supporters.length;
    },

    _calculateViewBasedScore: function(partup) {
        return partup.analytics.clicks_total || 0;
    }
};
