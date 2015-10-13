# Technical Battleplan - 13 oct 2015

## Morning
- configure new loadbalancer to point to old loadbalancer
- DNS to new loadbalancer

## Afternoon
- old loadbalancer to maintenance mode
- kill old application containers
- start new application containers
- configure new loadbalancer to point to new application containers
- configure old loadbalancer to point to new loadbalancer
