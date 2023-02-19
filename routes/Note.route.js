const express=require("express")
const {NoteModel}=require("../model/Note.model")
const jwt=require("jsonwebtoken")
const noteRouter=express.Router()

noteRouter.get("/",async(req,res)=>{
    const notes= await NoteModel.find()
    res.send(notes)
    //res.send("wlcome")
})


noteRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  
  jwt.verify(token, "masai", async (err, decoded) => {
    if (decoded) {
      console.log(decoded)
      try {
        const notes = await NoteModel.find({user:decoded?.userID});

        res.send(notes);
      } catch (err) {
        res.send({ msg: "not found" });
      }
    } else {
      res.send({ msg: "not can't be reached" });
    }
  });
});

noteRouter.post("/create",async(req,res)=>{
    const payload=req.body
    const note= new NoteModel(payload)
    await note.save()
    res.send({"msg":"Note Created"})
})

noteRouter.delete("/delete/:id",async(req,res)=>{
     const noteID=req.params.id
     await NoteModel.findByIdAndDelete({_id:noteID})
    res.send({"msg":`Note with id ${noteID}`})
})


noteRouter.patch("/update/:id",async(req,res)=>{
    const noteID=req.params.id
    await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
   res.send({"msg":`Note update with id ${noteID}`})
})



module.exports={
    noteRouter
}