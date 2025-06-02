import type { Request, Response, Router, NextFunction } from 'express'
import { Router as ExpressRouter } from 'express'
import { UserCreateUseCase } from '../../../../../application/usecases/UserCreator'
import type { UserRepository } from '../../../../../domain/repositories/UserRepository'
// import { UserNotFoundException } from '../../../../../domain/exceptions/UserNotFoundException'
import { userSchema } from '../../../../../application/validators/UserValidator'
import type { CreateUserDTO } from 'application/dtos/UserCreatorDTO'
import { ValidationException } from '../../../../../domain/exceptions/ValidationException'

export class UserController {
  public readonly router: Router

  constructor (private readonly userRepository: UserRepository) {
    this.router = ExpressRouter()
    this.initializeRoutes()
  }

  private initializeRoutes (): void {
    this.router.get('/', this.getAllUsers.bind(this))
    this.router.post('/', this.createUser.bind(this))
    //  this.router.put('/:id', this.updateUser.bind(this))
    //  this.router.delete('/:id', this.deleteUser.bind(this))
  }

  private async getAllUsers (req: Request, res: Response): Promise<void> {
    const users = await this.userRepository.getAll()
    res.json(users)
  }

  private async createUser (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { error, value } = userSchema.validate(req.body)
    if (error !== undefined) {
      next(new ValidationException(error.details[0].message))
    }

    // Extraer los datos validados
    const { username, name, age } = value as CreateUserDTO

    try {
      const userCreator = new UserCreateUseCase(this.userRepository)
      const user = await userCreator.run({ username, name, age })
      res.status(201).json(user) // puede usar un DTO de salida si quieres ocultar campos internos
    } catch (err) {
      next(err)
    }
  }
/*
  private async updateUser (req: Request, res: Response): Promise<void> {
    const { id } = req.params
    const { username, email, password } = req.body

    const user = await this.userRepository.getById(id)
    if (!user) {
      throw new UserNotFoundException()
    }

    user.username = username ?? user.username
    user.email = email ?? user.email
    user.password = password ?? user.password

    const updatedUser = await this.userRepository.update(user)
    res.json(updatedUser)
  }

  private async deleteUser (req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const user = await this.userRepository.getById(id)
    if (!user) {
      throw new UserNotFoundException()
    }

    await this.userRepository.delete(user)
    res.status(204).send()
  }
    */
}
