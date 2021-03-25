const inquirer = require('inquirer');
const sequelize = require('./config/connection');

const { Employee, Department, Role } = require('./model');

sequelize.sync({ force: false }).then(() => {
  intro();
});

function intro() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'wtd',
      message: 'What would you like to do?',
      choices: ['Add departements', 'Add roles', 'Add employees', 'View departements', 'View roles', 'View employees', 'Update employee roles', 'Exit']
    }
  ])
  .then((data) => {
    switch(data.wtd) {
      case 'Add departements':
        addDepartment();
        break; 
      case 'Add roles':
        addRoles();  
        break; 
      case 'Add employees':
        addEmployee();
        break;
      case 'View departements':
        viewDepartment();
        break; 
      case 'View roles':
        viewRoles();
        break;
      case 'View employees':
        viewEmployees(); 
        break;
      case 'Update employee roles':
        updateRoles();
        break;
      case 'Exit':
        return;
    }
  });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'depName',
      message: 'What do you want the department name to be?'
    }
  ])
  .then(async (data) => {
    try {
      await Department.create({name: data.depName});
      intro();
    } catch(err) {
      console.log('Could not create department :( -- ' + err);
      intro();
    }
  });
}

function addRoles() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'What would you like the role title to be?'
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'What would you like the role salary to be?'
    },
    {
      type: 'input',
      name: 'roleDepId',
      message: 'Enter department id you want the role to belong to'
    }
  ])
  .then(async (data) => {
    try {
      await Role.create({
        title: data.roleTitle, 
        salary: parseFloat(data.roleSalary), 
        department_id: parseInt(data.roleDepId) 
      });
      intro();
    } catch(err) {
      console.log('Could not create role :( -- ' + err);
      intro();
    }
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the first name of the new employee?'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the first name of the new employee?'
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'What is the id of the role of the new employee?'
    },
    {
      type: 'input',
      name: 'managerId',
      message: 'What is the id of the manager of the new employee?'
    }
  ])
  .then(async (data) => {
    try {
      await Employee.create({
        first_name: data.firstName,
        last_name: data.lastName, 
        role_id: parseInt(data.roleId), 
        manager_id: parseInt(data.managerId) 
      });
      intro();
    } catch(err) {
      console.log('Could not add employee :( -- ' + err);
      intro();
    }
  });
}

async function viewDepartment() {
  try {
    const deps = await Department.findAll({raw: true});
    console.table(deps);
    intro();
  } catch(err) {
    console.log('Could not get departments -- ' + err);
    intro();
  }
}

async function viewRoles() {
  try {
    const roles = await Role.findAll({raw: true});
    console.table(roles);
    intro();
  } catch(err) {
    console.log('Could not get roles -- ' + err);
    intro();
  }
}

async function viewEmployees() {
  try {
    const emps = await Employee.findAll({raw: true});
    console.table(emps);
    intro();
  } catch(err) {
    console.log('Could not get employees -- ' + err);
    intro();
  }
}

function updateRoles() {
  inquirer.prompt([
    {
      type: 'input',
      name: "employeeID",
      message: 'What is the id of the employee you want to change roles for?'
    },
    {
      type: 'input',
      name: 'roleID',
      message: 'What is the id of the role you want to assign to the employee?'
    }
  ])
  .then(async (data) => {
    try {
      await Employee.update({ role_id: data.roleID }, { where: { id: data.employeeID } });
      intro();
    } catch(err) {
      console.log('Could not update employee with id ' + data.employeeID + ' -- ' + err);
      intro();
    }
  });
}