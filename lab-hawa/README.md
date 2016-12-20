__Vanilla Rest API__
======
This server-side application creates a local REST API using vanilla JavaScript which allows the user to POST, GET and DELETE requests.

---
## Cloning the Repository
Clone down this repository:  https://github.com/abdih17/08-vanilla_rest_api.git

```
$ git clone https://github.com/abdih17/08-vanilla_rest_api.git
```

## Installation

Install any dependency from the `package.json` file into the project root
directory, and start the server.

```sh
$ cd lab-hawa
$ npm -i
$ node server.js
```

You should receive the following result: `Server up: 3000` or whichever port number have preset in your environment variables.

Checkout the [Node.js](https://nodejs.org/) documentation for more information on **npm**.

## Set Up Neccessary Directories

Before writing our POST requests in our server, we need to create a directory were the data can be stored. In order to do so, you need to create a folder called 'spiritAnimal', inside of a folder called 'data'

```sh
$ cd lab-hawa
$ mkdir data
$ cd data
$ mkdir spiritAnimal
```

## POST, GET, and DELETE Requests

**POST Request:**
The POST request must include name, spiritAnimal, and spiritAnimalName parameters.

>**In an new terminal window, send a POST request by using the command:**
>`http POST localhost:3000/api/spiritAnimal name=<name> spiritAnimal=<creature> spiritAnimalName=<creature name>`.

A successful response should return a JSON object with values you entered along with a unique **id number** and a status code of **200**. This will also create a new `.json` file into the `data` folder with the `id` as the file name.

Here's an example of a POST request and the successful response:
```
$ http POST localhost:8000/api/spiritAnimal name="Hawa" spiritAnimal="Pink Dragon" spiritAnimalName="Simba"

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 88
Content-Type: application/json; charset=utf-8
Date: Fri, 16 Dec 2016 23:18:59 GMT
{
  "id":"4faeb780-c3eb-11e6-ba42-1b7a8e4bbe3b",
  "name":"Hawa",
  "spiritAnimal":"pink dragon",
  "spiritAnimalName":"Simba"
}
```

**GET Request:**

>**In a new terminal window, send a `GET` request by using the command:**
>`http localhost:3000/api/spiritAnimal?id=<id>`.

A successful response should return a JSON object with a status of **200**.

Using the unique **id** number from, here's an example of a successful GET request and response:
```
$ http localhost:3000/api/spiritAnimal?id=4faeb780-c3eb-11e6-ba42-1b7a8e4bbe3b

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 88
Content-Type: application/json; charset=utf-8
Date: Fri, 16 Dec 2016 23:28:01 GMT
{
  "id":"4faeb780-c3eb-11e6-ba42-1b7a8e4bbe3b",
  "name":"Hawa",
  "spiritAnimal":"pink dragon",
  "spiritAnimalName":"Simba"
}
```

**DELETE Request:**

>**In a new terminal window, send a `DELETE` request by using the command:**
>`http DELETE localhost:8000/api/dog?id=<id>`

The a successful response should return a **204** status code with no content.
Here's a successful DELETE request and response:
```
$ http DELETE localhost:3000/api/spiritAnimal?id=4faeb780-c3eb-11e6-ba42-1b7a8e4bbe3b


```

## Exit the Server

Go back to the terminal where your server is running with the port number and press **Ctrl+C** in order to exit the server.

---
