import express from 'express'
import { notFoundResponse } from './helper/apiResponse.js'
import mongoose from 'mongoose'
import indexroute from './routes/index.js'

import cors from 'cors'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'

var MONGODB_URL = process.env.MONGODB_URL_DEVELOPMENT

if (process.env.MODE == 'development') MONGODB_URL = process.env.MONGODB_URL
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to %s', process.env.MODE)
  })
  .catch((err) => {
    console.error('App starting error:', err.message)
    process.exit(1)
  })

const app = express()
export const port = process.env.PORT || '8000'

app.use(express.static('public'))
app.use(
  cors({
    origin: '*', // Allow all domains
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all methods
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Allow all headers
    credentials: true, // Allow credentials to be shared
  }),
)

app.use(bodyParser.json({ limit: '150mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '150mb' }))

app.use(fileUpload())
app.use('/api/', indexroute)

app.all('*', function (req, res) {
  return notFoundResponse(res, 'Page not found')
})

app.listen(port, async () => {
  console.log('APP is running on port ' + port)
})
