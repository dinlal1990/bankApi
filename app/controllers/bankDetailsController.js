import dbQuery from '../db/dev/dbQuery';
import verifyToken from '../middleware/verifyAuth';
import {errorMessage, successMessage, status,
} from '../helpers/status';

//get bank details

const bankDetails = async (req, res) => {
    // verify Token
    // token will be sent in the request header.
const email = verifyToken(req, res);

 if(isEmpty(email)){
    errorMessage.error = 'Email or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
 }
 const accountQuery = "SELECT * FROM account WHERE email ='" + email + "'";
 try{
    const { rows } = await dbQuery.query(accountQuery);
    const dbResponse = rows[0];
    if (!dbResponse) {
       errorMessage.error = 'account with this email does not exist';
       return res.status(status.notfound).send(errorMessage);
     }
     successMessage.data = dbResponse;
     return res.status(status.success).send(successMessage);
 } catch(error){
    console.log("error",error)
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
 };

 export default bankDetails;
 

