import Collection from "../models/collection.schema";
import asyncHandler from "../services/asyncHandler";
import customError from "../utils/customError";

/*
 * @CREATE_COLLECTION
 * @route http://localhost:5000/api/collection
 * @description create controller for creating new collection
 * @parameters name
 * @returns Collection Object
 */

export const createCollection = asyncHandler(async (req, res) => {
  // Grab collection name from client
  const { name } = req.body;

  if (!name) {
    throw new customError("Collection name should be entered", 400);
  }

  //Insert collection name to database
  const collection = await Collection.create({
    name,
  });

  // send the response to the frontend
  res.status(200).json({
    success: true,
    message: "Collection created successflly",
    collection
  })
});
