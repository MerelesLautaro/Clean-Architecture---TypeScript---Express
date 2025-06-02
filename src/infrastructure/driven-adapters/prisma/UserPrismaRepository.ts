import type { PrismaClient } from '@prisma/client'
import type { UserRepository } from '../../../domain/repositories/UserRepository'
import type { User } from '../../../domain/entities/User'
import type { NewUser } from '../../../domain/entities/NewUser'
import { toDomain, toPrismaCreate, toPrismaUpdate } from './mappers/UserMapper'

export class UserPrismaRepository implements UserRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async getAll (): Promise<User[]> {
    const users = await this.prisma.user.findMany()
    return users.map(toDomain)
  }

  async save (user: NewUser): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: toPrismaCreate(user)
    })
    return toDomain(createdUser)
  }

  async getByUserName (username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { username } })
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return user ? toDomain(user) : null
  }

  async update (user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: toPrismaUpdate(user)
    })
    return toDomain(updatedUser)
  }

  async delete (user: User): Promise<void> {
    await this.prisma.user.delete({
      where: { id: user.id }
    })
  }

  async getById (id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    })
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    return user ? toDomain(user) : null
  }
}
