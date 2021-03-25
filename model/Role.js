const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Role extends Model {}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    salary: {
        type: DataTypes.DECIMAL
    },
    department_id: {
        type: DataTypes.INTEGER
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'role',
});

module.exports = Role;