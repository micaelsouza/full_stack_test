const Joi = require('@hapi/joi');
const { Router } = require('express');
const { createValidator } = require('express-joi-validation');
const { User } = require('../models');

const router = Router();
const validator = createValidator({});

router.post(
  '/',
  validator.body(
    Joi.object({
      name: Joi.string().required(),
      cpf: Joi.string()
        .length(11)
        .required(),
      email: Joi.string()
        .email()
        .required()
        .case('lower'),
      phonenumber: Joi.string().required(),
    }),
  ),
  async (req, res, next) => {
    try {
      const user = await User.create({ ...req.body });
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  '/',
  validator.query(
    Joi.object({
      limit: Joi.number()
        .min(1)
        .max(50)
        .default(10),
      offset: Joi.number()
        .min(0)
        .default(0),
    }),
  ),
  async (req, res, next) => {
    const { limit, offset } = req.query;

    try {
      const users = await User.findAll({
        limit,
        offset,
        where: {},
        order: [['createdAt', 'DESC']],
      });
      res.json(users);
    } catch (e) {
      next(e);
    }
  },
);

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (user) {
      return res.json(user);
    }

    res.boom.notFound(`User id:${id} not found!`);
  } catch (e) {
    next(e);
  }
});

router.put(
  '/:id',
  validator.body(
    Joi.object({
      name: Joi.string(),
      cpf: Joi.string().length(11),
      email: Joi.string()
        .email()
        .case('lower'),
      phonenumber: Joi.string(),
    }),
  ),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);

      if (user) {
        await user.update({ ...req.body });
        return res.json(user);
      }

      res.boom.notFound(`User id:${id} not found!`);
    } catch (e) {
      next(e);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return res.status(204).send();
    }

    res.boom.notFound(`User id:${id} not found!`);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
