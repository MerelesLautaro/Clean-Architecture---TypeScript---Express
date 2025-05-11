import type { User } from '../../../domain/entities/User'
import type { UserRepository } from '../../../domain/repositories/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  readonly userData: User[] = []

  async getAll (): Promise<User[]> {
    return this.userData
  }

  async save (user: User): Promise<User> {
    this.userData.push(user)
    return user
  }

  async getByUserName (username: string): Promise<User | null> {
    const userFound = this.userData.find(user => user.username === username)

    if (userFound === undefined) return null

    return userFound
  }

  async update (user: User): Promise<User> {
    return user
  }

  async delete (user: User): Promise<void> {

  }

  async getById (user: User): Promise<User | null> {
    return user
  }
}
