const fs = require('fs/promises');

const updateUserAvatar = async user => {
  try {
    const { avatarURL } = user;
    await fs.unlink(avatarURL);
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateUserAvatar;
