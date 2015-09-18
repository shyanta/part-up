FROM node:0.10.40

RUN curl https://install.meteor.com/ | sh
RUN apt-get install -y imagemagick

COPY . /code
WORKDIR /code

RUN meteor build --directory .
RUN cd bundle/programs/server && npm install

EXPOSE 3000
CMD node bundle/main.js
