import { body, validationResult } from 'express-validator'
import * as apiResponse from '../../helper/apiResponse.js'
import { comparePass } from '../../helper/passEncDec.js'
import UserModel from '../../models/user/User.schema.js'
import { encryptPass } from '../../helper/passEncDec.js'
import bcrypt from 'bcryptjs'
const signinController = [
  body('email')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('email_required')
    .bail()
    .isEmail()
    .withMessage('unvalid_email')
    .trim()
    .escape(),
  body('password')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('password_required')
    .trim()
    .escape(),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return apiResponse.validationErrorWithData(
        res,
        'Validation Error',
        errors.array(),
      )
    }

    const email = req.body.email
    const password = req.body.password

    const FindUser = await UserModel.findOne({ email })
    if (FindUser) {
      bcrypt.compare(password, FindUser.password).then(function (result) {
        if (!result) {
          return apiResponse.errorResponse(res, 'Invalid Password')
        }
        return apiResponse.sendToken(FindUser, res, 201)
      })
    } else {
      return apiResponse.errorResponse(res, 'User Not Found')
    }
  },
]
export default signinController
