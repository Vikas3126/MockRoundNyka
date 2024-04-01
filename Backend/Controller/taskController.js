const express=require("express");
const TaskModel=require("../Model/taskmodelData");

const auth=require("../middleware/authMiddlware")
const taskRouter=express.Router();

// taskRouter.use(taskRouter)

taskRouter.post("/addTask",async(req,res)=>{

   
    try {

        const {TaskName,description,status,subTask}=req.body;

        const newTask=new TaskModel({TaskName,description,status,subTask});
        
        newTask.save();
        res.status(201).json({mesg:"new task is added successfully",newTask});

        
    } catch (error) {
        res.status(500).json({mesg:"vikas"})
    }

})

taskRouter.delete("/delete/:taskId",async(req,res)=>{
   try {
    const {taskId}=req.params;

    const deleteTask=await TaskModel.findByIdAndDelete({taskId});

    if(!deleteTask){
        res.status(201).json({mesg:"task has been deleted successfully"})
    }
   } catch (error) {
    res.status(500).json({mesg:error})
   }
})

module.exports=taskRouter