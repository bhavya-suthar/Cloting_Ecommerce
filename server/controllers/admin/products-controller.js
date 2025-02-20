const { ImageUploadUtils } = require("../../helpers/cloudinary");
const Products = require("../../models/Products");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    console.log("🚀 ~ handleImageUpload ~ url:", url);
    const result = await ImageUploadUtils(url);

    res.json({ success: true, result });
  } catch (error) {
    console.log("🚀 ~ handleImageUpload ~ error:", error);
  }
};

//add products

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalPtice,
    } = req.body;

    const newlyCreatedProduct = new Products({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalPtice,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log("🚀 ~ addProduct ~ error:", error);
    res.status(500).json({
      success: false,
      messsage: "Error in add product part",
    });
  }
};

//fetch products
const fetchAllProduct = async (req, res) => {
  try {
    const listOfProduct = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProduct,
    });
  } catch (error) {
    console.log("🚀 ~ addProduct ~ error:", error);
    res.status(500).json({
      success: false,
      messsage: "Error in add product part",
    });
  }
};

//edit products
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalPtice,
    } = req.body;

    const findProduct = await Products.findById(id);

    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });

    findProduct.title = title || Products.title;
    findProduct.description = description || Products.description;
    findProduct.category = category || Products.category;
    findProduct.brand = brand || Products.brand;
    findProduct.price = price || Products.price;
    findProduct.salePrice = salePrice || Products.salePrice;
    findProduct.totalStock = totalStock || Products.totalStock;
    findProduct.image = image || Products.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log("🚀 ~ addProduct ~ error:", error);
    res.status(500).json({
      success: false,
      messsage: "Error in add product part",
    });
  }
};

//delete products

const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params
    const product = await Products.findByIdAndUpdate(id)

    if (!product)
        return res.status(404).json({
          success: false,
          message: "Product Not Found",
        });

        res.status(200).json({
            success:true,
            message:"Product Deleted Successfully!!"
        })

  } catch (error) {
    console.log("🚀 ~ addProduct ~ error:", error);
    res.status(500).json({
      success: false,
      messsage: "Error in add product part",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProduct,
  deleteProduct,
  editProduct,
};
