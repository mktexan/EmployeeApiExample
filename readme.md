# Employee API

This is a simple API to manage users in a database.

# Setup

The .env file has two values

  + authHeaderKey. This is to mock out authorization. Put whatever you like and set it in the front end index.js file as well at the very top. No real authorization exists, only demonstration.
  + mongoConnectionString. Use this to set your mongo database connection string.

Create a .env file and put the values in them

### Installation

Install the dependencies and start the server.

``` sh
$ npm i
$ nodemon 
```

Or

``` sh
$ node server.js
```

```
Go to localhost:8080 in your web browser
```
