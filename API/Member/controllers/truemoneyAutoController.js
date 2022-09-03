const md5 = require('md5');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const models = require('../models/index');
const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config_env = require('../config/index');
const e = require('express');
var moment = require('moment');



const urlConfig = config_env.URL_CONFIG;


exports.autotruemoney = async (req, res, next) => {
    try {
 
      const { hash_key, name, pkg, title, text, firstname, lastname, amount, balance } = req.body;
  
      //validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
      }
  
  
      if (hash_key) {
        const hash = hash_key;
        if (md5(hash) === '637e35acf4b87f919b859c6ff33bcd19') {

          if (firstname != " " && lastname != " ") {

  


            const Main_Bank = await models.Main_Bank.findOne({
              where: {
                bank_name: 'truemoney'
              }
            });

 
            console.log('Main_Bank',Main_Bank);
         if(Main_Bank != null){   
           
          console.log('Main_Bank');
             // update
                const trandeposit = await models.Main_Bank.update({        
                  amount: balance
                }, {
                  where: {
                    uuid: Main_Bank.uuid
                  }
                });
               
              }

            const account = await findProfileScbBank(firstname, lastname);
  
  
            if (account != null) {
              const member = await models.Member.findOne({
                attributes: { exclude: ['password'] },
                where: {
                  uuid: account.member_uuid,
                },
              });


           
              const trumoney = await models.Truemoney_Transactions.create({
                uuid: uuidv4(),
                name:name,
                pkg:pkg,
                title:title,
                text:text,
                firstname:firstname,
                lastname:lastname,
                amount:amount,
                balance:balance,
                member_uuid:member.uuid,
                status: 1
              });


            
                 //ไม่รับโปรโมชั่น
                 if (member.bonus === 0) {
                    const Promotionnot = await models.Promotions.findOne({
                      where: {
                        turnnotpro: 1
                      }
                    });
                    let mamount = parseFloat(Promotionnot.max_bonus) + parseFloat(amount);
                    const response = await deposit(mamount, member.sb_username);
            
                        let before = response.data.result[0].beforeBalance;
                    let resamount = response.data.result[0].amount;
                    let after = response.data.result[0].afterBalance;
                    let ref = response.data.result[0].ref;
            
                    if (resamount == null) {
                      const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
                      error.statusCode = 422;
                      error.validation = errors.array();
                      throw error;
                    }
    
                    const uuidtarns = uuidv4();
                    const trandeposit = await models.Member_account_bank_transaction.create({
                      uuid: uuidtarns,
                      bank: account.uuid,
                      amount: amount,
                      bonus_credit: Promotionnot.max_bonus,
                      transaction_type: '1', //ฝากหรือถอน
                      annotation: Promotionnot.promotion_name,
                      credit_before: before,
                      credit_after: after,
                      bank_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                      create_by: 'autotruemoney',
                      ref: ref,
                      username: member.sb_username,
                      promotion_uuid: Promotionnot.uuid,
                      transaction_status: '1'
    
                    });
    
                    const refdepost = await models.Ref_deposits.create({
                      uuid: uuidv4(),
                      username: member.sb_username,
                      ref: ref,
                      acc_bank_transaction_uuid: uuidtarns
    
                    });
    
    
    
                    res.status(200).json({
                      data: {
                        message: "success",
                        member: trandeposit
                      }
                    });
    
                  } else {
    
                    //รับโปรโมชั่น
                    let Promotion;
                    Promotion = await models.Promotions.findOne({
                      where: {
                        min_deposit: {
                          [Op.lte]: amount
                        },
                        max_deposit: {
                          [Op.gte]: amount
                        }
                      }
                    });
    
                    if (Promotion == null) {
                      Promotion = await models.Promotions.findOne({
                        where: {
                          turnnotpro: 1
                        }
                      });
                    }
    
                    let mamount = parseFloat(Promotion.max_bonus) + parseFloat(amount);
            
                    const response = await deposit(mamount, member.sb_username);
            
                   let before = response.data.result[0].beforeBalance;
                    let resamount = response.data.result[0].amount;
                    let after = response.data.result[0].afterBalance;
                    let ref = response.data.result[0].ref;
            
                    if (resamount == null) {
                      const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
                      error.statusCode = 422;
                      error.validation = errors.array();
                      throw error;
                    }
    
                    const uuidtarn = uuidv4();
                    const trandeposit = await models.Member_account_bank_transaction.create({
                      uuid: uuidtarn,
                      bank: account.uuid,
                      amount: amount,
                      bonus_credit: Promotion.max_bonus,
                      transaction_type: '1', //ฝากหรือถอน
                      annotation: Promotion.promotion_name,
                      credit_before: before,
                      credit_after: after,
                      bank_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                      create_by: 'autotruemoney',
                      ref: ref,
                      username: member.sb_username,
                      promotion_uuid: Promotion.uuid,
                      transaction_status: '1'
    
                    });
    
    
                    const refdepostpro = await models.Ref_deposits.create({
                      uuid: uuidv4(),
                      username: member.sb_username,
                      ref: ref,
                      acc_bank_transaction_uuid: uuidtarn
    
                    });
    
    
                    res.status(200).json({
                      data: {
                        message: "success",
                        member: trandeposit
                      }
                    });
    
                  }
    
          
  
            } else {

              const trumoney = await models.Truemoney_Transactions.create({
                uuid: uuidv4(),
                name:name,
                pkg:pkg,
                title:title,
                text:text,
                firstname:firstname,
                lastname:lastname,
                amount:amount,
                balance:balance,
                member_uuid: null,
                status:0
              });
             

              res.status(400).json({
                data: {
  
                  success: false,
                  message: 'username invalid'
                }
              });
            }
  
          }
  
  
        }
        else {
          res.status(400).json({
            data: {
  
              success: false,
              message: 'key invalid'
            }
          });
        }
  
      }
  
    } catch (error) {
  
      next(error);
  
    }
  }





  
async function findProfileScbBank(first_name, last_name) {
    try {
  
    
      const member = await models.Member.findOne({
        where: {
          first_name: {
            [Op.like]: '%' + first_name + '%'
          },
          last_name: {
            [Op.like]: '%' + last_name + '%'
          }
        }
      });
  
      if (member != null) {
        const bknumber = await models.Member_account_bank.findOne({
          where: {
            member_uuid: {
              [Op.like]: '%' + member.uuid + '%'
            }
          }
        });
        
    
        return bknumber;
  
      }
  
      return member;
  
    } catch (error) {
  
      next(error);
  
    }
  }

  async function deposit(amount, sb_username) {
    try {
  
      const user = await models.Member.findOne({
        where: {
          sb_username: sb_username
        }
      });
  
  
      const response = await axios.post(`${urlConfig}/api/askmebet/add-deposit`, {
        amount: amount,
        id: user._id
      }
        , {
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
      return response;
  
    } catch (error) {
      next(error);
    }
  }