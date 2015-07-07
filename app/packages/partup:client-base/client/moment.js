/**
 * Client moment
 *
 * @class partup.client.moment
 * @memberof Partup.client
 */
Partup.client.moment = {

    /**
     * Local config
     *   Function to provide a temporarely customized locale Moment
     *   Inside the callback, the moment() will be locally customized as provided.
     *   After the callback, everything is back to normal again.
     *   The callback will be called synchronously.
     *
     * @memberof Partup.client.moment
     */
    localConfig: function(configuration, scoped_synchronous_callback) {

        // Get current language
        var language = moment.locale();

        // Get current locale data
        var localeData = moment.localeData();

        // Placeholder for the default configuration backup
        var configurationBackup = {};

        lodash.each(configuration, function(config, configkey) {

            // Backup the default configuration
            configurationBackup[configkey] = localeData['_' + configkey];

            // Hydrate the objects in de passed configuration with the missing values
            if (typeof config === 'object') {
                var _config_to_overwrite = config;
                config = configurationBackup[configkey];
                lodash.each(_config_to_overwrite, function(value, key) {
                    config[key] = value;
                });
                configuration[configkey] = config;
            }
        });

        // Customize moment
        moment.locale(language, configuration);

        // Execute the synchronous callback (and save the possible output)
        var output = scoped_synchronous_callback.apply(window);

        // Reset to backed-up locale data
        moment.locale(language, configurationBackup);

        // Return the output (when there's one)
        return output;

    }

};
