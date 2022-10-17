Trillion Code Blog App.

Created for an interview assignment for trillion code blog.
Tech stack consists of :

1. Vue
2. Pinia
3. NestJs
4. Prisma
5. MySQL
6. Docker and Docker-Compose

In order to run it locally do the following:

1. git clone the repo

2. docker-compose up --build wait until you see this message from the terminal
[PRISMA SERVICE] DATABASE CONNECTION ESTABLISHED

At this stage everything is running but the DB is unmigrated and empty therefore

3. open a new terminal, to leave the docker-compose up and running, then cd in the trillion-code-blog-api. 

4. Node 16.17.1 (latest LTS) run npm install.

5. run npm install -g dotenv-cli.

6. dotenv -e .env.development npx prisma migrate dev

Now the db is setup but still empty.

You can now seed the db manually using the backend server rest api in this URL:

- http://localhost:3000/swagger

OR

7. run npm install ts-node

8. run this command inside the trillion-code-blog-api folder to seed the db automatically " dotenv -e .env.development npx prisma db seed "


Now in the following URL : - http://localhost:8080 the project is up and running with data.
