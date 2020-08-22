import { Router } from 'express'
import * as controller from '../../controllers/v1/requests'

const router = Router()

router.get('/', controller.getMany)
router.get('/:requestId', controller.getOne)
router.post('/', controller.create)
router.put('/:requestId', controller.update)
router.delete('/:requestId', controller.remove)

export const requestsRouter = router
