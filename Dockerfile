FROM node:0.10.40

RUN curl https://install.meteor.com/ | sh
RUN apt-get install -y imagemagick

COPY . /code
WORKDIR /code/app
RUN meteor build --directory .
RUN cd bundle/programs/server && npm install

WORKDIR /code
RUN echo "{\"version\": \"`git describe`\", \"deploydate\": \"`date +\"%Y-%m-%dT%H:%M:%SZ\"`\"}" > app/public/VERSION

WORKDIR /code/app
EXPOSE 3000
CMD ["node", "bundle/main.js"]
