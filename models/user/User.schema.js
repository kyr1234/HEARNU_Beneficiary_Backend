import mongoose from 'mongoose'
import userrole from '../../config/constants/userRole.constant.js'
import modelFiledDefinations from '../../helper/modelFiledDefinations.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: modelFiledDefinations.stringAndRequired,
    email: modelFiledDefinations.stringAndUnique,
    password: modelFiledDefinations.stringAndRequired,
    phone_no: modelFiledDefinations.numberOnly,
    role: modelFiledDefinations.enumAndRequired(Object.values(userrole)),
    state: modelFiledDefinations.stringAndRequired,
    district: modelFiledDefinations.stringAndRequired,
  },
  { timestamps: true },
)

UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JSON_WEB_TOKEN_SECRET_KEY, {
    expiresIn: 400000,
  })
}

UserSchema.methods.getRandomPassword = function () {
  const token = crypto.randomBytes(10).toString('hex')

  const hashtoken = crypto.createHash('sha256').update(token).toString('hex')

  return hashtoken
}

const UserModel = mongoose.model('UserModel', UserSchema)
export default UserModel
