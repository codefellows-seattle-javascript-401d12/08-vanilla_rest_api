# REST API

This rest api provides necessay backend support functionality create, read, update and delete. Currently it is saving data on the object called storage which provides a vary little persistance during server session.

### Dependencies:

- http
- url
- querystring
- node-uuid
- superagent
- mocha
- chai

This API is structured on a Model View Controller(MVC) architecture pattern. The base technologies are node.js server, node.http module.


POST:
example: http POST localhost:3000/api/schemaname
data: name='some name' content='some content'.

result:

~~~
http POST localhost:3000/api/note name='some name' content ='some content'

HTTP/1.1 200 OK
Connection: keep-alive
Date: Sun, 18 Dec 2016 10:44:33 GMT
Transfer-Encoding: chunked

{"id":"f6430460-c50e-11e6-bf7b-83ba05acfa32","name":"some name","content":"some content"}
~~~

GET:
example: http GET localhost:3000/api/scheimaname 

~~~
http GET localhost:3000/api/note id=="f6430460-c50e-11e6-b f7b-83ba05acfa32"
HTTP/1.1 200 OK
Connection: keep-alive
Content: application/json
Date: Sun, 18 Dec 2016 10:50:27 GMT
Transfer-Encoding: chunked

{"id":"f6430460-c50e-11e6-bf7b-83ba05acfa32","name":"some name","content":"some content"}

*****************************
http GET localhost:3000/api/note id=="f6430460-c50e-11e6-b f7b-83ba05acfa32"
HTTP/1.1 204 No Content
Connection: keep-alive
Content: text/plain
Date: Sun, 18 Dec 2016 10:54:54 GMT

~~~

DELETE:
~~~
http DELETE localhost:3000/api/note id=="f6430460-c50e-11e 6-bf7b-83ba05acfa32"

HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: text/plain
Date: Sun, 18 Dec 2016 10:54:07 GMT
Transfer-Encoding: chunked

item deleted!
~~~


PUT:

~~~
http PUT localhost:3000/api/note id="ceaf91a0-c510-11e6-bf 7b-83ba05acfa32" name='apple'
content='apple is a fruit.' place='seattle' favFood='some thing'
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 0
Date: Sun, 18 Dec 2016 10:59:24 GMT
~~~
