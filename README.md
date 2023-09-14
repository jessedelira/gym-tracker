# Gym Tracker

A simple app to track your gym workouts, built with Next.js, Prisma, and MySQL.

## Setup

1. Clone the repo
2. Install [Docker](https://docker.com), if you don't have it already. Have it running in the background
3. Run `$docker run --name gym-tracker-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql` to start the database
4. Create gym_tracker database in MySQL db instance in Docker
5. Create .env at root of project and add the following:

```
DATABASE_URL="mysql://root:password@localhost:3306/gym_tracker"

NEXTAUTH_URL="http://localhost:3000"
```

6. Run `$npm install` at root of project to install the dependencies
    - This will kick off the postinstall script, which will run `$npx prisma migrate dev` to create the database tables
7. Finally, run `$npm run dev` to start the server
