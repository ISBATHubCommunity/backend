# Scripts

`npm start` which will start the server without automatic reload<br>
`npm run dev` which start the server using nodemon and automatic reload<br>
`npm run watch` this will also run using nodemon and automatic reload<br>
`npm run lint` this will run eslint to catch any error and enforce <br>style rules
`npm run test` this will run jest for testing if our code is doing<br> what is expected to do.

# Database Setup

## what you need.

- Mongodb account, if you don't have it head over to [mongodb.com](https://www.mongodb.com) to create an account.
- Create a new cluster.
- After the cluster is created, click on the connection to get the connection the string.
- create .env file on the root of project folder and in it type this
  - DB_CONNECTION=past the connection string you got from the connection tab on the Cluster.
  - SECRET_KEY=any string of your choice.
  - PORT=9090
  - HOST=localhost

# Usage

- Make sure you have nodejs installed in your system and it is atlast version 12.13.x or greater. Just in case you don't have it installed head over to [nodejs.org](https://www.nodejs.org) and download the LTS version `Recommanded for most users` for your operating System.

- Open your command prompt on windows or terminal on linux or MAC OS and then change your current working directory to the project folder by using this command `cd [project directory]` then press return, and if you change the project directory name make sure your're using the right name.

- After changing the working directory to the project directory, now we need to install all the dependencies used in this project.
  To do that, on your command prompt or terminal within the project root directory run `npm install or npm i` to install all the dependencies used in this project but make sure your running this command on the root of the project by root i mean the parent folder.

- After the installation is done, it is finally time to run the server of the application. On your command prompt or termial type `npm run dev` to start the development server on port [http://localhost:9090]()
