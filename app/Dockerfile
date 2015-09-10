FROM bryantebeeklifely/partup:app-base

COPY . /code
WORKDIR /code

RUN meteor build --directory .
RUN cd bundle/programs/server && npm install

EXPOSE 3000
CMD node bundle/main.js
