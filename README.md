### Vanilla HTTP API Project

This is a fun project where we created a Vanilla HTTP API! Woo!

A visualization of the Vanilla HTTP API Project project may be seen below (credit to [Brian Nations](https://github.com/bnates)):

![alt text](https://raw.githubusercontent.com/codefellows/seattle-javascript-401d12/master/08-vanilla_rest_api/demo/visualization/vanilla-rest-api.png)

### Get the Project Running

To get this project running, type the following in your command line:

1. `git clone https://github.com/brittdawn/08-vanilla_rest_api.git`
2. `cd 08-vanilla_rest_api.git`
3. `npm i`
5. `node server.js`

You will now see the phrase "server is up: 3000" if you have not already specified a port number.

### Test the Vanilla HTTP API (POST)

1. Open a new terminal located at the root of this project and type `http POST localhost:3000/api/song title="Work" description="This is the best song by Iggy"`
2. You should get a JSON response with a description, id, and name with a `200` status code, like this example:

``` javascript
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Thu, 15 Dec 2016 01:27:30 GMT
Transfer-Encoding: chunked

{
    "description": "This is the best song by Iggy",
    "id": "a566c500-c265-11e6-9e10-dfc89ef9e523",
    "title": "Work"
}
```

### Test the Vanilla HTTP API (GET)

After making a POST, you can make a GET request.

1. Copy the id from your POST request above. Add it as a querystring to your GET request, like this example: `http localhost:3000/api/song?id=a566c500-c265-11e6-9e10-dfc89ef9e523`

2. You should get a JSON response with a description, id, and name with a `200` status code, like this example:

``` javascript
HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: application/json
Date: Thu, 15 Dec 2016 01:35:51 GMT
Transfer-Encoding: chunked

{
    "description": "This is the best song by Iggy",
    "id": "a566c500-c265-11e6-9e10-dfc89ef9e523",
    "title": "Work"
}
```
