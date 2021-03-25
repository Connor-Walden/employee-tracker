const Employee = require('./Employee');
const Department = require('./Department');
const Role = require('./Role');

Role.belongsTo(Department);

module.exports = {
    Employee,
    Department,
    Role
}
