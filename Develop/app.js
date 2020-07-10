const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
var teamArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function runApp() {
    function createManager() {
        console.log("Let's create your development team!")
        inquirer.prompt([
            {
                type: `input`,
                name: `managerName`,
                message: `What is your manager's name?`,
            },
            {
                type: `input`,
                name: `managerEmail`,
                message: `What is their email`
            },
            {
                type: `input`,
                name: `id`,
                message: `What is their id?`
            },
            {
                type: `input`,
                name: `officeNum`,
                message: `What is your office number?`
            },
        ]).then(function (data) {
            var manager = new Manager(data.managerName, data.id, data.managerEmail, data.officeNum);
            teamArray.push(manager)
            addTeamMember()
        })
    }
    function addTeamMember() {
        inquirer.prompt([
            {
                type: `list`,
                name: `role`,
                message: `What team member would you like to add next?`,
                choices: ['Engineer', `Intern`, `I'm done creating my team`]
            },

        ]).then(function (data) {
            switch (data.role) {

                case "Engineer":
                    createEngineer();
                    break;
                case 'Intern':
                    createIntern();
                    break;
                //  will need to create the team and render it to the page
                default:
                    console.log(0);
            }
        });
    }
    function createEngineer() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: `What's your engineer's name?`
            },
            {
                type: 'input',
                name: 'engineerId',
                message: `What's your engineer's ID number?`
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: `What's your engineer's email?`
            }, {
                type: 'input',
                name: 'engineerGithub',
                message: `What's your engineer's github account?`
            }
        ]).then(function (data) {
            var engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub)
            teamArray.push(engineer)
            console.log(teamArray)
            addTeamMember();
        });
    }
    function createIntern() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: `What's your intern's name?`
            },
            {
                type: 'input',
                name: 'internId',
                message: `What's your intern's ID number?`
            },
            {
                type: 'input',
                name: 'internEmail',
                message: `What's your intern's email?`
            }, {
                type: 'input',
                name: 'internSchool',
                message: `What school does/did your intern go to?`
            }
        ]).then(function (data) {
            var intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool)
            teamArray.push(intern);
            addTeamMember();
            console.log(teamArray)
        })
    }
    createManager();
}
runApp();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
