# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app 

# Copy package.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Define the command to run your application
CMD [ "npm", "start" ]

FROM httpd:alpine
WORKDIR /usr/local/apache2/htdocs/
COPY --from=build /build/buid/ .
RUN chown -R www-data:www-data /usr/local/apache2/htdocs/ \
    && sed -i "s/Listen 80/Listen \${PORT}/g" /usr/local/apache2/conf/httpd.conf
