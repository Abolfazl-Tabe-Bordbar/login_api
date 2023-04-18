const sequelize = require('./connection');

// Models
const usersModel = require('./models/users');
const recordsModel = require('./models/records');

// ---------------

sequelize.define("users",usersModel,{
    timestamps : false,
    freezeTableName : true
}).sync({ alter : true});

sequelize.define("records",recordsModel,{
    timestamps : false,
    freezeTableName : true
}).sync({ alter : true});

class DataBase {
    constructor(){
        this.models = sequelize.models;
    }
}

module.exports = DataBase;