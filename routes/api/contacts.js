const express = require('express');
const { contacts: ctrl } = require('../../controllers');
const { validation, idValidation } = require('../../middlewares');
const { joiSchema, statusJoiSchema } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', idValidation(), ctrl.getById);

router.post('/', validation(joiSchema), ctrl.add);

router.put(
  '/:contactId',
  idValidation(),
  validation(joiSchema),
  ctrl.updateById
);

router.patch(
  '/:contactId/favorite',
  idValidation(),
  validation(statusJoiSchema),
  ctrl.updateStatus
);

router.delete('/:contactId', idValidation(), ctrl.deleteById);

module.exports = router;
