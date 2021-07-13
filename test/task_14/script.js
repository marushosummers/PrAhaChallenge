const program = require("commander");
const getOperator = require("./src/get-operator");
const getNumbers = require("./src/get-numbers");
const add = require("./src/add");
const subtract = require("./src/subtract");
const multiply = require("./src/multiply");
const divide = require("./src/divide");

// 引数を取得
program.parse(process.argv);

// 引数を演算子と数字にパース
const operator = getOperator(program.args);
const nums = getNumbers(program.args.slice(1));

let result;
switch (operator) {
  case "add":
    result = add(nums);
    break;
  case "subtract":
    result = subtract(nums);
    break;
  case "multiply":
    result = multiply(nums);
    break;
  case "divide":
    result = divide(nums);
    break;
}

console.log(result);
