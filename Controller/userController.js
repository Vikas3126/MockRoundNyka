const express = require("express");
const UserModel = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {

   try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
        res.json({ mesg: "Email already used" })
    } else {
        const salt = 5;
        bcrypt.hash(password, salt)
            .then((hasPass) => {
                const newUser = new UserModel({ email, password: hasPass });

                newUser.save();
                res.status(200).json({mesg:"user registerd successfully"})
            })
    }
   } catch (error) {
    res.json({mesg:error})
   }
})

userRouter.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {

                if (result) {
                    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.secretKey)
                    res.status(400).json({ msg: "loign is Successful", token })
                }else{
                    res.status(400).json({ msg: "Wrong password" })
                }
            })
        } else {
            res.status(400).json({ msg: "Wrong email " })
        }
    } catch (error) {
          res.json({mesg:error})
    }
})

module.exports=userRouter;