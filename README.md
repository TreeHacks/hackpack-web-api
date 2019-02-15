# Web API tutorial
## from your friendly neighborhood web developers Andrew and Nick

### Overview

Welcome to TreeHacks! This is the guide accompanying the Web API workshop. The goal of this workshop is to learn how to build RESTful web APIs using Node, MongoDB, and Express. From this workshop, you will learn what a web API is, dive into the frontend/backend structure of the web, and build your own backend for your web applications! You will also learn a bit about JavaScript and all the interesting things you can do in it.

### Workshop - getting started
To get started with the full workshop, make sure you install Node JS. Run the following:

```
npm install
npm start
```

And then the server should start up at `localhost:3000`.

This server uses `mongodb-memory-server` to run MongoDB in-memory as a database, Express for the API endpoints,

If you want a challenge, use the `skeleton` branch (`git fetch && git checkout skeleton`) and you can fill out the implementation for the API endpoints yourself.


### What is an API?

API stands for Application Programming Interface. Pretty much, APIs are a way to access data and services running on servers from your own program. A great example of a publicly available API is the Dog API (literally called this) at https://dog.ceo/dog-api/. You can access all kinds of cool information about dogs by clicking the "JSON" button listed under each route. Give it a go! 

You'll notice you'll be redirected to a webpage with some texted formatted in curly '{}' brackets. What you are seeing is a JavaScript Object represented in JSON (JavaScript Object Notation). A JS Object is essentially a Python dictionary, or a C++ map in that it's function is mapping keys to values. Practically everything in JavaScript is an Object (another story), so that's why it's important. Another reason why it's important is that JSON is the standard way to represent data being transferred across the web in general, so for example when you register an account on a website, the data being sent to the web server is in JSON. Also, MongoDB stores it's information in JavaScript Objects.

What's cool is that you can pass these API calls into your web programs so that the returned data is accessible from your application. This allows us to integrate all kinds of cool information from public (and private like those available from sponsors at TreeHacks!) APIs into our own code. We shall demonstrate how to do in the workshop using the Dog API!

### Frontend vs Backend, or singlehandedly demystifying the magic of the Internet

Ever wondered how the internet works? Very simply, when you go to a website, you are recieving a load of JavaScript, CSS, and HTML files from some server that are then run by your web browser. The code running in your browser is the frontend, and the code running on the server delivering information is the backend. Web development consists of writing code that runs on both ends (fullstack), with people specializing towards one or the other. An API is essentially the code delivering resources from the backend. Since we are building a web API, the focus of our workshop is going to be on building out the backend.

### Building a Social Network for an animal shelter

In the workshop, we will be pretending to build a Web API to be used by some hypothetical animal shelter. Essentially, the animal shelter wants to be able to assign dogs from the shelter randomly to new owners. Since they're located in Silicon Valley, they also want to build a social network on top of this operation to be able to see which dog owners are friends so that they can coordinate meetups for dog owners. They have come to TreeHacks to find some bright college kids to do this for them for cheap.

To accomplish this task, we will be building a web API using Node and Express that interfaces with the Dog API, as well as an accompanying frontend that allows the animal shelter to view all the information about their users. We want to support the operations of adding people and assigning a shelter dog to them, viewing all dog owners, adding a friend relationship between 2 dog owners, displaying the friends of a dog owner to organize meetups, and deleting a dog owner from the database in case their dog died... (we couldnt think of a better justification for this one sorry I know it's dark but it's a very important thing to know how to do rip).

### Resources

You can access the fully written code for our web API and look over the slides used in our presentation here in this GitHub repo under the Master branch!

Mozilla also has an excellent documentation website called the MDN that outlines anything you may ever want to know about web development in detail. They have a great text-based guide to getting started in web development here: https://developer.mozilla.org/en-US/docs/Learn

The slides we used were generously provided by TheNetNinja youtube channel's tutorial playlist on REST APIs. He goes in more depth as to what is going on while building a REST api than we did, and expands on the frontend development side with a great application built using React. You can check that out here: https://www.youtube.com/playlist?list=PL4cUxeGkcC9jBcybHMTIia56aV21o2cZ8

