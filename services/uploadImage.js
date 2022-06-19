const sharp = require('sharp');
const path = require('path');
const fs = require('fs/promises');
const { AVATARS } = require('../helpers/constants');

const uploadImage = async (id, file) => {
  const avatarURL = path.join('public', AVATARS, `${id}_${file.originalname}`);
  try {
    await sharp(file.path).resize(250, 250).toFile(avatarURL);
    return avatarURL;
  } catch (error) {
  } finally {
    await fs.unlink(file.path);
  }
};

module.exports = uploadImage;
