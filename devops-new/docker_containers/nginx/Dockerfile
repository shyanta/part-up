FROM nginx:1.9.4

RUN rm /etc/nginx/conf.d/default.conf
ADD config/vhost.conf /etc/nginx/conf.d/partup.conf

ADD ssl/beta_part-up_com.chained.crt /etc/ssl/beta_part-up_com.chained.crt
ADD ssl/part-up.com.key /etc/ssl/part-up.com.key
