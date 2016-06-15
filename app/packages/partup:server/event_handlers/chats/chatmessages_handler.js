/**
 * Check for scrapable content
 */

Event.on('chats.messages.inserted', function(userId, chatMessageId, content) {
    if (!userId || !chatMessageId) return;

    // Check if an URL is present
    var regex = new RegExp('(http[s]?:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_\‌​+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?');
    var url = content.match(regex);
    if (url && url.length > 0) {
        var data = Partup.server.services.scrape.website(url[0]);

        // Stop if there is no scraped data
        if (!data || !data.title) return;

        var preview_data = {
            url: data.url,
            title: data.ogTitle ? data.ogTitle : data.title,
            description: data.ogDescription ? data.ogDescription : data.description,
            image: data.image ? data.image : data.images[0],
            domain: data.host
        };

        ChatMessages.update(chatMessageId, {$set: {preview_data: preview_data}});
    }
});
