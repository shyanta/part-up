/**
 @namespace Validators helper service
 @name partup.services.validators
 @memberOf partup.services
 */
Partup.services.validators = {
    tagsSeparatedByComma: /^\s*\w*(\s*,?\s*\w*)*\s*$/,

    // minimum 8 characters, at least 1 number, at least 1 capital letter
    password: /(?=^.{8,}$)(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,

    // Facebook usernames can only contain a-z A-Z 0-9 and .
    // minimum is 5 and max is infinity (not validated)
    facebookUsername: /^[a-zA-Z0-9.]{5,}$/,

    // Instagram usernames can only contain a-z A-Z . and _
    // max length is 30 characters
    instagramUsername: /^[a-zA-Z._]{1,30}$/,

    // Linkedin usernames can only contain a-z A-Z 0-9
    // min is 5 chars and max is 30 chars according to linkedin guidelines
    linkedinUsername: /^[a-zA-Z0-9]{5,30}$/,

    // Twitter usernames can only contain a-z A-Z 0-9 and have a limit of 15 chars
    twitterUsername: /^[A-Za-z0-9_]{1,15}$/,

};