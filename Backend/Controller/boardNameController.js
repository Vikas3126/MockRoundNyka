const express=require("express");
const BoardModel=require("../Model/boardModel");

const auth=require("../middleware/authMiddlware")


const boardNameRouter=express.Router();

boardNameRouter.use(auth)

boardNameRouter.post("/create",async(req,res)=>{

    try {
        const {name}=req.body;

     const newBoard=new BoardModel({name});

    newBoard.save();
    res.status(200).json({mesg:"new Board Name is created",newBoard});
    } catch (error) {
        res.json({mesg:error})
    }
})


module.exports=boardNameRouter;