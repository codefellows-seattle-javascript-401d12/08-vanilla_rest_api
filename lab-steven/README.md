#Vanilla Single-Resource REST API
###Steven Bateman's Lab 08 for JS 401

This is an app that will allow you to practice GET, POST, and DELETE requests against a simple, single-resource API.

To install this app, clone down the repository, navigate to the `lab-steven` directory, then run `npm i`. Then, to start your server, run `node server.js`. You should see the message: `Server running on port <port#>`.

Now open up an additional terminal shell/tab and you can connect to the API by using HTTPIE. You can install HTTPIE on a Mac by running `brew install httpie` or on Linux by running `sudo apt install httpie`. By default, the API does not have any resources available, so you will need to POST some to use GET or DELETE.

This particular API supports the POSTing of student objects that have a name and an age field. You can include as many properties as you'd like, but it must at least have a name and age. You can POST an object by running `http POST localhost:<port#>/api/student name="<name>" age="<age>"`.

If you forget to include the header fields, you will get back a 400 status message of bad request. If you forget to include name and age fields, you will also get a 400 status response.

This app does not use a database, so its storage object will only exist as long as the server is still running.

Once a student (or multiple students) have been POSTed to the API, you can perform a GET request on a particular ID to get that student's information back by passing in a query of the student's ID. For example: `http localhost:<port#>/api/student?id=<student ID>`. If you want to get a list of all student IDs, you can simply do `http localhost:<port#>/api/student`.

If you pass in an incorrect ID, you will get back a 404 message of not found.

If you'd like to DELETE a student from the API, it works just like a GET request. `http localhost:<port#>/api/student?id=<student ID>` will delete the student with the corresponding ID.

Similar to GET requests, if you include the wrong ID, you will get back a 404 not found error. If you don't include an ID, you will get back a 400 bad request error.
