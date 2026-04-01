import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
        required: false
    },
    image:{
        type:Array,
        required: true
    },
    category:{
       type:String,
       required: true
    },
    subCategory:{
        type:String,
        required: true
    },
    sizes:{
        type:Array,
        required:true
    },
    uniformType: {
    type: String,
    enum: [
        "hospital",
        "school", 
        "college",
        "corporate",
        "industrial",
        "custom"
    ],
    required: false,
    default: "custom"
    },
    bestseller:{
        type: Boolean,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
})


const productModel = mongoose.models.product||mongoose.model("product", productSchema);

export default productModel