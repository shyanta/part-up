/**
 @namespace Validators helper service
 @name partup.services.validators
 @memberof Partup.services
 */
Partup.services.validators = {
    tagsSeparatedByComma: /^\s*(\w|-)*(\s*,?\s*(\w|-)*)*\s*$/,

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
    linkedinusername: /^[a-zA-Z0-9]{5,30}$/,

    // Twitter usernames can only contain a-z A-Z 0-9 and have a limit of 15 chars
    twitterUsername: /^[A-Za-z0-9_]{1,15}$/,

    // SimpleSchema Url wihout the http or https
    simpleSchemaUrlWithoutProtocol: /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i,

    facebookUrl: /^https:\/\/(www\.)?facebook\.com\/\w+(\?.*)?$/,
    instagramUrl: /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z]+\/?(\?.*)?$/,
    linkedinUrl: /^http[s]?:\/\/(\w+\.)?linkedin\.com\/(in\/\w+|pub\/.*|profile\/view)(\?.*)?$/,
    twitterUrl: /^https:\/\/(www\.)?twitter\.com\/\w+(\?.*)?$/
};
