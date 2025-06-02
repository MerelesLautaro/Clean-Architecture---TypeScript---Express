import Joi from 'joi'

export const userSchema = Joi.object({
  name: Joi.string()
    .optional()
    .messages({
      'string.base': 'El nombre debe ser una cadena de texto.'
    }),

  username: Joi.string()
    .required()
    .messages({
      'string.base': 'El nombre de usuario debe ser una cadena.',
      'any.required': 'El campo nombre de usuario es obligatorio.'
    }),

  age: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      'number.base': 'La edad debe ser un número.',
      'number.integer': 'La edad debe ser un número entero.',
      'number.min': 'La edad no puede ser negativa.'
    })
})
