
const express=require("express")
const {UserModel}=require("../model/User.model")
const jwt=require("jsonwebtoken")
const userRouter=express.Router()
const bcrypt= require("bcrypt")

userRouter.post("/register",async(req,res)=>{
const {name,email,pass}=req.body
    try{

        bcrypt.hash(pass, 5, async(err, hash)=> {
            if(err){
                res.send({"msg":"error something","error":err.message})
            } else{
                const user=new UserModel({name,email,pass:hash})
                await user.save()
                res.send({"msg":"register successful"})
            }
        });
    }catch(err){
        res.send({"msg":"somthing wrong input"})

    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
        try{
            const user=await UserModel.find({email})
            console.log(user,"user")
            if(user.length>0){
                bcrypt.compare(pass,user[0].pass, (err, result)=> {
                    console.log(user[0].pass,"pass")
                    console.log("res",result)
                    if(result){
                        
                        let token=jwt.sign({userID:user[0]._id},"masai")
                        res.send({"msg":"login successful","token":token})
                    } else{
                        res.send({"msg":"somthing wrong "})
                    }
                });
                
            }else{
                res.send({"msg":"somthing wrong input "})

            }
        }catch(err){
            console.log(err)
        }
    })

    module.exports={
        userRouter
    }