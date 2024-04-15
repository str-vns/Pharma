const mongoose = require("mongoose")
const { STATUSCODE } = require("../constants")
const Category = require("../models/category")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/errorHandler")

exports.CreateCategory = async (req, res) => {
    const duplicateName = await Category.findOne({ categoryName: req.body.categoryName})
    .collation({locale: "en"})
    .lean()
    .exec()

    if (duplicateName) throw new Error ("Category already Exists")
    
    const category = await Category.create(
        {
        categoryName: req.body.categoryName,
    }
);


    return category
}

exports.ReadCategory = async (req, res) => {
    const categorys =  await Category.find()
    .sort({ createdAt: STATUSCODE.NEGATIVE_ONE})
    .lean()
    .exec()

    return categorys
}

exports.UpdateCategory =  async (req, res, id) => {
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Category ID: ${id}`)


    const existCategory = await Category.findById(id).lean().exec()
    if(! existCategory) throw new ErrorHandler(`Category Not Found With This ID: ${id}`)
    const UpdateCategory =  await Category.findByIdAndUpdate(
        id,
        {
            ...req.body,
        },
        {
            new: true,
            runValidators: true
        }
    )
        .lean()
        .exec()

    if(!UpdateCategory) throw new ErrorHandler(`Category Not Found With This ID: ${id}`)

    return UpdateCategory
}

exports.DeleteCategory = async (req, res, id) => 
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Category ID: ${id}`)
    
    const category = await Category.findOne({ _id: id })
    if(! category) throw new ErrorHandler(`Category Not Found With This ID: ${id}`)

    await Promise.all([
        Category.deleteOne({_id: id}).lean().exec(),

    ])

    return category
}

exports.SoftDeleteCategory = async (req, res, id) =>
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Category ID: ${id}`)
    
    const existCategory = await Category.findById(id).lean().exec()
    if(! existCategory) throw new ErrorHandler(`Category Not Found With This ID: ${id}`)

    const softDelCategory =  await Category.softDelete(id)

    if(!softDelCategory) throw new ErrorHandler(`Category not found with ID: ${id}`);
    
    return softDelCategory
}

exports.RestoreCategory = async (req, res, id) =>
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Category ID: ${id}`)
    
    const existCategory = await Category.findById(id).lean().exec()
    if(! existCategory) throw new ErrorHandler(`Category Not Found With This ID: ${id}`)

    const restoreCategory =  await Category.restore(id)

    if(!restoreCategory) throw new ErrorHandler(`Category not found with ID: ${id}`);
    
    return restoreCategory
}

