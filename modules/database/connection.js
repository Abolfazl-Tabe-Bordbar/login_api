const {Sequelize} = require('sequelize');
const {database_name,database_username,database_password} = require('../../global_config');
let db_status = false;
const sequelize = new Sequelize(database_name,database_username,database_password,{
    host: 'localhost',
    dialect: 'postgres'
});

async function start(){
    try {
        await sequelize.authenticate();
        db_status = true;
    } catch (error) {
        db_status = false;
    }
}
start();
module.exports = sequelize,db_status;