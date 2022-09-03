const models = require("../models/index");
const { v4: uuidv4 } = require("uuid");
const config = require('../config/index');


exports.getcombine = async (req, res, next) => {
    try {

      const combine = await models.Combine.findOne();
  
      res.status(200).json({
        data: combine
      });
    } catch (error) {
      next(error);
    }
  };


  exports.setting = async (req, res, next) => {
    try {
      const uuid = req.params.uuid;
      const { web_on_off, message_on_of_web, message_member, status_outstanding, credit_min, credit_max, status_auto, status_amount, amount } = req.body;
  
      const combine = await models.Combine.update({
        web_on_off: web_on_off,
        message_on_of_web: message_on_of_web,
        message_member: message_member,
        status_outstanding: status_outstanding,
        credit_min: credit_min,
        credit_max: credit_max,
        status_auto: status_auto,
        status_amount: status_amount,
        amount: amount
      },
        {
          where: {
            uuid: uuid
          }
  
        })
  
  
      res.status(200).json({
        data: "อัพเดทข้อมูลการตั้งค่าเรียบร้อย"
      });
    } catch (error) {
      next(error);
    }
  };