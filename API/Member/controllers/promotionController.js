const models = require('../models/index');
const config = require('../config/index');

exports.getpromotion = async  (req, res, next) =>{

try {
   
    const promotions = await models.Promotions.findAll(
    {
       where:{
           turnnotpro: 0
       }
    },
        {order: [["id", "DESC"]],}
    );
   
    const promotion = await promotions.map( (promotions, index) => {
        return {
            uuid: promotions.uuid, 
            promotion_name: promotions.promotion_name, 
            promotion_image: config.DOMAINIMG +"/promotion/"+ promotions.promotion_image,
            bonus_type_id: promotions.bonus_type_id,
            promotion_type_id: promotions.promotion_type_id,
            min_deposit: promotions.min_deposit,
            max_deposit: promotions.max_deposit,
            max_bonus: promotions.max_bonus,
            turn_over_slot: promotions.turn_over_slot,
            max_withdraw: promotions.max_withdraw,
            turn_over_hdp: promotions.turn_over_hdp,
            turn_over_mix_replay: promotions.turn_over_mix_replay,
            turn_over_mix_step: promotions.turn_over_mix_step,
            turn_over_bacara: promotions.turn_over_bacara,
            turn_over_thai_lotterry: promotions.turn_over_thai_lotterry,
            turn_over_thai_m2: promotions.turn_over_thai_m2,
            turn_over_thai_multiplayer: promotions.turn_over_thai_multiplayer,
            status: promotions.status,
            createdAt: promotions.createdAt,
            updatedAt: promotions.updatedAt,     
          
        }
    });
    res.status(200).json({
        data: promotion
    
    });
 
} catch (error) {
    next(error); 
}

}

exports.deposit = async (req, res, next) => {
    try {
  
      const { amount,promotion_uuid, annotation } = req.body;
     
      //validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
        error.statusCode = 422;
        error.validation = errors.array();
        throw error;
      }
     
      let anno = " ";
      let maxbonus = " ";
  
       let turnnotpro = 1 ;
       let promotion ;
     
   
      if(annotation){
        anno = annotation;
        promotion = await models.Promotions.findOne({
          where: {
            uuid: promotion_uuid
          },
        });
    
         maxbonus = promotion.max_bonus;
      }else{
        
        anno = "ไม่รับโปรโมชั่น";
         promotion = await models.Promotions.findOne({
          where: {
            turnnotpro: turnnotpro
          },
        });
        maxbonus = 0;
      }
  
      const member_account_bank = await models.Member_account_bank.findOne({
        where: {
          member_uuid: req.user.uuid
        },
      });
  
    
      const trandeposit = await models.Member_account_bank_transaction.create({
        uuid: uuidv4(),
        bank: member_account_bank.uuid,
        amount: amount,
        bonus_credit: maxbonus,
        transaction_type: '1', //ฝากหรือถอน
        annotation: anno,
        transaction_status: '0',
        username :req.user.sb_username,
        promotion_uuid: promotion.uuid,
      });
      

      res.status(200).json({
        data: 'รอดำเนินการ'
        
      });
  
    } catch (error) {
  
      next(error);
  
    }
  }

  exports.bonus = async (req, res, next) => {
    try {


        const { bonus } = req.body;
    
        //update bonus
        const user = await models.Member.update({
            bonus: bonus,
        }, {
            where: {
                uuid: req.user.uuid
            }
        });

        res.status(201).json({
            message: "success"

        });


    } catch (error) {
        next(error);
    }
}