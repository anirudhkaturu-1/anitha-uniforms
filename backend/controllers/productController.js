import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//add product
const addProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      salePrice,
      category,
      subCategory,
      uniformType,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      }),
    );

    // Validation: salePrice should not be greater than price
    const parsedPrice = Number(price);
    const parsedSalePrice = salePrice ? Number(salePrice) : null;

    if (parsedSalePrice && parsedSalePrice > parsedPrice) {
      return res.status(400).json({
        success: false,
        message: "Sale price cannot be greater than original price",
      });
    }

    // Validate uniformType
    const validUniformTypes = [
      "hospital",
      "school",
      "college",
      "corporate",
      "industrial",
      "custom",
    ];

    if (!uniformType || !validUniformTypes.includes(uniformType)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid uniform type. Must be one of: " +
          validUniformTypes.join(", "),
      });
    }

    const productData = {
      name,
      description,
      category,
      price: parsedPrice,
      salePrice: parsedSalePrice,
      subCategory,
      uniformType, // Add uniformType to product data
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//List all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.aggregate([
      {
        $addFields: {
          // Assign priority 1 to school, 2 to everything else
          sortOrder: {
            $cond: {
              if: { $eq: ["$uniformType", "school"] },
              then: 1,
              else: 2,
            },
          },
        },
      },
      {
        $sort: { sortOrder: 1, date: -1 }, // Sort by priority then by newest
      },
    ]);
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//remove product
const removeProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    await productModel.findByIdAndDelete(productId);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//to get a single product
const singleProducts = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//search products
const searchProducts = async (req, res) => {
  try {
    const { query, limit = 10 } = req.query;
    const products = await productModel
      .find({
        name: { $regex: query, $options: "i" },
      })
      .limit(parseInt(limit));
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Optional: Get products sorted by effective price (for sorting by discounted price)
const getProductsSortedByPrice = async (req, res) => {
  try {
    const { sort = "asc" } = req.query;
    const sortOrder = sort === "asc" ? 1 : -1;

    const products = await productModel.aggregate([
      {
        $addFields: {
          effectivePrice: {
            $ifNull: ["$salePrice", "$price"],
          },
        },
      },
      {
        $sort: { effectivePrice: sortOrder },
      },
    ]);

    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Optional: Get products filtered by uniform type
const getProductsByUniformType = async (req, res) => {
  try {
    const { type } = req.params;
    const validUniformTypes = [
      "hospital",
      "school",
      "college",
      "corporate",
      "industrial",
      "custom",
    ];

    if (!validUniformTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid uniform type",
      });
    }

    const products = await productModel.find({ uniformType: type });
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Optional: Get all uniform types with product counts
const getUniformTypesStats = async (req, res) => {
  try {
    const stats = await productModel.aggregate([
      {
        $group: {
          _id: "$uniformType",
          count: { $sum: 1 },
          products: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          uniformType: "$_id",
          count: 1,
          products: { $slice: ["$products", 5] }, // Limit to 5 products per type
        },
      },
    ]);

    res.json({ success: true, stats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addProducts,
  listProducts,
  removeProducts,
  singleProducts,
  searchProducts,
  getProductsSortedByPrice,
  getProductsByUniformType,
  getUniformTypesStats,
};
