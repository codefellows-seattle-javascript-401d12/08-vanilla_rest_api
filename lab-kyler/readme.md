#Lab 08 - Vanilla REST API
##About
This is a basic HTTP server made without any node serverframeworks. You can GET, POST, and DELETE jokes which are stored in memory.

##Usage
Server runs on `$PORT` or defaults to 2001.
* Store a joke with a POST to /api/joke, including `setup` and `punchline` in the body.
* Retreive a joke with GET to /api/joke, including `id` as a URL parameter.
* Delete a joke with DELETE to /api/joke, including `id` as a URL parameter.
* Enumerate stored jokes with a GET to /api/joke, with no URL parameters.
