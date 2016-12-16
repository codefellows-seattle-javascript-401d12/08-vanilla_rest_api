# Vanilla REST api

This vanilla API allows a user to make GET, POST, and DELETE requests to the Artist object. The user can POST a new Artist name and genre, receive an id, and can delete the Artist by that id.

### Set-Up

In your Terminal

* Run `npm i` to install proper dependencies. You should receive the following in your package.json file:
* `node-uuid`
* `chai`
* `mocha`
* `superagent`


* Run `node server.js` to start your server. You will receive a response of 'server live on PORT: `<PORT>`'


### Use

Making a POST request
* Run `http POST localhost:<PORT>/api/artist name='<name>' genre='<genre>'`
* This will update the Artist object to show `name:` `genre:` and `id:`
* You will also receive a status code of 200.

Making a GET request
* Run `http localhost:<PORT>/api/artist?id=<id>`
* You must copy and paste the id from the post request.
* You will also receive a status code of 200.

Making a POST request
* Run `http DELETE localhost:<PORT>/api/artist?id=<id>`
* This will delete the Artist with the id you pass in
* You will receive a status code of 204 No Content


* If you run `http localhost:<PORT>/api/artist` you should receive a 400 status code, and a message of 'bad request'

* If you run `http POST localhost:<PORT>/api/artist` you should receive a 400 status code, and a message of 'bad request'
