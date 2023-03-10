
import * as apiResponse from '../../helper/apiResponse.js'
import UserModel from '../../models/user/User.schema.js'


const GetSpecialTeacherDetails = [
  async (req, res) => {
    try {
    
      const { email } = req.body
  
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
