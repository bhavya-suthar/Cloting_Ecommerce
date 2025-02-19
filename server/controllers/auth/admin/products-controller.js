const { ImageUploadUtils } = require("../../../helpers/cloudinary")

const handleImageUpload=async(res,req)=>{
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = "data:" +req.file.mimetype +";base64," + b64
        const result = await ImageUploadUtils(url)

        res.json({success:true,result})

    } catch (error) {
        console.log("🚀 ~ handleImageUpload ~ error:", error)
        
    }
}

module.exports = {handleImageUpload}