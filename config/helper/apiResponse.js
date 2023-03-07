export const successResponse = (res, msg) => {
  var data = {
    status: 1,
    code: 200,
    message: msg,
  }
  return res.status(200).json(data)
}

export const successResponseWithData = (res, msg, data) => {
  var resData = {
    status: 1,
    code: 200,
    message: msg,
    data: data,
  }
  return res.status(200).json(resData)
}

export const sendToken = (user, res, statusCode) => {
  const token = user.getJWTToken()
  const options = {
    expire: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  }

  res.status(statusCode).cookie('token', token, options).json({
    message: 'User Login Successfully',
    token,
  })
}

export const errorResponse = (res, msg) => {
  var data = {
    status: 0,
    code: 500,
    message: msg,
  }
  return res.status(500).json(data)
}

export const notFoundResponse = (res, msg) => {
  var data = {
    status: 0,
    code: 404,
    message: msg,
  }
  return res.status(404).json(data)
}

export const validationErrorWithData = (res, msg, data) => {
  var resData = {
    status: 0,
    code: 400,
    message: msg,
    data: data,
  }
  return res.status(400).json(resData)
}
export const serverErrorWithData = (res, msg, data) => {
  var resData = {
    status: 0,
    code: 500,
    message: msg,
    data: data,
  }
  return res.status(500).json(resData)
}

export const unauthorizedResponse = (res, msg) => {
  var data = {
    status: 0,
    message: msg,
    code: 401,
  }
  return res.status(401).json(data)
}
export const forbiddenResponse = (res, msg = 'Forbidden') => {
  var data = {
    code: 403,
    status: 0,
    message: msg,
  }
  return res.status(403).json(data)
}
