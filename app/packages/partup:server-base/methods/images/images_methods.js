Meteor.methods({

    /**
     * Insert an image by url
     *
     * @param {String} url
     *
     * @return {String} imageId
     */
    'images.insertByUrl': function (url) {
        console.log(Images.insert(url));
    }

});
