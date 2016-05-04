Part-up DevOps
=================

https://hub.docker.com/r/partup/partup

# Pre-requisites
- ensure homebrew is installed: `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- ensure ansible is installed: `brew install ansible`
- Obtain partup server key and place it in ~/.ssh folder

`./devops edit provision/group_vars/acceptance.yml`

> NOTE! Ansible > 2.0 is required
> You can switch between ansible versions using `brew switch ansible <version>`

# Application

## Deployment
`./devops provision <environment> all --tags=app`

## Maintenance / Live modes
`./devops provision loadbalancer all --tags=nginx-mode`
The script will ask which environment and what mode you want to deploy.

# Backup - MongoDB / S3
`./devops command backup <environment> all`

# Edit Groupvars

