const jwt=require("jsonwebtoken");
require("dotenv").config();

const auth=async(req,res,next)=>{

    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)
    

    try {
        if(!token) throw "Access token is missing"

        const decoded=jwt.verify(token,process.env.secretKey)

        if(decoded){
            console.log(decoded);
            req.userId = decoded.userId;
            next()
        }
        else{
            res.json({mesg:"not authorized"});
        }
    
    } catch (error) {
        console.log(error)
        res.json({mesg:error})
    }

}
module.exports=auth;