/**
 * Base Sector schema
 * @name sectorBaseSchema
 * @memberof Partup.schemas
 * @private
 */
var sectorBaseSchema = new SimpleSchema({
    
});

/**
 * Sector entity schema
 * @name sector
 * @memberof Partup.schemas.entities
 * @desc contains all members that define the entity
 */
Partup.schemas.entities.sector = new SimpleSchema([sectorBaseSchema, {
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
}]);

/**
 * sector form schema
 * @name sector
 * @memberof Partup.schemas.forms
 * @desc contains all members used by the UI and not define the entity
 */
Partup.schemas.forms.sector = new SimpleSchema([sectorBaseSchema, {
    /** 
     * The name of which the sector should be idetified by, therefor it should be unique
     * @member {String} 
     */
    name: {
        type: String,
        max: 150
    },
    /** 
     * The corresponding PhraseApp key to display the localized version of 'name'
     * @member {String} 
     * @see {name}
     */
    phrase_key: {
        type: String,
        max:150
    }
}]);
