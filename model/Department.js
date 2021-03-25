const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Department extends Model {}

Department.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'department',
});

module.exports = Department;