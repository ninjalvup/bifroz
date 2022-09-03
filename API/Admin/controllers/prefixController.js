const models = require("../models/index");
const { v4: uuidv4 } = require("uuid");
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const config = require('../config/index');



exports.getprefix = async (req, res, next) => {
    try {

 
      const prefix = await models.Prefix.findAll();


      const prefixPhotoDomain = await prefix.map( (prefix, index) => {
        return {
            uuid: prefix.uuid,
            company: prefix.company,
            product: prefix.product,
            agent_id: prefix.agent_id,
            url: prefix.url,
            line: prefix.line,
            logo:  `${config.DOMAIN}/${prefix.logo}`,
            bg:  `${config.DOMAIN}/${prefix.bg}`,
            bandner:`${config.DOMAIN}/${prefix.bandner}`,
            token_line: prefix.token_line,
            prefix_key:prefix.prefix_key,
            createdAt: prefix.createdAt,
            updatedAt: prefix.updatedAt
        }
    });
  
      res.status(200).json({
        data: {
            prefix: prefixPhotoDomain,
        },
      });
    } catch (error) {
      next(error);
    }
  };




exports.updateprefix = async (req, res, next) => {
    try {
      const uuid = req.params.uuid;
      const {company,product,agent_id,url,line,logo,bg,bandner,token_line,prefix_key} = req.body;

      if(bandner != " "){
        const prefixonebandner = await models.Prefix.findOne({   
            where: {
              uuid: uuid,
            },
          });

        fs.unlink("./public/images/"+prefixonebandner.bandner, (err) => {
                    if (err) {
                        console.log("failed to delete local image:"+err);
                    } else {
                        console.log('successfully deleted local image');                                
                    }
            });
        const prefixlo = await models.Prefix.update({

          bandner: await saveImageToDisk(bandner),
          },
          {
            where: {
              uuid: uuid,
            },
          });
    
      }

      if(logo != " "){
        const prefixonelogo = await models.Prefix.findOne({   
            where: {
              uuid: uuid,
            },
          });

        fs.unlink("./public/images/"+prefixonelogo.logo, (err) => {
                    if (err) {
                        console.log("failed to delete local image:"+err);
                    } else {
                        console.log('successfully deleted local image');                                
                    }
            });
        const prefixlo = await models.Prefix.update({

            logo: await saveImageToDisk(logo),
          },
          {
            where: {
              uuid: uuid,
            },
          });
    
      }

      if(bg != " "){

        const prefixonebg = await models.Prefix.findOne({   
            where: {
              uuid: uuid,
            },
          });

          fs.unlink("./public/images/"+prefixonebg.bg, (err) => {
            if (err) {
                console.log("failed to delete local image:"+err);
            } else {
                console.log('successfully deleted local image');                                
            }
        });
        const prefixbg = await models.Prefix.update({   
            bg: await saveImageToDisk(bg)
    
          },
          {
            where: {
              uuid: uuid,
            },
          });
    
     }

      const prefix = await models.Prefix.update({
        
        uuid: uuidv4(),
        company: company,
        product:product,
        agent_id:agent_id,
        url:url,
        line:line,
        token_line:token_line,
        prefix_key:prefix_key,

      },
      {
        where: {
          uuid: uuid,
        },
      });

  
      res.status(200).json({
        data: {
            prefix: "update success",
        },
      });
    } catch (error) {
      next(error);
    }
  };


  async function saveImageToDisk(baseImage) {
 
    const projectPath = path.resolve('./') ;
   
    const uploadPath = `${projectPath}/public/images/`;
  
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
  