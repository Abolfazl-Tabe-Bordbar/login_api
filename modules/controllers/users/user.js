const JDate = require('jalali-date');
const DataBase = require('./../../database/schema');
const db_status = require('./../../database/connection');


class users extends DataBase {

    async new_record(req, res) {
        try {
            if (db_status) {

                // تاریخ شمسی دقیق
                let today = new JDate();
                let today_date = today.format('YYYY/MM/DD');
                let day = today.format('ddd');
                // ---------------------------------------------
                const d = new Date();
                let time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

                let user_id = 0;
                let select_user = await this.models.users.findOne({
                    where: {
                        card_id: req.params.card_id
                    }
                });

                

                if (select_user != null) {

                    let select_tody_record = await this.models.records.findOne({
                        where: {
                            card_id : req.params.card_id,
                            record_date: today_date
                        }, order: [['id', 'DESC']]
                    });



                    if (select_tody_record != null) {


                        if (parseInt(select_tody_record.dataValues.record_timestamp) + 60000 < new Date().getTime()) {

                            if (select_tody_record.dataValues.login != null && select_tody_record.dataValues.exite == null) {
                                let login_record = await this.models.records.update({
                                    exite:time,
                                    record_timestamp: new Date().getTime()
                                },{
                                    where : {
                                        id : select_tody_record.dataValues.id
                                    }
                                });

                                res.json({
                                    status: true,
                                    message: `exite for ${select_user.dataValues.name} ${select_user.dataValues.family} is successfully 👌`
                                });
                            }else if(select_tody_record.dataValues.login != null && select_tody_record.dataValues.login != null){
                                let login_record = await this.models.records.create({
                                    card_id: req.params.card_id,
                                    record_date: today_date,
                                    login:time,
                                    exite:null,
                                    record_day:day,
                                    record_timestamp: new Date().getTime()
                                });
                                res.json({
                                    status: true,
                                    message: `login for ${select_user.dataValues.name} ${select_user.dataValues.family} is successfully 👌`
                                });
                            }
                        

                        } else {
                            res.json({
                                status: false,
                                message: "Last RecordYour previous request was registered less than a minute ago ⚠"
                            });
                        }

                    } else {

                        // add new record type login
                        let login_record = await this.models.records.create({
                            card_id: req.params.card_id,
                            record_date: today_date,
                            login:time,
                            exite:null,
                            record_day:day,
                            record_timestamp: new Date().getTime()
                        });

                        if (login_record != null) {
                            res.json({
                                status: true,
                                message: `login for ${select_user.dataValues.name} ${select_user.dataValues.family} is successfully 👌`
                            });
                        } else {
                            res.json({
                                status: false,
                                message: `login for ${select_user.dataValues.name} ${select_user.dataValues.family} is not successfully 😢`
                            });
                        }
                    }



                } else {
                    res.json({
                        status: false,
                        message: "The Card Is Not Valid 😢"
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

module.exports = new users();