# Arkcafe-Backend

## Built With
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)

## Requirements
* [Node.js](https://nodejs.org/en/)
* [Database](payment.sql)
* [Postman](Payment-App-ZWallet.postman_collection.json)

## Installation

Clone this repository and then use the package manager npm to install dependencies.

## Project setup

```
npm install
```

### Install nodemon

Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

If you have already installed, skip this step.

```
npm install -g nodemon
```

## Setup .env example

Create .env file in your root project folder.

```env

DB_HOST = localhost
DB_USER = "your database username" || root (default)
DB_PASSWORD = "your database password" || '' (default)
DB_DATABASE = arkcafe
PORT = "your port"
SECRET_KEY = "your secret key"

```

### Compiles and hot-reloads for development
```
npm run dev
```

### Admin (for full access)
```
email: akbar@gmail.com
password: akbar1234
```

