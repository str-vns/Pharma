const mongoose = require("mongoose")
const { STATUSCODE } = require("../constants")
const Brand = require("../models/brand")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/errorHandler")
const { uploadBrandToFirebase, deleteFirebaseBrand } = require("../utils/firebase")

exports.CreateBrand = async (req, res) => {
    console.log(req.body.image)
    const duplicateName = await Brand.findOne({ brandName: req.body.brandName})
    .collation({locale: "en"})
    .lean()
    .exec()

    if (duplicateName) throw new Error ("Brand name already Exists")


    if (!req.file || req.file.length === 0) {
        throw new Error("At least one image is required");
    }

    const image = await uploadBrandToFirebase(req.file);

    console.log(image)
    const brand = await Brand.create(
        {
        brandName: req.body.brandName,
        variant: req.body.variant,
        image: image
    }
);
    return brand
}

exports.ReadBrand = async (req, res) => {
    const brands =  await Brand.find()
    .sort({ createdAt: STATUSCODE.NEGATIVE_ONE})
    .lean()
    .exec()

    return brands
}

exports.UpdateBrand =  async (req, res, id) => {
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Brand ID: ${id}`)

    if (!req.file || req.file.length === 0) {
        throw new Error("At least one image is required");
    }

    const image = await uploadBrandToFirebase(req.file);

    const existbrand = await Brand.findById(id).lean().exec()
    if(! existbrand) throw new ErrorHandler(`Brand Not Found With This ID: ${id}`)
    // console.log(existbrand.image.public_id)
    const existingPublicIds = existbrand.image.public_id

    if (existingPublicIds.length > 0) {
    await deleteFirebaseBrand(existingPublicIds)
    console.log("All images deleted successfully.");
    }

    const updateBrand =  await Brand.findByIdAndUpdate(
        id,
        {
            ...req.body,
            image: image
        },
        {
            new: true,
            runValidators: true
        }
    )
        .lean()
        .exec()

    if(!updateBrand) throw new ErrorHandler(`Brand Not Found With This ID: ${id}`)

    return updateBrand
}

exports.DeleteBrand = async (req, res, id) => 
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Brand ID: ${id}`)
    
    const existbrand = await Brand.findById(id).lean().exec()
    if(! existbrand) throw new ErrorHandler(`Brand Not Found With This ID: ${id}`)
    // console.log(existbrand.image.public_id)
    const existingPublicIds = existbrand.image.public_id

    if (existingPublicIds.length > 0) {
    await deleteFirebaseBrand(existingPublicIds)
    console.log("All images deleted successfully.");
    }

    await Promise.all([
        Brand.deleteOne({_id: id}).lean().exec(),
    ])

    return brand
}

exports.SoftDeleteBrand = async (req, res, id) =>
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Brand ID: ${id}`)
    
    const existbrand = await Brand.findById(id).lean().exec()
    if(! existbrand) throw new ErrorHandler(`Brand Not Found With This ID: ${id}`)

    const softDelBrand =  await Brand.softDelete(id)

    if(!softDelBrand) throw new ErrorHandler(`Brand not found with ID: ${id}`);
    
    return softDelBrand
}

exports.RestoreBrand = async (req, res, id) =>
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Brand ID: ${id}`)
    
    const existbrand = await Brand.findById(id).lean().exec()
    if(! existbrand) throw new ErrorHandler(`Brand Not Found With This ID: ${id}`)

    const restoreBrand =  await Brand.restore(id)

    if(!restoreBrand) throw new ErrorHandler(`Brand not found with ID: ${id}`);
    
    return restoreBrand
}
