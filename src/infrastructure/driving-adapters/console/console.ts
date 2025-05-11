import { UserCreateUseCase } from '../../../application/usecases/UserCreator'
import { InMemoryUserRepository } from '../../../infrastructure/implementations/inMemory/inMemoryUserRepository'
import type { User } from '../../../domain/entities/User'

(async () => {
  const inMemoryUserRepo = new InMemoryUserRepository()

  const userCreateUseCase = new UserCreateUseCase(inMemoryUserRepo)
  const userToCreate: User = {
    name: 'Lautaro',
    age: 24,
    username: 'lauta55',
    id: '123'
  }

  await userCreateUseCase.run(userToCreate)

  console.log(inMemoryUserRepo.userData)
})()
