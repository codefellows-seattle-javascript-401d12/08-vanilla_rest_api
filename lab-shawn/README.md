# **Vanilla HTTP RESTful API**

## **Overview**

  This application is a HTTP RESTful API written in vanilla JavaScript. It utilizes the GET, POST, & DELETE methods to fetch, add, and remove files in a file system.

## **How To Use API**
  * Clone this repository
  * Open a terminal and run `npm i` to install all the application dependencies

    #### Dependencies
    * bluebird 3.4.6
    * node-uuid 1.4.7

    #### Dev dependencies
    * chai 3.5.0
    * gulp 3.9.1
    * gulp-eslint 3.0.1
    * gulp-mocha 3.0.1
    * mocha 3.2.0
    * superagent 3.3.0


### **Run your server**
   `node server.js`

In a new terminal window/tab run your HTTP method commands

### **POST Request**
  `http POST localhost:[port number] name='[name]' gender='[gender]'`

### **GET Request**
  `http GET localhost:[port number]?id='[id]'`

### **DELETE Request**
  `http DELETE localhost:[port number]?id='[id]'`
