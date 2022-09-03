module.exports.isSuperAdmin = (req, res, next) => {
    const { role } = req.user;

    if ( role === 'superAdmin') {
        next();
    } else {
        return res.status(403).json({
            error: {
                message: 'ไม่มีสิทธิ์ใช้งานส่วนนี้ เฉพาะ superAdmin เท่านั้น'
            }
        });
    }
}

module.exports.isAdmin = (req, res, next) => {
    const { role } = req.user;

    if ( role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            error: {
                message: 'ไม่มีสิทธิ์ใช้งานส่วนนี้ เฉพาะ admin เท่านั้น'
            }
        });
    }
}

module.exports.isStaff = (req, res, next) => {
    const { role } = req.user;

    if ( role === 'staff') {
        next();
    } else {
        return res.status(403).json({
            error: {
                message: 'ไม่มีสิทธิ์ใช้งานส่วนนี้ เฉพาะ staff เท่านั้น'
            }
        });
    }
}