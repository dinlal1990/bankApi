
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../env';

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

/**
   * validatePassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
const validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false;
  } return true;
};
/**
   * isEmpty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  } return true;
};

/**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */
  const generateUserToken = (email, id) => {
  const token = jwt.sign({email, user_id: id},env.secret,{ expiresIn: '3d' });
    return token;
  };

/**
   * empty helper method
   * @param {string, integer} input
   * @returns {Boolean} True or False
   */
const empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};

export {
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken,
  empty
};  