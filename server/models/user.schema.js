const mongoose = require("mongoose")
import authRoles from "../utils/authRoles"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import crypto from "crypto"
import config from "../config/index"

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: [30, "Name should be less 30 words"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [6, "Password should be more than 6 characters"],
            select: false
        },
        role: {
            type: String,
            enum: Object.values(authRoles),
            default: authRoles.USER
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    {
        timestamps: true
    }
)

// Encrypt the password
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// some methods of userSchema
userSchema.methods = {
    // compare password
    comparePassword: async function(enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    },

    // Generate JWT Token
    generateJwtToken: function(){
        return JWT.sign(
            {
                _id: this._id,
                role: this.role 
            },
            config.JWT_SECRET,
            {
                expiresIn: config.JWT_EXPIRY
            }
        )
    },

    // Forgot Password method
    generateFPT: function () {
        const forgotToken = crypto.randomBytes(20).toString('hex')

        // Save to DB
        this.forgotPasswordToken = crypto
        .createHash("sha256")
        .update(forgotToken)
        .digest("hex")

        this.forgotPasswordExpiry = Date.now() //add one hour

        return forgotToken
    }
}

module.exports = mongoose.model("User", userSchema)