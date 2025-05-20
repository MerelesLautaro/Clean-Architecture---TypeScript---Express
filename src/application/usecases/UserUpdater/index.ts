import type { User } from '../../../domain/entities/User'
import type { UserRepository } from 'domain/repositories/UserRepository'
import { GetUserById } from '../../../domain/services/GetterUserById'

export class UserUpdaterUseCase {
  private readonly _userRepository: UserRepository
  private readonly _getterUserById: GetUserById

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._getterUserById = new GetUserById(userRepository)
  }

  async run (data: User): Promise<User> {
    const user = await this._getterUserById.run(data.id)

    const dataToUpdate: User = {
      id: data.id,
      name: data.name ?? user.name,
      username: data.username ?? user.username,
      age: data.age ?? user.age
    }

    const userUpdated: User = await this._userRepository.update(dataToUpdate)
    return userUpdated
  }
}
