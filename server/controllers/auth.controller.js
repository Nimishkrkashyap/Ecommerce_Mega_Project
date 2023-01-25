import User from '../models/user.schema'
import asyncHandler from '../services/asyncHandler'
import customError from '../utils/customError'
import crypto from 'crypto'
import cookieOptions from "../utils/cookieOptions"

/* 
  * @SIGNUP
  * @route http://localhost:4000/api/auth/signup
  * description User signUp controller for creating new user   
  * parameters name, email, password
  * returns User object
*/

export const signUp = asyncHandler( async (req, res) => {
    const {name, email, password} = req.body

    // Check for all fields are filed
    if (!(name && email && password)) {
        throw new customError('All fields are required', 400)
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new customError('User already exist', 400)
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.generateJwtToken
    console.log(user)
    user.password = undefined

    res.cookie("token", token, cookieOptions)

    res.status(200).json({
        success: true,
        token,
        user
    })
})

/* 
  * @LOGIN
  * @route http://localhost:4000/api/auth/login
  * description User signIn controller for logging new user   
  * parameters email, password
  * returns User object
*/

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!(email && password)) {
        throw new customError('Invalid credentials', 400)
    }

    const user = await User.findOne({email}).select("+password")

    if (!user) {
        throw new customError('Invalid credentials', 400)
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (isPasswordMatched) {
        const token = user.generateJwtToken()
        user.password = undefined
        res.cookie("token", token, cookieOptions)
        return res.json({
            success: true,
            token,
            user
        })
    }

    throw new customError('Invalid credentials - password', 400)
})

/* 
  * @LOGOUT
  * @route http://localhost:4000/api/auth/logout
  * description User logut controller for logging out user by clearing cookies
  * parameters 
  * returns User object
*/

export const logout = asyncHandler(async (_req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "User logged out successfully"
    })
})

/* 
  * @FORGOT_PASSWORD
  * @route http://localhost:4000/api/auth/password/forgot
  * description User will provide the eamail and we provide a token for forgot password
  * parameters email
  * returns success message - email sent
*/

export const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body

    // Check for email availale
    if (!email) {
        throw new customError('Please provide email address', 400)
    }

    const user = await User.findOne({email})
    if (!user) {
        throw new customError("User is not registered", 404)
    }
    
})