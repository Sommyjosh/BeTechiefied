//my modules
require("dotenv").config();

const { error } = require("console");
const express = require("express");
const app = express();
const port = process.env.port;

const path = require("path");

//my middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, "mentor")));

app.use((req, res, next)=> {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    console.log(`[${timestamp}] ${method} ${url}`);
    next();
});

//endpionts
app.get("/" , (req , res) =>{
    res.send("My Week 2 API")
});

app.post("/user" , (req , res) =>{
    const {name , email} = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "missing fields" });
    };
    console.log( `${name} and ${email}`);
    res.send("thank you for response");
});

app.get("/user/:id" , (req , res)=> {
    const id = req.params.id
    res.send(`welcome user ${id}`)
});

app.get("/static" , (req , res)=> {
    res.sendFile(path.join(__dirname , "mentor", "index.html"))
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})