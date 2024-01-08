import express from "express"
import mysql from "mysql2"
import cors from "cors"
// import multer from "multer"
import path from "path"

import CLoudinaryConnect from "../backend/cloudinary.js"




// const upload = multer({ storage:multer.memoryStorage() })

const app=express()
const port=8800;
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Raj#2003",
    database:"test"
});


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.json("ITs backend")
})

app.get('/books',(req,res)=>{
    const q="SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) 
            return res.json(err)
        else
            return res.json(data);
    });
})



app.post("/books",(req,res)=>{


    const q= "INSERT INTO books (`title` ,`desc`,`cover`,`Price`)VALUES (?)";
    const values = [
        req.body?.title,
        req.body?.desc,
        req.body?.cover,
        req.body?.Price,
    ]


    db.query(q,[values],(err,data)=>{
        if(err) 
            return res.json(err)
        else
            return res.json("book has been created successfully");
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId=req.params.id;
    const q = "DELETE FROM books WHERE id=?"

    db.query(q,[bookId],(err,data)=>{
        if(err) 
            return res.json(err)
        else
            return res.json("book has been deleted successfully");
   
    })
});

app.put("/books/:id",(req,res)=>{
    const bookId=req.params.id;
    const q = "UPDATE books SET `title`=?,`desc`=?,`price`=?,`cover`=? where id = ?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.Price,
        req.body.cover

    ]

    db.query(q,[...values,bookId],(err,data)=>{
        if(err) 
            return res.json(err)
        else
            return res.json("book has been updated successfully");
   
    })
});

app.listen(port,()=>{
    console.log(`connected to backend!!!`);

})
