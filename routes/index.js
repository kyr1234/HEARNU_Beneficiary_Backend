import express from 'express'

import authRouter from './auth.route.js'
import FormRoutes from './Form.route.js'

const app = express()

app.use('/auth/', authRouter)
app.use('/form/', FormRoutes)

export default app
