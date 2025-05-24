import { UserCreateUseCase } from '../../../application/usecases/UserCreator'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter'
import { InMemoryUserRepository } from '../../../infrastructure/implementations/inMemory/inMemoryUserRepository'
import type { User } from '../../../domain/entities/User'
import { UserUpdaterUseCase } from '../../../application/usecases/UserUpdater'
import { UserDeletedUseCase } from '../../../application/usecases/UserDeleted'

(async () => {
  const inMemoryUserRepo = new InMemoryUserRepository()

  const userGetterUseCase = new UserGetterUseCase(inMemoryUserRepo)
  const userCreateUseCase = new UserCreateUseCase(inMemoryUserRepo)
  const userToCreate: User = {
    name: 'Lautaro',
    age: 24,
    username: 'lauta55',
    id: '123'
  }

  await userCreateUseCase.run(userToCreate)

  const usersReturned = await userGetterUseCase.run()
  console.log(usersReturned)

  const userUpdaterUseCase = new UserUpdaterUseCase(inMemoryUserRepo)

  await userUpdaterUseCase.run({
    id: '123',
    username: 'papitas'
  })

  const usersReturned2 = await userGetterUseCase.run()
  console.log(usersReturned2)

  const firstUser = usersReturned2[0]
  const userDeletedUseCase = new UserDeletedUseCase(inMemoryUserRepo)
  userDeletedUseCase.run(firstUser)

  const usersReturned3 = await userGetterUseCase.run()
  console.log(usersReturned3)
})()
