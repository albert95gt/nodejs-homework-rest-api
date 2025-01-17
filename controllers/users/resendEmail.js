const { User } = require('../../models');
const { BadRequest, NotFound } = require('http-errors');
const { sendEmail, constants } = require('../../helpers');

const { BASE_URL } = constants;

const resendEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFound('User not found');
    }

    if (!email) {
      throw new BadRequest('Missing required field email');
    }

    if (user.verify) {
      throw new BadRequest('Verification has already been passed');
    }

    const mail = {
      to: email,
      subject: 'Verification email',
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click here to verify</a>`,
    };

    await sendEmail(mail);

    res.json({
      message: 'Verification email sent',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendEmail;
