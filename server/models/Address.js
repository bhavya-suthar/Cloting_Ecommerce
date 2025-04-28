const mongoose = require('mongoose')

const AddressSchema = new mongoose.Schema({
    userId:string,
    address:string,
    city:string,
    pinCode:string,
    phone:string,
    notes:string
},{timestamps:true})

module.exports = mongoose.model("Address",AddressSchema)
