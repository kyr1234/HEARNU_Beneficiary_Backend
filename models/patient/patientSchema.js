import mongoose from 'mongoose'
import modelFiledDefinations from '../../helper/modelFiledDefinations.js'
import genderConstant from '../../config/constants/gender.constant.js'
const PatientSchema = mongoose.Schema({
  name: modelFiledDefinations.stringAndRequired,
  UDISE: {
    type: Number,
    minLength: 11,
    maxLength: 11,
  },
  AadharNumber: {
    type: Number,
    minLength: 12,
    unique: true,
    maxLength: 12,
  },
  Gender: modelFiledDefinations.enumAndRequired(['Male', 'Female', 'Other']),
  Age: modelFiledDefinations.numberAndRequired,
  Address: modelFiledDefinations.stringAndRequired,
  State: modelFiledDefinations.stringAndRequired,
  District: modelFiledDefinations.stringAndRequired,
  Taluka: modelFiledDefinations.stringAndRequired,
  MobileNumber: modelFiledDefinations.numberAndRequiredAndUnique,
  SpecialTeacherDetails: {
    required: true,
    type: mongoose.Schema.ObjectId,
  },
  PhotoUrl: modelFiledDefinations.stringOnly,
  typeOfHearingLoss: modelFiledDefinations.enumAndRequired([
    'Conductive',
    'SN',
    'Mixed',
  ]),
  SeverietyOfLoss: modelFiledDefinations.enumAndRequired([
    'Mild',
    'Moderate',
    'Severe',
    'Profound',
  ]),
  HearNUReport: modelFiledDefinations.stringOnly,
  HearingTestReport: modelFiledDefinations.stringOnly,
  MusicResponse: modelFiledDefinations.numberOnly,
  VoiceResponse: modelFiledDefinations.numberOnly,
  SmartPhonePresence: modelFiledDefinations.enumAndRequired(['Yes', 'No']),

  Trials: [
    {
      Remarks: modelFiledDefinations.stringOnly,
      LevelOfSpeech: modelFiledDefinations.enumAndRequired([
        'S1',
        'S2',
        'S3',
        'S4',
      ]),
      LevelOfHearing: modelFiledDefinations.enumAndRequired([
        'H1',
        'H2',
        'H3',
        'H4',
      ]),
      VideoLink: modelFiledDefinations.stringOnly,
      DateOfTrial: modelFiledDefinations.DateType,
    },
  ],
})

const Paitentmodel = mongoose.model('PatientModel', PatientSchema)
export default Paitentmodel
