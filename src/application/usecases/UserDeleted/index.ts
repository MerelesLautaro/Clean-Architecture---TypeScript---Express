import type { User } from '../../../domain/entities/User'
import type { UserRepository } from 'domain/repositories/UserRepository'
import { ExistUserByUserName } from '../../services/ExistUserByUserName'
import { MissingFieldsException } from '../../../domain/exceptions/MissingFieldsException'

export class UserDeletedUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByUserName: ExistUserByUserName

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run (body: User): Promise<void> {
    if (body.username === undefined) throw new MissingFieldsException()

    const existUser: boolean = await this._existUserByUserName.run(body.username)

    if (existUser) {
      await this._userRepository.delete(body)
    }
  }
}
