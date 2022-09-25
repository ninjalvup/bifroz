const models = require('../models/index');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

exports.getDataIncome = async (req, res, next) => {
    try {
        // req.user.uuid
        const { status } = req.params;

        // call function
        let sql = fnSumAmount(req.user.uuid);

        resultSum = await models.sequelize.query(sql, {
            type: models.sequelize.QueryTypes.SELECT
        });// resultSum query

        // convert obj to arr query income amount
        const con = Object.values(resultSum[0]);
        let con_ = con.map(Number); // convert string to number
        const reducer = (accumulator, currentValue) => accumulator + currentValue; // fn sum [ arr ]

        // query setting
        const setting = await models.Affiliate_Setting.findOne();

        res.status(200).json({
            income: con_.reduce(reducer).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'), // sum and two decimal digits
            setting: setting,
            cal: con_.reduce(reducer)
        });
        
    } catch (error) {
       next(error); 
    }
}

exports.getDataWithdrawIncome = async (req, res, next) => { // ถอนรายได้
    try {

        const { inputForm } = req.body;

        const set = await models.Affiliate_Setting.findOne();

        let error = 0;

        if (inputForm < set.amount_withdraw) { // เช็ครายได้
            error = 1
        } else {
            // call function
            rs = await models.sequelize.query(fnListUser(req.user.uuid), {
                type: models.sequelize.QueryTypes.SELECT
            }); // query

            let lv1 = [], lv2 = [], lv3 = [], lv4 = [], lv5 = [], lv6 = [], lv7 = [], lv8 = [], lv9 = [], lv10 = [];
            rs.map(function(item) { // add obj to arr 1-10 LV
                lv1.push(item.lv1);
                lv2.push(item.lv2);
                lv3.push(item.lv3);
                lv4.push(item.lv4);
                lv5.push(item.lv5);
                lv6.push(item.lv6);
                lv7.push(item.lv7);
                lv8.push(item.lv8);
                lv9.push(item.lv9);
                lv10.push(item.lv10);
            });

            const insert = await models.Affiliate_Wallet.create({
                uuid: uuidv4(),
                member_uuid: req.user.uuid,
                total_affiliate: inputForm,
            });

            // update affiliate_Deposits status = 1
            const update = "UPDATE Affiliate_Deposits SET `status` = 1, wallet_uuid = '"+insert.uuid+"' WHERE member_uuid_member IN (\n" + 
                ""+fnSplit(lv1)+", \n" +
                ""+fnSplit(lv2)+", \n" +
                ""+fnSplit(lv3)+", \n" +
                ""+fnSplit(lv4)+", \n" +
                ""+fnSplit(lv5)+", \n" +
                ""+fnSplit(lv6)+", \n" +
                ""+fnSplit(lv7)+", \n" +
                ""+fnSplit(lv8)+", \n" +
                ""+fnSplit(lv9)+", \n" +
                ""+fnSplit(lv10)+" \n" +
                ") AND `status` = 0";
            rs_update = await models.sequelize.query(update, {
                type: models.sequelize.QueryTypes.UPDATE
            }); // query update

            const bank = await models.Member_account_bank.findOne({
                where: {
                    member_uuid: req.user.uuid
                }
            });

            await models.Member_account_bank_transaction.create({
                uuid: uuidv4(),
                bank: bank.uuid,
                amount: inputForm,
                bonus_credit: 0,
                transaction_type: 3,
                credit_before: inputForm,
                credit_after: 0,
                bank_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                create_by: '-',
                annotation: '-',
                transaction_status: 'Approve',
                auto_status: '-',
                username: req.user.sb_username
            })
        }

        res.status(200).json({
            error: error,
            rs: req.user.uuid
        });

    } catch (error) {
        next(error);
    }
}

exports.getDataUser = async (req, res, next) => {
    try {

        const sql = await models.Member_account_bank.findOne({
            where: {
                member_uuid: req.user.uuid
            }
        });

        res.status(200).json({
            data: sql,
            imgBank: fnImgBank(sql.bank_name.toLowerCase()),
            nameBank: fnNameBank(sql.bank_name.toLowerCase()),
            user: req.user
        });

    } catch (error) {
        next(error);
    }
}

function fnImgBank(bank) {
    let val = "";
    if (bank == 'bay') {
        val = "assets/images/banks/bay.png";
    } else if (bank == 'bbla') {
        val = "assets/images/banks/bbla.png";
    } else if (bank == 'gsb') {
        val = "assets/images/banks/gsb.png";
    } else if (bank == 'kbnk') {
        val = "assets/images/banks/kbank.png";
    } else if (bank == 'ktba') {
        val = "assets/images/banks/ktb.png";
    } else if (bank == 'scb') {
        val = "assets/images/banks/scb.png";
    } else if (bank == 'tmb') {
        val = "assets/images/banks/tmb.png";
    } else if (bank == 'baac') {
        val = "assets/images/banks/baac.png";
    } else if (bank == 'cimb') {
        val = "assets/images/banks/cimb.png";
    } else if (bank == 'citi') {
        val = "assets/images/banks/citi.png";
    } else if (bank == 'ghb') {
        val = "assets/images/banks/ghb.png";
    } else if (bank == 'hsbc') {
        val = "assets/images/banks/hsbc.png";
    } else if (bank == 'ibank') {
        val = "assets/images/banks/ibank.png";
    } else if (bank == 'icbc') {
        val = "assets/images/banks/icbc.png";
    } else if (bank == 'kkp') {
        val = "assets/images/banks/kkp.png";
    } else if (bank == 'lhbank') {
        val = "assets/images/banks/lhbank.png";
    } else if (bank == 'mizuho') {
        val = "assets/images/banks/mizuho.png";
    } else if (bank == 'scbt') {
        val = "assets/images/banks/scbt.png";
    } else if (bank == 'tbank') {
        val = "assets/images/banks/tbank.png";
    } else if (bank == 'tcd') {
        val = "assets/images/banks/tcd.png";
    } else if (bank == 'tisco') {
        val = "assets/images/banks/tisco.png";
    } else if (bank == 'ubo') {
        val = "assets/images/banks/ubo.png";
    } else if (bank == 'promptpay') {
        val = "assets/images/icons/profile.png"
    }
    
    return val;
}

function fnNameBank(bank) {
    let val = "";
    if (bank == 'bay') {
        val = "ธนาคารกรุงศรีอยุธยา";
    } else if (bank == 'bbla') {
        val = "ธนาคารกรุงเทพ";
    } else if (bank == 'gsb') {
        val = "ธนาคารออมสิน";
    } else if (bank == 'kbnk') {
        val = "ธนาคารกสิกรไทย";
    } else if (bank == 'ktba') {
        val = "ธนาคารกรุงไทย";
    } else if (bank == 'scb') {
        val = "ธนาคารไทยพาณิชย์";
    } else if (bank == 'tmb') {
        val = "ธนาคารทหารไทย";
    } else if (bank == 'baac') {
        val = "เพื่อการเกษตรและสหกรณ์การเกษตร";
    } else if (bank == 'cimb') {
        val = "ซีไอเอ็มบีไทย";
    } else if (bank == 'citi') {
        val = "ซิตี้แบงค์";
    } else if (bank == 'ghb') {
        val = "อาคารสงเคราะห์";
    } else if (bank == 'hsbc') {
        val = "ฮ่องกงและเซี่ยงไฮ้";
    } else if (bank == 'ibank') {
        val = "อิสลามแห่งประเทศไทย";
    } else if (bank == 'icbc') {
        val = "สินเอเซีย";
    } else if (bank == 'kkp') {
        val = "เกียรตินาคิน";
    } else if (bank == 'lhbank') {
        val = "แลนด์ แอนด์ เฮ้าส์";
    } else if (bank == 'mizuho') {
        val = "มิซูโฮ";
    } else if (bank == 'scbt') {
        val = "สแตนดาร์ดชาร์เตอร์ด ประเทศไทย";
    } else if (bank == 'tbank') {
        val = "ธนชาต";
    } else if (bank == 'tcd') {
        val = "ไทยเครดิตเพื่อรายย่อย";
    } else if (bank == 'tisco') {
        val = "ธนาคารทิสโก้";
    } else if (bank == 'ubo') {
        val = "ธนาคารยูโอบี";
    } else if (bank == 'promptpay') {
        val = "promptpay"
    }
    
    return val;
}

function fnSumAmount(uuid) { // sum รายได้
    // query income amount
    let sum = "SELECT\n"
    sum += "IFNULL(REPLACE(FORMAT(SUM(DISTINCT p1.total1), 2), ',', ''), 0) AS total1,\n"
    sum += "IFNULL(REPLACE(FORMAT(SUM(DISTINCT p2.total2 / 100 * p2.percent_value), 2), ',', ''), 0) AS total2,\n"
    sum += "IFNULL(REPLACE(FORMAT((SUM(DISTINCT p3.total3 / 100 * p3.percent_value) / 100 * p3.percent_value), 2), ',', ''), 0) AS total3,\n"
    sum += "IFNULL(REPLACE(FORMAT(((SUM(DISTINCT p4.total4 / 100 * p4.percent_value) / 100 * p4.percent_value) / 100 * p4.percent_value), 2), ',', ''), 0) AS total4,\n"
    sum += "IFNULL(REPLACE(FORMAT((((SUM(DISTINCT p5.total5 / 100 * p5.percent_value) / 100 * p5.percent_value) / 100 * p5.percent_value) / 100 * p5.percent_value), 2), ',', ''), 0) AS total5,\n"
    sum += "IFNULL(REPLACE(FORMAT(((((SUM(DISTINCT p6.total6 / 100 * p6.percent_value) / 100 * p6.percent_value) / 100 * p6.percent_value) / 100 * p6.percent_value) / 100 * p6.percent_value), 2), ',', ''), 0) AS total6,\n"
    sum += "IFNULL(REPLACE(FORMAT((((((SUM(DISTINCT p7.total7 / 100 * p7.percent_value) / 100 * p7.percent_value) / 100 * p7.percent_value) / 100 * p7.percent_value) / 100 * p7.percent_value) / 100 * p7.percent_value), 2), ',', ''), 0) AS total7,\n"
    sum += "IFNULL(REPLACE(FORMAT(((((((SUM(DISTINCT p8.total8 / 100 * p8.percent_value) / 100 * p8.percent_value) / 100 * p8.percent_value) / 100 * p8.percent_value) / 100 * p8.percent_value) / 100 * p8.percent_value) / 100 * p8.percent_value), 2), ',', ''), 0) AS total8,\n"
    sum += "IFNULL(REPLACE(FORMAT((((((((SUM(DISTINCT p9.total9 / 100 * p9.percent_value) / 100 * p9.percent_value) / 100 * p9.percent_value) / 100 * p9.percent_value) / 100 * p9.percent_value) / 100 * p9.percent_value) / 100 * p9.percent_value) / 100 * p9.percent_value), 2), ',', ''), 0) AS total9,\n"
    sum += "IFNULL(REPLACE(FORMAT(((((((((SUM(DISTINCT p10.total10 / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value) / 100 * p10.percent_value), 2), ',', ''), 0) AS total10\n"
    sum += "FROM (\n"
    sum += "   SELECT id, member_uuid_member FROM Affiliate_Members WHERE member_uuid = '"+uuid+"'\n"
    sum += ") AS f1\n"
    for (let i=2; i <= 10; i++) {
        sum += "LEFT JOIN (\n"
        sum += "   SELECT * FROM Affiliate_Members\n"
        sum += ") AS f"+i+" ON (f"+(i - 1)+".member_uuid_member = f"+i+".member_uuid)\n"
    }
    for (let i=1; i <= 10; i++) {
        sum += "LEFT JOIN (\n"
        sum += "	SELECT member_uuid_member, SUM((amount / 100) * percent_value) AS total"+i+", percent_value FROM Affiliate_Deposits WHERE `status` = 0 GROUP BY member_uuid_member\n"
        sum += ") AS p"+i+" ON (f"+i+".member_uuid_member = p"+i+".member_uuid_member)\n"
    } // end query income amount

    return sum // return string
}

function fnListUser (uuid) { // list user
    let rs = "SELECT\n"
    for (let i=1; i <= 10; i++) {
        if (i != 10) {
            rs += "     lv"+i+".member_uuid_member AS lv"+i+",\n"
        } else {
            rs += "     lv"+i+".member_uuid_member AS lv"+i+"\n"
        }
    }
    rs += "FROM (\n"
    rs += "     SELECT member_uuid_member FROM Affiliate_Members WHERE  member_uuid = '"+uuid+"'\n"
    rs += ") AS lv1\n"
    for (let i=2; i <= 10; i++) {
        rs += "LEFT JOIN (\n"
        rs += "     SELECT * FROM Affiliate_Members\n"
        rs += ") AS lv"+i+" ON (lv"+(i - 1)+".member_uuid_member = lv"+i+".member_uuid)\n"
    }

    return rs // return string
}

fnSplit = (queryLv) => { // fn split
    let data = "";
    for (let i=0; i < queryLv.length; i++) {
        if (i == queryLv.length - 1) {
            data += "'"+queryLv[i]+"'";
        } else {
            data += "'"+queryLv[i]+"',";
        }
    }
    return data;
}