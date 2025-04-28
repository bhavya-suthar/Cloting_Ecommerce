const address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pinCode, phone, notes } = req.body;

    if (!userId || !address || !city || !pinCode || !notes) {
      return res
        .status(400)
        .json({ success: false, message: "invalid data provvided!!!" });
    }

    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      phone,
      pinCode,
      notes,
    });

    await newlyCreatedAddress.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (error) {
    console.log("🚀 ~ addAddress ~ error:", error);
    res.status(500).json({
      success: false,
      message: "Error in address controller!!!",
    });
  }
};
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "UserId is Required!!!" });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log("🚀 ~ addAddress ~ error:", error);
    res.status(500).json({
      success: false,
      message: "Error in address controller!!!",
    });
  }
};
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if (!userId || !addressId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "UserId and Address Id is Required!!!",
        });
    }

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );

    if(!address){
        return res.status(404).json({
            success:false,
            message:"Address Not Found!!"
        })
    }

    res.status(200).json({
        success:true,
        data:address
    })
  } catch (error) {
    console.log("🚀 ~ addAddress ~ error:", error);
    res.status(500).json({
      success: false,
      message: "Error in address controller!!!",
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
        return res
          .status(400)
          .json({
            success: false,
            message: "UserId and Address Id is Required!!!",
          });
      }

      const address = await Address.findOneAndDelete({_id:addressId,userId})

      if(!address){
        return res.status(404).json({
            success:false,
            message:"Address Not Found!!"
        })
    }

    res.status(200).json({
        success:true,
        message:"Address Deleted SuccessFully!!!"
    })
    
  } catch (error) {
    console.log("🚀 ~ addAddress ~ error:", error);
    res.status(500).json({
      success: false,
      message: "Error in address controller!!!",
    });
  }
};

module.exports = { addAddress, editAddress, deleteAddress, fetchAllAddress };
