# express-rest
A basic example of a rest API using Node and Express.js (ES6 latest).

This repo uses minimal amount of dependencies, all build scripts written with NPM Scripts, no Gulp or Webpack needed.

### To run in dev mode
- npm install
- npm run dev
- open browser on port 5001

### To run tests
- npm test
- test will be run on port 5002

### Setting up database
- Install MongoDB from [here](https://www.mongodb.com/download-center?jmp=nav#community)
- Create a C:/data/db folder
- Add Mongo folder to PATH
- Run mongod
- Run mongo
- Execute content from booksData.js inside mongo shell 