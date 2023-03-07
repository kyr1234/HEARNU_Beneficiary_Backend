import { body, validationResult } from 'express-validator'
import * as apiResponse from '../../helper/apiResponse.js'
import UserModel from '../../models/user/User.schema.js'
import genderConstant from '../../config/constants/gender.constant.js'
import Paitentmodel from '../../models/patient/patientSchema.js'

const GetDistrictWiseDataController = [
  async (req, res) => {
    try {
      const userDetails = req.user_info

      const FindAllocation = await Paitentmodel.find({
        District: userDetails.district,
      })
      if (FindAllocation.length > 0) {
        return apiResponse.successResponseWithData(
          res,
          'Patient Found',
          FindAllocation,
        )
      } else {
        return apiResponse.errorResponse(res, 'No Patient Found')
      }
    } catch (e) {
      return apiResponse.errorResponse(res, e.message)
    }
  },
]
export default GetDistrictWiseDataController
