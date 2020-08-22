import { Router } from 'express'
import { v1Router } from './v1'

const router = Router()
export const apiRouter = router.use('/v1', v1Router)
