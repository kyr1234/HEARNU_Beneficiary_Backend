import * as apiResponse from '../../helper/apiResponse.js'
import Paitentmodel from '../../models/patient/patientSchema.js'


const GetStateWiseDataController = async (req, res) => {
  try {
    const userDetails = req.user_info

    const FindAllocation = await Paitentmodel.find({
      State: userDetails.state,
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
}

export default GetStateWiseDataController
