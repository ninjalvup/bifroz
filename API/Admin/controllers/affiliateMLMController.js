const models = require("../models/index");
const { v4: uuidv4 } = require("uuid");

exports.getDataSetting = async (req, res, next) => {
    try {
        const setting = await models.Affiliate_Setting.findAll({
            order: [["id", "ASC"]],
         });
     
         res.status(200).json({
           data: setting,
         });
    } catch (error) {
        next(error);
    }
}

exports.updatePromotion = async (req, res, next) => {
    try {
        const {
            promotion_type_id,
            percent,
            amount
        } = req.body;
        const id = 1;

        await models.Affiliate_Setting.update({
            percent_value: percent,
            amount_withdraw: amount,
            promotion: promotion_type_id,
            fee_withdraw: 0
        },{
            where: {
                id: id
            }
        });

        res.status(200).json({
            data: "success"
        });
    } catch (error) {
        next(error);
    }
}

exports.searchData = async (req, res, next) => {
    try {
        const { yesterdate, yestertime, totime, todate, username } = req.body;

        let user = "";
        if (username === "") {
            user = "";
        } else {
            user = "AND username = '"+username+"'\n";
        }

        let sql = "SELECT * FROM `Member_Account_Bank_Transactions` WHERE transaction_type = 3\n" +
                ""+user+"\n" +
                "AND (DATE_FORMAT(createdAt, '%Y-%m-%d') BETWEEN '"+todate+"' AND '"+yesterdate+"'\n" +
                "AND DATE_FORMAT(createdAt, '%h:%i:%s') BETWEEN '"+totime+"' AND '"+yestertime+"')";

        result = await models.sequelize.query(sql, {
            type: models.sequelize.QueryTypes.SELECT
        });// result query

        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

exports.searchDataDate = async (req, res, next) => {
    try {
        const { status } = req.params;
        let text = "";
        if (status == 1) { // วันปัจจุบัน
            text = "CURRENT_DATE";
        } else {
            text = "DATE_SUB(CURRENT_DATE, INTERVAL 1 DAY)";
        }

        let sql = "SELECT * FROM Member_Account_Bank_Transactions WHERE transaction_type = 3 AND DATE_FORMAT(createdAt, '%Y-%m-%d') = " + text;
        result = await models.sequelize.query(sql, {
            type: models.sequelize.QueryTypes.SELECT
        });// result query

        res.status(200).json({
            data: result
        });
    } catch (error) {
        next(error);
    }
}

exports.checkData = async (req, res, next) => {

    try {
        const { inputSearch } = req.body;

        // main
        const sql = await models.Member.findOne({
            where: {
                sb_username: inputSearch
            }
        });

        // set variable users, totalUser, totalIncome, listTable -> res font end
        let user = "",  totalUser = "", totalIncome = "", listTable = "";

        if (sql != null) { // query variabel sql success
            // query amount users
            let main = "SELECT\n" 
            for (let i=1; i <= 10; i++) {
                if (i != 10) {
                    main += "   IFNULL(SUM(f"+i+".c"+i+"), 0) +\n" 
                } else {
                    main += "   IFNULL(SUM(f"+i+".c"+i+"), 0) AS total, IFNULL(f1.c1, 0) AS uTotal\n"
                }
            }
            main += "FROM (\n"
            main += "   SELECT id, member_uuid_member, COUNT(*) AS c1 FROM Affiliate_Members WHERE member_uuid = '"+sql.uuid+"' GROUP BY member_uuid_member\n" 
            main += ") AS f1\n"
            for (let i=2; i <= 10; i++) {
                main += "LEFT JOIN (\n"
                main += "   SELECT *, COUNT(*) AS c"+i+" FROM Affiliate_Members GROUP BY member_uuid\n"
                main += ") AS f"+i+" ON (f"+(i - 1)+".member_uuid_member = f"+i+".member_uuid)\n"
            } // end query amount users
            result = await models.sequelize.query(main, {
                type: models.sequelize.QueryTypes.SELECT
            });// result query

            if (result[0].uTotal == 0) {
                user = sql.first_name+" "+sql.last_name;
                totalUser = 0;
                totalIncome = 0;
                listTable = [];
            } else {

            
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
                    sum += "   SELECT id, member_uuid_member FROM Affiliate_Members WHERE member_uuid = '"+sql.uuid+"'\n"
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
                resultSum = await models.sequelize.query(sum, {
                    type: models.sequelize.QueryTypes.SELECT
                });// resultSum query

                // convert obj to arr query income amount
                const con = Object.values(resultSum[0]);
                let con_ = con.map(Number); // convert string to number
                const reducer = (accumulator, currentValue) => accumulator + currentValue; // fn sum [ arr ]

                // query list users in users main
                let rs = "SELECT\n"
                    for (let i=1; i <= 10; i++) {
                        if (i != 10) {
                            rs += "     lv"+i+".member_uuid_member AS lv"+i+",\n"
                        } else {
                            rs += "     lv"+i+".member_uuid_member AS lv"+i+"\n"
                        }
                    }
                    rs += "FROM (\n"
                    rs += "     SELECT member_uuid_member FROM Affiliate_Members WHERE  member_uuid = '"+sql.uuid+"'\n"
                    rs += ") AS lv1\n"
                    for (let i=2; i <= 10; i++) {
                        rs += "LEFT JOIN (\n"
                        rs += "     SELECT * FROM Affiliate_Members\n"
                        rs += ") AS lv"+i+" ON (lv"+(i - 1)+".member_uuid_member = lv"+i+".member_uuid)\n"
                    }
                rs_users = await models.sequelize.query(rs, {
                    type: models.sequelize.QueryTypes.SELECT
                });// result list user

                let lv1 = [], lv2 = [], lv3 = [], lv4 = [], lv5 = [], lv6 = [], lv7 = [], lv8 = [], lv9 = [], lv10 = [];
                rs_users.map(function(item) { // add obj to arr 1-10 LV
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

                // query transactions bank
                let tran = "SELECT \n" + // query lv1
                    "	m.id, sm.sb_username, FORMAT(m.amount / 100 * m.percent_value, 2) AS income, m.deposite_date, 1 AS 'LV'\n" +
                    "FROM (\n" +
                    "	SELECT * FROM Affiliate_Deposits WHERE member_uuid_member IN ("+fnSplit(lv1)+") AND `status` = 0\n" +
                    ") AS m \n" +
                    "LEFT JOIN (\n" +
                    "	SELECT * FROM Members\n" +
                    ") AS sm ON (m.member_uuid_member = sm.uuid) UNION ALL \n" +

                    // query lv2
                    "SELECT \n" +
                    "	m.id, sm.sb_username, FORMAT(m.amount / 100 * m.percent_value / 100 * m.percent_value, 2) AS income, m.deposite_date, 2 AS 'LV'\n" +
                    "FROM (\n" +
                    "	SELECT * FROM Affiliate_Deposits WHERE member_uuid_member IN ("+fnSplit(lv2)+") AND `status` = 0\n" +
                    ") AS m \n" +
                    "LEFT JOIN (\n" +
                    "	SELECT * FROM Members\n" +
                    ") AS sm ON (m.member_uuid_member = sm.uuid) UNION ALL \n" +

                    // query lv3
                    "SELECT \n" +
                    "	m.id, sm.sb_username, FORMAT(m.amount / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value, 2) AS income, m.deposite_date, 3 AS 'LV'\n" +
                    "FROM (\n" +
                    "	SELECT * FROM Affiliate_Deposits WHERE member_uuid_member IN ("+fnSplit(lv3)+") AND `status` = 0\n" +
                    ") AS m \n" +
                    "LEFT JOIN (\n" +
                    "	SELECT * FROM Members\n" +
                    ") AS sm ON (m.member_uuid_member = sm.uuid) UNION ALL \n" +

                    // query lv4
                    "SELECT \n" +
                    "	m.id, sm.sb_username, FORMAT(m.amount / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value, 2) AS income, m.deposite_date, 4 AS 'LV'\n" +
                    "FROM (\n" +
                    "	SELECT * FROM Affiliate_Deposits WHERE member_uuid_member IN ("+fnSplit(lv4)+") AND `status` = 0\n" +
                    ") AS m \n" +
                    "LEFT JOIN (\n" +
                    "	SELECT * FROM Members\n" +
                    ") AS sm ON (m.member_uuid_member = sm.uuid) UNION ALL \n" +

                    // query lv5
                    "SELECT \n" +
                    "	m.id, sm.sb_username, FORMAT(m.amount / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value, 2) AS income, m.deposite_date, 5 AS 'LV'\n" +
                    "FROM (\n" +
                    "	SELECT * FROM Affiliate_Deposits WHERE member_uuid_member IN ("+fnSplit(lv5)+") AND `status` = 0\n" +
                    ") AS m \n" +
                    "LEFT JOIN (\n" +
                    "	SELECT * FROM Members\n" +
                    ") AS sm ON (m.member_uuid_member = sm.uuid) UNION ALL \n" +

                    // query lv6
                    "SELECT \n" +
                    "	m.id, sm.sb_username, FORMAT(m.amount / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value, 2) AS income, m.deposite_date, 6 AS 'LV'\n" +
                    "FROM (\n" +
                    "	SELECT * FROM Affiliate_Deposits WHERE member_uuid_member IN ("+fnSplit(lv6)+") AND `status` = 0\n" +
                    ") AS m \n" +
                    "LEFT JOIN (\n" +
                    "	SELECT * FROM Members\n" +
                    ") AS sm ON (m.member_uuid_member = sm.uuid) UNION ALL \n" +

                    // query lv7
                    "SELECT \n" +
                    "	m.id, sm.sb_username, FORMAT(m.amount / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value, 2) AS income, m.deposite_date, 7 AS 'LV'\n" +
                    "FROM (\n" +
                    "	SELECT * FROM Affiliate_Deposits WHERE member_uuid_member IN ("+fnSplit(lv7)+") AND `status` = 0\n" +
                    ") AS m \n" +
                    "LEFT JOIN (\n" +
                    "	SELECT * FROM Members\n" +
                    ") AS sm ON (m.member_uuid_member = sm.uuid) UNION ALL \n" +

                    // query lv8
                    "SELECT \n" +
                    "	m.id, sm.sb_username, FORMAT(m.amount / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value, 2) AS income, m.deposite_date, 8 AS 'LV'\n" +
                    "FROM (\n" +
                    "	SELECT * FROM Affiliate_Deposits WHERE member_uuid_member IN ("+fnSplit(lv8)+") AND `status` = 0\n" +
                    ") AS m \n" +
                    "LEFT JOIN (\n" +
                    "	SELECT * FROM Members\n" +
                    ") AS sm ON (m.member_uuid_member = sm.uuid) UNION ALL \n" +

                    // query lv9
                    "SELECT \n" +
                    "	m.id, sm.sb_username, FORMAT(m.amount / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value, 2) AS income, m.deposite_date, 9 AS 'LV'\n" +
                    "FROM (\n" +
                    "	SELECT * FROM Affiliate_Deposits WHERE member_uuid_member IN ("+fnSplit(lv9)+") AND `status` = 0\n" +
                    ") AS m \n" +
                    "LEFT JOIN (\n" +
                    "	SELECT * FROM Members\n" +
                    ") AS sm ON (m.member_uuid_member = sm.uuid) UNION ALL \n" +

                    // query lv10
                    "SELECT \n" +
                    "	m.id, sm.sb_username, FORMAT(m.amount / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value / 100 * m.percent_value, 2) AS income, m.deposite_date, 10 AS 'LV'\n" +
                    "FROM (\n" +
                    "	SELECT * FROM Affiliate_Deposits WHERE member_uuid_member IN ("+fnSplit(lv10)+") AND `status` = 0\n" +
                    ") AS m \n" +
                    "LEFT JOIN (\n" +
                    "	SELECT * FROM Members\n" +
                    ") AS sm ON (m.member_uuid_member = sm.uuid) ORDER BY lv, id\n"

                rs_tran = await models.sequelize.query(tran, {
                    type: models.sequelize.QueryTypes.SELECT
                });// result list user

                // set users, totalUser, totalIncome, listTable -> res font end
                user = sql.first_name+" "+sql.last_name;
                totalUser = result[0].total;
                totalIncome = con_.reduce(reducer).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); // sum and two decimal digits
                listTable = rs_tran;
            }
        } else { // query null
            let text = "ไม่พบ users ที่ค้นหา";
            user = text;
            totalUser = text;
            totalIncome = text;
            listTable = [];
        } // end if
        
        res.status(200).json({
            data: {
                userName: user,
                total: totalUser,
                totalIncome: totalIncome,
                table: listTable
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.searchDataTree = async (req, res, next) => {
    try {
        const { inputSearch } = req.body;
        
        // main
        const main = await models.Member.findOne({
            where: {
                sb_username: inputSearch
            }
        });

        let mainlv = "", sLv1 = [];
        if (main != null) {
            let lv1 = "SELECT sm.sb_username, sm.uuid, IFNULL(ch.total, 0) AS total FROM (\n" +
                    "	SELECT * FROM Affiliate_Members WHERE member_uuid = '"+main.uuid+"'\n" +
                    ") AS m\n" +
                    "LEFT JOIN (\n" +
                    "	SELECT * FROM Members\n" +
                    ") AS sm ON (m.member_uuid_member = sm.uuid)\n" +
                    "LEFT JOIN (\n" +
                    "	SELECT *, COUNT(*) AS total FROM Affiliate_Members GROUP BY member_uuid\n" +
                    ") AS ch ON (m.member_uuid_member = ch.member_uuid) ORDER BY m.id"
            rs_lv1 = await models.sequelize.query(lv1, {
                type: models.sequelize.QueryTypes.SELECT
            });// rs_lv1 list user

            // set 
            mainlv = main;
            sLv1 = rs_lv1;
        } else {
            mainlv = 0;
            sLv1 = 0
        }

        res.status(200).json({
            data: mainlv,
            lv1: sLv1
        });
    } catch (error) {
        next(error);
    }
}

exports.searchDataTreeLink = async (req, res, next) => {
    try {
        const { uuid } = req.params;
        
        let sql = "SELECT sm.sb_username, sm.uuid FROM (\n" +
            "   SELECT * FROM Affiliate_Members WHERE member_uuid = '"+uuid+"'\n" +
            ") AS m\n" +
            "LEFT JOIN (\n" +
            "        SELECT * FROM Members GROUP BY sb_username\n" +
            ") AS sm ON (m.member_uuid_member = sm.uuid)"
        rs_lv1 = await models.sequelize.query(sql, {
            type: models.sequelize.QueryTypes.SELECT
        });// rs_lv1 list user

        res.status(200).json({
            data: rs_lv1
        });
    } catch (error) {
        next(error);
    }
}

exports.searchDataTreeTable = async (req, res, next) => {
    try {
        const { inputSearch } = req.body;
        
        // main
        const main = await models.Member.findOne({
            where: {
                sb_username: inputSearch
            }
        });

        let mTable = "", listTable = [];
        if (main != null) {

            let rs = "SELECT\n"
                for (let i=1; i <= 10; i++) {
                    if (i != 10) {
                        rs += "     lv"+i+".member_uuid_member AS lv"+i+",\n"
                    } else {
                        rs += "     lv"+i+".member_uuid_member AS lv"+i+"\n"
                    }
                }
                rs += "FROM (\n"
                rs += "     SELECT member_uuid_member FROM Affiliate_Members WHERE  member_uuid = '"+main.uuid+"'\n"
                rs += ") AS lv1\n"
                for (let i=2; i <= 10; i++) {
                    rs += "LEFT JOIN (\n"
                    rs += "     SELECT * FROM Affiliate_Members\n"
                    rs += ") AS lv"+i+" ON (lv"+(i - 1)+".member_uuid_member = lv"+i+".member_uuid)\n"
                }
            rs_users = await models.sequelize.query(rs, {
                type: models.sequelize.QueryTypes.SELECT
            });// result list user

            if (rs_users.length == 0) {
                mTable = main.sb_username
                listTable = 0
            } else {

                let lv1 = [], lv2 = [], lv3 = [], lv4 = [], lv5 = [], lv6 = [], lv7 = [], lv8 = [], lv9 = [], lv10 = [];
                rs_users.map(function(item, index) { // add obj to arr 1-10 LV
                    console.log('\x1b[41m', `'${item.lv1}',`);
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

                // query transactions bank
                let tran = `
                    SELECT m.*, IFNULL(FORMAT(SUM(af.amount) / 100 * af.percent_value, 2), 0.00) AS income, 1 AS LV FROM (
                        SELECT id, sb_username, uuid, CONCAT(first_name,' ',last_name) AS fullName, register_date FROM Members WHERE uuid IN (${fnSplit(lv1)})
                    ) AS m
                    LEFT JOIN Affiliate_Deposits AS af ON (m.uuid = af.member_uuid_member AND af.status = 0) GROUP BY m.uuid UNION ALL 

                    SELECT m.*, IFNULL(FORMAT(SUM(af.amount) / 100 * af.percent_value, 2), 0.00) AS income, 2 AS LV FROM (
                        SELECT id, sb_username, uuid, CONCAT(first_name,' ',last_name) AS fullName, register_date FROM Members WHERE uuid IN (${fnSplit(lv2)})
                    ) AS m
                    LEFT JOIN Affiliate_Deposits AS af ON (m.uuid = af.member_uuid_member AND af.status = 0) GROUP BY m.uuid UNION ALL 

                    SELECT m.*, IFNULL(FORMAT(SUM(af.amount) / 100 * af.percent_value, 2), 0.00) AS income, 2 AS LV FROM (
                        SELECT id, sb_username, uuid, CONCAT(first_name,' ',last_name) AS fullName, register_date FROM Members WHERE uuid IN (${fnSplit(lv3)})
                    ) AS m
                    LEFT JOIN Affiliate_Deposits AS af ON (m.uuid = af.member_uuid_member AND af.status = 0) GROUP BY m.uuid UNION ALL 

                    SELECT m.*, IFNULL(FORMAT(SUM(af.amount) / 100 * af.percent_value, 2), 0.00) AS income, 2 AS LV FROM (
                        SELECT id, sb_username, uuid, CONCAT(first_name,' ',last_name) AS fullName, register_date FROM Members WHERE uuid IN (${fnSplit(lv4)})
                    ) AS m
                    LEFT JOIN Affiliate_Deposits AS af ON (m.uuid = af.member_uuid_member AND af.status = 0) GROUP BY m.uuid UNION ALL 

                    SELECT m.*, IFNULL(FORMAT(SUM(af.amount) / 100 * af.percent_value, 2), 0.00) AS income, 2 AS LV FROM (
                        SELECT id, sb_username, uuid, CONCAT(first_name,' ',last_name) AS fullName, register_date FROM Members WHERE uuid IN (${fnSplit(lv5)})
                    ) AS m
                    LEFT JOIN Affiliate_Deposits AS af ON (m.uuid = af.member_uuid_member AND af.status = 0) GROUP BY m.uuid UNION ALL 

                    SELECT m.*, IFNULL(FORMAT(SUM(af.amount) / 100 * af.percent_value, 2), 0.00) AS income, 2 AS LV FROM (
                        SELECT id, sb_username, uuid, CONCAT(first_name,' ',last_name) AS fullName, register_date FROM Members WHERE uuid IN (${fnSplit(lv6)})
                    ) AS m
                    LEFT JOIN Affiliate_Deposits AS af ON (m.uuid = af.member_uuid_member AND af.status = 0) GROUP BY m.uuid UNION ALL 

                    SELECT m.*, IFNULL(FORMAT(SUM(af.amount) / 100 * af.percent_value, 2), 0.00) AS income, 2 AS LV FROM (
                        SELECT id, sb_username, uuid, CONCAT(first_name,' ',last_name) AS fullName, register_date FROM Members WHERE uuid IN (${fnSplit(lv7)})
                    ) AS m
                    LEFT JOIN Affiliate_Deposits AS af ON (m.uuid = af.member_uuid_member AND af.status = 0) GROUP BY m.uuid UNION ALL 

                    SELECT m.*, IFNULL(FORMAT(SUM(af.amount) / 100 * af.percent_value, 2), 0.00) AS income, 2 AS LV FROM (
                        SELECT id, sb_username, uuid, CONCAT(first_name,' ',last_name) AS fullName, register_date FROM Members WHERE uuid IN (${fnSplit(lv8)})
                    ) AS m
                    LEFT JOIN Affiliate_Deposits AS af ON (m.uuid = af.member_uuid_member AND af.status = 0) GROUP BY m.uuid UNION ALL 

                    SELECT m.*, IFNULL(FORMAT(SUM(af.amount) / 100 * af.percent_value, 2), 0.00) AS income, 2 AS LV FROM (
                        SELECT id, sb_username, uuid, CONCAT(first_name,' ',last_name) AS fullName, register_date FROM Members WHERE uuid IN (${fnSplit(lv9)})
                    ) AS m
                    LEFT JOIN Affiliate_Deposits AS af ON (m.uuid = af.member_uuid_member AND af.status = 0) GROUP BY m.uuid UNION ALL 

                    SELECT m.*, IFNULL(FORMAT(SUM(af.amount) / 100 * af.percent_value, 2), 0.00) AS income, 2 AS LV FROM (
                        SELECT id, sb_username, uuid, CONCAT(first_name,' ',last_name) AS fullName, register_date FROM Members WHERE uuid IN (${fnSplit(lv10)})
                    ) AS m
                    LEFT JOIN Affiliate_Deposits AS af ON (m.uuid = af.member_uuid_member AND af.status = 0) GROUP BY m.uuid

                    ORDER BY id
                `;

                rs_tran = await models.sequelize.query(tran, {
                    type: models.sequelize.QueryTypes.SELECT
                });// result list user

                mTable = main.sb_username;
                listTable = rs_tran
            }
        } else {
            mTable = "ไม่พบ users ที่ค้นหา"
            listTable = 0
        }

        res.status(200).json({
            data: mTable,
            table: listTable
        });
    } catch (error) {
        next(error);
    }
}