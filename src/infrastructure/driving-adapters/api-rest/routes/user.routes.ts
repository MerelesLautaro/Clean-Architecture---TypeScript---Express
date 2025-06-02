import { Router } from 'express'
import { buildUserController } from '../../../config/dependencyInjection'

const userRouter = Router()
const userController = buildUserController()

userRouter.use('/', userController.router)

export default userRouter
