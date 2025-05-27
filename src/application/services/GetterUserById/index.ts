import type { UserRepository } from '../../../domain/repositories/UserRepository'
import type { User } from 'domain/entities/User'
import { UserNotFoundException } from '../../../domain/exceptions/UserNotFoundException'

export class GetUserById {
  private readonly _userRepository: UserRepository

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (id: string): Promise<User> {
    const user = await this._userRepository.getById(id)

    console.log('El user es: -->', user)
    if (user === null) { throw new UserNotFoundException() }

    return user
  }
}
