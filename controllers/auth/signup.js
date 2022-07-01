const { User } = require('../../models');
const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { v4 } = require('uuid');
const { sendEmail, constants } = require('../../helpers');

const { BASE_URL } = constants;

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict('Email in use');
    }

    const verificationToken = v4();

    const avatarURL = gravatar.url(email);
    const newUser = new User({ email, avatarURL, verificationToken });
    newUser.setPassword(password);

    await newUser.save();

    const mail = {
      to: email,
      subject: 'Verification email',
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click here to verify</a>`,
    };

    await sendEmail(mail);

    res.status(201).json({
      user: { email, subscription: 'starter', avatarURL, verificationToken },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
