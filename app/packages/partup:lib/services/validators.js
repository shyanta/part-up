/**
 @namespace Validators helper service
 @name partup.services.validators
 @memberOf partup.services
 */
Partup.services.validators = {
    tagsSeparatedByComma: /^\s*\w*(\s*,?\s*\w*)*\s*$/,

    // minimum 8 characters, at least 1 number, at least 1 capital letter
    password: /(?=^.{8,}$)(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    facebookUsername: /^[a-zA-Z\d.]{1,}$/

};