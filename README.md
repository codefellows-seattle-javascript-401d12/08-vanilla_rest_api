# Vanilla REST API

## General description

This is a basic API app that allows a developer to POST, GET and DELETE data from an API. A developer should be able to see the appropriate response statuses when interacting with the API.

## How do I use this app?

* Clone this repo and run the command `npm i` in your terminal to install all of the dependencies.

* You will also need to run the command `brew install httpie`. For this app, the requests used in the terminal are formatted via HTTPie CLI.

* Open 2 panes in your terminal to see how you, as the developer, can interact with this server.

* Be sure that you are in the root of the repo directory before attempting to initiate the port to the server. To do this, run `node server.js` in the first terminal pane.
  * `server running:` followed by your PORT number should be logged in the terminal


### POST requests
  * **i.e.** 200 OK request: `http POST localhost:8000/cowsay text=message` OR `http POST localhost:8000/cowsay text='post request works'`
    * You should receive a cowsay response with your embedded message.
  * **i.e.** 400 BAD request: `http POST localhost:8000/cowsay` (no message attached to POST)
    * You should receive a cowsay response with a 'bad request' message.

### GET requests
  * **i.e.** 200 OK request: `http localhost:8000/api/pin?id=17b389b0-c2ff-11e6-9794-69f9c8e1c4f5`
    * You must pass in a query string equal to the unique id of the pin you want to retrieve.
    * You should receive a response with the content of the appropriate pin.
  * **i.e.** 400 BAD request: `http localhost:8000/api/pin`
    * You should receive a response with a 'bad request' message.

### DELETE requests

GET and POST request commands should be ran in the second terminal pane.
