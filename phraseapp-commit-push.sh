#!/usr/bin/env bash

git checkout .
git clean -fd
git reset --hard HEAD
git pull
git add app/i18n/phraseapp.de.i18n.json app/i18n/phraseapp.en.i18n.json app/i18n/phraseapp.fr.i18n.json app/i18n/phraseapp.nl.i18n.json
git commit -am "update(translation): update phraseapp translation"
git push