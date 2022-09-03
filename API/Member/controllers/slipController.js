const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const config = require('../config/index');
const models = require('../models/index');

exports.index = async (req, res, next) => {
    try {
       
        const slip = await models.Slip.findAll();

        const slipmoney = await slip.map( (slip, index) => {
            return {
                id: slip.id,
            
                image_name: config.DOMAIN + '/images/' + slip.photo
              
            }
        });
        
        res.status(200).json({
            data: slipmoney
        });
        
    } catch (error) {
       next(error); 
    }

}

exports.slipcreate = async (slip, uuid) => {
    try {
       
        const { slip } = req.body;


       //insert
       const data = await models.Slip.create({
        image_name: await saveImageToDisk(slip),
        transaction_uuid: uuid
    });
    
        res.status(201).json({
            message: 'เพิ่มข้อมูลเรียบร้อย'
        });
        
    } catch (error) {
       next(error); 
    }

     
 }

 async function saveImageToDisk(baseImage) {
    //หา path จริงของโปรเจค
    const projectPath = path.resolve('./') ;
    //โฟลเดอร์และ path ของการอัปโหลด
    const uploadPath = `${projectPath}/public/images/`;

    //หานามสกุลไฟล์
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

    //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
    let filename = '';
    if (ext === 'svg+xml') {
        filename = `${uuidv4.v4()}.svg`;
    } else {
        filename = `${uuidv4.v4()}.${ext}`;
    }

    //Extract base64 data ออกมา
    let image = decodeBase64Image(baseImage);

    //เขียนไฟล์ไปไว้ที่ path
    await writeFileAsync(uploadPath+filename, image.data, 'base64');
    //return ชื่อไฟล์ใหม่ออกไป
    return filename;
}

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
