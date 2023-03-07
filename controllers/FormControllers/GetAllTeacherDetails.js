import UserModel from '../../models/user/User.schema.js'
import * as apiResponse from '../../helper/apiResponse.js'

const GetAllTeacherDetails = [
  async (req, res) => {
    console.log(req.params.role)
    const roles = req.params.role
    const GetAllRelatedUsers = await UserModel.find({ role: roles })
    if (GetAllTeacher) {
      return apiResponse.successResponseWithData(
        res,
        'All Teacher Data',
        GetAllRelatedUsers,
      )
    } else {
      return apiResponse.errorResponse(res, 'No Data Found')
    }
  },
]
export default GetAllTeacherDetails
