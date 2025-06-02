import type { User } from '../../../domain/entities/User'
import type { NewUser } from '../../../domain/entities/NewUser'
import type { CreateUserDTO } from 'application/dtos/UserCreatorDTO'
import type { UserRepository } from 'domain/repositories/UserRepository'
import { ExistUserByUserName } from '../../services/ExistUserByUserName'
import { UserAlreadyExistsException } from '../../../domain/exceptions/UserAlreadyExistsException'
import { MissingFieldsException } from '../../../domain/exceptions/MissingFieldsException'

export class UserCreateUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByUserName: ExistUserByUserName

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run (body: CreateUserDTO): Promise<User> {
    if (body.username === undefined) throw new MissingFieldsException()

    const existUser: boolean = await this._existUserByUserName.run(body.username)

    if (existUser) throw new UserAlreadyExistsException()

    const userToCreate: NewUser = {
      name: body.name,
      username: body.username,
      age: body.age
    }

    const userCreated: User = await this._userRepository.save(userToCreate)

    return userCreated
  }
}
