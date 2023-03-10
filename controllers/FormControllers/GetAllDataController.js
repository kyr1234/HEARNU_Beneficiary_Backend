import * as apiResponse from '../../helper/apiResponse.js'
import Paitentmodel from '../../models/patient/patientSchema.js'


const GetAllDataController = [
  async (req, res) => {
    try {
      const AllPatientData = await Paitentmodel.find()
      if (AllPatientData.length > 0) {
        return apiResponse.successResponseWithData(
          res,
          'Patient Data',
          AllPatientData,
        )
      } else {
        return apiResponse.errorResponse(res, 'No Patients Found')
      }
    } catch (e) {
      return apiResponse.errorResponse(res, e.message)
    }
  },
]
export default GetAllDataController
