const models = require("../models/index");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const config = require('../config/index')

exports.index = async (req, res, next) => {
  try {
    
    const promotion = await models.Promotion.findAll({
      order: [["id", "DESC"]],
    });

    const promotionWithPhotoDomain = await promotion.map( (promotion, index) => {
      return {
          uuid: promotion.uuid,
          promotion_name: promotion.promotion_name,
          promotion_image: `${config.DOMAIN}/promotion/${promotion.promotion_image}`,
          bonus_type_id: promotion.bonus_type_id,
          promotion_type_id: promotion.promotion_type_id,
          min_deposit: promotion.min_deposit,
          max_deposit: promotion.max_deposit,
          max_bonus: promotion.max_bonus,
          turn_over_slot: promotion.turn_over_slot,
          max_withdraw: promotion.max_withdraw,
          turn_over_hdp: promotion.turn_over_hdp,
          turn_over_mix_replay: promotion.turn_over_mix_replay,
          turn_over_mix_step: promotion.turn_over_mix_step,
          turn_over_bacara: promotion.turn_over_bacara,
          turn_over_thai_lotterry: promotion.turn_over_thai_lotterry,
          turn_over_thai_m2: promotion.turn_over_thai_m2,
          turn_over_thai_multiplayer: promotion.turn_over_thai_multiplayer,
          status: promotion.status,
          turn_win: promotion.turn_win,
          turn_over: promotion.turn_over,
          turn_type: promotion.turn_type,
          createdAt: promotion.createdAt,
          updatedAt: promotion.updatedAt
      }
  });

    res.status(200).json({
      data: promotionWithPhotoDomain,
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {

    const {
      promotion_name,
      promotion_image,
      bonus_type_id,
      promotion_type_id,
      min_deposit,
      max_deposit,
      max_bonus,
      turn_over_slot,
      max_withdraw,
      turn_over_hdp,
      turn_over_mix_replay,
      turn_over_mix_step,
      turn_over_bacara,
      turn_over_thai_lotterry,
      turn_over_thai_m2,
      turn_over_thai_multiplayer,
      status,
      turn_win,
      turn_over,
      turn_type
    } = req.body;

    const { min, max, bonus } = req.body.promotion_condition;

    const promotion = await models.Promotion.create({
      uuid: uuidv4(),
      promotion_name: promotion_name,
      promotion_image: await saveImageToDisk(promotion_image),
      bonus_type_id: bonus_type_id,
      promotion_type_id: promotion_type_id,
      min_deposit: min_deposit,
      max_deposit: max_deposit,
      max_bonus: max_bonus,
      turn_over_slot: turn_over_slot,
      max_withdraw: max_withdraw,
      turn_over_hdp: turn_over_hdp,
      turn_over_mix_replay: turn_over_mix_replay,
      turn_over_mix_step: turn_over_mix_step,
      turn_over_bacara: turn_over_bacara,
      turn_over_thai_lotterry: turn_over_thai_lotterry,
      turn_over_thai_m2: turn_over_thai_m2,
      turn_over_thai_multiplayer: turn_over_thai_multiplayer,
      turnnotpro: 0,
      status: status,
      turn_win: turn_win,
      turn_over:  turn_over,
      turn_type: turn_type
    });

    const promotionCondition = await models.Promotion_Condition.create({
      uuid: uuidv4(),
      min_deposit: min,
      max_deposit: max,
      max_bonus: bonus,
      promotion_uuid: promotion.uuid,
    });

    res.status(201).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
      data: {
        promotion: promotion,
        promotion_condition: promotionCondition,
      },
    });
  } catch (error) {
    next(error);
  }
};


async function saveImageToDisk(baseImage) {
 
  const projectPath = path.resolve('./') ;
 
  const uploadPath = `${projectPath}/public/images/promotion/`;

  const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

  let filename = '';
  if (ext === 'svg+xml') {
      filename = `${uuidv4()}.svg`;
  } else {
      filename = `${uuidv4()}.${ext}`;
  }

  let image = decodeBase64Image(baseImage);

  await writeFileAsync(uploadPath+filename, image.data, 'base64');

  return filename;
}

exports.edit = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const promotion = await models.Promotion.findOne({
      where: { uuid: uuid },
      include: [
        {
          model: models.Promotion_Condition,
          as: "promotion_conditions",
        },
      ],
      order: [["promotion_conditions", "id", "desc"]],
    });

    if (promotion === null) {
      const error = new Error("ไม่พบรหัสข้อมูลนี้");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      data: {
        promotion: promotion,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const {
      uuid,
      promotion_name,
      promotion_image,
      bonus_type_id,
      promotion_type_id,
      min_deposit,
      max_deposit,
      max_bonus,
      turn_over_slot,
      max_withdraw,
      turn_over_hdp,
      turn_over_mix_replay,
      turn_over_mix_step,
      turn_over_bacara,
      turn_over_thai_lotterry,
      turn_over_thai_m2,
      turn_over_thai_multiplayer,
      status,
      turn_win,
      turn_over,
      turn_type,
      promotion_conditions
    } = req.body;

    console.log(req.body);

    if (req.params.uuid !== uuid) {
      const error = new Error("รหัสข้อมูลไม่ถูกต้อง");
      error.statusCode = 400;
      throw error;
    }

    const promotion = await models.Promotion.update(
      {
        promotion_name: promotion_name,
        promotion_image: await saveImageToDisk(promotion_image),
        bonus_type_id: bonus_type_id,
        promotion_type_id: promotion_type_id,
        min_deposit: min_deposit,
        max_deposit: max_deposit,
        max_bonus: max_bonus,
        turn_over_slot: turn_over_slot,
        max_withdraw: max_withdraw,
        turn_over_hdp: turn_over_hdp,
        turn_over_mix_replay: turn_over_mix_replay,
        turn_over_mix_step: turn_over_mix_step,
        turn_over_bacara: turn_over_bacara,
        turn_over_thai_lotterry: turn_over_thai_lotterry,
        turn_over_thai_m2: turn_over_thai_m2,
        turn_over_thai_multiplayer: turn_over_thai_multiplayer,
        status: status,
        turn_win: turn_win,
        turn_over:  turn_over,
        turn_type: turn_type
      },
      {
        where: {
          uuid: uuid,
        },
      }
    );

    if(promotion_conditions.length > 0){
      promotion_conditions.forEach(async element => {
          const promotionCondition = await models.Promotion_Condition.create({
            uuid: uuidv4(),
            min_deposit: element.min,
            max_deposit: element.max,
            max_bonus: element.bonus,
            promotion_uuid: uuid,
          });
        });
    }

    if (promotion[0] === 0) {
      const error = new Error("ไม่พบรหัสข้อมูลนี้");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
};

exports.addCondition = async (req, res, next) => {
  try {
    const { min, max, bonus, promotion_uuid } = req.body;

    const promotion = await models.Promotion.findOne({
      where: { uuid: promotion_uuid },
    });

    if (!promotion) {
      const error = new Error("ไม่พบรหัสข้อมูลนี้");
      error.statusCode = 404;
      throw error;
    }

    const promotionCondition = await models.Promotion_Condition.create({
      uuid: uuidv4(),
      min: min,
      max: max,
      bonus: bonus,
      promotion_uuid: promotion_uuid,
    });

    res.status(201).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
      data: promotionCondition,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCondition = async (req, res, next) => {
  try {
    try {
      const { uuid } = req.params;

      const promotionCondition = await models.Promotion_Condition.findOne({ where: { uuid: uuid } });

      if (!promotionCondition) {
        const error = new Error("ไม่พบรหัสข้อมูลนี้");
        error.statusCode = 404;
        throw error;
      }

      // delete
      await models.Promotion_Condition.destroy({
        where: {
          uuid: uuid,
        },
      });

      res.status(200).json({
        message: "ลบข้อมูลเรียบร้อยแล้ว",
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {}
};


function decodeBase64Image(base64Str) {
  var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var image = {};
  if (!matches || matches.length !== 3) {
      throw new Error('Invalid base64 string');
  }

  image.type = matches[1];
  image.data = matches[2];

  return image;
}
