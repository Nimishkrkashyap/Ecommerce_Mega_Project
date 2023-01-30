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
    collection,
  });
});

/*
 * @UPDATE_COLLECTION
 * @route http://localhost:5000/api/collection
 * @description update controller for updating new collection
 * @parameters name
 * @returns Collection Object
 */

export const updateCollection = asyncHandler(async (req, res) => {
  // get the existing collection id for update collection
  const { id: collectionId } = req.params;

  const { name } = req.body;

  if (!name) {
    throw new customError("Please provide a updated collection name", 400);
  }

  let updateCollection = await Collection.findByIdAndUpdate(
    collectionId,
    {
      name,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateCollection) {
    throw new customError("Updated collection not found", 400);
  }

  // send response to frontend
  res.status(200).json({
    success: true,
    message: "Collection updated succesfully",
    updateCollection,
  });
});

/*
 * @DELETE_COLLECTION
 * @route http://localhost:5000/api/collection
 * @description update controller for updating new collection
 * @parameters name
 * @returns Collection Object
 */

export const deleteCollection = asyncHandler(async (req, res) => {
    const {id: collectionId} = req.params

    const collectionDelete = await Collection.findByIdAndDelete(collectionId)

    if (!collectionDelete) {
        throw new customError("Collection not found", 400)
    }

    collectionDelete.remove()

    // send response to frontend
    res.status(200).json({
        success: true,
        message: "Collection deleted succesfully"
    })
})

export const getAllCollection = asyncHandler(async (req, res) => {
    const collections = await Collection.find()

    if (!collections) {
        throw new customError("No collection found", 400)
    }

    res.status(200).json({
        success: true,
        collections
    })
})