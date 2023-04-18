const { admin_jwt } = require("./../../../config");
const jwt = require('jsonwebtoken');
const DataBase = require("./../../database/schema");
let Data_Base = new DataBase();

module.exports = (req,res,next) => {


    let admin_token = req.headers.cookies ? req.headers.cookies : "";

    jwt.verify(admin_token, admin_jwt , async function(err, decoded) {
        if (!err && decoded.id && decoded.first_name && decoded.last_name) {
            

            let select_admin = await Data_Base.models.admins.findOne({
                where : {
                    id : decoded.id,
                    first_name : decoded.first_name,
                    last_name : decoded.last_name,
                }
            });

            if (select_admin != null && select_admin.dataValues.id > 0) {
                req.id = decoded.id;
                next();
            }else{
                res.json({
                    status : false,
                    massage : "دسترسی به این قسمت فقط برای مدیران سایت امکان پذیر است"
                })
            }

        } else {
            res.json({
                status : false,
                massage : "دسترسی به این قسمت فقط برای مدیران سایت امکان پذیر است"
            })
        }
    });

}