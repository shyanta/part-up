var prompt = require('prompt');
var optimist = require('optimist');
var YAML = require('json2yaml');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var fs = require('fs');
var prettyjson = require('prettyjson');
var Promise = require('bluebird');
var path = require('path');

function execLogHandler(err, stdout, stderr) {
    if (err) {
        return console.log(err);
    }

    if (stderr) {
        console.log(prettyjson.render(stderr));
    }

    console.log(prettyjson.render(stdout));
}

function writeYAMLFileAndRunPhraseApp(result, pushSources, pullTargets) {

    var phraseAppConfigFile = "./.phraseapp.yml";

    var phraseAppConfiguration = YAML.stringify({
        phraseapp: {
            access_token: result.access_token.toString(),
            project_id: '44c4823aea4c479fd3d5f3feaffecd04',
            file_format: 'simple_json',
            push: {
                sources: pushSources
            },
            pull: {
                targets: pullTargets
            }
        }
    });


    return new Promise(function(resolve) {
        fs.writeFile(phraseAppConfigFile, phraseAppConfiguration, function (err) {
            if (err) {
                return console.log(err);
            }
            exec('phraseapp ' + result.command, function (err, stdout, stderr) {
                execLogHandler(err, stdout, stderr);
                resolve(fs.unlinkSync(phraseAppConfigFile));
            });
        });
    });
}

prompt.override = optimist.argv;


prompt.start();

prompt.get([
    {
        name: 'command',
        description: 'push or pull',
        type: 'string',
        required: true,
        pattern: /^(push|pull)+$/,
        default: 'pull'
    }
], function (err, result) {

    var accessToken = {
        name: 'access_token',
        default: '193b1cb74df9b522e06166c3dc17d5a7055ff9e17bf5ae93c8a97cf3b97a9780' // pull access only
    };

    var pushSources = [
        {
            file: 'app/i18n/emails.<locale_name>.i18n.json',
            params: {
                file_format: 'simple_json'
            }
        },
        {
            file: 'app/i18n/errors.<locale_name>.i18n.json',
            params: {
                file_format: 'simple_json'
            }
        },
        {
            file: 'app/i18n/notification.<locale_name>.i18n.json',
            params: {
                file_format: 'simple_json'
            }
        }
    ];

    var pullTargets = [
        {
            file: 'app/i18n/phraseapp.<locale_name>.i18n.json',
            params: {
                file_format: 'simple_json'
            }
        }
    ];

    if (result.command === 'push') {
        prompt.get([
            {
                name: 'fileNames',
                description: 'z-feat-google-drive-picker, z-feature-xxxxx (without .<locale_name>.i18n.json)',
                type: 'string',
                required: true
            },
            accessToken
        ], function (err, _result) {

            _result.command = result.command;

            var split = _result.fileNames.split(',');

            if (split.length) {
                _result.fileNames.split(',').forEach(function (fileName) {
                    pushSources.push(
                        {
                            file: 'app/i18n/' + fileName.trim() + '.<locale_name>.i18n.json',
                            params: {
                                file_format: 'simple_json'
                            }
                        }
                    );
                });
            } else {
                pushSources.push(
                    {
                        file: 'app/i18n/' + fileNames.trim() + '.<locale_name>.i18n.json',
                        params: {
                            file_format: 'simple_json'
                        }
                    }
                );
            }

            writeYAMLFileAndRunPhraseApp(_result, pushSources, pullTargets);

        });
    } else if (result.command === 'pull') {
        prompt.get([
            {
                name: 'commitAndPush',
                description: 'want this pull to be committed and push to staging? \n ' +
                'make sure that the working directory is clean and there is nothing to commit yes/no',
                type: 'string',
                default: 'no'
            },
            accessToken
        ], function (err, _result) {
            _result.command = result.command;

            if(_result.commitAndPush.toLowerCase() === 'yes') {

                writeYAMLFileAndRunPhraseApp(_result, pushSources, pullTargets)
                    .then(function() {
                        execFile('sh', [ path.resolve(__dirname, 'phraseapp-commit-push.sh') ], function(err, stdout, stderr) {
                            execLogHandler(err, stdout, stderr);
                        });
                    });
            } else {
                writeYAMLFileAndRunPhraseApp(_result, pushSources, pullTargets);
            }
        });
    }
});
