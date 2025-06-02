import type { Request, Response, NextFunction } from 'express'
import { UserAlreadyExistsException } from '../../../../domain/exceptions/UserAlreadyExistsException'
import { UserNotFoundException } from '../../../../domain/exceptions/UserNotFoundException'
import { ValidationException } from '../../../../domain/exceptions/ValidationException'
import { MissingFieldsException } from '../../../../domain/exceptions/MissingFieldsException'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof UserAlreadyExistsException) {
    res.status(400).json({ message: err.message })
  } else if (err instanceof UserNotFoundException) {
    res.status(404).json({ message: err.message })
  } else if (err instanceof ValidationException || err instanceof MissingFieldsException) {
    res.status(400).json({ message: err.message })
  } else {
    console.error('Unexpected error:', err)
    res.status(500).json({
      message: 'Internal server error',
      error: err.message
    })
  }
}
