import express from 'express'
import GetAllDataController from '../controllers/FormControllers/GetAllDataController.js'
import GetAllocatedPatientsController from '../controllers/FormControllers/GetAllocatedPatientsController.js'
import GetDistrictWiseDataController from '../controllers/FormControllers/GetDistrictWiseDataController.js'
import GetStateWiseDataController from '../controllers/FormControllers/GetStateWiseDataController.js'
import { roleAccess } from '../middlewear/roleAccess.middleware.js'
import userRoleConstant from '../config/constants/userRole.constant.js'
import { isAuthenticated } from '../middlewear/tokenVerifier.middleware.js'
import EditPatientDetailsController from '../controllers/FormControllers/EditPatientDetailsController.js'
import FormDataEntryController from '../controllers/FormControllers/DataEntryController.js'
import GetSpecialTeacherDetails from '../controllers/FormControllers/GetSpecialTeacherDetails.js'
import CreateTeacherController from '../controllers/FormControllers/CreateTeacherController.js'
import GetUserOnIdController from '../controllers/FormControllers/GetUserOnIdController.js'
import GetAllTeacherDetails from '../controllers/FormControllers/GetAllTeacherDetails.js'

const FormRoutes = express.Router()

FormRoutes.post(
  '/getTeacher',
  isAuthenticated,
  roleAccess([
    userRoleConstant.ADMIN,
    userRoleConstant.WeHearCSR,
    userRoleConstant.SpecialTeacher,
  ]),
  GetSpecialTeacherDetails,
)

FormRoutes.get(
  '/users/:role',
  isAuthenticated,
  roleAccess([userRoleConstant.ADMIN, userRoleConstant.WeHearCSR]),
  GetAllTeacherDetails,
)

FormRoutes.get(
  '/getUserOnId',
  isAuthenticated,
  roleAccess([
    userRoleConstant.WeHearCSR,
    userRoleConstant.ADMIN,
    userRoleConstant.SpecialTeacher,
  ]),
  GetUserOnIdController,
)

FormRoutes.get(
  '/getAllPatientData',
  isAuthenticated,
  roleAccess([userRoleConstant.ADMIN, userRoleConstant.WeHearCSR]),
  GetAllDataController,
)
FormRoutes.get(
  '/getDataOnState',
  isAuthenticated,
  roleAccess([userRoleConstant.Governement, userRoleConstant.ADMIN]),
  GetStateWiseDataController,
)

FormRoutes.get(
  '/getDistrictData',
  isAuthenticated,
  roleAccess([
    userRoleConstant.ADMIN,
    userRoleConstant.IEDCoordinator,
    userRoleConstant.Donner,
  ]),
  GetDistrictWiseDataController,
)

FormRoutes.get(
  '/getAllocatedTeacherData',
  isAuthenticated,
  roleAccess([userRoleConstant.SpecialTeacher]),
  GetAllocatedPatientsController,
)

FormRoutes.post(
  '/addData',
  isAuthenticated,
  roleAccess([
    userRoleConstant.ADMIN,
    userRoleConstant.SpecialTeacher,
    userRoleConstant.WeHearCSR,
  ]),
  FormDataEntryController,
)

FormRoutes.put(
  '/editPatientDetails',
  isAuthenticated,
  roleAccess([
    userRoleConstant.ADMIN,
    userRoleConstant.SpecialTeacher,
    userRoleConstant.WeHearCSR,
  ]),
  EditPatientDetailsController,
)

FormRoutes.post(
  '/createTeacher',
  isAuthenticated,
  roleAccess([userRoleConstant.ADMIN, userRoleConstant.WeHearCSR]),
  CreateTeacherController,
)

export default FormRoutes
