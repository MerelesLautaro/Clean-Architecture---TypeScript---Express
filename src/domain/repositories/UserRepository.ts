import type { NewUser } from '../../domain/entities/NewUser'
import type { User } from '../../domain/entities/User'

export interface UserRepository {
  getAll: () => Promise<User[]>
  save: (user: NewUser) => Promise<User>
  getByUserName: (username: string) => Promise<User | null>
  update: (user: User) => Promise<User>
  delete: (user: User) => Promise<void>
  getById: (id: string) => Promise<User | null>
}
