FROM node:0.10-slim

RUN apt-get update && \
    apt-get install -y imagemagick && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV PORT 80
EXPOSE 80
CMD ["node", "app/bundle/main.js"]

COPY . /code
WORKDIR /code

RUN apt-get update && \
    apt-get install -y curl git && \
    curl https://install.meteor.com/ | sh && \
    echo "{\"version\": \"`git describe`\", \"deploydate\": \"`date +\"%Y-%m-%dT%H:%M:%SZ\"`\"}" > app/public/VERSION && \
    cd app && \
    meteor build --directory . && \
    cd bundle/programs/server && \
    npm install && \
    apt-get remove -y git curl && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* ~/.meteor
