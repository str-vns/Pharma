const mongoose = require("mongoose")
const { STATUSCODE } = require("../constants")
const Product = require("../models/product")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/errorHandler")
const { uploadImageProduct, deleteImageProduct } = require("../utils/firebase")

exports.CreateProduct = async (req, res) => {
    const duplicateName = await Product.findOne({ productName: req.body.productName})
    .collation({locale: "en"})
    .lean()
    .exec()

    if (duplicateName) throw new Error ("Product name already Exists")


    if (!req.files || req.files.length === 0) {
        throw new Error("At least one image is required");
    }

    const images = await Promise.all(req.files.map(uploadImageProduct));

    console.log(images)
    const product = await Product.create(
        {
        productName: req.body.productName,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        tags: req.body.tags,
        image: images
    }
);
    return product
}

exports.ReadProduct = async (req, res) => {
    const brands =  await Product.find()
    .sort({ createdAt: STATUSCODE.NEGATIVE_ONE})
    .lean()
    .exec()

    return brands
}

exports.UpdateProduct =  async (req, res, id) => {
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Product ID: ${id}`)

    if (!req.files || req.files.length === 0) {
        throw new Error("At least one image is required");
    }

    const images = await Promise.all(req.files.map(uploadImageProduct));

    const existproduct = await Product.findById(id).lean().exec()
    if(! existproduct) throw new ErrorHandler(`Product Not Found With This ID: ${id}`)
    // console.log(existbrand.image.public_id)
    const existingPublicIds = existproduct.image.map((image) => image.public_id); 

    if (existingPublicIds.length > 0) {
    await deleteImageProduct(existingPublicIds)
    }

    const updateProduct =  await Product.findByIdAndUpdate(
        id,
        {
            ...req.body,
            image: images
        },
        {
            new: true,
            runValidators: true
        }
    )
        .lean()
        .exec()

    if(!updateProduct) throw new ErrorHandler(`Product Not Found With This ID: ${id}`)

    return updateProduct
}

exports.DeleteProduct = async (req, res, id) => 
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Product ID: ${id}`)
    
    const existproduct = await Product.findById(id).lean().exec()

    if(! existproduct) throw new ErrorHandler(`Product Not Found With This ID: ${id}`)
    const existingPublicIds = existproduct.image.map((image) => image.public_id); 

    if (existingPublicIds.length > 0) {
    await deleteImageProduct(existingPublicIds)
    }

    await Promise.all([
        Product.deleteOne({_id: id}).lean().exec(),
    ])

    return product
}

exports.SoftDeleteProduct = async (req, res, id) =>
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Product ID: ${id}`)
    
    const existproduct = await Product.findById(id).lean().exec()
    if(! existproduct) throw new ErrorHandler(`Product Not Found With This ID: ${id}`)

    const softDelProduct =  await Product.softDelete(id)

    if(!softDelProduct) throw new ErrorHandler(`Product not found with ID: ${id}`);
    
    return softDelProduct
}

exports.RestoreProduct = async (req, res, id) =>
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Product ID: ${id}`)
    
    const existproduct = await Product.findById(id).lean().exec()
    if(! existproduct) throw new ErrorHandler(`Product Not Found With This ID: ${id}`)

    const restoreProduct =  await Product.restore(id)

    if(!restoreProduct) throw new ErrorHandler(`Product not found with ID: ${id}`);
    
    return restoreProduct
}
