import { body, validationResult } from 'express-validator'
import * as apiResponse from '../../helper/apiResponse.js'

import UserModel from '../../models/user/User.schema.js'

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'




const ChangePassword = [
  body('changePassword')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Enter New Password ')
    .trim()
    .escape(),
  body('password')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Old Password Required')
    .trim()
    .escape(),
  body('_id').custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid ID')
    }
    return true
  }),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return apiResponse.validationErrorWithData(
        res,
        'Validation Error',
        errors.array(),
      )
    }
    const { _id, changePassword, password } = req.body
    const GetUser = await UserModel.findById(_id)

    if (GetUser) {
      const encryptPass = bcrypt.compare(password, GetUser.password)
      if (encryptPass) {
        const updatePassword = await bcrypt.hash(changePassword, 12)
        const UpdatePassword = await UserModel.findByIdAndUpdate(_id, {
          password: updatePassword,
        })
        return apiResponse.successResponse(res, 'Password Updated ')
      } else {
        return apiResponse.errorResponse(res, 'Enter Correct Current Password')
      }
    } else {
      return apiResponse.errorResponse(res, 'User Not Found')
    }
  },
]
export default ChangePassword
