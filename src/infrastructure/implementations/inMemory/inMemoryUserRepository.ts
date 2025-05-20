import type { User } from '../../../domain/entities/User'
import type { UserRepository } from '../../../domain/repositories/UserRepository'

export class InMemoryUserRepository implements UserRepository {
  userData: User[] = []

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
    const users = this.userData.filter(userInMemory => userInMemory.id !== user.id)
    users.push(user)
    this.userData = users
    return user
  }

  async delete (user: User): Promise<void> {
    const index = this.userData.findIndex(usersInMemory => usersInMemory.id === user.id)
    if (index !== -1) {
      this.userData.splice(index, 1)
    }
  }

  async getById (id: string): Promise<User | null> {
    console.log('id por parametro en userRepository->', id)
    console.log(this.userData)
    const userFound = this.userData.find(usersInMemory => usersInMemory.id === id)

    if (userFound === undefined) return null

    return userFound
  }
}
