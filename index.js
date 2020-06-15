const express= require('express');
const path= require('path');

const port=4000;
const db = require('./config/mongoose');
const Contact=require('./models/contact'); 
const app=express();
app.use(express.static('assets'))
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err)
        {
            console.log("Error in fetching contacts from database");
            return;
        }
        return res.render('home',{
        title:"My Contact List",
        Contact_List:contacts
    });
    });
}); 

app.post('/create-contact',function(req,res)
{
    //ContactList.push(req.body);
    Contact.create(
        {
        name:req.body.name,
        number:req.body.number
        },function(err,Contact)
        {
            if(err)
            {   console.log('error in creating a contact');
                return;
            }
            console.log('*****',Contact); 
            return res.redirect('back');
        });
    });
//for deleting a contact get query from url
app.get('/delete-contact',function(req,res){
    //get the id from query in the url
    let id=req.query.id;

    //find th econtact in the database using id and then elete it
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log("error in deleting a contact from database");
            return;
        }
        return res.redirect('back');
    });
});

app.listen(port,function(err){
    if(err) {console.log("there is an error");
    return;
}

    console.log('Yup! It is running',port);
});