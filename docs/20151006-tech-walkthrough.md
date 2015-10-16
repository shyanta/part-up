# Part-up tech walkthrough

- code repository
	- bitbucket
	- client packages
	- lib packages
		- collections
	- server packages
		- publications
		- methods
		- eventhandlers
	- devops script
		- modulus deployment (`./devops staging deploy`)
- modulus
	- logs
	- metrics
	- (auto)scaling
	- environment variables
		- mongo + oplog (database)
		- facebook (auth)
		- linkedin (auth)
		- aws (picture storage)
		- mail (mailgun smtp url)
		- flickr (suggestions)
		- new relic (monitoring)
		- kadira (meteor debugging)
		- meteor setings (intercom, aws, googleanalytics)

- compose.io
	- deployments
	- databases (with usernames and passwords)
	- backupscript

- mailgun
	- mails sent
	- logs

- amazon
	- s3 buckets

- new relic
	- synthetics
	- alerts

## not discussed

- docker deployment (devops-new)