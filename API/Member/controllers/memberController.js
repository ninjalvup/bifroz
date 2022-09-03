const models = require('../models/index');
const bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const config = require('../config/index');
const apiExternalController = require('./apiExternalController');
const { v4: uuidv4 } = require('uuid');
const memberAccountController = require('./memberAccountController');
const axios = require('axios');
var querystring = require('querystring');
const moment = require('moment');

exports.launchGame = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const dataLuanch = await apiExternalController.launchGame(username, password);

        res.status(200).json({
            data: dataLuanch
        })

    } catch (error) {
        next(error)
    }
}

exports.register = async (req, res, next) => {
    try {
        const { first_name, last_name, password, tel, bonus, bank_name, bank_number, line_id, know_us ,prefix} = req.body;
   

      //  validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }

        //check tel
        const existtel = await models.Member.findOne({
            where: { tel: tel }
        });

        if (existtel) {
            const error = new Error('มีหมายเลขโทรศัพท์นี้ในระบบแล้ว');
            error.statusCode = 400;
            throw error;
        }
        

        const existaccount = await models.Member_account_bank.findOne({
            where: { bank_number: bank_number }
        });
        if (existaccount) {
            const error = new Error('มีบัญชี นี้ในระบบแล้ว');
            error.statusCode = 400;
            throw error;
        }
     
        const createuser = await apiExternalController.createUser(tel, password, first_name, last_name);

        if (createuser.data.data.errorCode === "USERNAME_ALREADY_EXIST") {
            const error = new Error('มีบัญชีนี้ในระบบ ufa แล้ว');
            error.statusCode = 400;
            throw error;
        }


        if (createuser.data.data.errorCode === "UNAUTHORIZED") {
            const error = new Error('ระบบขัดข้อง โปรดติดต่อแอดมิน !');
            error.statusCode = 400;
            throw error;
        }


        let _id = createuser.data.data.result._id;
        let group_id = createuser.data.data.result.group;
        let rprefix = Math.random().toString(36).substring(7);

      
        // insert
        const member = await models.Member.create({
            uuid:  uuidv4(),
            first_name: first_name,
            last_name: last_name,
            password: await models.Member.encryptPassword(password),
            tel: tel,
            bonus: bonus,
            line_id: line_id,
            know_us: know_us,
            sb_password: password,
            sb_username: createuser.data.data.result.username,
            _id:_id,
            group_id:group_id,
            prefix: rprefix,
            new_member:'1'

        });

        const createbank = await memberAccountController.createBank(bank_name, bank_number, member.uuid, first_name, last_name);

        if(prefix != null){ 
            
              //check tel
            const memberpre = await models.Member.findOne({
                where: { prefix: prefix }
            });
           
            if(memberpre != null){

                const affiliate_Member = await models.Affiliate_Member.create({
                    uuid: uuidv4(),
                    member_uuid: memberpre.uuid,
                    member_uuid_member: member.uuid,
                });
            }
            
        }


         res.status(201).json({
                message: "add user success",
        });

    } catch (error) {

        next(error);

    }
}


exports.login = async (req, res, next) => {
    try {
        const { tel, password } = req.body;


        const combine = await models.Combine.findOne();

        if(combine.web_on_off === 0){
            const error = new Error('เว็บไซต์ ปิดอยู่');
            error.statusCode = 403;
            throw error;
        }
        //check ว่ามีtelนี้ไม่ระบบหรือไม่
        const member = await models.Member.findOne({
            where: {
                tel: tel
            }
        });
        if (!member) {
            const error = new Error('ไม่พบผู้ใช้งานในระบบ');
            error.statusCode = 404;
            throw error;
        }

        // ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่ ถ้าไม่ตรง (false) ให้โยน error ออกไป
        const passwordold = member.dataValues.password;

        // ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่ ถ้าไม่ตรง (false) ให้โยน error ออกไป
        const isValid = await models.Member.checkPassword(password, passwordold);

        if (!isValid) {
            const error = new Error('รหัสผ่านไม่ถูกต้อง');
            error.statusCode = 401;
            throw error;
        }


        //  สร้าง token
        const token = await jwt.sign({
            uuid: member.uuid
        }, config.JWT_SECRET, { expiresIn: config.JWT_EXP });

        //decode วันหมดอายุ
        const expires_in = jwt.decode(token);

        //  insert sytem_logs
        const systme_logs = await models.System_Log_Member.create({
            uuid: uuidv4(),
            status_user: 1,
            member_uuid: member.uuid

        });

        return res.status(200).json({
            success: true,
            access_token: token,
            expires_in: expires_in.exp,
            token_type: 'Bearer'
        });


    } catch (error) {
        next(error);
    }
}

exports.redirectLogin = async (req, res, next) => {
    try {
        const tel  = req.query.tel;
        const password  = req.query.password;


        const combine = await models.Combine.findOne();


        if(combine.web_on_off === 0){
            const error = new Error('เว็บไซต์ ปิดอยู่');
            error.statusCode = 403;
            throw error;
        }
        //check ว่ามีtelนี้ไม่ระบบหรือไม่
        const member = await models.Member.findOne({
            where: {
                tel: tel
            }
        });
        if (!member) {
            const error = new Error('ไม่พบผู้ใช้งานในระบบ');
            error.statusCode = 404;
            throw error;
        }

        // ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่ ถ้าไม่ตรง (false) ให้โยน error ออกไป
        const passwordold = member.dataValues.password;

        // ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่ ถ้าไม่ตรง (false) ให้โยน error ออกไป
        const isValid = await models.Member.checkPassword(password, passwordold);

        if (!isValid) {
            const error = new Error('รหัสผ่านไม่ถูกต้อง');
            error.statusCode = 401;
            throw error;
        }


        //  สร้าง token
        const token = await jwt.sign({
            uuid: member.uuid
        }, config.JWT_SECRET, { expiresIn: config.JWT_EXP });

        //decode วันหมดอายุ
        const expires_in = jwt.decode(token);

        //  insert sytem_logs
        const systme_logs = await models.System_Log_Member.create({
            uuid: uuidv4(),
            status_user: 1,
            member_uuid: member.uuid

        });

        return res.status(200).json({
            success: true,
            access_token: token,
            expires_in: expires_in.exp,
            token_type: 'Bearer'
        });


    } catch (error) {
        next(error);
    }
}

exports.logout = async (req, res, next) => {


    var sess = req.user;
    console.log(token);

    res.status(200).json({
        data: sess
    });
}


exports.edit = async (req, res, next) => {
    try {

        const member = await models.Member.findOne({
            attributes: { exclude: ['password'] },
            where: {
                uuid: req.user.uuid,
            },
        });

        res.status(201).json({
            data: {
                message: member
            }

        });

    } catch (error) {
        next(error);
    }
}

//udate member
exports.update = async (req, res, next) => {
    try {

        const { first_name, last_name, tel } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }

        //update user
        const user = await models.Member.update({
            first_name: first_name,
            last_name: last_name,
            tel: tel


        }, {
            where: {
                uuid: req.user.uuid
            }
        });

        res.status(201).json({
            message: "update data success"

        });

    } catch (error) {
        next(error);
    }
}


//udatepassword member
exports.updatepassword = async (req, res, next) => {
    try {

        const { password, passwordold } = req.body;
      

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }

        const member = await models.Member.findOne({
            where: {
                uuid: req.user.uuid
            }
        });


        if (!member) {
            const error = new Error('ไม่พบผู้ใช้งานในระบบ');
            error.statusCode = 404;
            throw error;
        }

        const passwordolddb = member.dataValues.password;




        // ตรวจสอบรหัสผ่านว่าตรงกันหรือไม่ ถ้าไม่ตรง (false) ให้โยน error ออกไป
        const isValid = await models.Member.checkPassword(passwordold, passwordolddb);

        if (!isValid) {
            const error = new Error('รหัสผ่านเดิมไม่ถูกต้อง');
            error.statusCode = 401;
            throw error;
        }


        const updatePassword = await apiExternalController.resetPassword(member.sb_username, password);


        const passwordHash = await models.Member.encryptPassword(password);

        //update user
        const user = await models.Member.update({
            password: passwordHash,
            sb_password: password
        }, {
            where: {
                uuid: req.user.uuid
            }
        });

        res.status(201).json({
            message: "update password success"

        });


    } catch (error) {
        next(error);
    }
}



exports.profile = async (req, res, next) => {
    try {


        const member = await models.Member.findOne({
            attributes: { exclude: ['password'] },
            where: {
                uuid: req.user.uuid,
            },
        });


        const member_account_bank = await models.Member_account_bank.findOne({
            where: {
                member_uuid: req.user.uuid,
            },

        });

        const bank = await models.Main_Bank.findAll();


        let checkbank = 1;
        for (let index = 0; index < bank.length; index++) {
            let element = bank[index].type_deposit;

            // 2 decimal
              if(element == 2){
                checkbank = 2;
              }
    
        }

        const data = {
            "uuid": member.uuid,
            "first_name": member.first_name,
            "last_name": member.last_name,
            "tel": member.tel,
            "bonus": member.bonus,
            "line_id": member.line_id,
            "know_us": member.know_us,
            "sb_password": member.sb_password,
            "sb_username": member.sb_username,
            "prefix": member.prefix,
            "register_date": member.register_date,
            "createdAt": member.createdAt,
            "updatedAt": member.updatedAt,
            "bank_name": member_account_bank.bank_name,
            "bank_number": member_account_bank.bank_number,
            "member_credit": member_account_bank.member_credit,
            "checkbank": checkbank
        }


        res.status(200).json({
            data: data
        
        });

    } catch (error) {
        next(error);
    }


}


exports.getAuthUser = async (req, res, next) => {
    try {

        const key = "a2fc3b85e0f8ef4b403f70cdd35d3cc2";

        const sb_username = req.user.sb_username;
        const member = await models.Member.findAll();

        const resp = await ApiExternalController.getCredit(key, sb_username);


        res.status(200).json({
            user: req.user,
            resp: resp

        });

    } catch (error) {
        next(error);
    }


}

exports.bank = async (req, res, next) => {
    try {

        const bank = await models.Main_Bank.findAll();
        res.status(200).json({
            data: bank
        });

    } catch (error) {
        next(error);
    }


}

exports.getTruemoney = async (req, res, next) => {
    try {
  
    const TrueMoney = await models.Main_Bank.findAll({
        where: {
            bank_name: 'truemoney'
          },
          order: [["createdAt", "DESC"]],
    });
 
      res.status(200).json({
        data: {
          status: TrueMoney
        }
      });
    
  
  
    } catch (error) {
      next(error);
     }
  };


  exports.header = async (req, res, next) => {
    try {

        console.log(req.body);

        // console.log("ip:", req.ipInfo);

        console.log("ip:",(req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress || 
        req.connection.socket.remoteAddress);

        console.log("ip1:",req.connection.remoteAddress);
        console.log("ip2:",req.ip);

        console.log("req.headers:",req.headers);
  
           
 
      res.status(200).json({
        data:   req.body
      });
    
  
  
    } catch (error) {
      next(error);
     }
  };


  exports.forgotpassword = async (req, res, next) => {
    try {

        const { first_name, last_name, tel, bank_number} = req.body;
        let uuid;
    

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }

        //check tel
        const existtel = await models.Member.findOne({
            where: { tel: tel }
        });
 

        if (!existtel) {
            const error = new Error('ไม่พบเบอร์นี้ในระบบ');
            error.statusCode = 400;
            throw error;
        }
     
        uuid = existtel.uuid;
 

        const existaccount = await models.Member_account_bank.findOne({
            where: { member_uuid: existtel.uuid }
        });

        
        if (existaccount.bank_number !== bank_number) {
            const error = new Error('ไม่พบบัญชี ตรงกับ เบอร์ทีสมัคร ในระบบ');
            error.statusCode = 400;
            throw error;
        }


        if (existtel.first_name !== first_name && existtel.last_name  !== last_name ) {
            const error = new Error('ไม่พบชื่อนี้ ทีตรงกับเบอร์ที่สมัครในระบบ');
            error.statusCode = 400;
            throw error;
        }

           
 
      res.status(200).json({
        data: 'success',
        uuid:uuid
      });
    
  
  
    } catch (error) {
      next(error);
     }
  };
  
    exports.forgotpasswordupdate = async (req, res, next) => {
    try {

        const { uuid, password} = req.body;


        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
            error.statusCode = 422;
            error.validation = errors.array();
            throw error;
        }

        const member = await models.Member.findOne({
            where: {
                uuid: uuid
            }
        });


        const  responseUpdate = await apiExternalController.resetPassword(member.sb_username, password);

        //check tel
        const updatepassword = await models.Member.update({
            password: await models.Member.encryptPassword(password),
            sb_password: password
           },
           {
            where: { uuid: uuid }
           }
        );

      
   
 
      res.status(200).json({
        data: 'success',
        password:password
      });
    
  
  
    } catch (error) {
      next(error);
     }
  };
  



  exports.showMLM = async (req, res, next) => {

      try {
        
        const { uuid } = req.user;

        console.log("uuid:",uuid);
        let mlms = [];
       mlms =  await mlm(uuid);

       
        console.log("affiliatem:",mlms);
            

        res.json({
            data: "ok",
            mlm: mlms
        });

         
       
          
      } catch (error) {
        next(error);
      }
  
     
    }

    let mlma = [] ;
    mlm = async (parentId) => {


     
        const affiliateMember = await models.Affiliate_Member.findAll( );


        for (var i = 0; i < affiliateMember.length; i++) {
            var member = affiliateMember[i];
            // console.log(member);
            if (member.member_uuid_member === parentId) {
              console.log("1");
                member_uuid = member.member_uuid;
                    mlma.push(member_uuid);
                    mlma.forEach(element => {

                        if(element == member.member_uuid_member){
                            console.log(element);
                            mlma.push(member.member_uuid,member.member_uuid_membe)
                        }
                      
                    });
               
                   await mlm(member_uuid);
            }
        }
     
        console.log("mlm:", mlma);

        return mlma
    }
    
  
  



