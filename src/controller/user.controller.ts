import express from "express";
import { User } from "../mongoose/models/user.model";
import { UserBodyType } from "../type/user";

// Get all users data
async function getUser(req: { body: UserBodyType }, res: any) {
  try {
    const data = await User.find({});
    console.log("All users data reterived!", data);
    res.status(200).json({
      response: { code: 200, message: "Successfully reterived all users!" },
      data,
    });
  } catch (error) {
    console.log("Error while returiving the user data", error);
  }
}

// Get one student by ID
async function getUserById(req: { body: UserBodyType; params: any }, res: any) {
  try {
    const data = await User.findById(req.params.id);
    console.log("All users data reterived!", data);
    res.status(200).json({
      response: { code: 200, message: "Successfully reterived users!" },
      data,
    });
  } catch (error) {
    console.log("Error while finding the user data", error);
  }
}

// Delete user data
async function deleteUser(req: { body: UserBodyType; params: any }, res: any) {
  try {
    const data = await User.findByIdAndDelete(req.params.id);
    console.log("Successfully deleted the user!", data);
    res.status(200).json({
      response: { code: 200, message: "Successfully deleted the user!" },
      data,
    });
  } catch (error) {
    console.log("Error while deleting the user data", error);
  }
}

export { getUser, getUserById, deleteUser };
