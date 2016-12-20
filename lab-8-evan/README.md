# Vanilla REST API for adding and storing recipes

## *Overview*
This is RESTful API built out using vanilla JavaScript. The API has established routes for GET, POST, and DELETE. At the moment editing(changing recipes after their creation is not available). Due to the storage only being stored to an object within the application, recipes can be added, viewed and deleted while the server is running but they will not be retained once the server has stopped.

## *How to use*
* First you will need to clone this repo.
* Unique ID's are provided by `node-uuid`, and the application is dependent on `superagent`, so you will need to run `npm i` once you've cloned it.
* Upon getting your dependencies installed, to see the API in action, you will need to download [httpie](http://httpie.org), so that you may make GET, POST, DELETE, and soon PUT requests.

## *Example httpie requests*
### POST
* `http POST localhost:<yourportnumber>/api/recipe name=burger ingredients=meat,bun,deliciousness category=american`
### GET
* `http localhost:<yourportnumber>/api/recipe?id=<id created by node-uuid>`
### DELETE
* `http DELETE localhost:<yourportnumber>/api/recipe?id=<id created by node-uuid>`
