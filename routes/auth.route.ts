import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';

import { readFile } from 'fs/promises';

import userModel from '../models/user.model.js';
import validate from '../middlewares/validate.mdw.js';

const router = express.Router();
const schema = JSON.parse(await readFile(new URL('../schemas/login.json', import.meta.url)));
const rfSchema = JSON.parse(await readFile(new URL('../schemas/rf.json', import.meta.url)));

router.post('/', validate(schema), async function (req, res) {
  const user = await userModel.findByUserName(req.body.username);
  if (user === null) {
    return res.status(401).json({
      authenticated: false
    });
  }

  if (bcrypt.compareSync(req.body.password, user.password) === false) {
    return res.status(401).json({
      authenticated: false
    });
  }

  const opts = {
    expiresIn: 10 * 60 // seconds
  };
  const payload = {
    userId: user.id
  };
  const accessToken = jwt.sign(payload, 'SECRET_KEY', opts);

  const refreshToken = randomstring.generate(80);
  await userModel.patch(user.id, {
    rfToken: refreshToken
  });

  res.json({
    authenticated: true,
    accessToken,
    refreshToken
  });
});

router.post('/refresh', validate(rfSchema), async function (req, res) {
  const { accessToken, refreshToken } = req.body;
  try {
    const opts = {
      ignoreExpiration: true
    };
    const { userId } = jwt.verify(accessToken, 'SECRET_KEY', opts);
    const ret = await userModel.isValidRefreshToken(userId, refreshToken);
    if (ret === true) {
      const opts = {
        expiresIn: 10 * 60 // seconds
      };
      const payload = { userId };
      const new_accessToken = jwt.sign(payload, 'SECRET_KEY', opts);
      return res.json({
        accessToken: new_accessToken
      });
    }

    return res.status(401).json({
      message: 'Refresh token is revoked.'
    });

  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: 'Invalid access token.'
    });
  }
});

export default router;