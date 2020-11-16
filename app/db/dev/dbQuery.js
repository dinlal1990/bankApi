import pool from './pool';

export default {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query(quertText, params) {
      return new Promise(function(resolve,reject){
          pool.query(quertText, params)
          .then(function(res){
              resolve(res);
          })
          .catch(function(err){
              reject(err);
          })
      });
    }
};
