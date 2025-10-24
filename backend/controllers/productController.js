import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

// Route for create product
const addProduct = async (req, res) => {
    try { 
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);
        
        // Check if files were uploaded
        if (!req.files) {
            return res.status(400).json({ success: false, message: 'No files were uploaded.' });
        }

        // Destructure the form data
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        
        // Validate required fields
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: name, description, price, and category' 
            });
        }

        // Check if the main image is present
        if (!req.files.image1 || req.files.image1.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Main product image (image1) is required'
            });
        }

        // Process only the images that were actually uploaded
        const images = {};
        const imageFields = ['image1', 'image2', 'image3', 'image4'].filter(
            img => req.files[img] && req.files[img].length > 0
        );

        // Store references to all uploaded images
        imageFields.forEach(img => {
            images[img] = req.files[img][0];
        });

        // Log the product data
        // console.log('Product data received:', {
        //     name,
        //     description,
        //     price,
        //     category,
        //     subCategory: subCategory || 'N/A',
        //     sizes: sizes || 'N/A',
        //     bestseller: bestseller || false,
        //     images: Object.keys(images).map(key => images[key].originalname)
        // });

        // Upload each image to Cloudinary
        const imageUploads = Object.values(images).map(async (file) => {
            try {
                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: 'image',
                    folder: 'products'  // Optional: Organize uploads in a 'products' folder
                });
                return {
                    fieldName: file.fieldname,
                    url: result.secure_url,
                    publicId: result.public_id
                };
            } catch (error) {
                console.error(`Error uploading ${file.originalname}:`, error);
                return null;
            }
        });

        // Wait for all uploads to complete
        const uploadedImages = await Promise.all(imageUploads);
        const successfulUploads = uploadedImages.filter(img => img !== null);

        console.log('Successfully uploaded images:', successfulUploads);

        // Create response with uploaded image URLs
        const response = {
            success: true,
            message: 'Product created successfully',
            data: {
                name,
                description,
                price,
                category,
                subCategory: subCategory || null,
                sizes: sizes ? sizes.split(',').map(s => s.trim()) : [],
                bestseller: bestseller === 'true',
                images: successfulUploads
            }
        };

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: successfulUploads,
            date: Date.now()
        }

        const product = await productModel.create(productData);
        console.log('Product created:', product);
        await product.save();

        res.status(201).json({success: true, message: 'Product Added successfully'});
        
    } catch (error) {
        console.error('Error in addProduct:', error);
        return res.status(500).json({success: false, message: 'Server error while adding product', error: process.env.NODE_ENV === 'development' ? error.message : undefined});
    }
};

// Route for list products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.status(200).json({success: true, message: 'Products fetched successfully', products});
        
    } catch (error) {
        console.error('Error in listProducts:', error);
        return res.status(500).json({success: false, message: error.message});
    }
}

// Route for delete product
const removeProduct = async (req, res) => {
    console.log(req.body.id);
    try {
        await productModel.findByIdAndDelete(req.body.id);
        return res.status(200).json({success: true, message: 'Product deleted successfully'});
    } catch (error) {
        console.error('Error in removeProduct:', error);
        return res.status(500).json({success: false, message: error.message});
    }
}

// Route for get single product info
const getSingleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        return res.status(200).json({success: true, message: 'Product finded successfully', product});
    } catch (error) {
        console.error('Error in getSingleProduct:', error);
        return res.status(500).json({success: false, message: error.message});
    }
}

export {addProduct, listProducts, removeProduct, getSingleProduct}