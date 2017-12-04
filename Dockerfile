FROM eu.gcr.io/sanity-cloud/node:8.9

# Set up environment
WORKDIR /srv/example-frontend-classic-js
RUN useradd --home /srv/example-frontend-classic-js --shell /bin/false nodejs

# Install app dependencies (pre-source copy in order to cache dependencies)
COPY package.json .
RUN yarn install --no-progress

ENV NODE_ENV=production

# Prepare app
COPY . .
COPY docker/config.js src/config.js
RUN chown -R nodejs /srv/example-frontend-classic-js

# Run application
EXPOSE 3000
CMD ["gosu", "nodejs", "npm", "run", "start"]