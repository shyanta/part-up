Partup.client.chatmessages = {
    groupByCreationDay: function(messages) {
        var outputArray = [];

        messages.forEach(function(item, index) {
            var outputLastIndex = outputArray.length - 1;
            if (outputArray[outputLastIndex] && outputArray[outputLastIndex].day === new Date(item.created_at).setHours(0, 0, 0, 0, 0)) {
                outputArray[outputLastIndex].messages.push(item);
            } else {
                outputArray.push({
                    day: new Date(item.created_at).setHours(0, 0, 0, 0, 0),
                    messages: [item]
                });
            }
        });

        return outputArray;
    },
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
