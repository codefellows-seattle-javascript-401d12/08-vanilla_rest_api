# Vanilla Ski Report REST api

## About
The vanilla Ski Report REST api is built to allow consumers to get valuable ski report data about any area they want to ski in. The api will respond to any of the following commands `GET`, `POST`, `DELETE`. The routes on the api are currently set to be reachable at `localhost:<YOUR PORT NUMBER>/api/ski-data`. In order for this API to work you will need to `npm i` to install `node-uuid` and `bluebird`, which is required to run this API. You will also need HTTPie installed globally on your machine in order for the API responses to reach your terminal correctly.

## Current Version (0.1.0)
* The current version of this application will persist user data locally on the users file system. Users can `POST`, `GET`, and `DELETE` files.

## Setting up Vanilla Ski Report REST api on your local machine
* Fork this repo
* `git clone` the forked copy to your local machine
* Node is required to run the server. Confirm you have `node` installed on your local machine by typing `npm -v` into your terminal. If you don't have node installed please follow the instructions [here](https://nodejs.org/en/).
* Install the dependencies of `node-uuid` and `bluebird` by running `npm i`.
* In order to turn on the server you will need to run either `nodemon server.js` or `node server.js` if you do not have nodemon installed globally.
 * When you start the server via `node server.js` the port number should be printed to the terminal console. You will need to provide this to any users wanting to connect.

## API Commands
* `POST`: `http POST localhost:<YOUR PORT NUMBER>/api/ski-data location='<YOUR LOCATION DATA>' rating=<NUMBER>`
 * This will return a header with status code and a JSON representation of the data you just added.
 * The `POST` will write a file to the `../data/location/` file saved with `uuid` as the file name.
* `GET`: `http localhost:<YOUR PORT NUMBER>/api/ski-data?id=<ID OF OBJECT YOU WANT BACK>`
 * This will return a header with status code and a JSON representation of the data you just requested.
 * If you request a file via and `id` that does not exist then the api will return 404.
 * If you run a bad `GET` method and do not pass an `id` the api will return 400.
* `DELETE`: `http DELETE localhost:<YOUR PORT NUMBER>/api/ski-data?id=<ID OF OBJECT YOU WANT TO DELETE>`
 * This will return a header with a status code of 204.
 * The object deleted will be removed for the database.
* `Mocha`: this will run tests set up to validate that the code is working as expected.
 * at the time of publication of this README.md all tests are currently passing.
