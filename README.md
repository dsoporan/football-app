# football-app

### Football APP Runbook

#### Application Overview

- *Name:* Football App
- *Description:* A (NodeJS, Express, PostgreSQL + Sequelize, ReactJS, Docker) football application to display teams, players, venues, coaches and favourite players from season 2022.
- *URL:* http://localhost:3000.
- *Environment:* Local environment.

#### Dependencies

- *Node.js:*
  - Version: 18.17.0
  - npm Package Manager v10.3.0
  
- *Express:*
  - Version: 4.18.2

- *PostgreSQL:*
  - Version: 16 runned in Docker- 

- *Sequelize:*
  - Version: 6.35.2
  
- *React:*
  - Version: 18.2.0
  
- *Docker:*
  - Version: 24.0.7
  
#### Configuration

- *Environment Variables:*
  - Client:
	- REACT_APP_API_URL=*url_of_the_api_football_details*
  - Server:
	- PG_DB=*database_name*
	- PG_USER=*database_user*
	- PG_PASSWORD=*database_password*
	- PG_HOST=*database_host*
	- POPULATE_DB=*populating_db (true or false)*
	- RAPID_API_KEY=*API Key for the public v3 football api*

#### Local Development

- *Installation & Running the App: Steps to set up the development environment.*
  - Server: 
	- npm install (install packages)
	- docker compose up --build (build image container for DB)
	- npm run server (running the app)
	- http://localhost:1337
  - Client:
	- npm install (install packages)
	- npm start (run the application)
	- http://localhost:3000

#### Testing

- *Server - Unit Testing:*
  - Mocha v10.2.0
  - Chai v5.0.0
  - Supertest v6.3.4
  - Running the tests with command: `npm run test`
  - Testing the behavior of the created endpoints.
  
- *Client - Automation Testing:*
  - Cypress v13.6.3
  - Running the tests with command: `npm test`
  - E2E Integration testing to ensure the behavior of the app.


#### Database 

- *Database Type:*
  - PostgreSQL 16.
- *Connection Details:*
  - Running PostgreSQL in a Docker Container
  - Connection details in the Configuration Section.
- *Start-up initialization:*
  - Running scripts to populate the DB at start-up if `POPULATE_DB=true`
  
#### Documentation

- *Swagger Documentation - http://localhost:1337/api-docs *
  - swagger-jsdoc v6.2.8
  - swagger-ui-express v5.0.0
  - Details regarding each endpoint on how to call it.

#### Additional Resources

- *ESLint*
  - Find and fix problems in JS Code.
  - v8.56.0
- *Prettier*
  - Code Formatting to enforce styling and readability of code.
  - v3.2.4
- *Nodemon*
  - Monitor script to monitor changes in the sourcecode.
  - v3.0.3 
- *Styled Components*
  - Write CSS in Js.
  - v6.1.18
- *Tanstack - React Query*
  - Hooks for managing, caching and syncing remote data.
  - v5.17.19
- *MaterialUI*
  - A comprehensive suite of free UI tools.
  - v5.15.5
