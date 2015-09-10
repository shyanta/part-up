# partup nginx

## Unlocking the ssl certificates
- Go to the root of the devops directory
- ./devops decrypt docker_containers/nginx/ssl/beta_part-up_com.chained.crt-encrypted
- ./devops decrypt docker_containers/nginx/ssl/part-up.com.key-encrypted

## Building
- docker build -t lifely/partup:nginx .

## Pushing
- docker push lifely/partup:nginx
