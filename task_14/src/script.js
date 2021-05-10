const program = require("commander");
const getOperator = require("./get-operator");

program.parse(process.argv);

console.log(program.args[0]);

const operator = getOperator(program.args);

console.log(operator)
