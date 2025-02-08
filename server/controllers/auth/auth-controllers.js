const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require('../../models/User')


//register

const register = async(req,res)=>{
    const {userName,email,password} = req.body

    try {
        
    } catch (error) {
        console.log("🚀 ~ register ~ error:", error)
        res.status(500).json({
            success:false,
            message:"Some Error occured in registration time"
        })
        
    }
}


//login

const login = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log("🚀 ~ register ~ error:", error)
        res.status(500).json({
            success:false,
            message:"Some Error occured in registration time"
        })
        
    }
}




//logout





//auth middleware