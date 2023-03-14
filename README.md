# Social Network API

## Link to Github repo: https://github.com/wasmulb/social-network-api

## Link to tutorial video: https://drive.google.com/file/d/1xkZeNaIG0LcvYtKzPNcIMZZGajidSmco/view

(You may need to download the video after visiting the link)

After filming the tutorial, I noticed my final route (delete reaction), did not go through in insomnia due to a typo in the url. I tested it afterwards, and the route does work correctly.

## Description

For this assignment, I built a social network API. This application used mongoDB and mongoose for the back-end. The API has two models; User and Thoughts. The Thoughts model also includes a reaction subdocument. With this API, the user can create a user, post thoughts, add friends, and post reactions to other thoughts. This application also uses the moment library to reformat the dates of the posts. There is also functionality to delete/update users, thoughts, and reactions.

I learned a lot from this assignment, mainly how to use a non-relational database. After completing this assignment, I feel confident in my abilities to use mongoDB/mongoose. I will consider using mongoose over sequelize in upcoming projects. I found that non-relational databases can be simpler in some scenarios. 

## Installation

To install this application to your computer, clone the repo to your local environment, then `npm i` in your terminal to install all dependencies. You will also need mongoDB installed on your computer.

## Usage

To use the application, install it with the instructions above. Then `npm start` in your terminal to get the server running. After the server is online, use Insomnia (or your preferred application) to call the endpoints. All endpoints are listed as comments in the routes files. 

## License

The MIT Licence was used for this assignment.