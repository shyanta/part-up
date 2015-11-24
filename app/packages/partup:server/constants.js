/**
 @name Partup.constants
 @memberof Partup.factories
 */
Partup.constants.EMAIL_FROM = process.env.PARTUP_EMAIL_FROM || 'Part-up <team@part-up.com>';
Partup.constants.CRON_DIGEST = process.env.PARTUP_CRON_DIGEST || 'at 09:00am every weekday';
Partup.constants.CRON_ENDDATE_REMINDER = process.env.PARTUP_CRON_ENDDATE_REMINDER || 'every 1 hour on the 10th minute';
Partup.constants.CRON_PROGRESS = process.env.PARTUP_CRON_PROGRESS || 'every 1 hour on the 15th minute';
Partup.constants.CRON_PARTICIPATION = process.env.PARTUP_CRON_PARTICIPATION || 'every 1 hour on the 30th minute';
Partup.constants.CRON_RESET_CLICKS = process.env.PARTUP_CRON_RESET_CLICKS || 'every 1 hour on the 45th minute';
Partup.constants.CRON_SHARED_COUNTS = process.env.PARTUP_CRON_SHARED_COUNTS || 'every 13 minutes';
Partup.constants.CRON_POPULARITY = process.env.PARTUP_CRON_POPULARITY || 'every 1 hour on the 20th minute';
