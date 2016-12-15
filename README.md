# Vanilla Rest API

This project creates a local REST API and allows users send GET, POST and DELETE requests through the terminal.
When sending requests, use filepath `/api/dog` with a query, a response will return with appropriate message.
You will need to [HTTPie](https://httpie.org/) to send requets through the terminal.

## How to run

Install any Dependencies from the `package.json` file into the project root
directory. Using node, you can run the command `npm i` to install all
depenenedcies.

## Running server

Run the `server.js` file using command `node server.js`. You should see `Server up: 800` in terminal.

## Sending GET POST DELETE Request

>GET Request

In an new terminal window, send a GET request by using the command `http localhost:8000/api/dog?id=<id>`.
Example: `http DELETE localhost:8000/api/dog?id=00000000-c303-11e6-a4a3-73422de980bc`
The reponse should be a JSON object.

>POST Request

In an new terminal window, send a POST request by using the command
`http POST localhost:8000/api/dog name=<name> breed=<breed> color=<color>`. 
Example: `http POST localhost:8000/api/dog name='Buddy' breed='Golden Retriever' color='brown`
The POST request must include `name` `breed` and `color` parameters.
The response should be a JSON object with values you entered along with a unique `id`.

>DELETE Request

In an new terminal window, send a DELETE request by using the command
`http DELETE localhost:8000/api/dog?id=<id>`. 
Example: `http DELETE localhost:8000/api/dog?id=00000000-c303-11e6-a4a3-73422de980bc`
The response should be a 204 status code with no content.


## Closing server

In server terminal, enter ```control``` + ```c```.
