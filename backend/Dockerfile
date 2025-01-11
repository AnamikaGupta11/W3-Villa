# Step 1: Set the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application code
COPY . .

# Step 6: Expose the port that your app will run on
EXPOSE 4000

# Step 7: Define the command to run your app
CMD ["npm", "start"]
