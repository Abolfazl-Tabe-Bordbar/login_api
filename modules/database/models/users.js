const { DataTypes } = require("sequelize");

const users = {
    card_id : {
        type : DataTypes.STRING(32),
        allowNull : false,
    },
    name : {
        type : DataTypes.STRING(32),
        allowNull : false,
    },
    family : {
        type : DataTypes.STRING(32),
        allowNull : false,
    },
}

module.exports = users;