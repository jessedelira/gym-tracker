# Gym Tracker
A simple app to track your gym workouts, built with Next.js, Prisma, and MySQL.

## Setup
1. Clone the repo
2. Run `$npm install` at root of project to install the dependencies
3. Install [Docker](https://docker.com), if you don't have it already. Have it running in the background
4. Run `$docker run --name gym-tracker-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql` to start the database
5. Create gym_tracker database in MySQL db instance in Docker
6. Create .env at root of project and add the following:
```
DATABASE_URL="mysql://root:password@localhost:3306/test"

NEXTAUTH_URL="http://localhost:3000"
```
7. Run `$npx prisma db push` to create tables in the database
8. Run `$npx prisma db seed` to seed the database with some data
9. Finally, run `$npm run dev` to start the server

