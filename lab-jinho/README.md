# Vanilla-REST-API
=============

structures :
- lib
    - parse-json.js
    - parse-url.js
    - storage.js
    - router.js
- model
    - restaurant.js
- test
    - restaurant-route-test.js
- root
    - server.js
    - gulpfile.js
    - .gitignore
    - .eslintrc
    - README.md

## Getting Started
- In terminal enter : node server.js
- also you can run gulp
- for tests in terminal enter:
    - gulp OR mocha


### Prerequisities

- dependencies:

```
npm install -S node-uuid
npm install -S superagent

```

- devDependencies:

```
npm install -D gulp-eslint
npm install -D gulp-mocha
npm install -D mocha
npm install -D gulp
npm install -D chai

```

## Running

- In your root server, type in the command **"node server.js"** in your terminal.
- OR in terminal type: gulp


- GET request:
    ```http localhost:3000/api/restaurant?id=selectedId ```

- POST request:
    ```http POST localhost:3000/api/restaurant restaurantname="name of restaurant" address="location address" ```

- DELETE request:
    ```http DELETE localhost:3000/api/person?id=selectedId ```

## Testing:
- we have 5 tests for GET and POST requests :
    - test to ensure that  API returns a status code of 404 for routes that have not been registered
    - tests to ensure that **/api/restaurant** endpoint responds as described for each condition below:
        - GET - test 404, responds with 'not found' for valid request made with an id that was not found
        - GET - test 400, responds with 'bad request' if no id was provided in the request
        - GET - test 200, response body like {<data>} for a request made with a valid id
        - POST - test 400, responds with 'bad request' for if no body provided or invalid body
        - POST - test 200, response body like {<data>} for a post request with a valid body

## Built With:

* Nodejs
* JavaScript

## Versioning

Not Applicable

## Authors

* **BlueToad** - [Github](https://github.com/jmpaik)

## License

None.
