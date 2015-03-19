// Define the base Tag schema
var tagBaseSchema = new SimpleSchema({
    _id: {
        type: String,
        max: 50
    }
});

// Tag entity schema
Partup.schemas.entities.tag = new SimpleSchema([tagBaseSchema, {
    count: {
        type: Number,
        min: 0
    },
    created_at: {
        type: Date,
        defaultValue: Date.now()
    }
}]);

// Tag form schema
Partup.schemas.forms.tag = new SimpleSchema([tagBaseSchema, {
    //
}]);