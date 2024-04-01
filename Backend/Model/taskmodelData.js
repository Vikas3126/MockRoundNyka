const mongoose=require("mongoose");

const taskSchema=mongoose.Schema({
    TaskName:{type:String,required:true},
    description:{ type: String },
    status:{type:String,enum:['Todo','Doing','Done'],default:'Todo'},
    subTask:{type:String }
},{
    versionKey:false
});

const TaskModel=mongoose.model("task",taskSchema);

module.exports=TaskModel;