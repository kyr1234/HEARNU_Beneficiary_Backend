import { body, validationResult } from 'express-validator'
import userRole from '../../config/constants/userRole.constant.js'
import { encryptPass } from '../../helper/passEncDec.js'
import UserModel from '../../models/user/User.schema.js'

import * as apiResponse from './../../helper/apiResponse.js'
import bcrypt from 'bcrypt'
const CreateTeacherController = [
  body('name')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('name_required')
    .trim()
    .escape(),
  body('state')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('State_required')
    .trim()
    .escape(),
  body('district')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('District_required')
    .trim()
    .escape(),
  body('email')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('email_required')
    .bail()
    .isEmail()
    .withMessage('unvalid_email')
    .bail()
    .custom(async (value) => {
      return await UserModel.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('email_already_in_use')
        } else {
          return Promise.resolve()
        }
      })
    })
    .withMessage('email_already_in_use')
    .trim()
    .escape(),

  body('phone_no')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('phone_required')
    .isLength({ max: 10, min: 10 })
    .withMessage('phone_invalid')
    .trim()
    .escape(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return apiResponse.validationErrorWithData(
        res,
        'validation_error',
        errors.array(),
      )
    }

    const name = req.body.name
    const email = req.body.email
    const state = req.body.state
    const password = req.body.password
    const district = req.body.district
    const phone_no = req.body.phone_no
    console.log(req.body)
    const FindAlreadyExistenceUser = await UserModel.findOne({ email })

    if (FindAlreadyExistenceUser) {
      return apiResponse.validationErrorWithData(
        res,
        'Teacher Already Exists',
        FindAlreadyExistenceUser,
      )
    } else {
      const encryptPass = await bcrypt.hash(password, 12)
      const User = await UserModel.create({
        name,
        email,
        state,
        district,
        password: encryptPass,
        phone_no,
        role: '6',
      })

      return apiResponse.successResponseWithData(
        res,
        'Teacher Created Successfully',
        User,
      )
    }
  },
]

export default CreateTeacherController
