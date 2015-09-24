FROM node:0.10.40

RUN curl https://install.meteor.com/ | sh
RUN apt-get install -y imagemagick

COPY . /code
COPY ../.git /code/.git
WORKDIR /code

RUN meteor build --directory .
RUN cd bundle/programs/server && npm install
RUN echo "{\"version\": \"`git describe`\", \"deploydate\": \"`date +\"%Y-%m-%dT%H:%M:%SZ\"`\"}" > app/public/VERSION

EXPOSE 3000
CMD node bundle/main.js
