## Huddle

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)


Team Members:
Steven Cho
John Braithwaite


## General Info
This browser based web application to serve up a multiplayer trivia game.
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap 
* Node.js
* Socket.io
	
## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
|-- profile.html             # what people see when they click on 
settings
|-- play_with.html           # fork in the taskflow: either creating or joining a game
|-- server.js		     # starts the server, governs socket behaviour
|-- package.json	     # file holding metadata about the project
|-- package-lock.json	     # file governing the tree of modules to enable later installs
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
|-- node_modules	     # Folder containing all dependencies
├── images                   # Folder for images
    /Huddle.jpg              # brain-shaped logo
├── scripts                  # Folder for scripts
    /client.js               # script that governs client-side node and socket interactions
├── styles                   # Folder for styles
    /app.css                 # CSS styling for all the pages

Firebase hosting files: 
├── .firebaserc...


```

Tips for file naming files and folders:
* use lowercase with no spaces
* use dashes (not underscore) for word separation

