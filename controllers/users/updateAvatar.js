const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const { TEMP_DIR } = require('../../helpers/constants');
const { uploadImage, updateUserAvatar } = require('../../services');

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id, avatarURL: avatarPath } = req.user;

  try {
    const resultUpload = path.join(TEMP_DIR, originalname);

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = await uploadImage(id, req.file);
    if (avatarURL !== avatarPath) {
      await updateUserAvatar(req.user);
    }

    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = updateAvatar;
