import * as Joi from "joi";

const satellite = Joi.object().keys({
  name: Joi.string().valid('kenobi', 'skywalker', 'sato').required(),
  distance: Joi.number().positive().required(),
  message: Joi.array().items(Joi.string().allow('')).required().min(1),
})

export const satellitesSchema = Joi.object().keys(
  {
    satellites: Joi.array().items(satellite).required().length(3)
  }
)

export const headerSchema = Joi.object().keys({
  "authorization": Joi.string().required(),
}).pattern(/./, Joi.string())
