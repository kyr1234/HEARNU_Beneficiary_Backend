import { body, validationResult } from 'express-validator'
import UserModel from '../../models/user/User.schema.js'
import bcrypt from 'bcrypt'
import * as apiResponse from './../../helper/apiResponse.js'


const UserCreateController = [
  body('name')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Name Is Required')
    .trim()
    .escape(),
  body('state')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('State Is Required')
    .trim()
    .escape(),
  body('district')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('District Is Required')
    .trim()
    .escape(),
  body('password')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Password Is Required')
    .trim()
    .escape(),
  body('email')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Email Is Required')
    .bail()
    .isEmail()
    .withMessage('Unvalid Email')
    .bail()
    .custom(async (value) => {
      return await UserModel.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('Email Already In Use')
        } else {
          return Promise.resolve()
        }
      })
    })
    .withMessage('Email Already In Use')
    .trim()
    .escape(),

  body('phone_no')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Phone Number Is Required')
    .isLength({ max: 10, min: 10 })
    .withMessage('Phone Number Is Invalid')
    .trim()
    .escape(),
  body('roleNumber')
    .notEmpty({ ignore_whitespace: true })
    .withMessage('Role Is Required')
    .isIn([1, 2, 3, 4, 5, 6])
    .withMessage('Invalid Role')
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
    const phone_no = req.body.phone_no
    const password = req.body.password
    const role = req.body.roleNumber
    const state = req.body.state
    const district = req.body.district
    console.log(district)
    const FindAlreadyExistenceUser = await UserModel.findOne({ email })

    if (FindAlreadyExistenceUser) {
      return apiResponse.errorResponse(res, 'User Already Exists')
    } else {
      const hashPassword = await bcrypt.hash(password, 12)

      const User = await UserModel.create({
        name,
        email,
        password: hashPassword,
        phone_no,
        role,
        state,
        district,
      })

      return apiResponse.successResponse(res, 'User Created Successfully')
    }
  },
]

export default UserCreateController
