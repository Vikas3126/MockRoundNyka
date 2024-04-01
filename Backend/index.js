const express=require("express");
const connection=require("./db")
const app=express();
const userRouter=require("./Controller/userController");
const boardNameRouter=require("./Controller/boardNameController");
const taskRouter=require("./Controller/taskController")


app.use(express.json());

app.get("/",(req,res)=>{
    res.json({mesg:"working"})
})
app.use("/",userRouter)
app.use("/boards",boardNameRouter)
app.use("/tasks",taskRouter);
app.listen(8800,async()=>{
    try {
        await connection
        console.log("connected to DB");
        console.log("server is running at port 8800");
    } catch (error) {
        console.log(error)
    }
})