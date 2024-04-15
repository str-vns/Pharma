const mongoose = require("mongoose")
const { STATUSCODE } = require("../constants")
const Tags = require("../models/tags")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/errorHandler")

exports.CreateTags = async (req, res) => {
    const duplicateTags = await Tags.findOne({ tagsName: req.body.tagsName})
    .collation({locale: "en"})
    .lean()
    .exec()

    if (duplicateTags) throw new Error ("Tags already Exists")
    
    const tag = await Tags.create(
        {
        tagsName: req.body.tagsName,
    }
);


    return tag
}

exports.ReadTags = async (req, res) => {
    const tags =  await Tags.find()
    .sort({ createdAt: STATUSCODE.NEGATIVE_ONE})
    .lean()
    .exec()

    return tags
}

exports.UpdateTags =  async (req, res, id) => {
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Tags ID: ${id}`)


    const existTags = await Tags.findById(id).lean().exec()
    if(! existTags) throw new ErrorHandler(`Tags Not Found With This ID: ${id}`)
    const UpdateTag =  await Tags.findByIdAndUpdate(
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

    if(!UpdateTag) throw new ErrorHandler(`Tags Not Found With This ID: ${id}`)

    return UpdateTag
}

exports.DeleteTags = async (req, res, id) => 
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Tags ID: ${id}`)
    
    const tag = await Tags.findOne({ _id: id })
    if(! tag) throw new ErrorHandler(`Tags Not Found With This ID: ${id}`)

    await Promise.all([
        Tags.deleteOne({_id: id}).lean().exec(),

    ])

    return tag
}

exports.SoftDeleteTags = async (req, res, id) =>
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Tags ID: ${id}`)
    
    const existTag = await Tags.findById(id).lean().exec()
    if(! existTag) throw new ErrorHandler(`Tags Not Found With This ID: ${id}`)

    const softDelTag =  await Tags.softDelete(id)

    if(!softDelTag) throw new ErrorHandler(`Tags not found with ID: ${id}`);
    
    return softDelTag
}

exports.RestoreTags = async (req, res, id) =>
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Tags ID: ${id}`)
    
    const existTag = await Tags.findById(id).lean().exec()
    if(! existTag) throw new ErrorHandler(`Tags Not Found With This ID: ${id}`)

    const restoreTag =  await Tags.restore(id)

    if(!restoreTag) throw new ErrorHandler(`Tags not found with ID: ${id}`);
    
    return restoreTag
}

