const JDate = require('jalali-date');
const DataBase = require('./../../database/schema');
const db_status = require('./../../database/connection');


class records extends DataBase {

    async show(req, res) {
        try {
            if (db_status) {

                let select_all_records = await this.models.records.findAll();

                let data_for_res = [];

                for (const key in select_all_records) {
                    
                    let select_name = await this.models.users.findOne({
                        where : {
                            card_id : select_all_records[key].dataValues.card_id 
                        }
                    });

                    data_for_res.push({
                        id : select_all_records[key].dataValues.id,
                        user_name : `${select_name.dataValues.name} ${select_name.dataValues.family}`,
                        day : select_all_records[key].dataValues.record_day,
                        date : select_all_records[key].dataValues.record_date,
                        login : select_all_records[key].dataValues.login,
                        exite : select_all_records[key].dataValues.exite,
                    });

                }

                res.json({
                    status : true,
                    body : data_for_res 
                });


            } else {
                throw new Error("خطا در اتصال به پایگاه داده");
            }
        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: "خطا در ثبت حضور و غیاب شما"
            });
        }
    }

    async add(req, res) {
        try {
            if (db_status) {

                if ( !req.body.name || !req.body.family || !req.body.card_id ) {
                    res.json({
                        status : false,
                        message : "اطلاعات ارسال شده دارای اعتبار نمی باشند" 
                    })
                } else {

                    let insert = await this.models.users.create({
                        card_id : req.body.card_id,
                        name : req.body.name,
                        family : req.body.family,
                    });

                    if (insert != null) {
                        res.json({
                            status : true,
                            message : "اطلاعات کاربر وارد شد" 
                        })
                    } else {
                        res.json({
                            status : false,
                            message : "خطا در پردازش اطلااعات" 
                        })
                    }

                }


            } else {
                throw new Error("خطا در اتصال به پایگاه داده");
            }
        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: "خطا در ثبت حضور و غیاب شما"
            });
        }
    }
    async delete(req, res) {
        try {
            if (db_status) {

                let select_record = await this.models.records.findOne({
                    where : {
                        id : req.params.record_id
                    }
                });

                if (select_record != null) {
                    await this.models.records.destroy({
                        where : {
                            id : req.params.record_id
                        }
                    });
                    res.json({
                        status : true,
                        message : "حذف رکورد انجام شد" 
                    });
                }else{
                    res.json({
                        status : false,
                        message : "چنین رکوردی موجود نیست" 
                    });
                }


            } else {
                throw new Error("خطا در اتصال به پایگاه داده");
            }
        } catch (error) {
            console.log(error);
            res.json({
                status: false,
                message: "خطا در ثبت حضور و غیاب شما"
            });
        }
    }
}

module.exports = new records();