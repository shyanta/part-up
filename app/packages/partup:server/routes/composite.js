Meteor.routeComposite = function(route, callback) {
    Router.route(route, {where: 'server'}).get(function() {
        var request = this.request;
        var response = this.response;
        var params = this.params;

        var userId = request.user ? request.user._id : null;
        var composition = callback(request, _.extend({}, params));
        var result = compositionToResult(userId, composition.find.bind({userId: userId}), composition.children);

        // We are going to respond in JSON format
        response.setHeader('Content-Type', 'application/json');

        return response.end(JSON.stringify(result));
    });
};

var compositionToResult = function(userId, find, children) {
    var result = {};

    var cursor = find();
    if (! cursor) return;

    var items = cursor.fetch();
    var collectionName = cursor._cursorDescription.collectionName;

    items.forEach(function(item) {
        result[collectionName] = result[collectionName] ? result[collectionName] : [];
        result[collectionName].push(item);

        if (children) {
            children.forEach(function(childComposition) {
                result = mout.object.merge(result,
                    compositionToResult(
                        userId,
                        childComposition.find.bind({userId: userId}, item),
                        childComposition.children
                    )
                );
            });
        }
    });

    return result;
}
