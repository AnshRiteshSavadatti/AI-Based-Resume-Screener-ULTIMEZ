import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import User from "../models/user.model.js";

// What is a request body?
//  req.body is an object that contains data sent by the client to the server in an HTTP request.
//  It is typically used in POST or PUT requests to send data to the server for processing or storage.
//  The data in req.body is usually in JSON format, but it can also be in other formats like URL-encoded or multipart/form-data.
//  The body-parser middleware is used to parse the incoming request bodies in a middleware before your handlers, available under the req.body property.
//  It is important to note that req.body is only available if the client sends data in the request body.
//  In the case of GET requests, data is usually sent in the URL as query parameters, and you would access it using req.query instead of req.body.
//  In summary, req.body is an object that contains data sent by the client to the server in an HTTP request, typically in JSON format.
//  It is used to send data to the server for processing or storage, and it is only available in POST or PUT requests.

export const signUp = async function (req, res, next) {
  // Implement sign-up logic
  const session = await mongoose.startSession();
  session.startTransaction(); // want to start a transaction, atomic operation

  try {
    // Logic to create a new user
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "User already exists",
      });
    }

    // User dosent exists, create a new user and hash the password
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );
    // newUsers is an array of users
    const newUser = newUsers[0]; // get the first user from the array

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction(); // commit the transaction
    session.endSession(); // end the session

    // Send success response
    return res.status(201).json({
      sucess: true,
      status: "success",
      message: "User created successfully",
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    // Handle error
    return next(error);
  }
};
export const signIn = async function (req, res, next) {
  try {
    // Logic to sign in a user
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }   
    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      }); 
    }

    // Generate JWT token
    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    // Send success response
    return res.status(200).json({
      sucess: true,
      status: "success",
      message: "User signed in successfully",
      data: {
        token,
        user: existingUser,
      },
    });
  }
  catch (error) {
    // Handle error
    return next(error);
  }
};

export const signOut = async function (req, res, next) {};
