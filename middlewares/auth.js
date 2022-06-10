const { User } = require('../models');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const auth = async (req, _, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user) {
      throw new Unauthorized('Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'invalid signature') {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;