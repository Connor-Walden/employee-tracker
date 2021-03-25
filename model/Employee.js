const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Employee extends Model {}

Employee.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING
    },
    last_name: {
        type: DataTypes.STRING
    },
    role_id: {
        type: DataTypes.INTEGER
    },
    manager_id: {
        type: DataTypes.INTEGER
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee',
});

module.exports = Employee;