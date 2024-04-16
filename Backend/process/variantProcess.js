const mongoose = require("mongoose")
const { STATUSCODE } = require("../constants")
const Variant = require("../models/variant")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/errorHandler")

exports.CreateVariant = async (req, res) => {
    const duplicateStrength = await Variant.findOne({ strength: req.body.strength})
    .collation({locale: "en"})
    .lean()
    .exec()

    if (duplicateStrength) throw new Error ("The Strength Variant is already Exists")
    
    const variant = await Variant.create(
        {
            product: req.body.product,
            form: req.body.form,
            strength: req.body.strength,
            dosage: req.body.dosage,
            price: req.body.price,
    }
);


    return variant
}

exports.ReadVariant = async (req, res) => {
    const variants =  await Variant.find()
    .sort({ createdAt: STATUSCODE.NEGATIVE_ONE})
    .lean()
    .exec()

    return variants
}

exports.UpdateVariant=  async (req, res, id) => {
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Variant ID: ${id}`)

    const duplicateStrength = await Variant.findOne({ strength: req.body.strength})
    .collation({locale: "en"})
    .lean()
    .exec()

    if (duplicateStrength) throw new Error ("The Strength Variant is already Exists")

    const existVariant = await Variant.findById(id).lean().exec()
    if(! existVariant) throw new ErrorHandler(`Variant Not Found With This ID: ${id}`)
    const UpdateVariant =  await Variant.findByIdAndUpdate(
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

    if(!UpdateVariant) throw new ErrorHandler(`Variant Not Found With This ID: ${id}`)

    return UpdateVariant
}

exports.DeleteVariant = async (req, res, id) => 
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Product ID: ${id}`)
    
    const existproduct = await Variant.findById(id).lean().exec()

    if(! existproduct) throw new ErrorHandler(`Variant Not Found With This ID: ${id}`)

    await Promise.all([
        Variant.deleteOne({_id: id}).lean().exec(),
    ])

    return existproduct
}

exports.SoftDeleteVariant = async (req, res, id) =>
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Product ID: ${id}`)
    
    const existVariant = await Variant.findById(id).lean().exec()
    if(! existVariant) throw new ErrorHandler(`Variant Not Found With This ID: ${id}`)

    const softDelVariant =  await Variant.softDelete(id)

    if(!softDelVariant) throw new ErrorHandler(`Variant not found with ID: ${id}`);
    
    return softDelVariant
}

exports.RestoreVariant = async (req, res, id) =>
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Product ID: ${id}`)
    
    const existvariant = await Variant.findById(id).lean().exec()
    if(! existvariant) throw new ErrorHandler(`Variant Not Found With This ID: ${id}`)

    const restoreVariant =  await Variant.restore(id)

    if(!restoreVariant) throw new ErrorHandler(`Variant not found with ID: ${id}`);
    
    return restoreVariant
}
