const models = require('../models/index');

exports.userTree = async (req, res, next) => {
    try {
        // req.user.uuid
        let sql = "SELECT sm.sb_username, sm.uuid, IFNULL(ch.total, 0) AS total FROM (\n" +
                "	SELECT * FROM Affiliate_Members WHERE member_uuid = '"+req.user.uuid+"'\n" +
                ") AS m\n" +
                "LEFT JOIN (\n" +
                "	SELECT * FROM Members\n" +
                ") AS sm ON (m.member_uuid_member = sm.uuid)\n" +
                "LEFT JOIN (\n" +
                "	SELECT *, COUNT(*) AS total FROM Affiliate_Members GROUP BY member_uuid\n" +
                ") AS ch ON (m.member_uuid_member = ch.member_uuid) ORDER BY m.id";
        rs = await models.sequelize.query(sql, {
            type: models.sequelize.QueryTypes.SELECT
        });// rs_lv1 list user

        res.status(200).json({
            userLogin: req.user.sb_username,
            data: rs
        });
        
    } catch (error) {
       next(error); 
    }
}

exports.userTreeUUID = async (req, res, next) => {
    try {
        const { uuid } = req.params;
        
        let sql = "SELECT sm.sb_username, sm.uuid, IFNULL(ch.total, 0) AS total FROM (\n" +
                "	SELECT * FROM Affiliate_Members WHERE member_uuid = '"+uuid+"'\n" +
                ") AS m\n" +
                "LEFT JOIN (\n" +
                "	SELECT * FROM Members\n" +
                ") AS sm ON (m.member_uuid_member = sm.uuid)\n" +
                "LEFT JOIN (\n" +
                "	SELECT *, COUNT(*) AS total FROM Affiliate_Members GROUP BY member_uuid\n" +
                ") AS ch ON (m.member_uuid_member = ch.member_uuid) ORDER BY m.id";
        rs = await models.sequelize.query(sql, {
            type: models.sequelize.QueryTypes.SELECT
        });// rs_lv1 list user

        res.status(200).json({
            data: rs
        });
        
    } catch (error) {
       next(error); 
    }
}