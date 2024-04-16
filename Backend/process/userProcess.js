const mongoose = require("mongoose")
const { STATUSCODE } = require("../constants")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/errorHandler")
const { uploadImageToFirebase, deleteFirebaseImages } = require("../utils/firebase")

exports.CreateUserInfo = async (req, res) => {
    console.log(req.body.image)
    const duplicateEmail = await User.findOne({ email: req.body.email})
    .collation({locale: "en"})
    .lean()
    .exec()

    if (duplicateEmail) throw new Error ("Email already Exists")


    if (!req.files || req.files.length === 0) {
        throw new Error("At least one image is required");
    }

    const images = await Promise.all(req.files.map(uploadImageToFirebase));

    const user = await User.create(
        {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, Number(process.env.SALT_NUMBER)),
        phone: req.body.phone,
        age: req.body.age,
        image: images
    }
);


    return user
}

exports.ReadUser = async (req, res) => {
    const users =  await User.find()
    .sort({ createdAt: STATUSCODE.NEGATIVE_ONE})
    .lean()
    .exec()

    return users
}

exports.UpdateUserInfo =  async (req, res, id) => {
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid User ID: ${id}`)

    if (!req.files || req.files.length === 0) {
        throw new Error("At least one image is required");
    }

    const images = await Promise.all(req.files.map(uploadImageToFirebase));

    const existuser = await User.findById(id).lean().exec()
    if(! existuser) throw new ErrorHandler(`User Not Found With This ID: ${id}`)

    const existingPublicIds = existuser.image.map((image) => image.public_id); 

    if (existingPublicIds.length > 0) {
    await deleteFirebaseImages(existingPublicIds)

    console.log("All images deleted successfully.");
    }

    const updateUser =  await User.findByIdAndUpdate(
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

    if(!updateUser) throw new ErrorHandler(`User Not Found With This ID: ${id}`)

    return updateUser
}

exports.DeleteUserInfo = async (req, res, id) => 
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid User ID: ${id}`)
    
    const existuser = await User.findById(id).lean().exec()
    if(! existuser) throw new ErrorHandler(`User Not Found With This ID: ${id}`)

    const existingPublicIds = existuser.image.map((image) => image.public_id); 

    if (existingPublicIds.length > 0) {
    await deleteFirebaseImages(existingPublicIds)

    console.log("All images deleted successfully.");
    }

    await Promise.all([
        User.deleteOne({_id: id}).lean().exec(),

    ])

    return user
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

