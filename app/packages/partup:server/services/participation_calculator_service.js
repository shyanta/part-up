var d = Debug('services:participation_calculator');

/**
 @namespace Partup server participation calculator service
 @name Partup.server.services.participation_calculator
 @memberof Partup.server.services
 */
Partup.server.services.participation_calculator = {

    calculateParticipationScoreForUpper: function(upperId) {
        var score = 0;
        var upper = Meteor.users.findOneOrFail(upperId);

        score += this._calculateParticipationLoginScoreForUpper(upper);

        return score;
    },

    _calculateParticipationLoginScoreForUpper: function(upper) {
        d('Calculating participation score based on the users logins');

        var logins = upper.logins || [];

        var day = 24 * 60 * 60 * 1000;
        var now = new Date;

        var maximumDaysAgoToGiveScore = 25;
        var datesLoggedInThatGiveScore = logins.filter(function(login) {
            var daysBetweenLoginAndNow = Math.round(Math.abs((login.getTime() - now.getTime()) / day));

            return daysBetweenLoginAndNow <= maximumDaysAgoToGiveScore;
        });

        var loginScore = datesLoggedInThatGiveScore.length;

        d('Login score was ' + loginScore);

        return loginScore;
    }

};
