const models = require("../models/index");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const askmebetController = require("./askmebetController");
const { Op } = require("sequelize");
const moment = require("moment");
const cryptoRandomString = require('crypto-random-string');

exports.index = async (req, res, next) => {
  try {
    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    let username = req.query.username;
    let searchType = req.query.search_type;
    let member;

    let data = [
      
    ]

    if(searchType === "fname"){

      if (startDate !== "" && endDate !== "" && username === "") {
        member = await models.Member.findAll({
          attributes: { exclude: ["password"] },
          include: [
            {
              as: "member_account_banks",
              model: models.Member_Account_Bank,
            },
            {
              as: "affiliate_member",
              model: models.Affiliate_Member,
            }
          ],
          where: {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          },
          order: [["id", "DESC"]],
        });
        
        let arr = []
        for (let i=0; i<member.length; i++) {
          if (member[i].affiliate_member.length !== 0) {
            re = await models.Member.findOne({
              where: {
                uuid: member[i].affiliate_member[0].member_uuid
              }
            })

            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: re.sb_username
            })

            
          } else {
            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: "-"
            })

            
          }
        }
        Object.assign(data, arr)
      } else if (startDate !== "" && endDate !== "" && username !== "") {
        member = await models.Member.findAll({
          attributes: { exclude: ["password"] },
          include: [
            {
              as: "member_account_banks",
              model: models.Member_Account_Bank,
            },
            {
              as: "affiliate_member",
              model: models.Affiliate_Member,
            }
          ],
          where: {
            first_name: username,  //  ค้นหาด้วยชื่อ
          },
          order: [["id", "DESC"]],
        });

        let arr = []
        for (let i=0; i<member.length; i++) {
          if (member[i].affiliate_member.length !== 0) {
            re = await models.Member.findOne({
              where: {
                uuid: member[i].affiliate_member[0].member_uuid
              }
            })

            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: re.sb_username
            })

            
          } else {
            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: "-"
            })

            
          }
        }
        Object.assign(data, arr)
      } 

    } else if(searchType === "sname"){

      if (startDate !== "" && endDate !== "" && username === "") {
        member = await models.Member.findAll({
          attributes: { exclude: ["password"] },
          include: [
            {
              as: "member_account_banks",
              model: models.Member_Account_Bank,
            },
            {
              as: "affiliate_member",
              model: models.Affiliate_Member,
            }
          ],
          where: {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          },
          order: [["id", "DESC"]],
        });

        let arr = []
        for (let i=0; i<member.length; i++) {
          if (member[i].affiliate_member.length !== 0) {
            re = await models.Member.findOne({
              where: {
                uuid: member[i].affiliate_member[0].member_uuid
              }
            })

            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: re.sb_username
            })

            
          } else {
            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: "-"
            })

            
          }
        }
        Object.assign(data, arr)
        
      } else if (startDate !== "" && endDate !== "" && username !== "") {
        member = await models.Member.findAll({
          attributes: { exclude: ["password"] },
          include: [
            {
              as: "member_account_banks",
              model: models.Member_Account_Bank,
            },
            {
              as: "affiliate_member",
              model: models.Affiliate_Member,
            }
          ],
          where: {
            last_name: username,  //  ค้นหาด้วยนามสกุล
          },
          order: [["id", "DESC"]],
        });

        let arr = []
        for (let i=0; i<member.length; i++) {
          if (member[i].affiliate_member.length !== 0) {
            re = await models.Member.findOne({
              where: {
                uuid: member[i].affiliate_member[0].member_uuid
              }
            })

            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: re.sb_username
            })

            
          } else {
            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: "-"
            })

            
          }
        }
        Object.assign(data, arr)
      } 

    } else if(searchType === "bankNumber"){

      if (startDate !== "" && endDate !== "" && username === "") {
        
        member = await models.Member.findAll({
          attributes: { exclude: ["password"] },
          include: [
            {
              as: "member_account_banks",
              model: models.Member_Account_Bank,
            },
            {
              as: "affiliate_member",
              model: models.Affiliate_Member,
            }
          ],
          where: {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          },
          order: [["id", "DESC"]],
        });

        let arr = []
        for (let i=0; i<member.length; i++) {
          if (member[i].affiliate_member.length !== 0) {
            re = await models.Member.findOne({
              where: {
                uuid: member[i].affiliate_member[0].member_uuid
              }
            })

            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: re.sb_username
            })

            
          } else {
            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: "-"
            })

            
          }
        }
        Object.assign(data, arr)
        
      } else if (startDate !== "" && endDate !== "" && username !== "") {


        let bankMember = await models.Member_Account_Bank.findOne({
          attributes: ["member_uuid"],
          where: { bank_number: username },
        });


        if(bankMember === null){
          const error = new Error("ไม่พบข้มูล !");
          error.statusCode = 404;
          throw error;
        }

        member = await models.Member.findAll({
          attributes: { exclude: ["password"] },
          include: [
            {
              as: "member_account_banks",
              model: models.Member_Account_Bank,
            },
            {
              as: "affiliate_member",
              model: models.Affiliate_Member,
            }
          ],
          where: {
            uuid: bankMember.member_uuid,  //  ค้นหาด้วยบัญชีธนาคาร
          },
          order: [["id", "DESC"]],
        });

        let arr = []
        for (let i=0; i<member.length; i++) {
          if (member[i].affiliate_member.length !== 0) {
            re = await models.Member.findOne({
              where: {
                uuid: member[i].affiliate_member[0].member_uuid
              }
            })

            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: re.sb_username
            })

            
          } else {
            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: "-"
            })

            
          }
        }
        Object.assign(data, arr)

      } 

    } else if(searchType === "tel"){

      if (startDate !== "" && endDate !== "" && username === "") {
        member = await models.Member.findAll({
          attributes: { exclude: ["password"] },
          include: [
            {
              as: "member_account_banks",
              model: models.Member_Account_Bank,
            },
            {
              as: "affiliate_member",
              model: models.Affiliate_Member,
            }
          ],
          where: {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          },
          order: [["id", "DESC"]],
        });

        let arr = []
        for (let i=0; i<member.length; i++) {
          if (member[i].affiliate_member.length !== 0) {
            re = await models.Member.findOne({
              where: {
                uuid: member[i].affiliate_member[0].member_uuid
              }
            })

            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: re.sb_username
            })

            
          } else {
            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: "-"
            })

            
          }
        }
        Object.assign(data, arr)
        
      } else if (startDate !== "" && endDate !== "" && username !== "") {
        member = await models.Member.findAll({
          attributes: { exclude: ["password"] },
          include: [
            {
              as: "member_account_banks",
              model: models.Member_Account_Bank,
            },
            {
              as: "affiliate_member",
              model: models.Affiliate_Member,
            }
          ],
          where: {
            tel: username,  //  ค้นหาด้วยเบอร์โทร
          },
          order: [["id", "DESC"]],
        });

        let arr = []
        for (let i=0; i<member.length; i++) {
          if (member[i].affiliate_member.length !== 0) {
            re = await models.Member.findOne({
              where: {
                uuid: member[i].affiliate_member[0].member_uuid
              }
            })

            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: re.sb_username
            })

            
          } else {
            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: "-"
            })

            
          }
        }
        Object.assign(data, arr)
      } 

    } else if(searchType === "username"){

      if (startDate !== "" && endDate !== "" && username === "") {
        member = await models.Member.findAll({
          attributes: { exclude: ["password"] },
          include: [
            {
              as: "member_account_banks",
              model: models.Member_Account_Bank,
            },
            {
              as: "affiliate_member",
              model: models.Affiliate_Member,
            }
          ],
          where: {
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          },
          order: [["id", "DESC"]],
        });

        let arr = []
        for (let i=0; i<member.length; i++) {
          if (member[i].affiliate_member.length !== 0) {
            re = await models.Member.findOne({
              where: {
                uuid: member[i].affiliate_member[0].member_uuid
              }
            })

            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: re.sb_username
            })

            
          } else {
            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: "-"
            })

            
          }
        }
        Object.assign(data, arr)

      } else if (startDate !== "" && endDate !== "" && username !== "") {
        member = await models.Member.findAll({
          attributes: { exclude: ["password"] },
          include: [
            {
              as: "member_account_banks",
              model: models.Member_Account_Bank,
            },
            {
              as: "affiliate_member",
              model: models.Affiliate_Member,
            }
          ],
          where: {
            sb_username: username, //  ค้นหาด้วยยูส
          },
          order: [["id", "DESC"]],
        });

        let arr = []
        for (let i=0; i<member.length; i++) {
          if (member[i].affiliate_member.length !== 0) {
            re = await models.Member.findOne({
              where: {
                uuid: member[i].affiliate_member[0].member_uuid
              }
            })

            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: re.sb_username
            })

            
          } else {
            arr.push({
              sb_username: member[i].sb_username,
              tel: member[i].tel,
              line_id: member[i].line_id,
              know_us: member[i].know_us,
              register_date: member[i].register_date,
              uuid: member[i].uuid,
              bonus: member[i].bonus,
              member_account_banks: [
                {
                  bank_account_name: member[i].member_account_banks[0].bank_account_name,
                  bank_name: member[i].member_account_banks[0].bank_name,
                  bank_number: member[i].member_account_banks[0].bank_number,
                  createdAt: member[i].member_account_banks[0].createdAt,
                  id: member[i].member_account_banks[0].id,
                  member_credit: member[i].member_account_banks[0].member_credit,
                  member_uuid: member[i].member_account_banks[0].member_uuid,
                  updatedAt: member[i].member_account_banks[0].updatedAt,
                  uuid: member[i].member_account_banks[0].uuid
                }
              ],
              recommend: "-"
            })
          }
        }
        Object.assign(data, arr)
      } 

    } else if (startDate !== "" && endDate !== "" && username === "" && searchType === "") {

      member = await models.Member.findAll({
        attributes: { exclude: ["password"] },
        include: [
          {
            as: "member_account_banks",
            model: models.Member_Account_Bank,
          },
          {
            as: "affiliate_member",
            model: models.Affiliate_Member,
          }
        ],
        where: {
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        order: [["id", "DESC"]],
      });
      
      let arr = []
      for (let i=0; i<member.length; i++) {
        if (member[i].affiliate_member.length !== 0) {
          re = await models.Member.findOne({
            where: {
              uuid: member[i].affiliate_member[0].member_uuid
            }
          })

          arr.push({
            sb_username: member[i].sb_username,
            tel: member[i].tel,
            line_id: member[i].line_id,
            know_us: member[i].know_us,
            register_date: member[i].register_date,
            uuid: member[i].uuid,
            bonus: member[i].bonus,
            member_account_banks: [
              {
                bank_account_name: member[i].member_account_banks[0].bank_account_name,
                bank_name: member[i].member_account_banks[0].bank_name,
                bank_number: member[i].member_account_banks[0].bank_number,
                createdAt: member[i].member_account_banks[0].createdAt,
                id: member[i].member_account_banks[0].id,
                member_credit: member[i].member_account_banks[0].member_credit,
                member_uuid: member[i].member_account_banks[0].member_uuid,
                updatedAt: member[i].member_account_banks[0].updatedAt,
                uuid: member[i].member_account_banks[0].uuid
              }
            ],
            recommend: re.sb_username
          })

          
        } else {
          arr.push({
            sb_username: member[i].sb_username,
            tel: member[i].tel,
            line_id: member[i].line_id,
            know_us: member[i].know_us,
            register_date: member[i].register_date,
            uuid: member[i].uuid,
            bonus: member[i].bonus,
            member_account_banks: [
              {
                bank_account_name: member[i].member_account_banks[0].bank_account_name,
                bank_name: member[i].member_account_banks[0].bank_name,
                bank_number: member[i].member_account_banks[0].bank_number,
                createdAt: member[i].member_account_banks[0].createdAt,
                id: member[i].member_account_banks[0].id,
                member_credit: member[i].member_account_banks[0].member_credit,
                member_uuid: member[i].member_account_banks[0].member_uuid,
                updatedAt: member[i].member_account_banks[0].updatedAt,
                uuid: member[i].member_account_banks[0].uuid
              }
            ],
            recommend: "-"
          })
        }
      }
      Object.assign(data, arr)
    }
    res.status(200).json({
      data
    });
  } catch (error) {
    next(error);
  }
};


exports.create = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      password,
      tel,
      bonus,
      line_id,
      know_us,
      register_date,
      bank_name,
      bank_number,
      prefix
    } = req.body;

    const exisTel = await models.Member.findOne({
      where: { tel: tel },
    });

    if (exisTel) {
      const error = new Error("เบอร์มือถือนี้มีผู้ใช้งานแล้ว");
      error.statusCode = 400;
      throw error;
    }

    const exisPrefix = await models.Member.findOne({
      where: { prefix: prefix },
    });

    if (exisPrefix) {
      const error = new Error("Prefix นี้มีผู้ใช้งานแล้ว");
      error.statusCode = 400;
      throw error;
    }

    const exisBankNumber = await models.Member_Account_Bank.findOne({
      where: { bank_number: bank_number },
    });

    if (exisBankNumber) {
      const error = new Error("หมายเลขบัญชีนี้มีผู้ใช้งานแล้ว");
      error.statusCode = 400;
      throw error;
    }

    //hash password
    const salt = await bcrypt.genSalt(5);
    const passwordHash = await bcrypt.hash(password, salt);
    const contact = `${first_name} ${last_name}`;

    const response = await askmebetController.creatUser(tel, password, contact);

    const member = await models.Member.create({
      uuid: uuidv4(),
      first_name: first_name,
      last_name: last_name,
      password: passwordHash,
      tel: tel,
      bonus: bonus,
      line_id: line_id,
      know_us: know_us,
      sb_username: response.data.data.result.username,
      sb_password: password,
      register_date: register_date,
      _id: response.data.data.result._id,
      group_id: response.data.data.result.group,
      prefix: prefix,
      new_member: "1"
    });

    const bank_account_member = `${first_name} ${last_name}`;
    const member_account_bank = await models.Member_Account_Bank.create({
      uuid: uuidv4(),
      bank_name: bank_name,
      bank_number: bank_number,
      bank_account_name: bank_account_member,
      member_uuid: member.uuid,
    });

    res.status(201).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
      data: {
        member: member,
        member_account_bank: member_account_bank,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.edit = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;

    const member = await models.Member.findOne({
      attributes: { exclude: ["password"] },
      where: {
        uuid: uuid,
      },
    });

    if (member === null) {
      const error = new Error("ไม่พบรหัสข้อมูลนี้");
      error.statusCode = 404;
      throw error;
    }

    const bank = await models.Member_Account_Bank.findOne({
      
      where: {
        member_uuid: uuid,
      },
    });



    res.status(200).json({
      data: member,
      bank: bank
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {

    const {
      uuid,
      first_name,
      last_name,
      tel,
      bonus,
      line_id,
      know_us,
      bank_name,
      bank_number,
    } = req.body;

    const member = await models.Member.update(
      {
        first_name: first_name,
        last_name: last_name,
        tel: tel,
        line_id: line_id,
        know_us: know_us,
        bonus: bonus,
      },
      {
        where: {
          uuid: uuid,
        },
      }
    );

    const bank = await models.Member_Account_Bank.update(
      {
        bank_number: bank_number,
        bank_name: bank_name,
        bank_account_name: `${first_name} ${last_name}`
      },
      {
        where: {
          member_uuid: uuid,
        },
      }
    );


    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อยแล้ว",
    });

  } catch (error) {
    next(error);
  }
};

exports.depositListMember = async (req, res, next) => {
  try {
    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    let account_transaction;

    const username = req.params.username;
    const transaction_type = 1;
    const transaction_status = 1;

    if (startDate !== "" && endDate !== "") {
      account_transaction = await models.Member_Account_Bank_Transaction.findAll(
        {
          where: {
            username: username,
            transaction_type: transaction_type,
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          },
        }
      );
    } else {
      account_transaction = await models.Member_Account_Bank_Transaction.findAll(
        {
          where: {
            username: username,
            transaction_type: transaction_type,
          },
        }
      );
    }

    res.status(200).json({
      data: account_transaction,
    });
  } catch (error) {
    next(error);
  }
};

exports.withdrawListMember = async (req, res, next) => {
  try {
    let startDate = req.query.start_date;
    let endDate = req.query.end_date;
    let account_transaction;

    const username = req.params.username;
    const transaction_type = 2;
    const transaction_status = "Success";

    if (startDate !== "" && endDate !== "") {
      account_transaction = await models.Member_Account_Bank_Transaction.findAll(
        {
          where: {
            username: username,
            transaction_type: transaction_type,
            transaction_status: transaction_status,
            createdAt: {
              [Op.between]: [startDate, endDate],
            },
          },
        }
      );
    } else {
      account_transaction = await models.Member_Account_Bank_Transaction.findAll(
        {
          where: {
            username: username,
            transaction_type: transaction_type,
            transaction_status: transaction_status,
          },
        }
      );
    }

    res.status(200).json({
      data: account_transaction,
    });
  } catch (error) {
    next(error);
  }
};

exports.changPassword = async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    const string_length = 8;
    let passwordRandom = "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      passwordRandom += chars.substring(rnum, rnum + 1);
    }

    // gen new passoword

    // hash password
    const salt = await bcrypt.genSalt(5);
    const passwordHash = await bcrypt.hash(passwordRandom, salt);

    const m = await models.Member.findOne({
      where: {
        uuid: uuid,
      },
    });

    const response = await askmebetController.resetPassword(m.sb_username, passwordRandom);

    const member = await models.Member.update(
      {
        password: passwordHash,
        sb_password: passwordRandom
      },
      {
        where: {
          uuid: uuid,
        },
      }
    );

    if (member[0] === 0) {
      const error = new Error("ไม่พบรหัสข้อมูลนี้");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      data: {
        new_password: passwordRandom,
      },
    });
  } catch (error) {
    next(error);
  }
};


exports.checkDataMember = async (req, res, next) => {
  try {
    let refWithCredit, winLost, depositLatestOneWithPromotion, affiliateMember;
    const username = req.params.username;
    let member;
    let current_time = moment().format("YYYY-MM-DD HH:mm:ss");

    const refLatest = await models.Ref_Deposit.findAll({
      attributes: ["id", "uuid", "username", "ref", "createdAt"],
      limit: 1,
      where: {
        username: username,
      },
      order: [["createdAt", "DESC"]],
    });

    const response = await askmebetController.getCredit(username);

    console.log(response);

    if (username !== "") {
      member = await models.Member.findOne({
        attributes: ["uuid", "group_id"],
        where: { sb_username: username },
      });
    }

    if (member === null) {
      const error = new Error("ไม่พบข้อมูลรหัสผู้ใช้งาน");
      error.statusCode = 404;
      throw error;
    }

    if (response !== null) {
      refWithCredit = await refLatest.map((refLatest, index) => {
        return {
          id: refLatest.id,
          uuid: refLatest.uuid,
          username: refLatest.username,
          ref: refLatest.ref,
          credit: response.current_credit[0].balance,
          createdAt: refLatest.createdAt,
        };
      });
    }

    if (refWithCredit.length === 0) {
      const error = new Error("ไม่พบข้อมูลการฝาก");
      error.statusCode = 404;
      throw error;
    } else {
      winLost = await this.getWinLostByRef(
        refWithCredit[0].username,
        // member.group_id,
        refWithCredit[0].ref,
        refWithCredit[0].createdAt,
        current_time
      );
      depositLatest = await this.getDepositLatest(refWithCredit[0].username);
      depositLatestOneWithPromotion = await this.getDepositLatestOne(
        refWithCredit[0].username
      );
      affiliateMember = await this.affiliateMember(member.uuid);
    }

    res.status(200).json({
      user: refWithCredit,
      win_lost: winLost.data,
      deposit_latest_one_with_promotion: depositLatestOneWithPromotion,
      deposit_latest: depositLatest,
      affiliateMember: affiliateMember,
      countMemberAffiliate: affiliateMember.length,
    });
  } catch (error) {
    next(error);
  }
};

exports.getWinLostByRef = async (
  username,
  groupId,
  dateTimeFrom,
  dateTimeTo
) => {
  try {
    const winLost = await askmebetController.winlose(
      username,
      groupId,
      dateTimeFrom,
      dateTimeTo
    );

    return winLost;
  } catch (error) {
    throw error;
  }
};

exports.getDepositLatest = async (username) => {
  try {
    const depositLatest = await models.Member_Account_Bank_Transaction.findAll({
      attributes: [
        "id",
        "uuid",
        "amount",
        "bonus_credit",
        "credit_before",
        "credit_after",
        "bank_time",
        "annotation",
        "ref",
      ],
      limit: 20,
      where: {
        username: username,
        transaction_type: 1,
      },
      order: [["createdAt", "DESC"]],
    });

    return depositLatest;
  } catch (error) {
    throw error;
  }
};

exports.getDepositLatestOne = async (username) => {
  try {
    const depositLatestOne = await models.Member_Account_Bank_Transaction.findOne(
      {
        attributes: [
          "id",
          "uuid",
          "amount",
          "bonus_credit",
          "credit_before",
          "credit_after",
          "bank_time",
          "annotation",
          "ref",
          "promotion_uuid",
        ],
        limit: 1,
        where: {
          username: username,
          transaction_type: 1,
        },
        order: [["createdAt", "DESC"]],
      }
    );

    const promotion = await models.Promotion.findOne({
      where: {
        uuid: depositLatestOne.promotion_uuid,
      },
    });

    const refTurnOver = await models.Ref_Deposit.findOne({
      attributes: ["uuid"],
      include: [
        {
          as: "error_list_turnover",
          model: models.Error_List_TurnOver,
        },
      ],
      where: {
        ref: depositLatestOne.ref,
      },
    });

    return {
      deposit_last: depositLatestOne,
      promotion: promotion,
      ref_turn_over: refTurnOver,
    };
  } catch (error) {
    throw error;
  }
};

exports.affiliateMember = async (member_uuid) => {
  try {
    const affiliateMember = await models.Affiliate_Member.findAll({
      attributes: ["member_uuid_member"],
      include: [
        {
          attributes: ["sb_username"],
          as: "user",
          model: models.Member,
        },
      ],
      where: {
        member_uuid: member_uuid,
      },
    });

    const countAffiliateMember = await models.Affiliate_Member.findAndCountAll({
      attributes: ["member_uuid_member"],
      where: {
        member_uuid: member_uuid,
      },
    });

    return affiliateMember;
  } catch (error) {
    throw error;
  }
};

exports.oldMember = async (req, res, next) => {
  try {
    const {
      username,
      password,
      first_name,
      last_name,
      tel,
      bank_number,
      bank_name,
      line_id,
      know_us,
      bonus,
      register_date,
      prefix,
      new_member
    } = req.body;


    const exisUsername = await models.Member.findOne({
      where: { sb_username: username },
    });

    if (exisUsername) {
      const error = new Error("Username มีผู้ใช้งานแล้ว");
      error.statusCode = 400;
      throw error;
    }

    const exisTel = await models.Member.findOne({
      where: { tel: tel },
    });

    if (exisTel) {
      const error = new Error("เบอร์มือถือนี้มีผู้ใช้งานแล้ว");
      error.statusCode = 400;
      throw error;
    }

    const exisPrefix = await models.Member.findOne({
      where: { prefix: prefix },
    });

    if (exisPrefix) {
      const error = new Error("Prefix นี้มีผู้ใช้งานแล้ว");
      error.statusCode = 400;
      throw error;
    }

    const exisBankNumber = await models.Member_Account_Bank.findOne({
      where: { bank_number: bank_number },
    });

    if (exisBankNumber) {
      const error = new Error("หมายเลขบัญชีนี้มีผู้ใช้งานแล้ว");
      error.statusCode = 400;
      throw error;
    }

    //hash password
    const salt = await bcrypt.genSalt(5);
    const passwordHash = await bcrypt.hash(password, salt);


    const member = await models.Member.create(
      {
        uuid: uuidv4(),
        sb_username: username,
        sb_password: password,
        password: passwordHash,
        first_name: first_name,
        last_name: last_name,
        tel: tel,
        line_id: line_id,
        know_us: know_us,
        bonus: bonus,
        register_date: register_date,
        prefix: prefix,
        _id: cryptoRandomString({length: 25}),
        group_id: cryptoRandomString({length: 25}),
        prefix: prefix,
        new_member: new_member
      },
    );

    const bank = await models.Member_Account_Bank.create(
      {
        uuid: uuidv4(),
        bank_number: bank_number,
        bank_name: bank_name,
        bank_account_name: `${first_name} ${last_name}`,
        member_uuid: member.uuid
      },
    );

    res.status(200).json({
      data: {
        message: "เพิ่มข้อมูลเรียบร้อย",
        data:{
          member: member,
          bank: bank
        }
      },
    });

  } catch (error) {
    next(error);
  }
};


// exports.oldMember = async (req, res, next) => {
//   try {
//     const {
//       username,
//       first_name,
//       last_name,
//       tel,
//       bank_number,
//       bank_name,
//       line_id,
//       know_us,
//       bonus,
//     } = req.body;

//     const member = await models.Member.findOne({
//       attributes: ["uuid"],
//       where: { sb_username: username },
//     });

//     const memberNew = await models.Member.update(
//       {
//         first_name: first_name,
//         last_name: last_name,
//         tel: tel,
//         line_id: line_id,
//         know_us: know_us,
//         bonus: bonus,
//       },
//       {
//         where: {
//           uuid: member.uuid,
//         },
//       }
//     );

//     const bank = await models.Member_Account_Bank.update(
//       {
//         bank_number: bank_number,
//         bank_name: bank_name,
//       },
//       {
//         where: {
//           member_uuid: member.uuid,
//         },
//       }
//     );

//     res.status(200).json({
//       data: {
//         message: "อัพเดทข้อมูลเรียบร้อย",
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };


