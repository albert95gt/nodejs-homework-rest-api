const { User } = require('../../models');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict('Email in use');
    }

    const avatarURL = gravatar.url(email);
    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);
    newUser.save();

    res.status(201).json({
      user: { email, subscription: 'starter', avatarURL },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
