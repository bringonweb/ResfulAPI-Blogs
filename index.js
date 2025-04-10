const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');           // this pacake is install throw npm and this pacage is used to automatically assined unique id 
const methodOverride = require('method-override');    //download methodOverride package from npm this pacake is used to change the form route like as you know html form has only get and post in methods and when you wants to call patch ao put aoor delete route then it is not possible in normal and for this you need to install this methodoverride package


app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));                  // call the methodOverridepackage

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));


let posts =[
    {
    id:uuidv4(),
    username:"aditya gupta",
    content:"I love coding",

},
{
    id:uuidv4(),
    username:"Rohit gupta",
    content:"I am confuse",

},
{
    id:uuidv4(),
    username:"stubham gupta",
    content:"My First day in School",

},

];


app.get("/posts", (req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username, content}= req.body;
    let id = uuidv4();
    posts.push({ id, username, content});
    // console.log(req.body);
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("show.ejs", {post});

});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let{id }= req.params;
    let post = posts.find((p)=>id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let{id} = req.params;
    posts = posts.filter((p)=> id !==p.id);
    res.redirect("/posts");

});
 
app.listen(port, ()=>{
    console.log("listening to port:8080");

});