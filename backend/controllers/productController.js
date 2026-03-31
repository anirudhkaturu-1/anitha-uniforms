import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

//add product


const addProducts = async(req,res)=>{
    try {

        const {name,description,price,category,subCategory,sizes,bestseller} = req.body
        const image1 = req.files?.image1?.[0]
        const image2 = req.files?.image2?.[0]
        const image3 = req.files?.image3?.[0]
        const image4 = req.files?.image4?.[0]

       const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

       let imagesUrl = await Promise.all(
        images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:"image"});
            return result.secure_url
        })
       )

       const productData = {
        name,
        description,
        category,
        price:Number(price),
        subCategory,
        bestseller: bestseller === "true" ? true : false,
        sizes:JSON.parse(sizes),
        image:imagesUrl,
        date:Date.now()
       } 

       console.log(productData);
       const product = new productModel(productData);
       await product.save();

        res.json({success:true,product})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message})
        
    }
    
}



//List all products

const listProducts = async(req,res)=>{

    try {
        const products = await productModel.find({});
        res.json({success:true,products})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message})
        
    }
    
}


//remove product


const removeProducts = async(req,res)=>{

    try {
        const productId = req.params.id;
        await productModel.findByIdAndDelete(productId);
        res.json({success:true})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message})

    }
    
}

//to get a single product

const singleProducts = async(req,res)=>{
    try {
        const productId = req.params.id;
        const product = await productModel.findById(productId);
        res.json({success:true,product})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message})
        
    }

}

    //search products
    const searchProducts = async(req,res)=>{
        try {
            const{query,limit=10}=req.query;
            const products = await productModel.find({
                name:{$regex:query,$options:"i"}
            }).limit(parseInt(limit));
            res.json({success:true,products})
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false,message:error.message})
        }

    }


export {addProducts,listProducts,removeProducts,singleProducts,searchProducts}