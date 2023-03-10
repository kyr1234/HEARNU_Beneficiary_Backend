import * as apiResponse from '../../helper/apiResponse.js'
import Paitentmodel from '../../models/patient/patientSchema.js'



const GetAllocatedPatientsController = [
  async (req, res) => {
    try {
      const userDetails = req.user_info
      const FindAllocation = await Paitentmodel.find({
        SpecialTeacherDetails: userDetails._id,
      })

      if (FindAllocation.length > 0) {
        return apiResponse.successResponseWithData(
          res,
          'Patient Found',
          FindAllocation,
        )
      } else {
        return apiResponse.errorResponse(res, 'No Patient Allocated')
      }
    } catch (e) {
      return apiResponse.errorResponse(res, e.message)
    }
  },
]
export default GetAllocatedPatientsController
