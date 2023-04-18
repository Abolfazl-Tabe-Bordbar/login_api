const { DataTypes } = require("sequelize");

const users = {
    card_id : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    login:{
        type : DataTypes.STRING(8),
        allowNull : true, 
    },
    exite : {
        type : DataTypes.STRING(8),
        allowNull : true,
    },
    record_day : {
        type : DataTypes.STRING(10),
        allowNull : false,
    },
    record_date : {
        type : DataTypes.STRING(10),
        allowNull : false,
    },
    record_timestamp : {
        type : DataTypes.BIGINT,
        allowNull : false,
    },
}

module.exports = users;