const models = require('../models/index');
const { validationResult } = require('express-validator');
const {v4: uuidv4} = require('uuid');


exports.createBank = async  function (bank_name,bank_number,uuid,first_name,last_name) {

try {
   
       //insert
       const member_account_bank = await models.Member_account_bank.create({
        uuid: uuidv4(),
        bank_name: bank_name,
        bank_account_name:first_name+ ' ' +last_name,
        bank_number: bank_number,
        member_credit: 0,
        member_uuid:uuid
        });
         
        return 'success';
 
} catch (error) {
    next(error); 
}

}






