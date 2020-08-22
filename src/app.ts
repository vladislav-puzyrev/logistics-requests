import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import cors from 'cors'
import { MONGO_URI, PORT } from './config'
import { apiRouter } from './routes'

const app = express()
app.set('query parser', 'simple')

app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', apiRouter)

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Успешное подключение к MongoDB')
  app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
}).catch(console.warn)
