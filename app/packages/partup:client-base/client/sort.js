Partup.client.sort = {
    alphabeticallyASC: function(a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
    },
    alphabeticallyDESC: function() {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        return (nameA < nameB) ? 1 : (nameA > nameB) ? -1 : 0;
    }
};
