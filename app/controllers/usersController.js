import dbQuery from '../db/dev/dbQuery';

import {
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken,
} from '../helpers/validations';

import {
  errorMessage, successMessage, status,
} from '../helpers/status';


/**
   * Signin
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  const siginUser = async (req, res) => {
    
    const { email, password } = req.body;
    if (isEmpty(email) || isEmpty(password)) {
      errorMessage.error = 'Email or Password detail is missing';
      return res.status(status.bad).send(errorMessage);
    }
    if (!isValidEmail(email) || !validatePassword(password)) {
      errorMessage.error = 'Please enter a valid Email or Password';
      return res.status(status.bad).send(errorMessage);
    }
    const signinUserQuery = "SELECT * FROM users WHERE email ='" + email + "'";
    try {
      console.log(signinUserQuery)
      const { rows } = await dbQuery.query(signinUserQuery);
      const dbResponse = rows[0];
      console.log("dbresponse",dbResponse)
      if (!dbResponse) {
        errorMessage.error = 'User with this email does not exist';
        return res.status(status.notfound).send(errorMessage);
      }
      if (dbResponse.password != password) {
        errorMessage.error = 'The password you provided is incorrect';
        return res.status(status.bad).send(errorMessage);
      }
      const token = generateUserToken(dbResponse.email, dbResponse.id);
      console.log("tokrn", token)
      delete dbResponse.password;
      successMessage.data = dbResponse;
      successMessage.data.token = token;
      successMessage.data.isUserAuthenticated = true;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      console.log("error",error)
      errorMessage.error = 'Operation was not successful';
      return res.status(status.error).send(errorMessage);
    }
  };

  export {siginUser};