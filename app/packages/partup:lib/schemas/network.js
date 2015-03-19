// Define the base Network schema
var networkBaseSchema = new SimpleSchema({
    name: {
        type: String,
        max: 150
    }
});

// Network entity schema
Partup.schemas.entities.network = new SimpleSchema([networkBaseSchema, {
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    created_at: {
        type: Date,
        defaultValue: Date.now()
    }
}]);

// Network form schema
Partup.schemas.forms.network = new SimpleSchema([networkBaseSchema, {
    //
}]);