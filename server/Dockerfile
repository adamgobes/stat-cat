FROM node:12.10.0

ENV YARN_VERSION 1.17.3

RUN apt-get update \
	&& apt-get install -y wget gnupg \
	&& wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
	&& sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
	&& apt-get update \
	&& apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
	--no-install-recommends \
	&& rm -rf /var/lib/apt/lists/*


WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD yarn start