# Part-up technical battleplan 12-10-2105

## AS-IS

- part-up.com deployed at modulus (joyent ams2) & compose (amazon ireland)
	- slow support feedback due to time difference
	- random outages / performance dips / modulus application fails
- pu-acceptance.lifely.nl deployed on own infrastructure (digitalocean london) & compose (digitalocean london)
	- single (heavy) instance server
	- pretty maintenance page for outages
	- ralph feedback:
		- de pop-up blijft wel lang hangen na klik op plaats bericht. zie op achtergrond wel dat er 2 nieuwe updates zijn, maar pop-up sluit niet.
		- disable foto upload while placing message

## TO-BE

- performant server
- smooth experience with current features
- scalable to 100 concurrent users
- ability to restart / reboot servers by Part-up / Lifely 

## GAP (short term)

- catalog current setup
	- loadbalancer:
	- app instance:
	- compose: 
- serve part-up.com through own infrastructure / loadbalance (digitalocean)
	- prepare new loadbalancer with modulus ip + (disable auto ssl redirect on modulus)
	- flip dns
	- prepare new s3 buckets, "presync" production
	- prepare new compose production db (london)
	- prepare digitalocean production infra with new env variables
	- ... wait until quiet moment in partup
	- power off modulus production
	- power off new production infras
	- backup db and images to disk
	- sync old production to new s3 buckets
	- backup / restore old production database to new partup account deployment
	- route loadbalancer to new production instance

## GAP (midshort term)

- replace all image uploads with multi-instance alternative (+-1 week dev time 2fte)
- investigate and fix memory leak in frontend app (+-1 week dev time 1 fte)
- re-prioritize production bugs and perform bug fixing sprint (+-2 weeks 2 fte)
