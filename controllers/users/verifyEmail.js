const { User } = require('../../models');
const { NotFound } = require('http-errors');

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw NotFound('User not found');
    }
    const { _id: id } = user;
    await User.findByIdAndUpdate(id, { verify: true, verificationToken: null });

    res.json({
      message: 'Verification successful',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
