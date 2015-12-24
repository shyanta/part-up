#!/usr/bin/env bash
NOW=$(date +"%Y-%m-%d-%H%M%S")
mkdir -p translation-exports/$NOW
find app -name "*.i18n.json" -type f | cpio -pdm ./translation-exports/$NOW \;
