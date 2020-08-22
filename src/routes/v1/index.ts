import { Router } from 'express'
import { requestsRouter } from './requests'

const router = Router()
export const v1Router = router.use('/requests', requestsRouter)
