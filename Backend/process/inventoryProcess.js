const mongoose = require("mongoose")
const { STATUSCODE } = require("../constants")
const Variant = require("../models/variant")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../utils/errorHandler")
const { v4 } = require("uuid");

exports.CreateInventory = async (req, res, id) => {
    
    
    const variantCode = await Variant.findById(id)
    .collation({locale: "en"})
    .lean()
    .exec()

    if(!variantCode) throw new Error ("The Variant does not Exists !!!")

    if (!Array.isArray(variantCode.inventory)) {
        variantCode.inventory = [];
    }

    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    variantCode.inventory.push({
        batchNum: `${v4()}-${formattedDate}`,
        location: req.body.location,
        stock: req.body.stock,
        manufactured: req.body.manufactured,
        expiration: req.body.expiration,
    })

    const variant = await Variant.findByIdAndUpdate(id, variantCode, { new: true });
    const lastAddedVariant = variant.inventory[variant.inventory.length - 1];
    const { batchNum, manufactured } = lastAddedVariant;

    return { batchNum, manufactured };
}

exports.ReadInventory = async (id) => {
    const variants =  await Variant.findById(id)
    .select('inventory')
    .sort({ createdAt: STATUSCODE.NEGATIVE_ONE})
    .lean()
    .exec()

    return variants
}

exports.UpdateVariant=  async (req, res, id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ErrorHandler(`Invalid Inventory ID: ${id}`);
    }
    const updatedInventory = await Variant.findOneAndUpdate(
        { 'inventory._id': id },
        { $set: { 'inventory.$.stock': req.body.stock,
                  'inventory.$.location': req.body.location,
    } }, 
        {
            new: true,
            runValidators: true,
            select: 'inventory.batchNum'
        }
    ).lean().exec();

    const inventory = await Variant.findOne(
        { 'inventory._id': id },
        { 'inventory.$': 1 } 
    ).lean().exec();


    if (!updatedInventory) {
        throw new ErrorHandler(`Inventory Not Found With ID: ${id}`);
    }

    return inventory;
}

exports.DeleteInventory = async (req, res, id) => 
{
    if( !mongoose.Types.ObjectId.isValid(id))
    throw new ErrorHandler(`Invalid Category ID: ${id}`)
    
    const deletedInventory = await Variant.findOneAndUpdate(
        { 'inventory._id': id },
        { $pull: { inventory: { _id: id } } }, 
        {
            new: true,
            runValidators: true,
            select: 'inventory.batchNum'
        }
    ).lean().exec();

    if (!deletedInventory) {
        throw new ErrorHandler(`Inventory Not Found With ID: ${id}`);
    }

}

exports.SoftDeleteInventory = async (req, res, id) =>
{
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ErrorHandler(`Invalid Inventory ID: ${id}`);
    }
    const updatedInventory = await Variant.findOneAndUpdate(
        { 'inventory._id': id },
        { $set: { 'inventory.$.ExpiredAt': true,
    } }, 
        {
            new: true,
            runValidators: true,
        }
    ).lean().exec();

    const inventory = await Variant.findOne(
        { 'inventory._id': id },
        { 'inventory.$': 1 } 
    ).lean().exec();


    if (!updatedInventory) {
        throw new ErrorHandler(`Inventory Not Found With ID: ${id}`);
    }

    return inventory;
}

exports.RestoreInventory = async (req, res, id) =>
{
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ErrorHandler(`Invalid Inventory ID: ${id}`);
    }
    const updatedInventory = await Variant.findOneAndUpdate(
        { 'inventory._id': id },
        { $set: { 'inventory.$.ExpiredAt': false,
    } }, 
        {
            new: true,
            runValidators: true,
        }
    ).lean().exec();

    const inventory = await Variant.findOne(
        { 'inventory._id': id },
        { 'inventory.$': 1 } 
    ).lean().exec();


    if (!updatedInventory) {
        throw new ErrorHandler(`Inventory Not Found With ID: ${id}`);
    }

    return inventory;
}
