import { body, validationResult } from 'express-validator'
import * as apiResponse from '../../helper/apiResponse.js'
import genderConstant from '../../config/constants/gender.constant.js'
import Paitentmodel from '../../models/patient/patientSchema.js'
import mongoose from 'mongoose'
//Remains

const EditPatientDetailsController = [
  body('_id').custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid ID')
    }
    return true
  }),
  body('Remarks')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Remarks is Required')
    .escape(),
  body('LevelOfSpeech')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Remarks is Required')
    .isIn(['S1', 'S2', 'S3', 'S4'])
    .withMessage('Level Of Speech Value Should be H1, H2, H3 or H4')
    .escape(),
  body('LevelOfHearing')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Remarks is Required')
    .isIn(['H1', 'H2', 'H3', 'H4'])
    .withMessage('Level Of Speech Value Should be S1, S2, S3 or S4')
    .escape(),
  body('VideoLink')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Video Must be Provided ')
    .trim()
    .escape(),

  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error',
          errors.array(),
        )
      }
      const { _id } = req.body
      console.log(req.body)
      const FindUser = await Paitentmodel.findById(_id)
      if (FindUser) {
        const { Remarks, VideoLink, LevelOfHearing, LevelOfSpeech } = req.body

        FindUser.Trials.push({
          Remarks,
          VideoLink,
          LevelOfHearing,
          LevelOfSpeech,
        })
        await FindUser.save()
        return apiResponse.successResponse(res, 'Trial Added Successfully')
      } else {
        return apiResponse.errorResponse(res, 'Patient Not Found')
      }
    } catch (e) {
      return apiResponse.errorResponse(res, e.message)
    }
  },
]
export default EditPatientDetailsController
