Part-up DevOps
=================

https://hub.docker.com/r/lifely/partup

# Application

## Deployment
`./devops provision <environment> all --tags=app`

## Maintenance / Live modes
`./devops provision loadbalancer all --tags=nginx`
The script will ask which environment and what mode you want to deploy.

# Backup - MongoDB / S3
`./devops command backup <environment> all`
