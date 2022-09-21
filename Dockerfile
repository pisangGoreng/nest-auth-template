FROM node:17

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . ./

COPY .env.dev ./.env

# CMD npm run start:dev
# Run the web service on container startup.
CMD [ "npm", "run", "start" ]
