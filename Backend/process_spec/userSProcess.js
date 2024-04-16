const mongoose = require("mongoose");
const { STATUSCODE, RESOURCE } = require("../constants");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../utils/errorHandler");
const token = require("../utils/token");
const blacklistedTokens  = []

exports.loginUser = async (email, password) => {
  const userInfo = await User.findOne({ email }).select("+password").exec();
  if (!userInfo)
    throw new ErrorHandler(
      "Invalid Email or Password",
      STATUSCODE.UNAUTHORIZED
    );

  const match = await bcrypt.compare(password, userInfo.password);
  if (!match) throw new ErrorHandler("Wrong Password", STATUSCODE.UNAUTHORIZED);

  const accessToken = token.generateToken(userInfo.email, userInfo.roles);

  const setAccessTokenMaxAge = 7 * 24 * 60 * 60 * 1000;

  return { user: userInfo, accessToken, setAccessTokenMaxAge };
};

exports.logoutUser = async (cookies, res) => {
  return new Promise((resolve, reject) => {
    !cookies?.jwt
      ? reject(new ErrorHandler("You are not loggin in"))
      : (blacklistedTokens.push(cookies.jwt),
        res.clearCookie(RESOURCE.JWT, {
          httpOnly: true,
          secure: process.env.NODE_ENV === RESOURCE.PRODUCTION,
          sameSite: RESOURCE.NONE,
        }),
        resolve());
  });
};

exports.getBlacklistedTokens = () => {
  return blacklistedTokens;
};
