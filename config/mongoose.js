// require the library 
const mongoose= require('mongoose');

// used to connect to the database
mongoose.connect('mongodb://localhost/contact_list_db');

// acquire the connection to check if its working or not
const db =mongoose.connection;

// error
db.on('error',console.error.bind(console, 'error connecting to db'));

// up and running then print the required message
db.once('open',function(){
    console.log("Successfully connected to the database");
});
module.exports =db;