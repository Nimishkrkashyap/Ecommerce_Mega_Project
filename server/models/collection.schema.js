import mongoose from "mongoose"

const collectionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name should be required"],
            trim: true,
            maxLength: [120, "Category name should be less 120 characters"]
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Collection", collectionSchema)