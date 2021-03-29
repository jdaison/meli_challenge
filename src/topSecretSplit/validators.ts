import * as Joi from "joi";

export const pathParams = Joi.object().keys({
  satellite_name: Joi.string().valid('kenobi', 'skywalker', 'sato').required(),
})

export const info = Joi.object().keys({
  distance: Joi.number().positive().required(),
  message: Joi.array().items(Joi.string().allow('')).required().min(1),
})