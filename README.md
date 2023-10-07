# Gym Tracker 💪

## About The Project

Gym Tracker is a fitness tracking application to track your workouts, fitness goals, and progress!

### Reason behind the project

I created this project to help escape fumbling with Excel spreadsheets or Apple notes while at the gym. I wanted something that I can just pull up and check off the exercises that I completed based on the type of workout I was doing.

### Built With

[![React][React.js]][React-url]
[![NextAuth][NextAuth]][NextAuth-url]
[![Tailwind][Tailwind]][Tailwind-url]
[![Next][Next.js]][Next-url]
[![Prettier][Prettier]][Prettier-url]
[![ESLint][ESLint]][ESLint-url]
[![tRPC][tRPC]][tRPC-url]
[![Prisma][Prisma]][Prisma-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![MySQL][MySQL]][MySQL-url]
[![Docker][Docker]][Docker-url]
[![Vercel][Vercel]][Vercel-url]
[![Node][node]][node-url]
[![AWS][AWS]][AWS-url]

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Deployment

Feel free to deploy however you would like if you don't want to use gym-tracker.app, what is reccomended though for deployment is Vercel. Their services are fantastic to use and free under a hobby account.

If you want to have steps in the README for how to deploy using vercel create an issue and someone can add those steps here.

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is a list things you need to use the Gym Tracker.

-   [npm](https://www.npmjs.com/get-npm)
-   [Docker](https://docker.com)
-   [Node.js](https://nodejs.org/en/)
    -   Current version that is targeted is v18.17.0

### Installation

1. Clone the repo
    ```sh
    $ git clone https://github.com/jessedelira/gym-tracker.git
    ```
2. Create MySQL instance using Docker
    ```sh
    $ docker run --name gym-tracker-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql
    ```
3. Use your database management tool of choice to create the database

    ```sh
    CREATE DATABASE gym_tracker;
    ```

4. Create .env at root of project and add the following:

    - Use this command: `$ openssl rand -base64 32` to create a NEXTAUTH_SECRET env var

    ```sh
      DATABASE_URL="mysql://root:password@localhost:3306/gym_tracker"
      NEXTAUTH_SECRET="place_here"
      NEXTAUTH_URL="http://localhost:3000"
    ```

5. Run `$ npm install` at root of project to install the dependencies
    - This will kick off the postinstall script, which will run `$ npx prisma migrate dev` to create the database tables and populate the database with seed data
6. Finally, run `$ npm run dev` to start the server

### Warnings

-   `warn Fast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/messages/fast-refresh-reload`
    -   This is a known issue with Next.js and Fast Refresh. It's not a problem with the app, but rather a problem with Next.js. See [here](https://github.com/vercel/next.js/issues/40184#issuecomment-1328881068) for more info.

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Jesse De Lira - jessedelira1@gmail.com

<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-0a7ea3?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://reactjs.org/
[tRPC]: https://img.shields.io/badge/tRPC-317eb9?style=for-the-badge&logo=trpc&logoColor=white
[tRPC-url]: https://trpc.io/
[Prisma]: https://img.shields.io/badge/Prisma-1B222D?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[NextAuth]: https://img.shields.io/badge/NextAuth-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[NextAuth-url]: https://next-auth.js.org/
[Tailwind]: https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Prettier]: https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white
[Prettier-url]: https://prettier.io/
[ESLint]: https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[MySQL]: https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/
[Docker]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Vercel]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[node]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/en/
[AWS]: https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white
[AWS-url]: https://aws.amazon.com/
