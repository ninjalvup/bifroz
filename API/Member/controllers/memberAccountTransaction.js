const md5 = require('md5');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const models = require('../models/index');
const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.reportd = async (req, res, next) => {
    try {
  
      const { amount } = req.body;
  
      //validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
      }
  
    //   const member_account_bank = await models.Member_account_bank.findOne({
    //     where: {
    //       member_uuid:req.user.sb_username
    //     },
    // });
     

    const report = await models.Member_account_bank_transaction.findAll({

      attributes: ['amount','credit_before','credit_after','bank_time','annotation','transaction_status'],

        where: {
            username:req.user.sb_username,
            transaction_type: '1'
          },
          order: [["createdAt", "DESC"]],
    });

     console.log("test "+report);
      
      res.status(200).json({
        data: {
          status: report
        }
      });
    
  
  
    } catch (error) {
      next(error);
     }
  };


  exports.reportw = async (req, res, next) => {
    try {
  
      const { amount } = req.body;
  
      //validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
      }
  
    //   const member_account_bank = await models.Member_account_bank.findOne({
    //     where: {
    //       member_uuid:req.user.uuid
    //     },
    // });
     

    const report = await models.Member_account_bank_transaction.findAll({

      attributes: ['amount','credit_before','credit_after','bank_time','annotation','transaction_status'],
        where: {
            username:req.user.sb_username,
            transaction_type: '2'
          },
          order: [["createdAt", "DESC"]],
    });

     console.log("test "+report); 
      
      res.status(200).json({
        data: {
          status: report
        }
      });
    
  
  
    } catch (error) {
      next(error);
     }
  };
  

  
  exports.RegularDeposit = async (req, res, next) => {
    try {
  
      const { amount } = req.body;
        console.log(req.user.uuid);
  
      //validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
      }
 

    const deposit = await models.Regular_deposit.create({
        uuid: uuidv4(),
        member_uuid: req.user.uuid,
        amount: amount,
        status: '0'
    
    });

   
      
      res.status(200).json({
     
          status: 'success',
          amount: amount
        
      });
    
  
  
    } catch (error) {
      next(error);
     }
  };
  