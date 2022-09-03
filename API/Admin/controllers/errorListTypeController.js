const models = require("../models/index");

exports.index = async (req, res, next) => {
    try {
        const errorListType = await models.Error_List_Type.findAll({
            order: [["id", "DESC"]],
        });

        res.status(200).json({
            data: errorListType,
        });

    } catch (error) {
        next(error);
    }
    
}