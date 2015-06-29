/**
 * Register Form Required
 * @name registerRequired
 * @memberof Partup.schemas.forms
 */
Partup.schemas.entities.settings = new SimpleSchema({
    locale: {
        type: String,
        min: 2,
        max: 2
    }
});
