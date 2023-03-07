import { body, validationResult } from 'express-validator'
import * as apiResponse from '../../helper/apiResponse.js'
import UserModel from '../../models/user/User.schema.js'
import genderConstant from '../../config/constants/gender.constant.js'
import Paitentmodel from '../../models/patient/patientSchema.js'
import mongoose from 'mongoose'
const FormDataEntryController = [
  body('name')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Name is Required')
    .escape(),
  body('UDISE')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('UDISE is Required')
    .isLength({ min: 11, max: 11 })
    .withMessage('UDISE Must be of Length 11')
    .trim()
    .escape(),
  body('AadharNumber')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Aadhar Number is Required')
    .isLength({ min: 12, max: 12 })
    .withMessage('Aadhar Number Must be of Length 12')
    .trim()
    .escape(),
  body('Gender')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Gender is Required')
    .isIn(['Male', 'Female', 'Other'])
    .trim()
    .escape(),
  body('Age')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Age is Required')
    .isInt({ min: 1, max: 150 })
    .trim()
    .escape(),
  body('Address')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Address is Required')
    .escape(),
  body('State')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('State is Required')
    .escape(),
  body('District')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('District is Required')
    .escape(),
  body('Taluka')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Taluka is Required')
    .escape(),
  body('MobileNumber')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Mobile Number is Required')
    .trim()
    .escape(),

  body('TypeOfHearingLoss')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Type of Hearing Loss is Required')
    .isIn(['Conductive', 'SN', 'Mixed'])
    .withMessage('Hearing Loss Should be Conductive, SN or Mixed')
    .trim()
    .escape(),
  body('SeverietyOfLoss')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Level of Hearing Loss is Required')
    .isIn(['Mild', 'Moderate', 'Severe', 'Profound'])
    .withMessage('Hearing Loss Should be Mild, Moderate, Severe or Profound')
    .trim()
    .escape(),
  body('PhotoUrl')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Photo is Required')
    .trim()
    .escape(),

  body('MusicResponse')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Music Response Value is Required')
    .isInt({ min: 30, max: 150 })
    .trim()
    .escape(),
  body('VoiceResponse')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Voice Response is Required')
    .isInt({ min: 30, max: 150 })
    .trim()
    .escape(),
  body('SpecialTeacherDetails')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ID')
      }
      return true
    })
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Special Teacher Details is Required'),
  body('SmartPhoneResponse')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Smart Phone Presence is Required')
    .isIn(['Yes', 'No'])
    .withMessage('Smart Phone Presence Should be Yes or No')
    .trim()
    .escape(),
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
      console.log(req.body)

      const {
        name,
        UDISE,
        AadharNumber,
        Gender,
        Age,
        Address,
        State,
        District,
        Taluka,
        MobileNumber,
        SpecialTeacherDetails,
        SpecialTeacherEmail,
        SpecialTeacherNumber,
        TypeOfHearingLoss,
        SeverietyOfLoss,
        MusicResponse,
        VoiceResponse,
        PhotoUrl,
        VideoLink,
        UploadReportHearingTest,
        UploadNUHearingReport,
        SmartPhoneResponse,
        Remarks,
        LevelOfSpeech,
        LevelOfHearing,
      } = req.body

      const FindAlreadyPatient = await Paitentmodel.findOne({ AadharNumber })

      if (FindAlreadyPatient) {
        return apiResponse.errorResponse(
          res,
          'Patient With Aadhar Already Exists',
        )
      } else {
        const EnterNewPatient = await Paitentmodel.create({
          name,
          UDISE,
          AadharNumber,
          Gender,
          Age,
          Address,
          State,
          District,
          Taluka,
          MobileNumber: MobileNumber,
          SpecialTeacherDetails,
          typeOfHearingLoss: TypeOfHearingLoss,
          SeverietyOfLoss: SeverietyOfLoss,
          HearingTestReport: UploadReportHearingTest,
          HearNUReport: UploadNUHearingReport,
          PhotoUrl,
          MusicResponse,
          VoiceResponse,
          SmartPhonePresence: SmartPhoneResponse,
          Trials: [
            {
              Remarks,
              LevelOfSpeech: LevelOfSpeech,
              LevelOfHearing: LevelOfHearing,
              VideoLink,
            },
          ],
        })
        return apiResponse.successResponseWithData(
          res,
          'New Patient Data Added Successfully',
          EnterNewPatient,
        )
      }
    } catch (e) {
      return apiResponse.errorResponse(res, e.message)
    }
  },
]
export default FormDataEntryController
