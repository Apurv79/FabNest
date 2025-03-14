import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
//add prduct
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      discription,
      category,
      subCategory,
      size,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    // Storing into Cloudinary
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      price: Number(price),
      discription,
      category,
      subCategory,
      size: JSON.parse(size),
      bestseller: bestseller === "true",
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    return res.json({ success: true, message: "Product added" }); // ✅ Return here to stop execution

  } catch (error) {
    console.log(error);

    if (!res.headersSent) { // ✅ Ensure only one response is sent
      return res.status(500).json({ success: false, message: "Error adding product" });
    }
  }
};

//remove product
const removeProduct = async (req, res) => {
    try{
        const {id} = req.body;
        const product = await productModel.findByIdAndDelete(id);
        res.json({success : true , message : "product deleted"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success : false , message : "error deleting product"});
    }
};

//list products
const listProducts = async (req, res) => {
    try{
        const products = await productModel.find({});
        res.json({success : true , products});  
    }
    catch(error){
        console.log(error);
        res.status(500).json({success : false , message : "error fetching products"});
    }
};

//single products info
const singleProduct = async (req, res) => {
    try{
        const {id} = req.body;
        const product = await productModel.findById(id);
        res.json({success : true , product});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success : false , message : "error fetching product"});
    }
};

export { addProduct, removeProduct, listProducts, singleProduct };
