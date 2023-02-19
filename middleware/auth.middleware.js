// const jwt=require("jsonwebtoken")

// const authenticate=(req,res,next)=>{
//     const token=req.headers.authorization

//     if(token){
//         jwt.verify(token,"masai",(err,decoded)=>{
//            if(decoded){
//             console.log(decoded)
//             res.body.user=decoded.userID
//              console.log("yh tk aya")
//             next()

//            } else{
//             res.send({"msg":"please login"})
//            }
//         })
//     } else{
//         res.send({"msg":"please login"})
//     }
// }

// module.exports={
//     authenticate
// }



const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token)
    {
        jwt.verify(token,"masai",(err,decoded)=>{
            console.log(decoded)
            if(decoded)
            {
                // console.log(decoded)
                req.body.user=decoded.userID
               // req.body.author=decoded.author
                next()
            }
            else
            {
                res.send({"msg":"please login"})
            }
        })
    }
    else
    {
        res.send({"msg":"please login"})
    }
}

module.exports={
    authenticate
}

