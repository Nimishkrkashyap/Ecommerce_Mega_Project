import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a product name"],
            trim: true,
            maxLength: [120, "Product name should be less than 120 characters"]
        },
        price: {
            type: Number,
            required: [true, "Product price is mandatory"],
            maxLength: [120, "Product should be less than 120 characters"]
        },
        description: {
            type: String
            // use some markdown
        },
        photos: [
            {
                secure_url: {
                    type: String,
                    required: true
                }
            }
        ],
        stock: {
            type: Number,
            default: 0
        },
        sold: {
            type: Number,
            default: 0
        },
        collectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        }
    },
    {
        timestamsps: true
    }
)

export default mongoose.model("Product", productSchema)