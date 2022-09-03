const md5 = require('md5');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const models = require('../models/index');
const { validationResult } = require('express-validator');
const Sequelize = require('sequelize');
const config_env = require('../config/index');
const Op = Sequelize.Op;

const moment = require('moment');
const urlConfig = config_env.URL_CONFIG; 
// const urlConfig = "http://139.59.232.84:5000"; 
// const urlConfig = "http://188.166.217.116:5000"; 
// const urlConfig = "http://159.65.131.248:5000"; 
// const urlConfig = "http://165.22.252.205:5000"; 
// const urlConfig = "http://206.189.47.140:5000"; 
// const urlConfig = "http://209.97.164.93:5000"; 
// const urlConfig = "http://157.230.34.221:5000"; 


exports.autodecimal = async (req, res, next) => {
  try {
 
    const status_sms = 0; // status sms
 
    const { phoneNumber, sms } = req.body;
    const key = req.params.key;
    let trandeposits;
    let moneyamount;


    let bank_date = "";
    let bank_time = "";
    let amount = "";
    let bank_tranfer = "";
    let bonus;
    let resp;

    let spsms = sms.split(" ");
    console.log("spsms::::",spsms);

    const search = "โอนเข้า";
    const indexOf = spsms[0].indexOf(search);
    const searchend = "ถอน";
    const indexOfend = spsms[0].indexOf(searchend);

    console.log("indexOf:::",indexOf);

    const smsOtp = "โอนเงินไปบ/ช";
    const smsTranfer = "หากสงสัยโทร.027776780";
    if (spsms[0] === smsOtp) {
      const error = new Error("โอนเงิน");
      error.statusCode = 400;
      throw error;
    }

    if (`${spsms[4]}${spsms[5]}` === smsTranfer) {
      const error = new Error("โอนเงิน");
      error.statusCode = 400;
      throw error;
    }

    if (spsms[0] === smsOtp) {
      const error = new Error("โอนเงิน");
      error.statusCode = 400;
      throw error;
    }


    if (indexOfend !== -1) {
      const error = new Error("ถอน");
      error.statusCode = 400;
      throw error;
    }

    if (indexOf !== -1) {
      console.log("spsms[3]:",spsms[3]);
    
      amount = parseFloat(spsms[3].replace(",",""));
      console.log("amount:",amount);
      bank_tranfer = "bk";
      let spsms1 = spsms[6].split(",");
      let sdate = spsms1[0].split("/");
      bank_date = sdate[0].substring(1, 3) + "/" + sdate[1];
      bank_time = spsms1[1].substring(0, 5);
    } else {
     

      const searchTermad = "@";
      const indexOfFirstad = spsms[0].indexOf(searchTermad);
      if(indexOfFirstad == -1){
        bank_date = spsms[0];
        bank_time = spsms[1];
        let checkkbank = "รับโอนจาก";
        let ckkb = spsms[3].indexOf(checkkbank);

    
         if(ckkb != -1){
          moneyamount = spsms[4].replace(",","");
           
          amount = parseFloat(moneyamount);
         }else{
        
          moneyamount = spsms[3].substring(8, 30);
          moneyamount = moneyamount.replace(",","");
          amount = parseFloat(moneyamount);
         }
       
     
      }else{
        let spsms1 = spsms[0].split("@");

        bank_date = spsms1[0];
        bank_time = spsms1[1];
        moneyamount = spsms[1].replace(",","");
        amount = parseFloat(moneyamount);
      }
      
 

      const searchTerm = "จาก";
      const indexOfFirst = spsms[2].indexOf(searchTerm);
      if (indexOfFirst != -1) {
        let smssup = spsms[2].substring(3, 15);
        let spsms2 = smssup.split("/");
        bank_tranfer = spsms2[0];
      }
    }

    console.log("amout:",amount);

    let checkintran;

    console.log("bank_date:",bank_date,"bank_time:",bank_time,"amount:",amount,"sms:",sms);

    if (key === "57hmnc") {

      console.log("57hmnc");
      let datetimelast = moment();

      // console.log(datetimelast2);
      // let diff = Math.abs(datetimelast2 - datetimelast);
      // var minutes = Math.floor((diff/1000)/60);
      // console.log(diff);
      let al = Math.abs(datetimelast - 240000);
      let wdate = moment(al);

      checkintran = await models.Member_account_bank_transaction.findAll({
        where: {
          transaction_type: 1,
          amount: amount,
          transaction_status: 0,
          createdAt: {
            [Op.between]: [`${moment(wdate).format()}`, `${moment(datetimelast).format()}`]
          }

        },

      });

      console.log("checkintran:",checkintran);
      

      if(checkintran.length === 0){

        const smsTransaction = await models.Sms_Transaction.create({
          uuid: uuidv4(),
          phone_number: phoneNumber,
          bank_date: bank_date,
          bank_time: bank_time,
          amount: amount,
          bank_tranfer: 'smsdecimal',
          sms_content: sms,
          status: 0,
        });
  
        const error = new Error('no money user');
        error.statusCode = 400;
        throw error;
      }

      if (checkintran.length === 1) {


        for (let index = 0; index < checkintran.length; index++) {
          let element = checkintran[index].amount;
          let username = checkintran[index].username;
          let uuid = checkintran[index].uuid;


          if (element == amount) {

            console.log("element:",element);
   

            let member = await models.Member.findOne({
              attributes: ["uuid", "_id", "bonus"],
              where: { sb_username: username },
            });
        
            console.log("member:",member);
            if (member === null) {
              const error = new Error("ไม่พบรหัสข้อมูลนี้");
              error.statusCode = 404;
              throw error;
            }

            console.log("member.bonus:",member.bonus);
            if (member.bonus === 1) {
              resp = await this.mapBonusPromotion(member.uuid, amount);
              console.log("resp:::::",resp);
              bonus = resp.bonus;
              console.log(bonus);
            } else {

              resp = await models.Promotions.findOne({
                where: {
                  turnnotpro: 1,
                },
              });

              bonus = resp.max_bonus;
            }
            console.log("amount:",amount);

     
            totalAmount = (amount + parseFloat(bonus));
            console.log("totalAmount:",totalAmount);
        
              if (member === null) {
                const error = new Error("Not Found Member");
                error.statusCode = 404;
                throw error;
              }
              const decimallog = await models.System_log_decimal.create(
                     {
                      uuid: uuidv4(),
                      member_uuid: member.uuid,
                      price: amount,
                     
                      status: '0'
                     }
              );


            console.log(amount, username);
            const response = await depositsms(totalAmount, username);
            console.log("response:",response);


            let before = response.data.result[0].beforeBalance;
            let resamount = response.data.result[0].amount;
            let after = response.data.result[0].afterBalance;
            let ref = response.data.result[0].ref;

            console.log("response.data.result[0]:",response.data.result[0]);
            console.log("before:", before);
            console.log("resamount:", resamount);
            console.log("after:", after);
            console.log("ref:", ref);

            // if (resamount == null) {
            //   const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง2');
            //   error.statusCode = 422;
            //   error.validation = errors.array();
            //   throw error;
            // }
            const smsTransaction = await models.Sms_Transaction.create({
              uuid: uuidv4(),
              phone_number: phoneNumber,
              bank_date: bank_date,
              bank_time: bank_time,
              amount: amount,
              bank_tranfer: 'smsdecimal',
              sms_content: sms,
              status: 1,
            });

            // update
            trandeposits = await models.Member_account_bank_transaction.update({
              credit_before: before,
              credit_after: after,
              amount: amount,
              bonus_credit: bonus,
              bank_time: moment(datetimelast).format().toString(),
              create_by: 'auto',
              transaction_type: "1",
              ref: ref,
              annotation: "-",
              transaction_status: 'Success',
              sms_transaction_uuid: smsTransaction.uuid,
              promotion_uuid: resp.uuid,
          

            }, {
              where: {
                uuid: uuid
              }
            });

            const refdepost = await models.Ref_deposits.create({
              uuid: uuidv4(),
              username: username,
              ref: ref,
              acc_bank_transaction_uuid: uuid,
              status: 0

            });

                  

          }


        }

        res.status(200).json({
          data: {
            status: "success",
            data: trandeposits
          }
        });

      }else {
       
      }



    }else{
      const error = new Error('no key');
      error.statusCode = 400;
      throw error;
    }




  } catch (error) {
    next(error);
  }
};



exports.deposit = async (req, res, next) => {
  try {

    const { amount, promotion_uuid, annotation } = req.body;

    console.log("amount",amount);

    let random = Math.floor(Math.random() * 90) + 10;
    let amountdeci = `${amount}.${random}`;

    let Promotion;
    console.log("amountdeci:",amountdeci);

    //ไม่รับโปรโมชั่น
    // if (req.user.bonus === 0) {
    //   Promotion = await models.Promotions.findOne({
    //     where: {
    //       turnnotpro: 1
    //     }
    //   });

    // } else {

    //  const pomo =   await this.mapBonusPromotion(req.user.uuid, amount);
    //  console.log("pomo:",pomo);
    //   Promotion = await models.Promotions.findOne({
    //     where: {
    //       min_deposit: {
    //         [Op.lte]: amount
    //       },
    //       max_deposit: {
    //         [Op.gte]: amount
    //       }
    //     }
    //   });

    //   if (Promotion == null) {
    //     Promotion = await models.Promotions.findOne({
    //       where: {
    //         turnnotpro: 1
    //       }
    //     });
    //   }
    // }

    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
      error.statusCode = 422;
      error.validation = errors.array();
      throw error;
    }



    const member_account_bank = await models.Member_account_bank.findOne({
      where: {
        member_uuid: req.user.uuid
      },
    });


   console.log("member",member_account_bank);

    const trandeposit = await models.Member_account_bank_transaction.create({
      uuid: uuidv4(),
      bank: member_account_bank.uuid,
      amount: amountdeci,
      transaction_type: '1', //ฝากหรือถอน
      transaction_status: '0',
      username: req.user.sb_username,
      
    });



    const logdecimal = await models.System_log_decimal.create({
      uuid: uuidv4(),
      member_uuid: req.user.uuid,
      price: amountdeci,
      status: '0',
     
    });



    res.status(200).json({
      data: 'รอดำเนินการ',
      amount: trandeposit.amount

    });

  } catch (error) {

    next(error);

  }
}

async function depositsms(amount, sb_username) {
  try {
    console.log("12:",amount, sb_username);

    const user = await models.Member.findOne({
      where: {
        sb_username: sb_username
      }
    });

    console.log("username");
    const response = await axios.post(`${urlConfig}/api/askmebet/add-deposit`, {
      amount: amount,
      id: sb_username
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


//mappromotion
exports.mapBonusPromotion = async (memberUUID, amount) => {
  try {

    console.log("memberUUID:1111:",memberUUID);
    console.log("amount:1111:",amount);

    let bonusPromotion;
    let promo;

  
    let today = moment().format("YYYY-MM-DD");
    let first_today_deposit = `${today} 00:00:00`;
    let second_today_deposit = `${today} 23:59:00`;

    member = await models.Member.findOne({
      where: {
        uuid: memberUUID,
      },
    });

    console.log("member:",member);

   
    // check new member
    let registerDate = moment(member.register_date).format("YYYY-MM-DD");

    if (registerDate === today && member.new_member === "1") {

      console.log("membernew");

  
      let checkBonus = await models.Promotions.findOne({
        where: { 
          [Op.and]: [{ promotion_type_id: 1 }, { status: 1 }],
        },
        
       });
      console.log("checkBonus:",checkBonus);

      if(checkBonus !== null){

        const member = await models.Member.update(
          {
            new_member: "0",
          },
          {
            where: {
              uuid: memberUUID,
            },
          }
        );


        if(checkBonus.bonus_type_id === 2){

          console.log(`2Bonus: ${checkBonus.bonus_type_id}`);

          promo = await models.Promotions.findOne({
           
            where: {
              [Op.and]: [{ promotion_type_id: 1 }, { status: 1 }, { bonus_type_id: 2 }],
            }
    
           });
           console.log("promo:",promo);
  
           bonusPromotion = await models.Promotion_Condition.findOne({
            where: {
              promotion_uuid: promo.uuid,
              min_deposit: {
                [Op.lte]: amount,
              },
              max_deposit: {
                [Op.gte]: amount,
              },
            },
         });


  
          if (bonusPromotion !== null) {
            
            let precentBonus = 100 / bonusPromotion.max_bonus;
            let bonusTotal = (amount / precentBonus);
            let promotion = bonusPromotion.promotion_uuid;
            let result;

            if(bonusTotal > promo.max_bonus){

                result =  {
                  "bonus": promo.max_bonus,
                  "uuid": promotion
                }
                
            } else {

                result =  {
                  "bonus": bonusTotal,
                  "uuid": promotion
                }

            }

            return result ;

          } else {
        
            let bonusDefault = await models.Promotions.findOne({
              where: {
                turnnotpro: 1,
              },
            });
      
            let result =  {
              "bonus": bonusDefault.max_bonus,
              "uuid": bonusDefault.uuid
           }
      
           return result ;

          }
          
  
        } else {

          console.log(`Bonus: ${checkBonus.bonus_type_id}`);

          promo = await models.Promotions.findOne({
            where: { promotion_type_id: 1, status: 1 , bonus_type_id: 1},
           });
  
           bonusPromotion = await models.Promotion_Condition.findOne({
            where: {
              promotion_uuid: promo.uuid,
              min_deposit: {
                [Op.lte]: amount,
              },
              max_deposit: {
                [Op.gte]: amount,
              },
            },
         });

    
          if (bonusPromotion !== null) {
            let bonusTotal = bonusPromotion.max_bonus;
            let promotion = bonusPromotion.promotion_uuid;
            let result =  {
               "bonus": bonusTotal,
               "uuid": promotion
            }

            return result ;
          } else {
            
            let bonusDefault = await models.Promotions.findOne({
              where: {
                turnnotpro: 1,
              },
            });
      
            let result =  {
              "bonus": bonusDefault.max_bonus,
              "uuid": bonusDefault.uuid
           }
      
           return result ;

          }

        }
      } else {

         let bonusDefault = await models.Promotions.findOne({
              where: {
                turnnotpro: 1,
              },
            });
      
            let result =  {
              "bonus": bonusDefault.max_bonus,
              "uuid": bonusDefault.uuid
           }
      
           return result ;
      }



    } 
    ///////////////////////////////////////////////////////////////////////////////
    console.log("member.sb_username:",member.sb_username);
    console.log("member.second_today_deposit:",second_today_deposit);
    console.log("member.first_today_deposit:",first_today_deposit);

    // check รายการฝากแรกของวัน


    const refLatest = await models.Ref_deposits.findAll({
      limit: 1,
      where: {
        username: member.sb_username,
        createdAt: {
          [Op.between]: [first_today_deposit, second_today_deposit],
        },
      },
    });
    console.log("ref:",refLatest);

    if(refLatest.length > 0){

      let bonusDefault = await models.Promotions.findOne({
        where: {
          turnnotpro: 1,
        },
      });

      let result =  {
        "bonus": bonusDefault.max_bonus,
        "uuid": bonusDefault.uuid
     }

     return result ;

    } else {
      
      // สมาชิกใหม่
      let checkBonus = await models.Promotions.findOne({
        where: { promotion_type_id: 2, status: 1 },
      });
  
      if(checkBonus !== null){

        console.log(checkBonus);

        if(checkBonus.bonus_type_id === 2){

         promo = await models.Promotions.findOne({
          where: { promotion_type_id: 2, status: 1 , bonus_type_id: 2}
         });

         bonusPromotion = await models.Promotion_Condition.findOne({
            where: {
          
                 promotion_uuid: promo.uuid    
              ,
              min_deposit: {
                [Op.lte]: amount,
              },
              max_deposit: {
                [Op.gte]: amount,
              },
            },
         });

  
          if (bonusPromotion !== null) {
            
            let precentBonus = 100 / bonusPromotion.max_bonus;
            let bonusTotal = (amount / precentBonus);
            let promotion = bonusPromotion.promotion_uuid;
            let result;

            if(bonusTotal > promo.max_bonus){

                result =  {
                  "bonus": promo.max_bonus,
                  "uuid": promotion
                }
                
            } else {

                result =  {
                  "bonus": bonusTotal,
                  "uuid": promotion
                }

            }

            return result ;

          } else {
        
            let bonusDefault = await models.Promotions.findOne({
              where: {
                turnnotpro: 1,
              },
            });
      
            let result =  {
              "bonus": bonusDefault.max_bonus,
              "uuid": bonusDefault.uuid
           }
      
           return result ;

          }

        } else {

          console.log(`1Bonus: ${checkBonus.bonus_type_id}`);
            
          promo = await models.Promotions.findOne({
            where: { promotion_type_id: 2, status: 1 , bonus_type_id: 1},
           });

           console.log("promo:",promo.uuid);
  
           bonusPromotion = await models.Promotion_Condition.findOne({
            where: {
              promotion_uuid: promo.uuid,
              min_deposit: {
                [Op.lte]: amount,
              },
              max_deposit: {
                [Op.gte]: amount,
              },
            },
         });
          
        

          console.log(" bonusPromotion:", bonusPromotion);
    
          if (bonusPromotion !== null) {
            let bonusTotal = bonusPromotion.max_bonus;
            let promotion = bonusPromotion.promotion_uuid;
            let result =  {
               "bonus": bonusTotal,
               "uuid": promotion
            }

            return result ;
          } else {
            
            let bonusDefault = await models.Promotions.findOne({
              where: {
                turnnotpro: 1,
              },
            });
      
            let result =  {
              "bonus": bonusDefault.max_bonus,
              "uuid": bonusDefault.uuid
           }
      
           return result ;

          }

        }

      } else {
        
        let bonusDefault = await models.Promotions.findOne({
          where: {
            turnnotpro: 1,
          },
        });
  
        let result =  {
          "bonus": bonusDefault.max_bonus,
          "uuid": bonusDefault.uuid
       }
  
       return result ;

      }
    }

  } catch (error) {
    console.log(error);
  }
};
