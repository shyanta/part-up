/**
 @name Partup.constants
 @memberof Partup.factories
 */
Partup.constants.EMAIL_FROM = process.env.PARTUP_EMAIL_FROM || 'Part-up <team@part-up.com>';
Partup.constants.CRON_DIGEST = process.env.PARTUP_CRON_DIGEST || 'at 09:00am every weekday';
Partup.constants.CRON_PARTICIPATION = process.env.PARTUP_CRON_PARTICIPATION || 'every 1 hour';
Partup.constants.CRON_PROGRESS = process.env.PARTUP_CRON_PROGRESS || 'every 1 hour starting on the 5th minute';
Partup.constants.CRON_RESET_CLICKS = process.env.PARTUP_CRON_RESET_CLICKS || 'every hour starting on the 2nd minute';
Partup.constants.CRON_ENDDATE_REMINDER = process.env.PARTUP_CRON_ENDDATE_REMINDER || 'every 1 hour';
Partup.constants.CRON_SHARED_COUNTS = process.env.PARTUP_CRON_SHARED_COUNTS || 'every 10 minutes';
