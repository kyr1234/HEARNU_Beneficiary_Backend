import { body, validationResult } from 'express-validator'
import * as apiResponse from '../../helper/apiResponse.js'
import UserModel from '../../models/user/User.schema.js'
import genderConstant from '../../config/constants/gender.constant.js'
import Paitentmodel from '../../models/patient/patientSchema.js'

const GetSpecialTeacherDetails = [
  async (req, res) => {
    try {
      console.log(req.body)
      const { email } = req.body
      console.log(email)
      const FindAllocation = await UserModel.findOne({
        email: {
          $regex: email,
          $options: 'i',
        },
        role: '6',
      })
      if (FindAllocation) {
        return apiResponse.successResponseWithData(
          res,
          'Teacher Found',
          FindAllocation,
        )
      } else {
        return apiResponse.errorResponse(res, 'Teacher Not Found')
      }
    } catch (e) {
      return apiResponse.errorResponse(res, e.message)
    }
  },
]
export default GetSpecialTeacherDetails
