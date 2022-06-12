const { Contact } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, favorite } = req.query;
    const { _id } = req.user;

    const skipped = (page - 1) * limit;
    const skip = skipped < 0 ? 0 : skipped;

    if (favorite) {
      const contacts = await Contact.find({ owner: _id, favorite }, '', {
        skip,
        limit: Number(limit),
      }).populate('owner', '_id email subscription');

      res.json(contacts);
    } else {
      const contacts = await Contact.find({ owner: _id }, '', {
        skip,
        limit: Number(limit),
      }).populate('owner', '_id email subscription');
      res.json(contacts);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
