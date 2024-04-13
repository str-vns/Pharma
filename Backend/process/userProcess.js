const mongoose = require("mongoose")
const { STATUSCODE } = require("../constants")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/errorHandler")

exports.CreateUserInfo = async (req, res) => {
    const duplicateEmail = await User.findOne({ email: req.body.email})
    .collation({locale: "en"})
    .lean()
    .exec()

    if (duplicateEmail) throw new Error ("Email already Exists")


    
    const user = await User.create(
       { 
        name:  req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, Number(process.env.SALT_NUMBER)),
        phone: req.body.phone,
        age: req.body.age,
       }
    )

    return user
}

exports.GetAllUser = async (req, res) => {
    const users =  await User.find()
    .sort({ createdAt: STATUSCODE.NEGATIVE_ONE})
    .lean()
    .exec()

    return users
}

exports.UpdateUserInfo =  async (req, res, id) => {
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid User ID: ${id}`)
    
    const existuser = await User.findById(id).lean().exec()
    if(! existuser) throw new ErrorHandler(`User Not Found With This ID: ${id}`)

    const updateUser =  await User.findByIdAndUpdate(
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

    if(!updateUser) throw new ErrorHandler(`User Not Found With This ID: ${id}`)

    return updateUser
}

exports.SoftDeleteUser = async (req, res, id) =>
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid User ID: ${id}`)
    
    const existuser = await User.findById(id).lean().exec()
    if(! existuser) throw new ErrorHandler(`User Not Found With This ID: ${id}`)

    const softDelUser =  await User.softDelete(id)

    if(!softDelUser) throw new ErrorHandler(`User not found with ID: ${id}`);
    
    return softDelUser
}

exports.RestoreUser = async (req, res, id) =>
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid User ID: ${id}`)
    
    const existuser = await User.findById(id).lean().exec()
    if(! existuser) throw new ErrorHandler(`User Not Found With This ID: ${id}`)

    const restoreUser =  await User.restore(id)

    if(!restoreUser) throw new ErrorHandler(`User not found with ID: ${id}`);
    
    return restoreUser
}

exports.DeleteUserInfo = async (req, res, id) => 
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid User ID: ${id}`)
    
    const user = await User.findOne({ _id: id })
    if(! user) throw new ErrorHandler(`User Not Found With This ID: ${id}`)

    await Promise.all([
        User.deleteOne({_id: id}).lean().exec(),

    ])

    return user
}