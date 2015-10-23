FROM node:0.10.40-wheezy

RUN curl https://install.meteor.com/ | sh && \
    apt-get install -y imagemagick

COPY . /code
WORKDIR /code

RUN echo "{\"version\": \"`git describe`\", \"deploydate\": \"`date +\"%Y-%m-%dT%H:%M:%SZ\"`\"}" > app/public/VERSION && \
    cd app && \
    meteor build --directory . && \
    cd bundle/programs/server && \
    npm install

EXPOSE 3000
CMD ["node", "app/bundle/main.js"]
