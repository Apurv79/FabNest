import express from "express";
import { addProduct, removeProduct, listProducts, singleProduct} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminauth from "../middleware/adminauth.js";


const productRouter = express.Router();
productRouter.get("/list", listProducts);
productRouter.post("/single", singleProduct);
productRouter.use(adminauth);
productRouter.post("/add", upload.fields([{name : 'image1' , maxcount :1 },{name : 'image2' , maxcount :1 },{name : 'image3' , maxcount :1 },{name : 'image4' , maxcount :1 }]), addProduct); 
productRouter.post("/remove", removeProduct);


export default productRouter;   //exporting the productRouter