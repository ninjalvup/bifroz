const models = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

exports.login = async (req, res, next) => {
  try {
    const { username, password, prefix } = req.body;

    //check user
    const user = await models.User.findOne({
      where: {
        username: username,
        prefix: prefix
      },
    });

    if (!user) {
      const error = new Error("ไม่พบผู้ใช้งานในระบบ");
      error.statusCode = 404;
      throw error;
    }

    const isValid = await user.checkPassword(password, user.password);
    if (!isValid) {
      const error = new Error("รหัสผ่านไม่ถูกต้อง");
      error.statusCode = 401;
      throw error;
    }

    const token = await user.createToken(user.uuid, user.role);
    const expires_in = jwt.decode(token);

    return res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: "Bearer",
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  try {
    const { uuid } = req.user;

    const user = await models.User.findOne({
      attributes: ["uuid", "username", "info_name", "role"],
      where: { uuid: uuid },
    });

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { uuid, info_name, password } = req.body;

    if (req.params.uuid !== uuid) {
      const error = new Error("รหัสผู้ใช้ไม่ถูกต้อง");
      error.statusCode = 400;
      throw error;
    }

    //hash password
    const salt = await bcrypt.genSalt(5);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await models.User.update(
      {
        info_name: info_name,
        password: passwordHash,
      },
      {
        where: {
          uuid: uuid,
        },
      }
    );

    if (user[0] === 0) {
      const error = new Error("ไม่พบรหัสผู้ใช้นี้");
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

exports.getAllUser = async (req, res, next) => {
  try {

    const user = await models.User.findAll({
      where: {
        [Op.or]: [{ role: 'admin' }, { role: 'staff' }], 
      },    
      order: [["id", "DESC"]],
   });

   res.status(200).json({
     data: user,
   });
    
  } catch (error) {
    next(error);
  }
}

exports.editUser = async (req, res, next) => {
    try {

      const uuid = req.params.uuid;
      const user = await models.User.findOne({
        where: {
          uuid: uuid
        }
      });

      res.status(200).json({
        data: user,
      });
      
    } catch (error) {
      next(error);
    }
}


exports.updateUser = async (req, res, next) => {
  try {

    const { uuid, username, password, role, info_name, prefix } = req.body;

    const exisUsername = await models.User.findOne({
      where: { username: username },
    });
    //hash password
    const salt = await bcrypt.genSalt(5);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await models.User.update(
      {
        username: username,
        password: passwordHash,
        role: role,
        info_name: info_name,
        prefix: prefix
     },{
       where: {
         uuid: uuid
       }
     }
    );

    res.status(200).json({
      message: "แก้ไขข้อมูลเรียบร้อยแล้ว",
    });

  } catch (error) {
    next(error);
  }
}

exports.createUser = async (req, res, next) => {
  try {
    const { username, password, role, info_name, prefix } = req.body;

    const exisUsername = await models.User.findOne({
      where: { username: username },
    });
    if (exisUsername) {
      const error = new Error("Username มีผู้ใช้งานแล้ว");
      error.statusCode = 400;
      throw error;
    }

    //hash password
    const salt = await bcrypt.genSalt(5);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await models.User.create({
      uuid: uuidv4(),
      username: username,
      password: passwordHash,
      role: role,
      info_name: info_name,
      prefix: prefix
    });

    res.status(201).json({
      message: "เพิ่มข้อมูลเรียบร้อยแล้ว",
      data: {
        uuid: user.uuid,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { uuid } = req.params;

    const user = await models.User.findOne({ where: { uuid: uuid } });

    if (!user) {
      const error = new Error("ไม่พบผู้ใช้ในระบบ");
      error.statusCode = 404;
      throw error;
    }

    // remove
    await models.User.destroy({
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
};
