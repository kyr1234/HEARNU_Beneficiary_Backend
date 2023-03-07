import * as apiResponse from '../helper/apiResponse.js'
import UserModel from '../models/user/User.schema.js'
import jwt from 'jsonwebtoken'



export async function isAuthenticated(req, res, next) {
  try {
    const Bearer = req.header('Authorization')
    console.log(Bearer)

    if (Bearer) {
      const token = Bearer.replace('Bearer ', '')

      if (!token) {
        return apiResponse.errorResponse(
          res,
          'Token Not Found Please Login First',
        )
      }

      const decodeddata = jwt.verify(
        token,
        process.env.JSON_WEB_TOKEN_SECRET_KEY,
      )

      req.user_info = await UserModel.findById(decodeddata.id)

      next()
    } else {
      return apiResponse.errorResponse(res, 'Token Not Valid')
    }
  } catch (e) {
    return apiResponse.errorResponse(res, e.message)
  }
}
