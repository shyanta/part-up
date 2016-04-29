#!/usr/bin/env bash
sh -c "git add ./app/i18n/phraseapp.de.i18n.json app/i18n/phraseapp.en.i18n.json ./app/i18n/phraseapp.fr.i18n.json ./app/i18n/phraseapp.nl.i18n.json && git commit -am \"update(translation): update phraseapp translation\" && git push "
