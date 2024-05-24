import express from "express"
import mysql from "mysql"
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Mayank@123",
    database:"test"

})

app.use(express.json());
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hello this is backend");
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM test.books";
    db.query(q,(err,data)=> {
        if(err) return res.json(err)
            return res.json(data);
    })
})

app.post("/books", (req,res)=>{
    const q = "insert into books (`title`, `desc`, `cover`) values (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ]

    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
            return res.json("books has been created");
    })
})

app.listen(8080, ()=>{
    console.log("connected to backend!")
});