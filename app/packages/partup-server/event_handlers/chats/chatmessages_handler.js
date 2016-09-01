/**
 * Check for scrapable content
 */

Event.on('chats.messages.inserted', function(userId, chatMessageId, content) {
    if (!userId || !chatMessageId) return;

    // // Check if an URL is present
     var regex = new RegExp('(http[s]?:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_\‌​+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?');
     var url = content.match(regex);
     if (url && url.length > 0) {
         var matchedUrl = url[0];
         var data = Partup.server.services.scrape.website(matchedUrl);

         // Stop if there is no scraped data
         if (!data) return;

         // Scrape again with seo snippets available for partup routes
         if (data.host == 'part-up.com') {
             data = Partup.server.services.scrape.website(matchedUrl + '?_escaped_fragment_');
             // If still not available (like on a /chat route), scrape the part-up root page
             if (!data || !data.title) return;

             if (!data.description) {
                 data = Partup.server.services.scrape.website('https://part-up.com/?_escaped_fragment_');
             }
             // Change the URL to link to back to the original URL
             data.url = matchedUrl;
         }

         var preview_data = {};

         var isImage = function(url) {
             return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
         };

         if (data.title) {
             preview_data.url = data.url;
             preview_data.title = data.ogTitle ? data.ogTitle : data.title;
             preview_data.description = data.ogDescription ? data.ogDescription : data.description ? data.description : undefined;
             preview_data.image = data.image ? data.image : data.images[0];
             preview_data.domain = data.host ? data.host : null;
         } else if (isImage(matchedUrl)) {
             preview_data.url = data.url;
             preview_data.type = 'image';
         } else {
             return;
         }

         ChatMessages.update(chatMessageId, {$set: {preview_data: preview_data}});
     }
});
