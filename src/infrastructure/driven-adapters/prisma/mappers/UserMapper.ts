import type { User as DomainUser } from '../../../../domain/entities/User'
import type { NewUser } from '../../../../domain/entities/NewUser'
import type { User as PrismaUser, Prisma } from '@prisma/client'

export const toDomain = (prismaUser: PrismaUser): DomainUser => ({
  id: prismaUser.id,
  name: prismaUser.name ?? undefined,
  username: prismaUser.username,
  age: prismaUser.age ?? undefined
})

export const toPrismaCreate = (newUser: NewUser): Prisma.UserCreateInput => ({
  name: newUser.name ?? null,
  username: newUser.username!,
  age: newUser.age ?? null
})

export const toPrismaUpdate = (domainUser: DomainUser): Prisma.UserUpdateInput => ({
  name: domainUser.name ?? null,
  username: domainUser.username!,
  age: domainUser.age ?? null
})
