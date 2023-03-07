import * as apiResponse from '../../helper/apiResponse.js'
const LogoutController = [
  async (req, res) => {
    try {
      res.clearCookie('token')
      return apiResponse.successResponse(res, 'Logout Successfully')
    } catch (error) {
      return apiResponse.errorResponse(res, error)
    }
  },
]
export default LogoutController
