import { body, validationResult } from 'express-validator'
import * as apiResponse from '../../helper/apiResponse.js'
import UserModel from '../../models/user/User.schema.js'
import mongoose from 'mongoose'

const GetUserOnIdController = [
  body('_id')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid Object Id')
      } else {
        return true
      }
    })
    .notEmpty({ igonre_whitespace: true })
    .withMessage('Id is required')
    .trim(),

  async (req, res) => {
    try {
      const { _id } = req.body

      const FindAllocation = await UserModel.findById(_id)

      if (FindAllocation) {
        return apiResponse.successResponseWithData(
          res,
          'User Found',
          FindAllocation,
        )
      } else {
        return apiResponse.errorResponse(res, 'No User Found')
      }
    } catch (e) {
      return apiResponse.errorResponse(res, e.message)
    }
  },
]
export default GetUserOnIdController
