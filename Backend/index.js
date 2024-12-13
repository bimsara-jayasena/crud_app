import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser'

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud'
});

const app=express();
app.use(bodyParser.json());
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST','PUT','DELETE']
}));

app.get('/',async(req,res)=>{
    try{
        res.status(200).send({"message":"hello world"});
    }catch(error){
        res.status(500).send(
            {"error":error.message});
    }
})
app.get('/all',async(req,res)=>{
    try{
        const [users]=await db.promise().query('SELECT * FROM users');
        res.status(200).send(users);
    }catch(error){
        
        res.status(500).send({"error":error.message});
    }
})
app.post('/add',async(req,res)=>{
    try{
        const {name,age}=req.body;
        await db.promise().query('INSERT INTO users(name,age)VALUES(?,?)',[name,age]);
        res.status(200).send({"message":"new record added successfully"})
    }catch(error){
        res.status(500).send({"error":"error"})
    }
})
app.put('/update/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,age}=req.body;
        console.log(id,name,age)
        const [response]=await db.promise().query('UPDATE users SET name=?,age=? WHERE id=?',[name,age,id]);
        if(response.affectedRows>0){
            res.status(200).send({"message":"record updated successfully"})
        }
    }catch(error){
        res.status(500).send({"error":error})
    }
})
app.put('/remove/:id',async(req,res)=>{
    try{
        const {id}=req.params;
       
        const [response]=await db.promise().query('DELETE FROM users WHERE id=?',[id]);
        if(response.affectedRows>0){
            res.status(200).send({"message":"record removed successfully"})
        }
    }catch(error){
        res.status(500).send({"error":"error"})
    }
})
app.listen(5555,(err)=>{
    if(err){
        console.log(err)
    }
    console.log(`app is listening to port 5555`)
})