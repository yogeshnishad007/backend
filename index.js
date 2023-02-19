const express=require("express")

const {connection}= require("./db")
const {userRouter}=require("./routes/User.route")
const {noteRouter}=require("./routes/Note.route")
const {authenticate}=require("./middleware/auth.middleware")
const cors=require("cors")
require("dotenv").config()
const app=express()
app.use(express.json())

app.use(cors())

app.get("/",(req,res)=>{

    res.send("Hone Page")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)


app.listen(process.env.port, async(req,res)=>{
    try{

        await connection
        console.log("db is connected")
    }catch(err){
       
        console.log(err)
    }
    console.log(`Port ${process.env.port} is running`)

})