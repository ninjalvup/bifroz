const models = require("../models/index");
const { Op } = require("sequelize");
const { async } = require("crypto-random-string");

exports.reportDeposit = async (req, res, next) => {
  try {

    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    let username = req.query.username;
    let reportDeposit;

    if (startDate !== "" && endDate !== "" && username === "") {

      reportDeposit = await models.Member_Account_Bank_Transaction.findAll({
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
        where: {
          transaction_type: 1,
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        }
      });

    } else if (startDate !== "" && endDate !== "" && username !== "") {

      reportDeposit = await models.Member_Account_Bank_Transaction.findAll({
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
        where: {
          transaction_type: 1,
          username: username
        }
      });

    } else {

      reportDeposit = await models.Member_Account_Bank_Transaction.findAll({
        where: { transaction_type: 1, transaction_status: 1 },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
      });

    }

    res.status(200).json({
      data: reportDeposit,
    });

  } catch (error) {
    next(error);
  }
};

exports.reportWithdraw = async (req, res, next) => {
  try {

    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    let username = req.query.username;
    let reportWithdraw;

    if (startDate !== "" && endDate !== "" && username === "") {

      reportWithdraw = await models.Member_Account_Bank_Transaction.findAll({
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
        where: {
          transaction_type: 2,
          transaction_status: "Success",
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        }
      });

    } else if (startDate !== "" && endDate !== "" && username !== "") {

      reportWithdraw = await models.Member_Account_Bank_Transaction.findAll({
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
        where: {
          username: username,
          transaction_type: 2,
          transaction_status: "Success"
        }
      });

    } else {

      reportWithdraw = await models.Member_Account_Bank_Transaction.findAll({
        where: { transaction_type: 2, transaction_status: "Success" },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
        ],
        order: [["id", "DESC"]],
      });

    }

    res.status(200).json({
      data: reportWithdraw,
    });

  } catch (error) {
    next(error);
  }
};


exports.reportSummaryPromotion = async (req, res, next) => {
  try {

    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    var data = new Array();
    let sum = 0;

    if (startDate !== "" && endDate !== "") {

      console.log("okdee");
      const reportP = await models.Promotion.findAll({

        attributes: ['members.promotion_uuid', 'promotion_name', [models.sequelize.fn('COUNT', models.sequelize.col('members.promotion_uuid')), 'count'], [models.sequelize.fn('SUM', models.sequelize.col('members.bonus_credit')), 'bonus_credit']],
        include: [
          {

            as: "members",
            model: models.Member_Account_Bank_Transaction,
            where: {

              createdAt: {
                [Op.between]: [startDate, endDate],
              }
            }
          },
        ],
        group: ['members.promotion_uuid'],
        order: [["id", "DESC"]],
      });


      reportP.forEach(element => {
        sum += element.dataValues.bonus_credit;
        data.push({
          promotionName: element.promotion_name,
          count_total: element.dataValues.count,
          bonus_total: element.dataValues.bonus_credit,

        });

      });



    } else {

      const reportP = await models.Promotion.findAll({

        attributes: ['members.promotion_uuid', 'promotion_name', [models.sequelize.fn('COUNT', models.sequelize.col('members.promotion_uuid')), 'count'], [models.sequelize.fn('SUM', models.sequelize.col('members.bonus_credit')), 'bonus_credit']],
        include: [
          {

            as: "members",
            model: models.Member_Account_Bank_Transaction,
          },
        ],
        group: ['members.promotion_uuid'],
        order: [["id", "DESC"]],
      });

      reportP.forEach(element => {
        sum += element.dataValues.bonus_credit;
        data.push({
          promotionName: element.promotion_name,
          count_total: element.dataValues.count,
          bonus_total: element.dataValues.bonus_credit,

        });


      });

    }

    res.status(200).json({
      data: data,
      sumbonus: sum
    });

  } catch (error) {
    next(error);
  }
}

exports.reportPerson = async (req, res, next) => {

  try {


    let array4 = new Array();
    let array3 = new Array();
    let check = 0;

    let startDate = req.query.start_date;
    let endDate = req.query.end_date;

    let sumperson;

    if (startDate !== "" && endDate !== "") {
      console.log("ok");

      const reportPersonWithdraw = await models.Member_Account_Bank_Transaction.findAll({

        attributes: [[models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: {
          transaction_type: [2, 9], transaction_status: ['manual', 'Success'],
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        },

      });






      const reportPersonWithdrawrea = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: {
          transaction_type: [2, 9],
          transaction_status: ['manual', 'Success'],
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        },
      });




      const reportPersonDeposit = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: {
          transaction_type: 1, transaction_status: ['manual', 'Success'],
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        },

      });


      const reportPersonDepositone = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.col('username'), 'username'], [models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: {
          transaction_type: 1, transaction_status: ['manual', 'Success'],
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        },
        group: 'username'

      });


      const reportPersonWithdrawreaone = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.col('username'), 'username'], [models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: {
          transaction_type: [2, 9], transaction_status: ['manual', 'Success'],
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        },
        group: 'username'

      });




      let array5 = new Array();
      for (var i = 0; i < reportPersonDepositone.length; i++) {

        for (var j = 0; j < reportPersonWithdrawreaone.length; j++) {

          if (reportPersonDepositone[i].dataValues.username === reportPersonWithdrawreaone[j].dataValues.username) {

            array3.push({
              username: reportPersonDepositone[i].dataValues.username,
              deposit_count: reportPersonDepositone[i].dataValues.count_total,
              deposit_amount_total: reportPersonDepositone[i].dataValues.amount_total,
              Withdraw_count: reportPersonWithdrawreaone[j].dataValues.count_total,
              Withdraw_amount_total: reportPersonWithdrawreaone[j].dataValues.amount_total,
              sum: reportPersonDepositone[i].dataValues.amount_total - reportPersonWithdrawreaone[j].dataValues.amount_total

            });

            check = 1;
          }


        }
        if (check == 0) {
          array3.push({
            username: reportPersonDepositone[i].dataValues.username,
            deposit_count: reportPersonDepositone[i].dataValues.count_total,
            deposit_amount_total: reportPersonDepositone[i].dataValues.amount_total,
            Withdraw_count: "0",
            Withdraw_amount_total: "0",
            sum: reportPersonDepositone[i].dataValues.amount_total

          });

        }
        check = 0;

      }


      let datawithdraw = [];


      for (let index = 0; index < reportPersonWithdrawreaone.length; index++) {

        datawithdraw.push({
          username: reportPersonWithdrawreaone[index].dataValues.username,
          deposit_count: "0",
          deposit_amount_total: "0",
          Withdraw_count: reportPersonWithdrawreaone[index].dataValues.count_total,
          Withdraw_amount_total: reportPersonWithdrawreaone[index].dataValues.amount_total,
          sum: 0 - reportPersonWithdrawreaone[index].dataValues.amount_total

        });

      }

      //   let res2 = datawithdraw.filter(f => array3.some(item => item.username !== f.username));
      //  console.log("res2:",res2);
      var filteredArray = datawithdraw.filter(function (datawithdraw_el) {
        return array3.filter(function (array3_el) {

          return array3_el.username === datawithdraw_el.username;
        }).length == 0
      });

      console.log("filteredArray:", filteredArray);




      for (let i = 0; i < filteredArray.length; i++) {
        array3.push({
          ...filteredArray[i],

        });
      }





      // findAndCountAll

      const reportPersonCount = await models.Member_Account_Bank_Transaction.findAndCountAll({
        group: ['username'],
        attributes: ['username', [models.sequelize.fn('COUNT', models.sequelize.col('username')), 'username']],
        where: {
          transaction_type: [1, 2], transaction_status: ['manual', 'Success'],
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        }
      });



      sumperson = {
        personDepositcount: reportPersonDeposit[0].dataValues.count_total,
        personWithdrawcount: reportPersonWithdrawrea[0].dataValues.count_total,
        personDepositamount: reportPersonDeposit[0].dataValues.amount_total,
        personWithdrawamount: reportPersonWithdraw[0].dataValues.amount_total,
        personWithdrawreaamount: reportPersonWithdrawrea[0].dataValues.amount_total,
        profit_and_loss: reportPersonDeposit[0].dataValues.amount_total - reportPersonWithdrawrea[0].dataValues.amount_total,
        person_total: reportPersonCount.count.length

      }

    } else {

      const reportPersonWithdraw = await models.Member_Account_Bank_Transaction.findAll({

        attributes: [[models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: { transaction_type: [2, 9], transaction_status: ['manual', 'Success'] },

      });
      console.log("reportPersonWithdraw:", reportPersonWithdraw);

      const reportPersonWithdrawrea = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: { transaction_type: [2, 9], transaction_status: ['manual', 'Success'] },
      });


      const reportPersonDeposit = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: { transaction_type: 1, transaction_status: ['manual', 'Success', '1'] },

      });

      // listperson

      const reportPersonDepositone = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.col('username'), 'username'], [models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: { transaction_type: 1, transaction_status: ['manual', 'Success', '1'] },
        group: 'username'

      });

      const reportPersonWithdrawreaone = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.col('username'), 'username'], [models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: { transaction_type: [2, 9], transaction_status: ['manual', 'Success'] },
        group: 'username'

      });


      for (var i = 0; i < reportPersonDepositone.length; i++) {

        for (var j = 0; j < reportPersonWithdrawreaone.length; j++) {
          if (reportPersonDepositone[i].dataValues.username === reportPersonWithdrawreaone[j].dataValues.username) {

            array3.push({
              username: reportPersonDepositone[i].dataValues.username,
              deposit_count: reportPersonDepositone[i].dataValues.count_total,
              deposit_amount_total: reportPersonDepositone[i].dataValues.amount_total,
              Withdraw_count: reportPersonWithdrawreaone[j].dataValues.count_total,
              Withdraw_amount_total: reportPersonWithdrawreaone[j].dataValues.amount_total,
              sum: reportPersonDepositone[i].dataValues.amount_total - reportPersonWithdrawreaone[j].dataValues.amount_total

            });
            check = 1;

          }
        }
        if (check == 0) {
          array3.push({
            username: reportPersonDepositone[i].dataValues.username,
            deposit_count: reportPersonDepositone[i].dataValues.count_total,
            deposit_amount_total: reportPersonDepositone[i].dataValues.amount_total,
            Withdraw_count: "0",
            Withdraw_amount_total: "0",
            sum: reportPersonDepositone[i].dataValues.amount_total

          });

        }
        check = 0;

      }



      // findAndCountAll

      const reportPersonCount = await models.Member_Account_Bank_Transaction.findAndCountAll({
        group: ['username'],
        attributes: ['username', [models.sequelize.fn('COUNT', models.sequelize.col('username')), 'username']],
        where: {
          transaction_type: [1, 2], transaction_status: ['manual', 'Success']

        }
      });

      sumperson = {
        personDepositcount: reportPersonDeposit[0].dataValues.count_total,
        personWithdrawcount: reportPersonWithdrawrea[0].dataValues.count_total,
        personDepositamount: reportPersonDeposit[0].dataValues.amount_total,
        personWithdrawamount: reportPersonWithdraw[0].dataValues.amount_total,
        personWithdrawreaamount: reportPersonWithdrawrea[0].dataValues.amount_total,
        profit_and_loss: reportPersonDeposit[0].dataValues.amount_total - reportPersonWithdrawrea[0].dataValues.amount_total,
        person_total: reportPersonCount.count.length


      }


    }


    res.status(200).json({
      // reportPersonWith: array4,
      reportPersonDe: array3,
      sumperson: sumperson
    });

  } catch (error) {
    next(error);
  }

}


exports.reportDecimal = async (req, res, next) => {

  try {
    let reportDeposit;

    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    let amount = req.query.amount;
    let username = req.query.username;

    const member = await models.Member.findOne({
      where: {
        sb_username: username
      }
    });


    if (startDate !== "" && endDate !== "" && amount !== "" && username !== "") {

      reportDeposit = await models.System_log_decimal.findAll({
        include: [
          {
            as: "members",
            model: models.Member,
          },
        ],
        order: [["id", "DESC"]],
        where: {

          member_uuid: member.uuid,
          price: amount,
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        }

      });

    } else if (startDate !== "" && endDate !== "" && amount !== "" && username == "") {

      reportDeposit = await models.System_log_decimal.findAll({
        include: [
          {
            as: "members",
            model: models.Member,
          },
        ],
        order: [["id", "DESC"]],
        where: {

          price: amount,
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        }

      });

    } else if (startDate !== "" && endDate !== "" && username !== "" && amount == "") {

      reportDeposit = await models.System_log_decimal.findAll({
        include: [
          {
            as: "members",
            model: models.Member,
          },
        ],
        order: [["id", "DESC"]],
        where: {
          member_uuid: member.uuid,
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        }

      });

    } else if (username !== "" && amount !== "" && startDate == "" && endDate == "") {

      reportDeposit = await models.System_log_decimal.findAll({
        include: [
          {
            as: "members",
            model: models.Member,
          },
        ],
        order: [["id", "DESC"]],
        where: {
          member_uuid: member.uuid,
          price: amount
        }

      });

    } else if (username !== "" && amount == "" && startDate == "" && endDate == "") {

      reportDeposit = await models.System_log_decimal.findAll({
        include: [
          {
            as: "members",
            model: models.Member,
          },
        ],
        order: [["id", "DESC"]],
        where: {
          member_uuid: member.uuid,

        }

      });


    } else if (username == "" && amount !== "" && startDate == "" && endDate == "") {
      console.log(amount);
      reportDeposit = await models.System_log_decimal.findAll({
        include: [
          {
            as: "members",
            model: models.Member,
          },
        ],
        order: [["id", "DESC"]],
        where: {
          price: amount
        }

      });



    } else if (startDate !== "" && endDate !== "" && username == "" && amount == "") {

      reportDeposit = await models.System_log_decimal.findAll({
        include: [
          {
            as: "members",
            model: models.Member,
          },
        ],
        order: [["id", "DESC"]],
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        }

      });

    } else {
      reportDeposit = await models.System_log_decimal.findAll(
        {
          include: [
            {
              as: "members",
              model: models.Member,
            },
          ],
          order: [["id", "DESC"]],

        }

      );

    }


    res.status(200).json({
      reportDecimal: reportDeposit

    });


  } catch (error) {
    next(error);
  }

}



//กำไรขาดทุน

exports.reportProfitandloss = async (req, res, next) => {

  try {

    let startDate = req.query.start_date;
    let endDate = req.query.end_date;

    var sumbonus = 0;
    let profitandloss;
    var data;

    if (startDate !== "" && endDate !== "") {

      const reportPersonWithdrawrea = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: {
          transaction_type: [2, 9],
          transaction_status: ['manual', 'Success'],
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        },
      });


      const reportPersonDeposit = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: {
          transaction_type: 1, transaction_status: ['manual', 'Success', '1'],
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        },

      });

      const reportPersonDepositbonus = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.fn('sum', models.sequelize.col('bonus_credit')), 'bonus_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: {
          transaction_type: 1, transaction_status: ['manual', 'Success', '1'],
          createdAt: {
            [Op.between]: [startDate, endDate],
          }
        },

      });

      sumbonus = reportPersonDeposit[0].dataValues.amount_total + reportPersonDepositbonus[0].dataValues.bonus_total;
      profitandloss = reportPersonDeposit[0].dataValues.amount_total - reportPersonWithdrawrea[0].dataValues.amount_total;


      data = {
        reportPersonDeposit: reportPersonDeposit[0].dataValues.amount_total,
        reportPersonDepositbonus: reportPersonDepositbonus[0].dataValues.bonus_total,
        reportPersonWithdrawrea: reportPersonWithdrawrea[0].dataValues.amount_total,
        sumbonus: sumbonus,
        profitandloss: profitandloss
      }



    } else {


      const reportPersonWithdrawrea = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: { transaction_type: [2, 9], transaction_status: ['manual', 'Success'] },
      });


      const reportPersonDeposit = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.fn('sum', models.sequelize.col('amount')), 'amount_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: { transaction_type: 1, transaction_status: ['manual', 'Success', '1'] },

      });

      const reportPersonDepositbonus = await models.Member_Account_Bank_Transaction.findAll({
        attributes: [[models.sequelize.fn('sum', models.sequelize.col('bonus_credit')), 'bonus_total'], [models.sequelize.fn('COUNT', models.sequelize.col('transaction_type')), 'count_total']],
        where: { transaction_type: 1, transaction_status: ['manual', 'Success', '1'] },

      });


      sumbonus = reportPersonDeposit[0].dataValues.amount_total + reportPersonDepositbonus[0].dataValues.bonus_total;
      profitandloss = reportPersonDeposit[0].dataValues.amount_total - reportPersonWithdrawrea[0].dataValues.amount_total;


      data = {

        reportPersonDeposit: reportPersonDeposit[0].dataValues.amount_total,
        reportPersonDepositbonus: reportPersonDepositbonus[0].dataValues.bonus_total,
        reportPersonWithdrawrea: reportPersonWithdrawrea[0].dataValues.amount_total,
        sumbonus: sumbonus,
        profitandloss: profitandloss
      }

    }


    res.status(200).json({
      data: data
    });

  } catch (error) {
    next(error);
  }

}

exports.getHideSmsSCB = async (req, res, next) => {
  try {

    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    let smsTransaction;

    if (startDate !== "" && endDate !== "") {

      smsTransaction = await models.Sms_Transaction.findAll({
        order: [["id", "DESC"]],
        where: {
          status: 2,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        }
      });

    } else {

      smsTransaction = await models.Sms_Transaction.findAll({
        order: [["id", "DESC"]],
        where: {
          status: 2,
        }
      });

    }

    res.status(200).json({
      data: smsTransaction,
    });

  } catch (error) {
    next(error);
  }
}

// 5 อันดับ ฝากมากสุด
exports.reportDepositRank = async (req, res, next) => {
  try {

    console.log("deposit");

    let deposit = await models.Member_Account_Bank_Transaction.findAll({
      where: {
        transaction_type: 1,
        transaction_status: 1
      },
      include: [
        {
          as: "member_account_banks",
          model: models.Member_Account_Bank,
        },
      ],
      order: [['amount', 'DESC']],
      limit: 5
    });

    res.status(200).json({
      data: deposit,
    });

  } catch (error) {
    next(error);
  }
}


// 5 อันดับ ถอนมากสุด
exports.reportWithdrawRank = async (req, res, next) => {
  try {

    let withdraw = await models.Member_Account_Bank_Transaction.findAll({
      where: {
        transaction_type: 2,
        transaction_status: "Success",
      },
      include: [
        {
          as: "member_account_banks",
          model: models.Member_Account_Bank,
        },
      ],
      order: [['amount', 'DESC']],
      limit: 5
    });

    res.status(200).json({
      data: withdraw,
    });

  } catch (error) {
    next(error);
  }
}

exports.reportCreateDeposit = async (req, res, next) => {

    try {

      let startDate = req.query.start_date;
      let endDate = req.query.end_date;
      let username = req.query.username;
      let reportCreateDeposit;
  
      if (startDate !== "" && endDate !== "" && username === "") {
  
        reportCreateDeposit = await models.Regular_deposit.findAll({
          where: {
            createdAt: {
              [Op.between]: [startDate, endDate],
            }
          },
          include: [
            {
              as: "member",
              model: models.Member,
              include: [
                {
                  as: "member_account_banks",
                  model: models.Member_Account_Bank,
                }
              ]    
            },
           
          ],
          order: [["id", "DESC"]],
        });
  
      } else if (startDate !== "" && endDate !== "" && username !== "") {
  
        reportCreateDeposit = await models.Regular_deposit.findAll({
          where: {
            createdAt: {
              [Op.between]: [startDate, endDate],
            }
          },
           include: [
            {
              as: "member",
              model: models.Member,
              include: [
                {
                  as: "member_account_banks",
                  model: models.Member_Account_Bank,
                }
              ],
              where: {
                sb_username: username
              }    
            },
           
          ],
          order: [["id", "DESC"]],
        });
  
      } else {
  
        reportCreateDeposit = await models.Regular_deposit.findAll({
          include: [
            {
              as: "member",
              model: models.Member,
              include: [
                {
                  as: "member_account_banks",
                  model: models.Member_Account_Bank,
                }
              ]    
            },
           
          ],
          order: [["id", "DESC"]],
        });
  
      }
  
      res.status(200).json({
        data: reportCreateDeposit,
      });
  
    } catch (error) {
      next(error);
    }
    
}