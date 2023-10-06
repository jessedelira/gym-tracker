# Gym Tracker 💪

A gym tracking application to track your gym workouts, sessions, and progress!

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Links

- Project homepage: https://gym-tracker.app/

## Deployment

Feel free to deploy however you would like if you don't want to use gym-tracker.app, what is reccomended though for deployment is Vercel. Their services are fantastic to use and free under a hobby account.

If you want to have steps in the README for how to deploy using vercel create an issue and someone can add those steps here.

## Development Setup

1. Clone the repo
2. Install [Docker](https://docker.com), if you don't have it already.
4. Run `$docker run --name gym-tracker-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql` to start the database
5. Create gym_tracker database in MySQL db instance in Docker
6. Create .env at root of project and add the following:
   - Use this command: ```$ openssl rand -base64 32``` to create a NEXTAUTH_SECRET env var
```
DATABASE_URL="mysql://root:password@localhost:3306/gym_tracker"
NEXTAUTH_SECRET="place_here"
NEXTAUTH_URL="http://localhost:3000"
```

6. Run `$npm install` at root of project to install the dependencies
    - This will kick off the postinstall script, which will run `$npx prisma migrate dev` to create the database tables
7. Finally, run `$npm run dev` to start the server

## Warnings

- ```warn Fast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/messages/fast-refresh-reload```
    - This is a known issue with Next.js and Fast Refresh. It's not a problem with the app, but rather a problem with Next.js. See [here](
        https://github.com/vercel/next.js/issues/40184#issuecomment-1328881068) for more info.
