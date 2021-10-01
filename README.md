# ShortLah link shortener server backend

Backend for Shortlah URL shortener.

## Description

Node ExpressJS backend for a URL shortener. Built with the MERN stack (MongoDB, Express, ReactJS, Node). Accompanying frontend repo is [here](https://github.com/wenruiliau/shortlah-client).

Bootstrapped with [Express-REST-API-Template](https://github.com/rzgry/Express-REST-API-Template).

Live demo [here](shortlah.vercel.app).

## Getting Started

### Dependencies

- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

### Installing

- Setup environment variables
  - `cp .env.example .env`
  - Add your MongoDB cluster password in `.env`
- Change MongoDB endpoint
  - In `app.js`, change the `uri` variable with your MongoDB cluster.
- Install dependencies
  - `npm install`

### Executing program

- Run dev server
  - `npm run dev`
- Dev server refreshes when updated

## Authors

[@wenruiliau](https://github.com/wenruiliau)

## License

MIT License
