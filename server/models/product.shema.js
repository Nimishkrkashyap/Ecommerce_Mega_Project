import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,

        },
        
    },
    {
        timestamsps: true
    }
)

export default mongoose.model("Product", productSchema)