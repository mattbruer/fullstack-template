const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const { sendPasswordResetEmail } = require('../ses_sendemail');

module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.post('/resetPassword', async (req, res, next) => {
  const { newPassword, token } = req.body;

  try {
    const user = await User.resetPassword(newPassword, token);

    res.json(user);
  } catch (error) {
    next(error);
  }
});
router.post('/forgotPassword', async (req, res, next) => {
  const { email } = req.body;
  try {
    const resetToken = await User.resetToken(email);
    sendPasswordResetEmail(email, resetToken).then(function (data) {
      res.send(data.MessageId);
    });
  } catch (error) {
    if (error.status === 401) {
      res.send('no user');
    }
    next(error);
  }
});
