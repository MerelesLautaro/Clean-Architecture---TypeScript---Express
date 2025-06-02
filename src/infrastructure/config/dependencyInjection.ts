import { UserPrismaRepository } from '../driven-adapters/prisma/UserPrismaRepository'
import { UserController } from '../driving-adapters/api-rest/controllers/user/UserController'
import prisma from '../config/prismaClient'

export const buildUserController = (): UserController => {
  const userRepository = new UserPrismaRepository(prisma)
  return new UserController(userRepository)
}
