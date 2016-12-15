# Vanilla Ski Report REST api

## About
The vanilla Ski Report REST api is built to allow consumers to get valuable ski report data about any area they want to ski in. The api will respond to any of the following commands `GET`, `POST`, `DELETE`. The routes on the api are currently set to be reachable at `localhost:<YOUR PORT NUMBER>/api/ski-data`. In order for this API to work you will need to `npm i` to install `node-uuid`, which is required to run this API. You will also need HTTPie installed globally on your machine in order for the API responses to reach your terminal correctly.

## API Commands
* `POST`: `http POST localhost:<YOUR PORT NUMBER>/api/ski-data location='<YOUR LOCATION DATA>' rating='<NUMBER>'`
 * This will return a header with status code and a JSON representation of the data you just added.
 * The data returned will also return an `id:` property that will be contained in the JSON. In order to `GET` a specific piece of data you will need this `id:`
* `GET`: `http localhost:<YOUR PORT NUMBER>/api/ski-data?id=<ID OF OBJECT YOU WANT BACK>`
 * This will return a header with status code and a JSON representation of the data you just requested.
 * If you request an object that does not exist then the api will return 404.
 * If you run a bad `GET` method and do not pass an `id` the api will return 400.
* `DELETE`: `http DELETE localhost:<YOUR PORT NUMBER>/api/ski-data?id=<ID OF OBJECT YOU WANT TO DELETE>`
 * This will return a header with a status code of 204.
 * The object deleted will be removed for the database.
