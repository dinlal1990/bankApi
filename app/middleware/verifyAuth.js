import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  errorMessage, status,
} from '../helpers/status';

import env from '../../env';

dotenv.config();

/**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @returns {object|void} response object 
   */

const verifyToken = async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    errorMessage.error = 'Token not provided';
    return res.status(status.bad).send(errorMessage);
  }
  try {
    const decoded =  jwt.verify(token, env.secret);
    return decoded.email;
  } catch (error) {
    errorMessage.error = 'Authentication Failed';
    return res.status(status.unauthorized).send(errorMessage);
  }
};

export default verifyToken;