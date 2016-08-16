#!/usr/bin/env bash

# please do not use file as a stand alone executer in console
# this script will run by the prompt application in phraseapp.js

git add ../app/i18n/phraseapp.de.i18n.json ../app/i18n/phraseapp.en.i18n.json ../app/i18n/phraseapp.fr.i18n.json ../app/i18n/phraseapp.nl.i18n.json
git commit -am "chore(translation): update phraseapp translation"
git push
