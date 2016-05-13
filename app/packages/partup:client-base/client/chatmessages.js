Partup.client.chatmessages = {
    groupByCreatorId: function(messages) {
        var outputArray = [];
        messages.forEach(function(item, index) {
            var outputLastIndex = outputArray.length - 1;
            if (outputArray[outputLastIndex] && outputArray[outputLastIndex].creator_id === item.creator_id) {
                outputArray[outputLastIndex].messages.push(item);
            } else {
                outputArray.push({
                    creator_id: item.creator_id,
                    messages: [item]
                });
            }
        });
        return outputArray;
    }
};
