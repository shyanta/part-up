# Technical Battleplan - 13 oct 2015

## Afternoon
- re-provision old application so it exposes port 3000 publicly
- configure new loadbalancer to point to old application
- test the new loadbalancer setup by modiying the DNS on localhost
    - `curl https://part-up.com/ping` should return partupok
    - `curl -I https://part-up.com` should return 200
    - `curl -I http://part-up.com` should return 301
- DNS to new loadbalancer
