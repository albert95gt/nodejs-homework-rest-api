const express = require('express');
const { users: ctrl } = require('../../controllers');
const { auth, validation, upload } = require('../../middlewares');
const { subscriptionJoiSchema, emailJoiSchema } = require('../../models/user');

const router = express.Router();

router.get('/current', auth, ctrl.getCurrent);

router.patch(
  '/',
  auth,
  validation(subscriptionJoiSchema),
  ctrl.updateSubscription
);
router.patch('/avatars', auth, upload.single('avatar'), ctrl.updateAvatar);

router.get('/verify/:verificationToken', ctrl.verifyEmail);
router.post('/verify', validation(emailJoiSchema), ctrl.resendEmail);

module.exports = router;
