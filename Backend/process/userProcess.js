const User = require("../models/user")
const bcrypt = require("bcrypt")
exports.CreateUserInfo = async (req, res) => {
    const duplicateEmail = await User.findOne({ email: req.body.email})
    .collation({locale: "en"})
    .lean()
    .exec()

    if (duplicateEmail) throw new Error ("Email already Exists")

    const hashedPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_NUMBER));
    
    const user = await User.create(
       { 
        name:  req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        age: req.body.age,
       }
    )

    return user
}